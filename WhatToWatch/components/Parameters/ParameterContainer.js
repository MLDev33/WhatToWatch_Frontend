import { 
    StyleSheet, 
    View, 
    Text, 
    Image, 
    TouchableOpacity } from "react-native";
import { useState, useEffect} from "react";
import chevron_navigate_right from "../../assets/Icons/chevron_navigate_right.png";
import chevron_navigate_left from "../../assets/Icons/chevron_navigate_down.png";

export default function ParameterContainer(props){

    return(
        <View style={styles.parameterContainer}>
            <View style={styles.parameterTitleContainer}>
                <Text style={styles.parameterTitleText} >{props.name}</Text>
                    <TouchableOpacity onPress={props.onPressIcon}>
                        <Image source={props.image} visible={props.accessible} />
                    </TouchableOpacity>
            </View>
            <View style={props.styleParameterContenuContainer}>
                {props.contenu}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    parameterContainer: {
        paddingTop: 5,
        paddingBottom: 5,
    },
    parameterTitleContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: "#7C4DFF",
        borderWidth: 2,
        paddingTop: 5,
        paddingBottom: 5,
    },
    parameterTitleText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "bold",
    },
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