import React from 'react';

import { View , Text ,  Image , StyleSheet , TouchableOpacity } from 'react-native';

const Movie = ({ titre, description , annee , popularite , plateformes, poster,  }) => {
    return (
        <TouchableOpacity>
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: `https://image.tmdb.org/t/p/w500/${poster}` }} />
            <View style={styles.textContainer}>
          <Text style={styles.title}>{titre}</Text>
          <Text style={styles.overview}>{description} </Text>
          <Text style={styles.voteAverage}>Popularité: {popularite}</Text>
          <Text style={styles.releaseDate}>Année: {annee}</Text>
          <Text style={styles.platforms}>Plateformes: {Array.isArray(plateformes) ? plateformes.map(p => p.nom).join(', ') : 'Aucune plateforme disponible'}</Text>
        </View>
        </View>
        </TouchableOpacity>
    )
}   

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        width: 100,
        height: 150,
        borderRadius: 5,
    },
    textContainer: {
        marginLeft: 10,
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    overview: {
        fontSize: 16,
    },
    voteAverage: {
        fontSize: 14,
    },
    releaseDate: {
        fontSize: 14,
    },
});

export default Movie;