import { 
    Text, 
    View , 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
} from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AirbnbRating } from 'react-native-ratings';
import { addRating } from '../../reducers/list';

export default function ParametersListRating_StarsRating(){

    //Le minimum rating est la note moyen minimum des media que l'utilisateur veux dans sa liste
    const [ratingOfList, setRatingOfList] =useState(0)

    const dispatch = useDispatch();

    const handleRatingComplete = (ratingValue) => {
        setRatingOfList(ratingValue);
        dispatch(addRating(ratingValue))
    }

    return(
        <View style={styles.ratingContainer}>
            <AirbnbRating 
                count={10}
                defaultRating={0}
                showRating={false}
                selectedColor='yellow'
                size={20} 
                onFinishRating={handleRatingComplete}
            />
            <View>
                <Text style={styles.rating}>
                    {ratingOfList}/10
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ratingContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginTop: 10,
    },
    rating:{
        color:"white",
        fontSize:16,
        textAlign:"bottom",
    }
})