import { 
    StyleSheet, 
 } from "react-native";
import { useState, } from "react";
import {useSelector }from 'react-redux';
import chevron_navigate_right from "../../assets/Icons/chevron_navigate_right.png";
import ParameterContainer from "../Parameters/ParameterContainer.js";
import ParameterListAvatar_ModalAvatar from "./ParameterListAvatar_ModalAvatar.js";

//-----POUR RECUPERER L'URL DE L'API EN FONCTION DE L'ENVIRONNEMENT DE TRAVAIL---//
const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
// Utiliser une condition pour basculer entre les URLs
//const baseUrl = vercelUrl; // POUR UTILISER AVEC VERCEL
const baseUrl = localUrl; // POUR UTILISER EN LOCAL


export default function ParameterListAvatar({}){

    const list = useSelector((state) => state.list.value) 

    /**
     * state de type booléen qui permet de rendre visiblle ou non 
     * la modal dans laquelle sont affichées les avatars pour la list
     * 
     */ 
    const [isModalAvatarVisible, setIsModalAvatarVisible] = useState(false);

    /**
     * Fonction qui permet d'afficher la modal qui contient les avatars
     * au click sur l'icon chevron_navigate_right
     * 
     * @returns {boolean} state of isModalAvatarVisible
     */
    const onPressIcon = async() => {
        setIsModalAvatarVisible(true)
        console.log("avatar",list.avatar)
    }

     /**
     * Fonction qui permet de fermer la modal qui contient les avatars
     * 
     * @returns {boolean} state of isModalAvatarVisible
     */
    const onClose = () => {
        setIsModalAvatarVisible(false)
    }

    
    return(
        <ParameterContainer 
            name={"AVATAR"}
            image={chevron_navigate_right}
            onPressIcon={onPressIcon}
            styleParameterContenuContainer={styles.parameterContenuContainer}
            contenu={
                <ParameterListAvatar_ModalAvatar
                    visible={isModalAvatarVisible}
                    unVisible={onClose}
                />
            }
        />
    );
}

const styles = StyleSheet.create({
    parameterContenuContainer:{
        flexDirection: "row",
        flexDirection: "row",
        justifyContent:"space-around",
        paddingTop: 5,
        paddingBottom: 5,
        alignItems:"center",
    },

    parameterContenuContainerColumn:{
        flexDirection: "column",
        gap:2,
    },
});