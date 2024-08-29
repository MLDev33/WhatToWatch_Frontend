import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Movie = ({ poster, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{ uri: `https://image.tmdb.org/t/p/w500/${poster}` }}
                    resizeMode="contain" //"contain" pour s'assurer que l'image n'est pas rognée
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
container: {
    flexDirection: 'row',
    padding: 10,
    flex: 1,
  },
  image: {
    aspectRatio: 2 / 3,
    width: '100%', 
    height: undefined, 
    flex: 1,
},
});

export default Movie;