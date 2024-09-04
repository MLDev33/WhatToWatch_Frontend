import { View, Text, AppRegistry, StyleSheet,  } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Slider } from '@miblanchard/react-native-slider';
import { addReleaseDateGte } from '../../reducers/list.js';

export default function ParameterListRelease_Slider() {

    const [releaseOfList, setReleaseOfList] = useState(1970);
    const [sliding, setSliding] = useState('Inactive')

    const dispatch = useDispatch();

    /**
     * Fonction qui renvoie la valeur du slider en fonction de la saisie de l'utilisateur
     * et qui envoie cette valeur la list au reducer list
     * 
     * @param {string} value 
     */
        const handledOnchangeSlderValue = (value) => {
            setReleaseOfList(value);
            dispatch(addReleaseDateGte(value.toString()))
        }

        return (
            <View style={styles.sliderContainer}>
                <Text style={styles.sliderText}>Year : {releaseOfList}</Text>
                <Slider
                    value={releaseOfList}
                    onValueChange={value => handledOnchangeSlderValue(value)}
                    style={{width: 200, height: 40}}
                    minimumValue={1970}
                    maximumValue={new Date().getFullYear()}
                    minimumTrackTintColor="#7876A0"
                    maximumTrackTintColor='#FFF'
                    thumbTintColor='#7876A0'
                    step={1}
                />
            </View>
        );

}

const styles = StyleSheet.create({
    parameterContenuContainer: {
        flex: 1,
        paddingTop: 5,
        paddingBottom: 5,

    },
    sliderContainer:{
        paddingHorizontal:30,
    },
    sliderText:{
        marginTop:10,
        color:"white",
        fontSize:16,
    }
});