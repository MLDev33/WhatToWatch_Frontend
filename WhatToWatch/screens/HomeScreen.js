import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {  GestureHandlerRootView, State } from 'react-native-gesture-handler';
import Movie from '../components/Movie/Movie';
import MovieModal from '../components/Movie/MovieModal'; // Importation de MovieModal

export default function HomeScreen() {
  const [movies, setMovies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  let userTest = {
    name: "userTest",
    plateformes: ["netflix", "disney+"],
  };

  const validPlatforms = ["netflix", "disney+", "hulu", "amazon", "hbo"];

  async function fetchTrendings() {
    try {
      const plateformes = userTest.plateformes.filter(platform => validPlatforms.includes(platform));
      if (plateformes.length === 0) {
        throw new Error('No valid platforms provided');
      }
      const plateformesParam = encodeURIComponent(JSON.stringify(plateformes));
      const url = `https://what-to-watch-hawmt3w45-mldev33s-projects.vercel.app/movies/trendings?plateformes=${plateformesParam}&region=FR&limite=100`;

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

  useEffect(() => {
    if (movies.length === 0) {
    fetchTrendings();
  }
}, []);
  
  const openModal = (index) => {
    setSelectedIndex(index);
    setSelectedMovie(movies[index]);
    setModalVisible(true);
  };
  
  const closeModal = () => {
    setModalVisible(false);
    setSelectedMovie(null);
  };

  const handleSwipe = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationX < -50 && selectedIndex < movies.length - 1) {
        openModal(selectedIndex + 1);
      } else if (nativeEvent.translationX > 50 && selectedIndex > 0) {
        openModal(selectedIndex - 1);
      }
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
        <Text style={styles.welcomeText}>Welcome {userTest.name}</Text>
        <View style={styles.movies}>
          <Text style={styles.moviesHeader}>Here are some movies you might like:</Text>
          {loading ? (
            <Text>Loading trendings on your platform(s)</Text>
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
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  welcomeText: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  movies: {
    marginTop: 20,
    marginVertical: 20,
  },
  moviesHeader: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexDirection: 'row',
  },
});
