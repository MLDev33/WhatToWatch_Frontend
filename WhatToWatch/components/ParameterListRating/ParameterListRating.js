import { 
    StyleSheet, 
    View, 
    Text, 
    Image, 
} from "react-native";
import { useState, useEffect} from "react";
import chevron_navigate_right from "../../assets/Icons/chevron_navigate_right.png";
import chevron_navigate_left from "../../assets/Icons/chevron_navigate_down.png";
import ParameterContainer from "../Parameters/ParameterContainer.js";
import ParametersListRating_StarsRating from "./ParametersListRating_StarsRating.js";


export default function ParameterListRating(){


    return(
        <ParameterContainer 
            name={"MINIMUM RATING"}
            image={arrow_navigate_right}
            nPressIcon={() => alert("Mettre un fonction ici !")}
            styleParameterContenuContainer={styles.parameterContenuContainer}
            contenu={
                <View>
                    <ParametersListRating_StarsRating />
                </View>
            }
        />
    );
};

const styles = StyleSheet.create({
    parameterContenuContainer:{
        // flex:1,
        // flexDirection: "row",
        // justifyContent:"space-around",
        paddingTop: 5,
        paddingBottom: 5,
        // alignItems:"center",

    },

});