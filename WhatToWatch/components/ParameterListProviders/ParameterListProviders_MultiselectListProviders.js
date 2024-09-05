import { 
    TextInput,
    View,
    StyleSheet,
    Text,
 } from "react-native";
 import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { useDispatch, } from "react-redux";
import { useEffect, useState} from "react";
import { addProviders } from "../../reducers/list.js";
import { element } from "prop-types";


const data = [
    {"key": 2, "value": "Apple TV"}, 
    {"key": 8, "value": "Netflix"}, 
    {"key": 9, "value": "Amazon Prime Video"}, 
    {"key": 11, "value": "MUBI", "disabled": false}, 
]

 export default function ParameterListProviders_MultiselectListProviders(){
    const [fetchPoviders, setFetchProvider] = useState([])
    const [providersOfList, setProvidersOfList] = useState([])

    const dispatch = useDispatch();

    const fetchMovieproviders = async () => {
        const response = await fetch(`${baseUrl}providers/get/movie`);
        const data = await response.json();
        //console.log("Genres movie existante:", data.results.genres)
        setGenresMovieFetch(data.results.genres);
}

    useEffect(() => {
        dispatch(addProviders(providersOfList))
    },[providersOfList])

    return(
        <MultipleSelectList 
            setSelected={setProvidersOfList}
            data={data}
            label=""
            onSelect={()=> console.log("Streaming choices", providersOfList)}
            save="key"
            searchPlaceholder="Search"
            fontFamily="Roboto"
            notFoundText='No found'
            labelStyles={{color:"white"}} // style nom catégorie
            badgeStyles={{backgroundColor: "green"}}
            badgeTextStyles={{color:"white"}}
            checkBoxStyles={{backgroundColor:"#7C4DFF", borderWidth: 2, height:24, width:24,}}
            disabledCheckBoxStyles={{backgroundColor:"black"}}
            boxStyles={{backgroundColor: "#7876A0"}}
            inputStyles={{backgroundColor: "#7876A0", fontSize:16}}
            disabledItemStyles={{backgroundColor:"grey"}}
            dropdownStyles={{backgroundColor: "#7876A0"}}
            dropdownTextStyles={{color:"white", fontSize: 16,}}
            dropdownItemStyles={{marginHorizontal: 10}}
            placeholder="Select providers"
            maxHeight={300}
        />
    );
 };

 const styles = StyleSheet.create({
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
    }
 });