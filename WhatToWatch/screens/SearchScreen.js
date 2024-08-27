import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import SearchResults from '../components/Movie/SearchResults';
import MovieModal from '../components/Movie/MovieModal';
import { SafeAreaView } from 'react-native-safe-area-context';

function SearchScreen() {
  const route = useRoute();
  const initialQuery = route.params?.query || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [shouldSearch, setShouldSearch] = useState(true); // Nouvel état

  const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
  const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
  const baseUrl = localUrl;

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

  useEffect(() => {
    if (initialQuery !== searchQuery) {
      setSearchQuery(initialQuery);
      setSearchResults([]);
      setShouldSearch(true); // Déclencher la recherche après la mise à jour de initialQuery
    }
  }, [initialQuery]);

  useEffect(() => {
    if (shouldSearch) {
      handleSearch();
      setShouldSearch(false); // Réinitialiser l'état après la recherche
    }
  }, [shouldSearch]);

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
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher un film, une série ou un genre"
        placeholderTextColor="white" 
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Rechercher" onPress={() => setShouldSearch(true)} />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0f2b',
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
    color: 'white', // Assurez-vous que le texte est blanc
  },
  list: {
    width: '100%',
  },
});

export default SearchScreen;