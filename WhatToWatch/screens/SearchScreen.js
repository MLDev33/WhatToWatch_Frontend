import React, { useState, useEffect , useCallback } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList , Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import SearchResults from '../components/Movie/SearchResults';
import MovieModal from '../components/Movie/MovieModal';
import { useSelector } from 'react-redux';

function SearchScreen() {
  const route = useRoute();
  const initialQuery = route.params?.query || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [shouldSearch, setShouldSearch] = useState(true); // Nouvel état
  const [yourLikes, setYourLikes] = useState([]); // Nouvel état pour les likes dans le composant searchResults
  const [likeConfirmation, setLikeConfirmation] = useState('');
  const [likedMovieTitle, setLikedMovieTitle] = useState('');
  const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
  const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
  const baseUrl = localUrl;

  const usertoken = useSelector((state) => state.user.value.token);


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


  //------------------------------------------//
  //on transforme les elements de TDMB en elements de notre base de données pour l'envoyer ensuite
  const transformMovie = useCallback((movie) => ({
    tmdbId: movie.id,
    mediaType: movie.type,
    title: movie.titre,
    poster: movie.poster,
    genre: movie.genre,
    description: movie.description,
    release_date: movie.annee,
    popularity: movie.popularite,
    vote_count: movie.vote,
    providers: movie.plateformes.map((p) => ({
      providerId: p.id,
      providerName: p.nom,
      logoPath: p.logo,
    })),
  }), []);

  const handleLike = useCallback(async (movie) => {
    try {
      const response = await fetch(`${baseUrl}movies/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userToken: usertoken,
          mediaDetails: transformMovie(movie),
          listToken: "<list-token>",
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        setYourLikes((prevLikes) => [...prevLikes, movie]);
        setLikedMovieTitle(movie.titre); // Mettre à jour le titre du film aimé
        setLikeConfirmation(`"${movie.titre}" ajouté aux favoris !`); // Afficher le message de confirmation
        setModalVisible(false); // Fermer la modal
        //test pour faire disparaitre le message de confirmation après 5 secondes
        setTimeout(() => {
          setLikeConfirmation('');
          setLikedMovieTitle('');
        }, 5000);
      } else {
        alert(`Erreur: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue lors de l'ajout aux favoris.");
    }
  }, []);

  const renderItem = ({ item }) => (
    <SearchResults results={[item]} onItemPress={handleItemPress} />
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a movie , serie , or genre"
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
        showUndoButton={false}
        showDislikeButton={false}
        onLike={handleLike}
      />
       {likeConfirmation ? (
      <View style={styles.confirmationContainer}>
        <Text style={styles.confirmationText}>{likeConfirmation}</Text>
      </View>
    ) : null}
    </View>
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
    color: 'white', 
  },
  list: {
    width: '100%',
  },
  confirmationContainer: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  confirmationText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SearchScreen;