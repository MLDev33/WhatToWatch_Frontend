import { StyleSheet, View, Text, Image} from "react-native";
import { useState, useEffect} from "react";
import chevron_navigate_right from "../../assets/Icons/chevron_navigate_right.png";
import chevron_navigate_left from "../../assets/Icons/chevron_navigate_down.png";
import { useDispatch } from 'react-redux';
import CheckBox from 'react-native-check-box';
import { addGenres, addTypes } from '../../reducers/list.js';
import ParameterContainer from "../Parameters/ParameterContainer.js";
import ParameterListTypes_CheckBoxeTypes from "./ParameterListTypes_CheckBoxeTypes.js";

//-----POUR RECUPERER L'URL DE L'API EN FONCTION DE L'ENVIRONNEMENT DE TRAVAIL---//
const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
// Utiliser une condition pour basculer entre les URLs
//const baseUrl = vercelUrl; // POUR UTILISER AVEC VERCEL
const baseUrl = localUrl; // POUR UTILISER EN LOCAL

/**
 * Types de média possible sur l'API TMDB Movie ou TV
 */
const categorieData = ["Movie", "TV"];

export default function ParameterListTypes({refresTypeOfList}){

    /**
     * Fonction qui renvoie le nom du type clicked "Movie" "TV",
     * et transmet l'information en props au state du composant parents
     * pour pouvoir conditionner les genres à afficher selon le ou les types clicked
     * 
     * @param {string} type 
     */
    const onClickCheckBox = (type) => {
        refresTypeOfList(type)
    }

    /**
     * Création d'un checkBox pour chaque type
     */
    const categories = categorieData.map( (element) => {
        return <ParameterListTypes_CheckBoxeTypes 
                    label={element} 
                    onClickCheckBox={ (e) => onClickCheckBox(e)}
                />
    })

    return(
        <ParameterContainer 
            name={"CATEGORIES"}
            image={chevron_navigate_right}
            onPressIcon={() => alert("Mettre un fonction ici !")}
            styleParameterContenuContainer={styles.parameterContenuContainer}
            contenu={
                <View style={styles.checkboxexContainer}>
                    {categories}
                </View>
                
            }
        />
    );
};

const styles = StyleSheet.create({
    parameterContenuContainer:{
        flexDirection: "row",
        justifyContent:"space-around",
        paddingTop: 5,
        paddingBottom: 5,
        
    },
    parameterContenuContainerColumn:{
        flexDirection: "column",
        //height:"100%",
        gap:2,
    },

    checkboxexContainer:{
        flex: 1,
        flexDirection: "row",
        justifyContent:"center",
        rowGap: 50,
        paddingLeft: 48,
        paddingRight: 48,
        paddingTop: 5,
        paddingBottom: 5,
        alignItems:"center",
        height: 40,
        borderRadius: 10,
        gap:50,
        // borderColor:"white",
        // borderWidth:"1",
        
    },
    textRequiere:{
        color:"red",
    },

});