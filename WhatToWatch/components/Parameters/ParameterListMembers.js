import { 
    StyleSheet, 
    View, 
    Text, 
    Image, 
} from "react-native";
import { useState, useEffect} from "react";
import chevron_navigate_right from "../../assets/Icons/chevron_navigate_right.png";
import chevron_navigate_left from "../../assets/Icons/chevron_navigate_down.png";
import ParameterContainer from "./ParameterContainer.js";

export default function ParameterListMembers(){


    return(
        <ParameterContainer 
            name={"MEMBERS"}
            image={arrow_navigate_right}
            // onPressIcon={handleArrowNamePress}
            styleParameterContenuContainer={styles.parameterContenuContainer}
            contenu={
                <View></View>
            }
        />
    );
};

const styles = StyleSheet.create({
    parameterContenuContainer:{
        flexDirection: "row",
        flexDirection: "row",
        justifyContent:"space-around",
        paddingTop: 5,
        paddingBottom: 5,
        alignItems:"center",
    },
    TextInput:{
        flex:1,
        borderRadius : 5,
        borderColor:"grey",
        backgroundColor:"#7876A0",
        height:40,
        width: 360,
        marginTop: 5,
        textAlign: "left",
        paddingLeft: 5,
    },
});