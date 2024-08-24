import { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { GestureHandlerRootView, State } from 'react-native-gesture-handler';
import Movie from '../components/Movie/Movie';
import MovieModal from '../components/Movie/MovieModal'; // Importation de MovieModal
import { useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import MyList from '../components/Movie/MyList';
import GradientButton from '../components/GradientButton'; // Importation de GradientButton
import { FontAwesome } from '@expo/vector-icons'; // Importation de FontAwesome pour l'icône de cœur

export default function HomeScreen() {
  const [movies, setMovies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // État pour la recherche
  const [yourLikes, setYourLikes] = useState([]); // État pour les likes de l'utilisateur
  const [loadingLikes, setLoadingLikes] = useState(true); // État de chargement pour les likes
  const navigation = useNavigation(); // Hook de navigation
  //valeur de test , on recuperera depuis le store
  const user = useSelector((state) => state.user.value);
  let username = user.username;
  let usertoken = user.token;

  //-----POUR RECUPERER L'URL DE L'API EN FONCTION DE L'ENVIRONNEMENT DE TRAVAIL---//
  const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
  const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
  
  // Utiliser une condition pour basculer entre les URLs
  //const baseUrl = vercelUrl; // POUR UTILISER AVEC VERCEL
   const baseUrl = localUrl; // POUR UTILISER EN LOCAL 

   async function fetchFavouritePlatforms(usertoken) {
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
  }
  
  async function fetchTrendings(usertoken) {
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
  }

  const fetchUserLikes = useCallback(() => {
    console.log("User token:", usertoken);
    fetch(`${baseUrl}movies/user-likes?userToken=${usertoken}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          console.log("Liked media:", data.likedMedia);
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

  //on ne fetch pas à l'infini , on fetch une seule fois au chargement de la page , si la liste de film est vide 
  useEffect(() => {
    if (movies.length === 0) {
      fetchTrendings(usertoken);
    }
  }, [usertoken]);

  useFocusEffect(
    useCallback(() => {
      fetchUserLikes();
    }, [fetchUserLikes])
  );

  const openModal = (index) => {
    setSelectedIndex(index);
    setSelectedMovie(movies[index]);
    setModalVisible(true);
  };
  
  const closeModal = () => {
    setModalVisible(false);
    setSelectedMovie(null);
  };

  //fonction qui permet de changer de film en swipant
  //on recupere l'event de swipe , si on swipe vers la gauche , on ouvre le film suivant , si on swipe vers la droite , on ouvre le film precedent
  //on ne peut pas swipe si on est sur le premier film ou le dernier film
  // -50 et 50 sont des valeurs en pixels , si on swipe de plus de 50 pixels , on change de film
  const handleSwipe = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationX < -50 && selectedIndex < movies.length - 1) {
        openModal(selectedIndex + 1);
      } else if (nativeEvent.translationX > 50 && selectedIndex > 0) {
        openModal(selectedIndex - 1);
      }
    }
  };
  const handleSearchSubmit = () => {
    navigation.navigate('Search', { query: searchQuery });
    setSearchQuery(''); // Réinitialisation de la recherche
  };

  const handleLikesPress = () => {
    if (yourLikes.length > 0) {
      navigation.navigate("LikedMedia", { likedMedia: yourLikes });
    } else {
      console.log("No liked media to display.");
    }
  };

  const MovieTrendings = ({ movies }) => (
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
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome {username}</Text>
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
            <MovieTrendings movies={movies} />
          )}
        </View>
        <MovieModal
          visible={modalVisible}
          movie={selectedMovie}
          onClose={closeModal}
          onSwipe={handleSwipe}
        />
      </View>
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
              source={require("../assets/avatar-1.png")}
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
    padding: 10,
    backgroundColor: '#0d0f2b',
  },
  welcomeText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  searchInput: {
    height: 40,
    borderColor: '#888',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#ffffff',
  },
  movies: {
    flex: 1,
  },
  moviesHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ffffff',
  },
  scrollContainer: {
    flexWrap: 'nowrap',
  },
  listsContainer: {
    flex: 1,
    padding: 20,
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