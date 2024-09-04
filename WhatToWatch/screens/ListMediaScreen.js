import {
    View,
    StyleSheet,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    ScrollView,
    Animated,
    PanResponder,
    Modal,
} from 'react-native';
import { GestureHandlerRootView, State } from 'react-native-gesture-handler';
import { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { addLists } from "../reducers/list.js";
import Header from "../components/Header/Header.js";
import HeaderTitle from "../components/Header/HeaderTitle.js";
//import chevron_navigate_right from '../assets/icons/chevronnavigate_right.png';
//import arrow_navigate_down from '../assets/icons/arrow_navigate_down.png';

import ButtonComponent from "../components/Buttons/ButtonComponent.js";
import arrowLeftIcon from "../assets/Icons/arrowLeftIcon.png";
//import arrowRightIcon from "../assets/icons/arrowRightIcon.png";
import MediaCardForList from '../components/Lists/MediaCardForList.js';
import MediaDetails_SwipeModal from '../components/MediaDetailsModal/MediaDetails_SwipeModal.js';
import { useNavigation } from "@react-navigation/native";
//import Mediadetails_SwipeModal from '../components/MoviesSwipeModal/Mediadetails_SwipeModal.js';

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
const baseUrl = localUrl;


export default function ListMediaScreen() {

    const [yourLikes, setYourLikes] = useState([]);
    const [loadingLists, setLoadingLists] = useState(true);
    const [errorLists, setErrorLists] = useState(null);
    const [listContent, setListContent] = useState([]);
    const [mediaOfList, setMediaOfList] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const user = useSelector((state) => state.user.value);
    const list = useSelector((state) => state.list.value)
    const moviesFromReducer = list.mediaListSelected.movies
    const navigation = useNavigation();

    function isEmpty(variable) {
        return variable === null || variable === undefined || variable === "" || variable.length === 0
    }

    const fetchListMedia = useCallback(() => {
        fetch(`${baseUrl}movielists/get/media/${list.mediaListSelected._id}`)
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 404) {
                        setErrorLists("You have not created any lists yet.");
                    } else {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                }
                return response.json();
            })
            .then((data) => {
                //console.log("id recup:", data)
                //console.log("les medias proposés:", data.listMedia)
                if (data.success) {
                    if (data) {
                        //console.log("data show", newData)
                        setListContent(data.listMedia);
                    } else {
                        console.error("lists is not an array");
                    }
                } else {
                    console.error(data.message);
                }
            })
            .catch((error) => {
                if (error.message !== "HTTP error! status: 404") {
                    console.error("Fetch error:", error);
                }
            })
            .finally(() => setLoadingLists(false));
    }, [baseUrl, list.mediaListSelected._id]);

    const handlePress = (item) => {
        //console.log("item show:", item)
        navigation.navigate("MediaDetail", { media: item });
    };

    const handleLikesPress = () => {
        if (yourLikes.length > 0) {
            navigation.navigate("LikedMedia", { likedMedia: yourLikes });
        } else {
            console.log("No liked media to display.");
        }
    };

    const handleSchedule = (item) => {
        // Logique pour planifier le visionnage du média
        console.log("Planifier le visionnage de :", item);
    };

    const handleMoreMediaPress = () => {
        const listId = list.mediaListSelected._id

        //mémo : fetchListMedia() avec incrementation de la page +1 
    }

    /**
     * Fonction qui permet 
     * 
     * @param {*} item 
     */
    const handleMediaDetails = async (item) => {
        const index = moviesFromReducer.findIndex((media) => media.id === item.id)
        //console.log("media:", moviesFromReducer[index]);
        // Récupérer l'index de la list de medias clicked à afficher dans la modal
        setSelectedMediaIndex(index);
        // Récupérer la position dans la list du media
        setSelectedMedia(moviesFromReducer[index])
        //Déclencher l'ouverture de la modal qui affiche le détail du media clicked
        setIsModalVisible(true);
    }


    const onClose = () => {
        setIsModalVisible(false)
        setSelectedMedia(null);
    }

    useFocusEffect(
        useCallback(() => {
            fetchListMedia();
            setMediaOfList(list.mediaListSelected.movies)  // pb avec acces à movies depuis resultat du fetch ??
            //console.log("List:", "listSelected")
            // console.log("movies:", list.mediaListSelected.movies)
        }, [fetchListMedia])
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
                <HeaderTitle style={styles.HeaderTitle} title={"Your list"} />
                <View style={styles.rightIconContainer}>
                    <TouchableOpacity>
                        <Image />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.bodyScreenContainer}>
                <View style={styles.parameterAvatarHeader}>
                    <Image
                        source={list.mediaListSelected.avatar}
                        style={styles.avatarSelected}
                    />
                    <View style={styles.avatarHeaderTextContainer}>
                        <Text style={styles.parameterAvatarTitle} >
                            {
                                list.mediaListSelected.list_name
                            }
                        </Text>
                    </View>
                </View>
                <ScrollView>

                    {loadingLists ? (
                        <Text style={styles.loadingText}>Loading...</Text>
                    ) : mediaOfList.length > 0 ? (
                        mediaOfList.map((media, index) => (
                           
                            <MediaCardForList
                                key={index}
                                styleMediaCardContainer={styles.mediaCardContainer}
                                styleInfosContainer={styles.infosContainer}
                                onPress={() => handleMediaDetails(media)}
                                stylePosterMedia={styles.posterMedia}
                                sourcePoster={{ uri: `${TMDB_IMAGE_BASE_URL}/${media.poster}` }}
                                styleTextInfoMediaContainer={styles.textInfoMediaContainer}
                                styleTitleMedia={styles.titleMedia}
                                title={media.titre}
                                descriptionMedia={media.description}
                                styleDescriptionMedia={styles.descriptionMedia}
                                styleVoteEtPopuariteContainer={styles.voteEtPopularite}
                                vote={media.vote}
                                styleTextVote={styles.vote}
                                popularite={media.popularite}
                                styleTextPopularite={styles.popularite}
                                genre={media.popularite}
                                styleTextGenre={styles.genre}
                            />
                    )).reverse()
                    ) : (
                        <View style={styles.textAddListContainer}>
                            <Text style={styles.textH2}>
                                Your movies are lost maybe yes maybe no... ?
                            </Text>
                            <Text style={styles.textBody14}>
                                find it !!!
                            </Text>
                            <Text style={styles.textBody14}>
                                {errorLists || "You have no movies"}
                            </Text>
                        </View>
                    )}

                </ScrollView>
                {/* <MediaDetails_SwipeModal
                    visible={isModalVisible}
                    unVisible={() => onClose()}
                    media={selectedMedia}
                    index={selectedMediaIndex}
                    onSwipe={() => onSwipe()}
                    isFirst={""}
                /> */}
                <ButtonComponent
                    key={1}
                    label="more media"
                    buttonContainer={styles.buttonContent}
                    button={styles.button}
                    buttonLabel={styles.buttonLabel}
                    onItemPress={handleMoreMediaPress}
                />
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
    leftIconContainer: {
        width: 24,
    },
    leftIcon: {
        width: 21.5,
        height: 21.5,
    },
    rightIconContainer: {
        width: 24,
    },
    rightIcon: {
        width: 21.5,
        height: 21.5,

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
    textAddListContainer: {
        height: "50%",
        justifyContent: "center",
    },
    textH2: {
        textAlign: "center",
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    textBody14: {
        fontSize: 14,
        color: "white",
        textAlign: "center",
        marginVertical: 20,
    },

    parameterContainer: {
        paddingTop: 5,
        paddingBottom: 5,
    },

    buttonContent: {
        width: 220,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 15,
        padding: 5,
        marginTop: 10,
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

    parameterAvatarHeader: {
        //flex:1,
        flexDirection: 'row',
        fontSize: 18,
        fontWeight: "bold",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 15,
        padding: 10,
        gap: 15,
        //  borderColor:"red",
        //  borderWidth:2,

    },
    avatarSelected: {
        height: 60,
        width: 60,
        backgroundColor: "white",
        borderRadius: 50,
    },
    avatar: {
        height: 45,
        width: 45,
        backgroundColor: "gray",
        borderRadius: 50,

    },
    avatarHeaderTextContainer: {
        flex: 1,
        // borderColor:"yellow",
        // borderWidth:2,
    },
    parameterAvatarTitle: {
        color: "white",
        fontSize: 20,
    },





    listMediaConstainer: {
        flex: 1,
        gap: 15,

    },
    mediaCardContainer: {
        height: 150,
        width: 360,

    },



    mediaCardContainer: {
        marginTop: 30,

        height: 200,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,

        borderColor: "#7876A0",
        borderWidth: 2,

    },

    posterMedia: {
        backgroundColor: "gray",
        width: 130,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        resizeMode: "cover",
    },
    titleMedia: {
        fontWeight: "bold",
        fontSize: 16,
        color: "black",
    },
    infosContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "ceneter",
        gap: 5,

        // borderColor:"green",
        // borderWidth:2,

    },
    textInfoMediaContainer: {
        flex: 1,
        padding: 5,
        justifyContent: "space-between",

        // borderColor:"blue",
        // borderWidth:2,
    },
    descriptionMedia: {
        //flex:1,
        textAlign: "justify",
        color: "white",
        margin: 0,

        // borderColor:"red",
        // borderWidth:2,
    },
    genre: {
        color: "white",
        //textAlign: "right",
    },
    voteEtPopularite: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 50,
    },
    vote: {
        color: "white",
        textAlign: "right",
    },
    popularite: {
        color: "white",
        textAlign: "right",
    },

    listCardTextContainer: {
        flex: 1,
        alignItems: "flex-start",
    },
    listCardTextTitle: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    listCardTextLength: {
        fontSize: 14,
        color: "white",
        color: "#fff",
    },
    listCardMembersContainer: {
        //flex:1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        marginBottom: 5,
    },
    listCardMembersAvatar: {
        backgroundColor: "orange",
        borderWidth: 2,
        borderRadius: 50,
        height: 20,
        width: 20,
    },




    //Styles Aurélien
    container: {
        flex: 1,
        backgroundColor: "#0d0f2b",
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    section: {
        marginBottom: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#ffffff",
    },
    likesContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: "#1c1c1c",
        borderRadius: 5,
        marginBottom: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    likesInfo: {
        flex: 1,
    },
    likesName: {
        fontSize: 16,
        color: "#ffffff",
    },
    likesDetails: {
        fontSize: 14,
        color: "#888",
    },
    heartIcon: {
        marginLeft: 10,
    },
    itemContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    itemText: {
        fontSize: 16,
        color: "#ffffff",
    },
    loadingText: {
        color: "#ffffff",
    },
    noDataText: {
        color: "#ffffff",
    },
})
