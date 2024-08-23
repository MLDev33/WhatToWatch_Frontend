import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const SearchResults = ({ results, onItemPress }) => {
  const renderItem = ({ item }) => {
    // Log the item to check its structure
    console.log(item);

    // Extract platforms
    const platforms = Array.isArray(item.plateformes) ? item.plateformes : [];
    const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => onItemPress(item)}>
        <Image source={{ uri: item.poster ? `${TMDB_IMAGE_BASE_URL}${item.poster}` : null }} style={styles.poster} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.titre || 'Titre non disponible'}</Text>
          <Text style={styles.overview}>
            {item.description ? (item.description.length > 100 ? item.description.substring(0, 100) + '...' : item.description) : 'Description non disponible'}
          </Text>
          <View style={styles.platformsContainer}>
            <Text style={styles.platformsLabel}>Available on:</Text>
            {platforms.length > 0 ? (
              platforms.map((p, index) => (
                <View key={index} style={styles.platformContainer}>
                  <Image source={{ uri: p.logo ? `${TMDB_IMAGE_BASE_URL}${p.logo}` : null }} style={styles.platformLogo} />
                  <Text style={styles.platformName}>{p.nom || 'Nom non disponible'}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.platforms}>N/A</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={results}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
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
    backgroundColor: '#ccc', // Placeholder color if no image
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Assurez-vous que le texte est blanc
  },
  overview: {
    fontSize: 14,
    color: '#666',
  },
  platformsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 5,
  },
  platformsLabel: {
    fontSize: 12,
    color: '#888',
    marginRight: 5,
  },
  platformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  platformLogo: {
    width: 20,
    height: 20,
    marginRight: 5,
    backgroundColor: '#ccc', // Placeholder color if no image
  },
  platformName: {
    fontSize: 12,
    color: '#888',
  },
  platforms: {
    fontSize: 12,
    color: '#888',
  },
});

export default SearchResults;