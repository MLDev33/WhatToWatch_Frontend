import { 
    StyleSheet, 
    View, 
    Text, 
    FlatList, 
    Image,
    Modal, 
} from "react-native";
import { useState, useEffect, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import ButtonComponent from "../../components/Buttons/ButtonComponent.js";
import ListAvatarComponent from "./ListAvatarComponent.js";
import ParameterContainer from "../Parameters/ParameterContainer.js";
import listAvatar01 from "../../assets/ListAvatars/listAvatar01.png"
import listAvatar02 from "../../assets/ListAvatars/listAvatar02.png"
import listAvatar03 from "../../assets/ListAvatars/listAvatar03.png"
import listAvatar04 from "../../assets/ListAvatars/listAvatar04.png"
import listAvatar05 from "../../assets/ListAvatars/listAvatar05.png"
import listAvatar06 from "../../assets/ListAvatars/listAvatar06.png"
import listAvatar07 from "../../assets/ListAvatars/listAvatar07.png"
import listAvatar08 from "../../assets/ListAvatars/listAvatar08.png"
import listAvatar09 from "../../assets/ListAvatars/listAvatar09.png"
import listAvatar10 from "../../assets/ListAvatars/listAvatar10.png"
import { addAvatarList } from "../../reducers/list.js";


const userAvatars = [
    {key: 1, value: "Avatar 01", source: "../../assets/ListAvatars/listAvatar01.png"},
    {key: 2, value: "Avatar 02", source: "../../assets/ListAvatars/listAvatar02.png"},
    {key: 3, value: "Avatar 03", source: "../../assets/ListAvatars/listAvatar03.png"},
    {key: 4, value: "Avatar 04", source: "../../assets/ListAvatars/listAvatar04.png"},
    {key: 5, value: "Avatar 05", source: "../../assets/ListAvatars/listAvatar05.png"},
    {key: 6, value: "Avatar 06", source: "../../assets/ListAvatars/listAvatar06.png"},
    {key: 7, value: "Avatar 07", source: "../../assets/ListAvatars/listAvatar07.png"},
    {key: 8, value: "Avatar 08", source: "../../assets/ListAvatars/listAvatar08.png"},
    {key: 9, value: "Avatar 09", source: "../../assets/ListAvatars/listAvatar09.png"},
    {key: 10, value: "Avatar 10", source: "../../assets/ListAvatars/listAvatar10.png"},
];

export default function ParameterListAvatar_ModalAvatar({
    visible,
    unVisible,
}){
    const [isClickAvatar, setIsClickAvatar] = useState({});
    const [isSelectedAvatar, setIsSelectedAvatar] = useState({});
    const [avatarOfList, setAvatarOfList] = useState({});
    

    const dispatch = useDispatch();
    const list = useSelector((state) => state.list.value) 

    /**
     * Fonction qui permet de vérifier si le paramètre est vide
     * 
     * @param {*} variable 
     * @returns 
     */
    function isEmpty(variable){
        return variable === null || variable === undefined || variable === "" || variable.length === 0 || (Object.keys(variable) === 0 && variable.constructor === Object)
    }

    /**
     * Fonction qui récupére les valeurs de l'avatar clické
     * et envoie la valeurs de sa source dans le state isClickedAvatar
     * 
     * @param {{key: number, source: string, value: string }} element 
     */
    const handleClickAvatar = (element) => {
        setIsClickAvatar(element)
        console.log("Avatar clicked", element)
    }

    /**
     * Fonction qui permet de récupérer l'avatar de la list avant modification.
     * 
     */
    const handleCancelPress = () => {
        setIsClickAvatar("")
        console.log("click close modal avatar:", unVisible)
        console.log("is selected avatard", isSelectedAvatar)
        unVisible(false)
    };

    /**
     * Fonction qui enregistre l'avart clicked comme celui défini pour la list, 
     * enregistre sont état dans isSelectedAvatar, 
     * et l'envoie au reducer via l'état AvatarOfList dans dispach.
     * 
     */
    const handleSavePress = () => {
        setIsSelectedAvatar(isClickAvatar)
        setAvatarOfList(isClickAvatar)
        unVisible(false)
    };

    /**
     * Fonction qui envoie l'avatar au reducer list
     */
    dispatch(addAvatarList(avatarOfList))

    /**
     * Fonction qui pour chaque item (avatar) de la source de donnée (flatList),
     * renvoie l'item comme formaté dans cette fonction
     * 
     * @param {{key: number, source: string, value: string }} item 
     * @returns 
     */
    const renderItemListAvatar = ( { item }) => {
        return(
            //console.log("render:", item.name.toString()),
            <ListAvatarComponent
                label={item.value.toString()} 
                key={item.key.toString()}
                clickAvatar={(e) => handleClickAvatar(e)} 
                stylesButtonContainer={styles.linearGradient}
                stylesButton={
                    isClickAvatar.source === item.source 
                    ? styles.buttonAvatarActif
                    : styles.buttonAvatar
                }
                stylesAvatar={styles.avatar}
                source={item.source}
                stylesButtonLabel={styles.buttonAvatarLabel}
                stylesLinearGradient={
                    isClickAvatar.source === item.source 
                    ? styles.linearGradientActif
                    : styles.linearGradient
                }
                results={item}

            />
        );
    }

    return(
        <View >
            <Modal
                animationType="fade"
                transparent={false}
                visible={visible}
                onRequestClose={unVisible}
                presentationStyle="pageSheet"
            >
                <View  style={styles.modalContainer}>
                    <View style={styles.parameterAvatarHeader}>
                        <Image 
                            source={isSelectedAvatar}
                            style={styles.avatarSelected}
                        />
                        <View style={styles.avatarHeaderTextContainer}>
                            <Text style={styles.parameterAvatarTitle} >
                               { 
                                    !isEmpty(isClickAvatar) 
                                    ? isClickAvatar.value
                                    : "Choise your avatard" 
                               } 
                            </Text>
                            <Text 
                                style={
                                    isClickAvatar && isClickAvatar != ""
                                    ? ""
                                    : styles.parameterAvatarLegende
                                } 
                            >
                                { 
                                    isClickAvatar
                                    ? ""
                                    : "Select your preferred list avatar" 
                                } 
                            </Text>
                        </View>
                    </View>
                    <ParameterContainer 
                            name={"AVATARS"}
                    />
                    <View style={styles.flatlistAvatarContainer}>
                        <FlatList
                            data={userAvatars}
                            renderItem={renderItemListAvatar}
                            keyExtractor={(item) => item.key.toString()}
                            numColumns={2}
                        />
                    </View>
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
            </Modal>
       </View>
    )
}

const styles = StyleSheet.create({
    modalContainer:{
        //flex:1,
        height:"100%",
        justifyContent:"center",
        //alignItems:"center",
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor:"#000027",
        gap: 10,
        borderTopColor: "#7C4DFF",
        borderBottomColor: "#7C4DFF",
        borderWidth: 2,
    },
    avatarHeaderContainer:{
        flex:1,
        borderColor:"red",
        borderWidth: 2,
        gap: 5,
    },
    parameterAvatarHeader:{
        //flex:1,
        flexDirection: 'row',
        fontSize: 18,
        fontWeight:"bold",
        justifyContent: "space-around",
        alignItems:"center",
        marginTop:5,
        marginBottom:15,
        padding: 10,
        gap:15,
        //  borderColor:"red",
        //  borderWidth:2,
         
    },
    avatarHeaderTextContainer:{
        flex: 1,
        // borderColor:"yellow",
        // borderWidth:2,
    },
    parameterAvatarTitle:{
        color:"white",
        fontSize: 20,
    },
    parameterAvatarLegende:{
        color:"white",
        fontSize: 14,
    },
    flatlistAvatarContainer:{
        //flex:1,
       justifyContent:"space-between",
       alignItems:"center",
        gap:0,
         //borderColor:"green",
         //borderWidth:2,
    },


    buttonContainer:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems: "center",

        //borderColor:"yellow",
        //borderWidth:2,
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
    avatarSelected:{
        height:60,
        width: 60,
        backgroundColor: "white",
        borderRadius:50,
    },

    linearGradientActif:{
        borderRadius: 10,
        width: 170,
        height: 80,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 4,
        margin:5,
    },
    linearGradient:{
        borderRadius: 10,
        width: 170,
        height: 80,
        justifyContent: "flex-start",
        alignItems: "center",
        margin:5,
    },
    buttonAvatarActif:{
        borderRadius: 10,
        padding: 10,
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor:"#000027",
        gap:10,
    },
    buttonAvatar:{
        borderRadius: 10,
        borderColor: "white",
        borderWidth:3,
        padding: 10,
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor:"#000027",
        gap:10,
    },
    avatar:{
        height:45,
        width: 45,
        backgroundColor: "gray",
        borderRadius:50,

    },
    buttonAvatarLabel: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center",

    },
})
