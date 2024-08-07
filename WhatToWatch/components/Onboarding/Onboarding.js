import React from 'react';
import { Text, View , StyleSheet, FlatList, Image } from 'react-native';


import OnboardingItems from './OnboardingItems';

const slides = [
    {
        id: '1',
        title: ' Welcome to What To Watch ',
        description: 'Stay informed about the latest releases of movies or series on your favorite platforms (Netflix, Disney+, OCS, etc.). Plan your next movie night alone or with a group!',
        image: ''
    },
    {
        id: '2',
        title: ' Welcome to What To Watch ',
        description: 'Not sure what to watch on your next date? Create a list of your favorite movie genres, like films or series, and share everything with the group! A match? Perfect, your movie night is planned!',
        image: ''
    }];

export default function OnBoarding() {
    return (
        <View style={styles.container}>
            
            < FlatList data ={slides}
            renderItem = {({item}) => <OnboardingItems item={item} />}
            horizontal
            showsHorizontalScrollIndicator
            pagingEnabled
            bounces={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
       
    },  
});