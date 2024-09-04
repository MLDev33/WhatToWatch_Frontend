import { 
    TextInput,
    StyleSheet,
 } from "react-native";
import { useDispatch, } from "react-redux";
import { useState, useCallback} from "react";
import { useFocusEffect } from "@react-navigation/native";
import { addNameList } from "../../reducers/list.js";

 export default function ParameterListName_TextInputName(){
    
    const [nameOfList, setNameOfList] = useState('');

    const dispatch = useDispatch();

    /**
     * Fonction qui renvoie la valeur de l'input en fonction de la saisie de l'utilisateur
     * et qui qui envoie le nom de la list au reducer list
     * 
     * @param {string} value 
     */
    const handledOnchangeInputText = (value) => {
        setNameOfList(value);
    }

    useFocusEffect(
        useCallback(() => {
            dispatch(addNameList(nameOfList))
            console.log("Name of list", nameOfList)
        }, [nameOfList])
    );

    return(
        <TextInput 
            style={styles.TextInput} 
            placeholder="Your list name"
            placeholderTextColor={"black"}
            value={nameOfList}
            onChangeText={(value)=> handledOnchangeInputText(value)} 
        />
    );
 };

 const styles = StyleSheet.create({
    TextInput:{
        flex:1,
        borderRadius : 5,
        borderColor:"grey",
        backgroundColor:"#7876A0",
        height:50,
        width: 360,
        marginTop: 5,
        textAlign: "left",
        paddingLeft: 20,
        fontSize:16,
    }
 });