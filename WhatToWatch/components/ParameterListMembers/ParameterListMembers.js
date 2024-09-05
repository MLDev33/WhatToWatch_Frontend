import { 
    StyleSheet, 
 } from "react-native";
import { useState, useEffect, useCallback} from "react";
import { useSelector } from "react-redux";
import chevron_navigate_right from "../../assets/Icons/chevron_navigate_right.png";
import ParameterContainer from "../Parameters/ParameterContainer.js";
import ParameterListMembers_ModalMembers from "./ParameterListMembers_ModalMembers.js";

//-----POUR RECUPERER L'URL DE L'API EN FONCTION DE L'ENVIRONNEMENT DE TRAVAIL---//
const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
// Utiliser une condition pour basculer entre les URLs
//const baseUrl = vercelUrl; // POUR UTILISER AVEC VERCEL
const baseUrl = localUrl; // POUR UTILISER EN LOCAL


export default function ParameterListMembers(){
    const [isModalMembersVisible, setIsModalMembersVisible] = useState(false);

    const onPressIcon = async() => {
        // éléments à intégrer

        setIsModalMembersVisible(true)
    }

    const onClose = () => {
        setIsModalMembersVisible(false)
    }

    return(
        <ParameterContainer 
            name={"MEMBERS"}
            image={chevron_navigate_right}
            onPressIcon={onPressIcon}
            styleParameterContenuContainer={styles.parameterContenuContainer}
            contenu={
                <ParameterListMembers_ModalMembers
                    visible={isModalMembersVisible}
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