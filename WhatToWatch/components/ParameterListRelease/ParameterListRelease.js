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
import ParameterListRelease_Slider from "./ParameterListRelease_Slider.js";

export default function ParameterListRelease(){

    return(
        <ParameterContainer
            name={"RELEASE"}
            image={chevron_navigate_right}
            onPressIcon={() => alert("Mettre un fonction ici !")}
            styleParameterContenuContainer={styles.parameterContenuContainer}
            contenu={
                <ParameterListRelease_Slider

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