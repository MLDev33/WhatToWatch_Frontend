import { 
    StyleSheet, 
    View, 
    Text, 
    Image, 
    TextInput 
} from "react-native";
import { useState, useEffect} from "react";
import chevron_navigate_right from "../../assets/Icons/chevron_navigate_right.png";
import chevron_navigate_left from "../../assets/Icons/chevron_navigate_down.png";
import ParameterContainer from "../Parameters/ParameterContainer.js";
import ParameterListProviders_MultiselectListProviders from "./ParameterListProviders_MultiselectListProviders.js";

export default function ParameterListProviders(){

    return(
        <ParameterContainer
            name={"STREAMING PLATFORMS"}
            image={arrow_navigate_right}
            onPressIcon={() => alert("Mettre un fonction ici !")}
            styleParameterContenuContainer={styles.parameterContenuContainer}
            contenu={
                <ParameterListProviders_MultiselectListProviders

                />
            }
        />
    );
};

const styles = StyleSheet.create({
    parameterContenuContainer:{
        flex:1,
        paddingTop: 5,
        paddingBottom: 5,
        //flexDirection: "row",
        //justifyContent:"space-around",
        //alignItems:"center",
    },
});