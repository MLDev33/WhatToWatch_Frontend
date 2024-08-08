import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Movie = ({
    poster,
    onPress
}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: `https://image.tmdb.org/t/p/w500/${poster}` }} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        width: 100,
        height: 150,
    },
    textContainer: {
        flex: 1,
        paddingLeft: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    overview: {
        fontSize: 14,
        color: '#666',
    },
    releaseDate: {
        fontSize: 12,
        color: '#999',
    },
    voteAverage: {
        fontSize: 12,
        color: '#999',
    },
    platforms: {
        fontSize: 12,
        color: '#999',
    },
});

export default Movie;