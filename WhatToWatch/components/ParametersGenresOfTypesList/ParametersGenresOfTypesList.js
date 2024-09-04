import { 
    StyleSheet, 
    View, 
 } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import ParameterListTypes from "../ParameterListTypes/ParameterListTypes.js";
import ParameterListGenres from "../ParameterListGenres/ParameterListGenres.js";
import { useFocusEffect } from "@react-navigation/native";
import { addGenres, addTypes } from '../../reducers/list.js';


export default function ParametersGenresOfTypesList({}){
    //Le type de media movie ou tv est ajouté au state en fonction des checkBoxes
    // Exemples d'états: ["Movie"] ou ["TV"] ou ["Movie", "TV"]
    const [typesOfList, setTypesOfList] = useState([]);

    const dispatch= useDispatch();

    // au click d'une checkBox le type de la checkBox est ajouté ou supprimé des types de la liste
    const onClickCheckBox = (element) => {
        if(typesOfList.includes(element)){
            //Si le type clické est déjà dans la liste il est supprimé
            const newTypes = typesOfList.filter((type) => type != element);
            setTypesOfList(newTypes)

        }
        else{
            // Si le type clické n'est pas dans la liste il est ajouté
            const newTypes = [...typesOfList, element]
            setTypesOfList(newTypes)
        }
    };

    // Mise à jour de la list des type dans le reducer
    // le state de la liste des types va conditionner la liste des genres de media
    // à afficher
    dispatch(addTypes(typesOfList))

    // Mise à jour des types de la list à chaque changement du state typeOfList
    // useEffect(() => {
    //     dispatch(addTypes(typesOfList))
    //     console.log("Mise à jour de typeOfList:", typesOfList)
    // },[typesOfList])

    useFocusEffect(
        useCallback(() => {
            dispatch(addTypes(typesOfList))
            console.log("Mise à jour de type of list", typesOfList)
        }, [typesOfList])
    );

    console.log(typesOfList)
    return(
        <>
            <ParameterListTypes 
                refresTypeOfList={onClickCheckBox}
            />
            <ParameterListGenres 
                typesOfList={typesOfList}
            />
        </>
    )

}


const styles = StyleSheet.create({
    parameterContenuContainer:{
        flexDirection: "row",
        justifyContent:"space-around",
        paddingTop: 5,
        paddingBottom: 5,
        
    },
});