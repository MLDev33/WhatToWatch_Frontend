import { 
    StyleSheet, 
    View, 
    Text, 
    FlatList, 
    ScrollView,
    TouchableOpacity,
    Modal, 
} from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from "../../components/Buttons/ButtonComponent.js";
import GenreComponent from "./GenreComponent.js";
import { addGenres } from "../../reducers/list.js";


export default function ParameterListGenres_ModalGenres({
    visible,
    unVisible,
    label, 
    onClickTypeButton,
    typesOfList
}){
    

    const [isSelectedGenres, setIsSelectedGenres] = useState([]);
    const [isClickedGenres, setIsClickedGenres] = useState([]);
    const [genresOfList, setGenresOfList] = useState([]);

    const dispatch = useDispatch();
    const list = useSelector((state) => state.list.value) 

    /**
     * Fonction qui récupére les valeurs du genre clicked
     * et envoie les valeurs du genres dans le state isClickedGenres
     * 
    * @param {{"id": number, "name": string, "type": Array.<String>}} element
     */
    const handledClickGenres = (element) => {
        console.log("element", element)
        if(isClickedGenres.includes(element)){
            const newGenres = isClickedGenres.filter((type) => type != element);
            setIsClickedGenres(newGenres)
        }
        else{
            const newGenres = [...isClickedGenres, element]
            setIsClickedGenres(newGenres)
        }
    }

    /**
     * Fonction qui permet de récupérer la valeur des 
     * genres de la list avant modification.
     * 
     */
    const handleCancelPress = () => {
        setIsClickedGenres("")
        console.log("click close:", unVisible)
        unVisible(false)
    };

    /**
     * Fonction qui enregistre les genres clicked comme ceux défini pour la list, 
     * enregistre sont état dans isSelectedGenres, 
     * et l'envoie au reducer via l'état GenresOfList dans dispach.
     * 
     */
    const handleSavePress = () => {
        console.log("click close:", unVisible)
        setIsSelectedGenres(isClickedGenres)
        setGenresOfList(isClickedGenres)
        unVisible(false)
    };

    /**
     * Fonction qui envoie les genres au reducer list
     */
    dispatch(addGenres(genresOfList));

    const renderItemGenres = ( { item }) => {
        //console.log("item dans listeGenres:", item)
        return(
            //console.log("render:", item.name.toString()),
            <GenreComponent
                label={item.name.toString()} 
                key={item.id.toString()}
                clickGenres={(e) => handledClickGenres(e)} 
                stylesButtonContainer={styles.linearGradient}
                stylesButton={styles.buttonGenres}
                stylesButtonLabel={styles.buttonGenresLabel}
                stylesLinearGradient={styles.linearGradient}
                results={item}
            />
        );
    }

    return(
        <View>
            <Modal
                animationType="fade"
                transparent={false}
                visible={visible}
                onRequestClose={unVisible}
                presentationStyle="pageSheet"
            >
                <View  style={styles.modalContainer}>
                    <View style={styles.parameterGenresLegende}>
                        <Text style={{color: "yellow"}} >Movie only</Text>
                        <Text style={{color: "white"}} >Movie and TV</Text>
                        <Text style={{color: "green"}} >TV only</Text>
                    </View>
                    <View style={styles.flatlistGenresContainer}>
                        <FlatList
                            data={typesOfList}
                            renderItem={renderItemGenres}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={3}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                       <View style={styles.buttonContainer}>
                        <ButtonComponent
                                key={1}
                                label="Cancel" 
                                buttonContainer={styles.buttonContent}
                                button={styles.button}
                                buttonLabel={styles.buttonLabel}
                                onItemPress={() => handleCancelPress()}
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
                    </View>
                </View>
        </Modal>
       </View>
    )
}

const styles = StyleSheet.create({
    modalContainer:{
        flex:1,
        backgroundColor:"#000027",

        // borderColor:"red",
        // borderWidth:"1",
    },
    parameterGenresLegende:{
        //flex:1,
        flexDirection: 'row',
        fontSize: 10,
        justifyContent: "space-around",
        alignItems:"center",
        marginTop:5,
        marginBottom:15,
        // borderColor:"yellow",
        // borderWidth:2,
    },
    flatlistGenresContainer:{
        flex:1,
       justifyContent:"space-between",
       alignItems:"center",
        gap:0,
        // borderColor:"blue",
        // borderWidth:2,
    },


    buttonContainer:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems: "center",
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
    button:{
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
    linearGradient:{
        borderRadius: 20,
        width: 100,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
        borderRadius:10,
        margin:5,
    },
    buttonGenres:{
        borderRadius: 10,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor:"#000027",
    },
    buttonGenresLabel: {
        color: "#fff",
        fontSize: 10,
        textAlign: "center",

    },
})