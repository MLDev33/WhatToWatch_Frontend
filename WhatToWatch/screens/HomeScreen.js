import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Modal, TouchableOpacity, Image } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView, State } from 'react-native-gesture-handler';
import Movie from '../components/Movie/Movie';



export default function HomeScreen() {
  const [movies, setMovies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // data test
  let userTest = {
    name: "userTest",
    plateformes: ["netflix", "disney+"], // il est possible de modifier cet array pour tester avec d'autres plateformes
  };

  const validPlatforms = ["netflix", "disney+", "hulu", "amazon", "hbo"]; // exemple de plateformes valides

  async function fetchTrendings() {
    try {
      const plateformes = userTest.plateformes.filter(platform => validPlatforms.includes(platform));
      if (plateformes.length === 0) {
        throw new Error('No valid platforms provided');
      }
      const plateformesParam = encodeURIComponent(JSON.stringify(plateformes));
      const url = `http://192.168.1.83:3000/movies/trendings?plateformes=${plateformesParam}&region=FR&limite=30`;
      console.log('Fetching URL:', url); // Log the URL

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Something went wrong: ' + response.status);
      }
      const data = await response.json();
      setMovies(data.result.contenu);
      console.log(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Erreur : ", error);
    }
  }

  useEffect(() => {
    fetchTrendings();
  }, []);
  
  const openModal = (index) => {
    console.log('Opening modal for index:', index);
    setSelectedIndex(index);
    setSelectedMovie(movies[index]);
    setModalVisible(true);
  };
  
  const closeModal = () => {
    console.log('Closing modal');
    setModalVisible(false);
    setSelectedMovie(null);
  };

  const handleSwipe = ({ nativeEvent }) => {
    console.log('Gesture detected:', nativeEvent);
    if (nativeEvent.state === State.END) {
      console.log('Gesture ended');
      if (nativeEvent.translationX < -50 && selectedIndex < movies.length - 1) {
        console.log('swipe left');
        openModal(selectedIndex + 1);
      } else if (nativeEvent.translationX > 50 && selectedIndex > 0) {
        console.log('swipe right');
        openModal(selectedIndex - 1);
      }
    }
  };

  const MovieTrendings = ({ movies }) => {
    return (
      <ScrollView horizontal style={styles.scrollContainer}>
        {movies.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => openModal(index)}>
            <Movie poster={item.poster} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome {userTest.name}</Text>
        <View style={styles.movies}>
          <Text style={styles.moviesHeader}>Here are some movies you might like:</Text>
          <MovieTrendings movies={movies} />
        </View>
        {selectedMovie && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <GestureHandlerRootView style={{ flex: 1 }}>
              <PanGestureHandler onGestureEvent={handleSwipe} onHandlerStateChange={handleSwipe}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Image style={styles.modalImage} source={{ uri: `https://image.tmdb.org/t/p/w500/${selectedMovie.poster}` }} />
                    <Text style={styles.modalTitle}>{selectedMovie.titre}</Text>
                    <Text style={styles.modalDescription}>
                      {selectedMovie.description.length > 200
                        ? `${selectedMovie.description.substring(0, 200)}...`
                        : selectedMovie.description}
                    </Text>
                    <View style={styles.modalDetailsRow}>
                      <Text style={styles.modalDetails}>Année: {selectedMovie.annee}</Text>
                      <Text style={styles.modalDetails}>Popularité: {selectedMovie.popularite}</Text>
                      <Text style={styles.modalDetails}>Votes: {selectedMovie.vote}</Text>
                    </View>
                    <Text style={styles.modalDetails}>
                      Plateformes: {Array.isArray(selectedMovie.plateformes) ? selectedMovie.plateformes.map(p => p.nom).join(', ') : 'N/A'}
                    </Text>
                    <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                      <Text style={styles.closeButtonText}>Fermer</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </PanGestureHandler>
            </GestureHandlerRootView>
          </Modal>
        )}
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDetailsRow: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  modalDetails: {
    fontSize: 14,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});