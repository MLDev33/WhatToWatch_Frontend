import { 
    StyleSheet, 
    View, 
    Text, 
    Image, 
    TextInput 
} from "react-native";
import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import chevron_navigate_right from "../../assets/Icons/chevron_navigate_right.png";
import chevron_navigate_left from "../../assets/Icons/chevron_navigate_down.png";
import ParameterContainer from "../Parameters/ParameterContainer.js";
import ParameterListName_TextInputName from "./ParameterListName_TextInputName.js";

export default function ParameterListName({saveName}){

    const dispatch = useDispatch();
 

    return(
        <ParameterContainer
            name={"NAME"}
            image={arrow_navigate_right}
            //imageaccessible={true} à paramètrer
            onPressIcon={() => alert("Mettre un fonction ici !")}
            styleParameterContenuContainer={styles.parameterContenuContainer}
            contenu={
                <ParameterListName_TextInputName 
                
                />
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
        alignItems:"center",
    },
});