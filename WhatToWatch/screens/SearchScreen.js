import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import SearchResults from '../components/Movie/SearchResults';
import MovieModal from '../components/Movie/MovieModal';


function SearchScreen() {
  //test pour recupere le query depis le homescreen

  const route = useRoute();
  const initialQuery = route.params?.query || '';


  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  //-----POUR RECUPERER L'URL DE L'API EN FONCTION DE L'ENVIRONNEMENT DE TRAVAIL---//
  const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
  const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;

  // Utiliser une condition pour basculer entre les URLs
  //const baseUrl = vercelUrl; // POUR UTILISER AVEC VERCEL
  const baseUrl = localUrl; // POUR UTILISER EN LOCAL


  const handleSearch = async () => {
    try {
      const response = await fetch(`${baseUrl}movies/search?query=${searchQuery}`);
      const data = await response.json();
      console.log('Données reçues:', data);
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Une erreur est survenue:', error);
    }
  };
  // Reset search results when initial query changes
  // il est sans doute possible de faire tout en use effect mais je n'ai pas reussi
  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
      setIsResetting(true);
      setSearchResults([]); // Réinitialiser les résultats
    } else {
      setSearchResults([]); // Réinitialiser les résultats si pas de query
    }
  }, [initialQuery]);
  // Re-run search when query changes
  useEffect(() => {
    if (isResetting && searchResults.length === 0) {
      setIsResetting(false);
      handleSearch();
    }
  }, [searchResults, isResetting]);

  const handleItemPress = (movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedMovie(null);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <SearchResults results={[item]} onItemPress={handleItemPress} />
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher un film, une série ou un genre"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Rechercher" onPress={handleSearch} />
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
      <MovieModal
        visible={modalVisible}
        movie={selectedMovie}
        onClose={handleModalClose}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 30,
    paddingHorizontal: 10,
  },
  list: {
    width: '100%',
  },
});

export default SearchScreen;