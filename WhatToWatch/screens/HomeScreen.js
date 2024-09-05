// HomeScreen.js

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { GestureHandlerRootView, State } from 'react-native-gesture-handler';
import Movie from '../components/Movie/Movie';
import MovieModal from '../components/Movie/MovieModal';
import { useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import GradientButton from '../components/GradientButton';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
const MovieTrendings = React.memo(({ movies, openModal }) => (
  <ScrollView 
    horizontal 
    style={styles.scrollContainer}
    showsHorizontalScrollIndicator={false}
  >
    {movies.map((item, index) => (
      <Movie
        key={index}
        poster={item.poster}
        onPress={() => openModal(index)}
      />
    ))}
  </ScrollView>
));

export default function HomeScreen() {
  const [movies, setMovies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lastAction, setLastAction] = useState(null);
  const [lastMedia, setLastMedia] = useState(null);
  const [canUndo, setCanUndo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [yourLikes, setYourLikes] = useState([]);
  const [loadingLikes, setLoadingLikes] = useState(true);
  const [isLiking, setIsLiking] = useState(false);
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.value);
  let username = user.username;
  let usertoken = user.token;
  let userAvatar = user.avatar;
  
  const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
  const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
  const baseUrl = vercelUrl;

  const fetchFavouritePlatforms = useCallback(async (usertoken) => {
    try {
      const response = await fetch(`${baseUrl}users/favouritePlatforms/${usertoken}`);
      if (!response.ok) {
        throw new Error('Failed to fetch favourite platforms: ' + response.status);
      }
      const data = await response.json();
      if (!data.result) {
        throw new Error(data.error || 'Failed to fetch favourite platforms');
      }
      return data.favouritePlatforms || [];
    } catch (error) {
      console.error("Erreur lors de la récupération des plateformes favorites : ", error);
      return [];
    }
  }, [baseUrl]);

  const fetchTrendings = useCallback(async (usertoken) => {
    try {
      const favouritePlatforms = await fetchFavouritePlatforms(usertoken);
      const plateformesParam = encodeURIComponent(JSON.stringify(favouritePlatforms));
      const url = `${baseUrl}movies/trendings?plateformes=${plateformesParam}&region=FR&limite=100`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Something went wrong: ' + response.status);
      }
      const data = await response.json();
      setMovies(data.result.contenu);
    } catch (error) {
      console.error("Erreur : ", error);
    } finally {
      setLoading(false);
    }
  }, [baseUrl, fetchFavouritePlatforms]);

  const fetchUserLikes = useCallback(() => {
    fetch(`${baseUrl}movies/user-likes?userToken=${usertoken}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          if (Array.isArray(data.likedMedia)) {
            setYourLikes(data.likedMedia);
          } else {
            console.error("likedMedia is not an array");
          }
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => console.error("Fetch error:", error))
      .finally(() => setLoadingLikes(false));
  }, [baseUrl, usertoken]);

  useEffect(() => {
    if (movies.length === 0) {
      fetchTrendings(usertoken);
    }
  }, [usertoken, fetchTrendings]);

  useFocusEffect(
    useCallback(() => {
      fetchUserLikes();
    }, [fetchUserLikes])
  );

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
    if (isLiking) return;
    setIsLiking(true);
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
        setYourLikes([...yourLikes, transformMovie(movie)]);
        setLastAction('like');
        setLastMedia(movie);
        setCanUndo(true);
        const updatedMovies = movies.filter((m) => m.id !== movie.id);
        setMovies(updatedMovies);
        if (selectedIndex < updatedMovies.length - 1) {
          setSelectedIndex(selectedIndex + 1);
          setSelectedMovie(updatedMovies[selectedIndex + 1]);
        } else {
          closeModal();
        }
      } else {
        alert(`Erreur: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue lors de l'ajout aux favoris.");
    } finally {
      setIsLiking(false);
    }
  }, [baseUrl, isLiking, movies, selectedIndex, transformMovie, usertoken, yourLikes]);

  const removeLike = useCallback(async (movie) => {
    try {
      const response = await fetch(`${baseUrl}movies/unlike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userToken: usertoken,
          tmdbId: movie.id,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        console.error("Erreur lors de la suppression du like:", data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du like:", error);
    }
  }, [baseUrl, usertoken]);

  const handleDislike = useCallback(async (movie) => {
    const isLiked = yourLikes.some((likedMovie) => likedMovie.tmdbId === movie.id);

    if (isLiked) {
      try {
        await removeLike(movie);
        setYourLikes(yourLikes.filter((likedMovie) => likedMovie.tmdbId !== movie.id));
      } catch (error) {
        console.error("Erreur lors de la suppression du like:", error);
      }
    }

    const updatedMovies = movies.filter((m) => m.id !== movie.id);
    setMovies(updatedMovies);

    setLastAction('dislike');
    setLastMedia(movie);
    setCanUndo(true);

    if (selectedIndex < updatedMovies.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      setSelectedMovie(updatedMovies[selectedIndex + 1]);
    } else {
      closeModal();
    }
  }, [movies, removeLike, selectedIndex, yourLikes]);

  const handleUndo = useCallback(() => {
    if (!lastMedia) {
      console.error("No media to undo");
      return;
    }

    let updatedMovies = movies;

    if (lastAction === 'like') {
      setYourLikes(yourLikes.filter((m) => m.id !== lastMedia.id));
      updatedMovies = [lastMedia, ...movies];
      setMovies(updatedMovies);
    } else if (lastAction === 'dislike') {
      updatedMovies = [lastMedia, ...movies];
      setMovies(updatedMovies);
    }

    setLastAction(null);
    setLastMedia(null);
    setCanUndo(false);

    const restoredIndex = updatedMovies.findIndex((m) => m.id === lastMedia.id);
    if (restoredIndex !== -1) {
      setSelectedIndex(restoredIndex);
      setSelectedMovie(updatedMovies[restoredIndex]);
      setModalVisible(true);
    } else {
      closeModal();
    }
  }, [lastAction, lastMedia, movies, yourLikes]);

  const openModal = useCallback((index) => {
    setSelectedIndex(index);
    setSelectedMovie(movies[index]);
    setModalVisible(true);
  }, [movies]);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setSelectedMovie(null);
  }, []);

  const handleSwipe = useCallback(({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationX < -50 && selectedIndex < movies.length - 1) {
        setSelectedIndex(selectedIndex + 1);
        setSelectedMovie(movies[selectedIndex + 1]);
      } else if (nativeEvent.translationX > 50 && selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
        setSelectedMovie(movies[selectedIndex - 1]);
      }
    }
  }, [movies, selectedIndex]);

  const handleSearchSubmit = useCallback(() => {
    navigation.navigate('Search', { query: searchQuery });
    setSearchQuery('');
  }, [navigation, searchQuery]);

  const handleLikesPress = useCallback(() => {
    if (yourLikes.length > 0) {
      navigation.navigate("LikedMedia", { likedMedia: yourLikes });
    } else {
      console.log("No liked media to display.");
    }
  }, [navigation, yourLikes]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
      <Header
          welcomeText="Welcome"
          username={username}
          avatar={userAvatar}
          isProfileScreen={false}
          setAvatarModalVisible = {()=>{}}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for movies..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearchSubmit}
        />
        <GradientButton
          iconName="search"
          buttonText="Search"
          onPress={handleSearchSubmit}
        />
        <View style={styles.movies}>
          <Text style={styles.moviesHeader}>Trendings on your platforms</Text>
          {loading ? (
            <Text style={styles.loadingText}>Loading trendings on your platform(s)</Text>
          ) : (
            <MovieTrendings movies={movies} openModal={openModal} />
          )}
        </View>
        <MovieModal
          visible={modalVisible}
          movie={selectedMovie}
          onClose={closeModal}
          onLike={handleLike}
          onDislike={handleDislike}
          onUndo={handleUndo}
          onSwipe={handleSwipe}
          canUndo={canUndo}
          showUndoButton={true}
          showDislikeButton={true}
        />
      </SafeAreaView>
      <View style={styles.listsContainer}>
        <Text style={styles.createListText}>Create a new list</Text>
        <GradientButton
          iconName="add"
          buttonText="Create List"
          onPress={() => console.log('Create List pressed')}
        />
        {loadingLikes ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
          <TouchableOpacity
            style={styles.likesContainer}
            onPress={handleLikesPress}
          >
            <Image
              source={userAvatar ? { uri: userAvatar } : require("../assets/avatar-1.png")}
              style={styles.avatar}
            />
            <View style={styles.likesInfo}>
              <Text style={styles.likesName}>Your likes</Text>
              <Text style={styles.likesDetails}>{yourLikes.length} titles</Text>
            </View>
            <FontAwesome
              name="heart"
              size={24}
              color="#ff5b5b"
              style={styles.heartIcon}
            />
          </TouchableOpacity>
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0f2b",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#888',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#ffffff',
  },
  movies: {
    flex: 1,
    marginBottom: -15,
  },
  moviesHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ffffff',
  },
  scrollContainer: {
   flexWrap : 'nowrap',
  },
  listsContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#0d0f2b',
  },
  createListText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#888",
    backgroundColor: "#1c1c1c",
    borderRadius: 5,
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  likesInfo: {
    flex: 1,
  },
  likesName: {
    fontSize: 16,
    color: "#ffffff",
  },
  likesDetails: {
    fontSize: 14,
    color: "#888",
  },
  heartIcon: {
    marginLeft: 10,
  },
  loadingText: {
    color: '#ffffff',
  },
});