import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const SearchResults = ({ results, onItemPress }) => {
  const renderItem = ({ item }) => (
    console.log(item),
    <TouchableOpacity style={styles.itemContainer} onPress={() => onItemPress(item)}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster}` }} style={styles.poster} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.titre}</Text>
        <Text style={styles.overview}>{item.description.length > 100 ? item.description.substring(0, 100) + '...' : item.description} </Text>
        <Text style={styles.platforms}>Available on: 
        {Array.isArray(item.plateformes) ? item.plateformes.map(p => p.nom).join(', ') : 'N/A'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={results}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  poster: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  overview: {
    fontSize: 14,
    color: '#666',
  },
  platforms: {
    fontSize: 12,
    color: '#888',
  },
});

export default SearchResults;