import React from 'react';

import { View , Text ,  Image , StyleSheet , TouchableOpacity  } from 'react-native';

const Movie = ({ poster}) => {
    return (
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: `https://image.tmdb.org/t/p/w500/${poster}` }} />
            </View>
    );
};

const styles = StyleSheet.create({

container: {
    padding: 10,
    alignItems: 'center',
},
image: {
    width: 100,
    height: 150,
    borderRadius: 5,
},
textContainer: {
    marginLeft: 10,
    flex: 1,
    alignItems: 'flex-end',
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
platforms: {
    fontSize: 14,
},
});

export default Movie;