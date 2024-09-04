import {
    View,
    StyleSheet,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Modal,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header/Header.js";
import HeaderTitle from "../components/Header/HeaderTitle.js";
import chevron_navigate_right from '../assets/Icons/chevron_navigate_right.png';
import chevron_navigate_down from '../assets/Icons/chevron_navigate_down.png';
import ButtonComponent from "../components/Buttons/ButtonComponent.js";
import arrowLeftIcon from "../assets/Icons/arrowLeftIcon.png";
import ParameterListName from "../components/ParameterListName/ParameterListName.js";
import ParameterListTypes from "../components/ParameterListTypes/ParameterListTypes.js";
import ParameterListGenres from "../components/ParameterListGenres/ParameterListGenres.js";
import ParameterListRating from "../components/ParameterListRating/ParameterListRating.js";
import ParametersGenresOfTypesList from "../components/ParametersGenresOfTypesList/ParametersGenresOfTypesList.js";
import ParameterListProviders from "../components/ParameterListProviders/ParameterListProviders.js";
import ParameterListAvatar from "../components/ParameterListAvatar/ParameterListAvatar.js";
import ParameterListMembers from "../components/ParameterListMembers/ParameterListMembers.js";
import ParameterListRelease from "../components/ParameterListRelease/ParameterListRelease.js";


import list, { addGenres, addNameList, addProviders, addTypes, addMediaList, addIdList } from '../reducers/list.js';

//-----POUR RECUPERER L'URL DE L'API EN FONCTION DE L'ENVIRONNEMENT DE TRAVAIL---//
const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
const baseUrl = localUrl; // Changez en vercelUrl pour utiliser avec Vercel

const categorieData = ["Movie", "TV"];

export default function ListsSettingsScreen({ }) {

    // Resultat de la recherche des media à afficher dans la liste
    const [mediaOfList, setMediaOfList] = useState([])
    const [idList, setIdList] = useState("");
    const [errorLists, setErrorLists] = useState(null);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value)
    const list = useSelector((state) => state.list.value)
    const navigation = useNavigation();

    // Le bouton cancel renvoi vers la page List et
    // En cas de création de list : Réinitialise les paramètre précédenmment sauvegarder de l'utilisateur
    // En cas de modification des paramètres d'une liste existente restaure les dernier paramètres sauvegardés
    const handleCancelPress = () => {
        navigation.navigate("TabNavigator")
        //intégrer la réinitialisation option de l'utilisateur
    }

    function isEmpty(variable) {
        return variable === null || variable === undefined || variable === "" || variable.length === 0
    }

    // Fonction qui permet d'envoyer les paramètres de la liste en base de données pour les sauvegarder
    const addParameterListToMovieList = async () => {

        console.log("username:", user.username)
        console.log("token:", user.token)
        console.log("avatar:", list.avatar)
        console.log("list_name:", list.name)
        console.log("types:", list.types)
        console.log("genres:", list.genres.map(genre => { return genre.id }).slice(",").join("|"))
        console.log("providers:", list.providers)
        console.log("release:", list.releaseDateGte)
        console.log("rating:", list.rating)

        // retraiter les parameters 
        // Pour chaque parametre préciser le format du reducer
        // et le format envoyé par fetch à la base de données

        /**
         * Parameter avatar du reducer
         * @param {{"key": 6, "source": "../../assets/ListAvatars/listAvatar06.png", "value": "Avatar 06"}}
         * 
         * Format attendu en base de donnée
         * @param { string }
         * 
         * Retraitement
         * list.avatar.source
         * 
         */
        let avatar = isEmpty(list.avatar) ? `` : list.avatar.source;

        /**
         * Parameter name du reducer
         * @param { string }
         * 
         * Format attendu en base de donnée
         * @param { string }
         * 
         * Retraitement
         * list.name.toString()
         * 
         */
        let name = isEmpty(list.name) ? '' : list.name;

        /**
         * Parameter types du reducer
         * @param { ["Movie", "TV"] }
         * 
         * Format attendu en base de donnée
         * @param { ["Movie", "TV"] } // Array
         * 
         * Retraitement
         * list.types
         * 
         */
        let types = isEmpty(list.types) ? [] : list.types;

        /**
         * Parameter genres du reducer
         * @param { [{"id": 10767, "name": "Talk"}, {"id": 10762, "name": "Kids"}] }
         * 
         * Format attendu en base de donnée
         * @param { [{"id": 10767, "name": "Talk"}, {"id": 10762, "name": "Kids"}]  } // array d'objet
         * 
         * Retraitement
         * list.genres.map(genre => {return genre.id }).slice(",").join("|");
         * 
         */
        let genres = isEmpty(list.genres) ? [] : list.genres;

        // Pour la route moulable fetchmovie
        // let genres =  isEmpty(list.type) 
        // ? [] 
        // : list.genres.map(genre => {return genre.id }).slice(",").join("|");

        /**
         * Parameter providers du reducer
         * @param { [2, 3, 8] } // Array d'id des providers
         * 
         * Format attendu en base de donnée
         * @param { [2, 3, 8]  } 
         * 
         * Retraitement
         * list.genres.map(genre => {return genre.id }).slice(",").join("|");
         * 
         */
        let providers = isEmpty(list.providers) ? [] : list.providers;

        // our route fetchmovie
        // récupérer uniquement les id des provider
        //let providers = providers.length === 1 ? providers[0].toString() : list.providers.slice(",").join("|");


        /**
         * Parameter rating du reducer
         * @param { String }
         * 
         * Format attendu en base de donnée
         * @param { String } 
         * 
         * Retraitement
         * list.releaseDateGte
         * 
         */
        let releaseDateGte = isEmpty(list.releaseDateGte) ? "" : list.releaseDateGte;

        /**
         * Parameter rating du reducer
         * @param { Number }
         * 
         * Format attendu en base de donnée
         * @param { Number } 
         * 
         * Retraitement
         * list.rating
         * 
         */
        let rating = isEmpty(list.rating) ? "" : Number.parseInt(list.rating);

        switch (types[0]) {
            case "Movie":
                console.log("case type : Movie");
                try {
                    let responseClone; // 1 - etape pour fix l'erreur format token non reconnu -> Fetch error: [SyntaxError: JSON Parse error: Unexpected character: <]
                    // Si le type est Movie
                    //Entregistrement des parametres de la liste en base de données
                    // et ajoute l'id de la liste dans user en base de données
                    console.log("show url",`${baseUrl}movielists/add/movie/${user.token}`)
                    fetch(`${baseUrl}movielists/add/movie/${user.token}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            token: user.token.toString(),//user.token,
                            avatar: avatar,
                            list_name: name,//list.name.toString(),
                            types: types,//"Movie",
                            genres: genres,//list.genres,
                            providers: providers, //list.providers,
                            average: rating, // à supprimer
                            releaseDateGte: releaseDateGte//"2020-01-01",
                        }),
                    })
                        .then((response) => {
                            if (!response.ok) {
                                if (response.status === 404) {
                                    setErrorLists("La liste n'a pas été créée");
                                } else {
                                    throw new Error(`HTTP error! status: ${response.status}`);
                                }
                            }
                            responseClone = response.clone(); // 2 - etape pour fix l'erreur format token non reconnu 
                            return response.json();
                        })
                        .then((data) => {
                            console.log('Données création de list:', data)
                            console.log("type:", data.option.content_type)
                            console.log("récupe:", data.movies)
                            const newId = data._id;
                            console.log('_id list:', newId)
                            setIdList(newId)
                            dispatch(addIdList(newId))
                            const newMedia = data.movies
                            setMediaOfList(newMedia)
                            dispatch(addMediaList(newMedia));
                        }, function (rejectionReason) { // 3 - etape pour fix l'erreur format token non reconnu 
                            console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4 - etape pour fix l'erreur format token non reconnu 
                            responseClone.text() // 5 - etape pour fix l'erreur format token non reconnu 
                                .then(function (bodyText) {
                                    console.log('Received the following instead of valid JSON:', bodyText); // 6 - etape pour fix l'erreur format token non reconnu -> voir les infos dans le terminal l'erreur ne s'affiche plus
                                });
                        })
                } catch (error) {
                    console.error('Une erreur est survenue:', error);
                }

                break;
            case "TV":
                console.log("case type : TV");
                try {
                    let responseClone; // 1 - etape pour fix l'erreur format token non reconnu -> Fetch error: [SyntaxError: JSON Parse error: Unexpected character: <]
                    // Si le type est TV
                    //Entregistrement des parametres de la liste en base de données
                    // et ajoute l'id de la liste dans user en base de données
                    fetch(`${baseUrl}movielists/add/tv/${user.token}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            token: user.token.toString(),//user.token,
                            avatar: avatar,
                            list_name: name,//list.name.toString(),
                            types: types,//"Movie",
                            genres: genres,//list.genres,
                            providers: providers, //list.providers,
                            average: rating, // à supprimer
                            releaseDateGte: releaseDateGte//"2020-01-01",
                        }),
                    })
                        .then((response) => {
                            if (!response.ok) {
                                if (response.status === 404) {
                                    setErrorLists("La liste n'a pas été créée");
                                } else {
                                    throw new Error(`HTTP error! status: ${response.status}`);
                                }
                            }
                            responseClone = response.clone(); // 2 - etape pour fix l'erreur format token non reconnu 
                            return response.json();
                        })
                        .then((data) => {
                            console.log('Données création de list:', data)
                            const newdata = data.map((item) => { item })
                            console.log("newData:", newdata)
                            console.log("type:", newdata.option.content_type)
                            console.log("récupe:", newdata.movies)
                            const newId = newdata._id;
                            console.log('_id list:', newId)
                            setIdList(newId)
                            dispatch(addIdList(newId))
                            const newMedia = newdata.movies
                            setMediaOfList(newMedia)
                            dispatch(addMediaList(newMedia));
                        }, function (rejectionReason) { // 3 - etape pour fix l'erreur format token non reconnu 
                            console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4 - etape pour fix l'erreur format token non reconnu 
                            responseClone.text() // 5 - etape pour fix l'erreur format token non reconnu 
                                .then(function (bodyText) {
                                    console.log('Received the following instead of valid JSON:', bodyText); // 6 - etape pour fix l'erreur format token non reconnu -> voir les infos dans le terminal l'erreur ne s'affiche plus
                                });
                        })
                } catch (error) {
                    console.error('Une erreur est survenue:', error);
                }
                break;
            default:
                console.log("case type : Movie and Tv")
                console.log("type is empty")
        }

    }


    // Le bouton save permet de sauvegarder la liste avec ses option en base de données 
    // Et renvoie vers la page List où la list créée ou modifié est visible 
    const handleSavePress = () => {
        console.log("valeur du reducer list:", list)
        if (isEmpty(list.name)) return alert("Name of list is requiere !!!");
        if (isEmpty(list.types)) return alert("Type of list is requiere !!!");
        addParameterListToMovieList();
        //navigation.navigate("ListCreatedSwipeScreen", { moviesToSwipe: mediaOfList });
        navigation.navigate("List", { moviesToSwipe: mediaOfList });
    }

    useFocusEffect(
        useCallback(() => {
            console.log("mediaOfList", mediaOfList)
            console.log("list id", list.id)
        }, [])
    );

    return (
        <View style={styles.pageContainer}>
            <View style={styles.headerContainer}>
                <Header label={user.username} />
            </View>
            <View style={styles.headerTitleContainer}>
                <View style={styles.leftIconContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={styles.leftIcon} source={arrowLeftIcon} />
                    </TouchableOpacity>
                </View>
                <HeaderTitle style={styles.headerTitle} title={"Your list"} />
                <View style={styles.rightIconContainer}>
                    <TouchableOpacity>
                        <Image />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.bodyScreenContainer}>
                <ScrollView>

                    <View>
                        <ParameterListAvatar />
                        <ParameterListName />
                        <ParametersGenresOfTypesList />
                        <ParameterListProviders />
                        <ParameterListRelease />
                        <ParameterListRating />
                        <ParameterListMembers />
                    </View>
                    {errorLists &&
                        <Text style={{ color: "red", fontWeight: "bold" }}>{errorLists}</Text>
                    }
                    <View style={styles.buttonContainer}>
                        <ButtonComponent
                            key={1}
                            label="Cancel"
                            buttonContainer={styles.buttonContent}
                            button={styles.button}
                            buttonLabel={styles.buttonLabel}
                            onItemPress={handleCancelPress}
                        />
                        <ButtonComponent
                            key={2}
                            label="Save"
                            buttonContainer={styles.buttonContent}
                            button={styles.button}
                            buttonLabel={styles.buttonLabel}
                            onItemPress={handleSavePress}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: "#000027",
    },
    headerContainer: {
        marginTop: 15,
        justifyContent: "center",
    },
    headerTitleContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
    },
    bodyScreenContainer: {
        flex: 1,
        justifyContent: "Top",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderTopColor: "#7C4DFF",
        borderBottomColor: "#7C4DFF",
        borderWidth: 2,
    },
    parameterContainer: {
        paddingTop: 5,
        paddingBottom: 5,
    },
    parameterTitleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: "#7C4DFF",
        borderWidth: 2,
        paddingTop: 5,
        paddingBottom: 5,
    },
    parameterTitleText: {
        color: "#fff",
        fontSize: "17",
        fontWeight: "bold",
    },
    parameterContenuContainer: {
        flexDirection: "row",
        //justifyContent:"space-around",
        paddingTop: 5,
        paddingBottom: 5,
        alignItems: "center",
    },
    parameterContenuContainerColumn: {
        flexDirection: "column",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    TextInput: {
        flex: 1,
        borderRadius: 5,
        borderColor: "grey",
        backgroundColor: "#7876A0",
        height: 40,
        width: 360,
        marginTop: 5,
        textAlign: "left",
        paddingLeft: 5,
    },
    parameterCheckBoxeContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",

        borderColor: "red",
        borderWidth: 2,
    },
    checkBox: {
        flex: 1,
        padding: 10
    },
    checkBoxIcon: {
        width: 24,
        height: 24,
    },
    checkBoxLabel: {
        color: "white",
        textAlign: "center",
    },
    buttonContent: {
        width: 120,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 15,
        padding: 5,
        marginTop: 30,
        alignSelf: "center",

    },
    button: {
        borderRadius: 10,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    buttonLabel: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",

    },
});


