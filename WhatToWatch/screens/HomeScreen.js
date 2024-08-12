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
  //valeur de test , on recuperera depuis le store
  let userTest = {
    name: "userTest",
    plateformes: ["netflix", "disney+"],
  };

  //-----POUR RECUPERER L'URL DE L'API EN FONCTION DE L'ENVIRONNEMENT DE TRAVAIL---//
  const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
  const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
  
  // Utiliser une condition pour basculer entre les URLs
  //const baseUrl = vercelUrl; // POUR UTILISER AVEC VERCEL
   const baseUrl = localUrl; // POUR UTILISER EN LOCAL 


  //valeur de test aussi , a terme , l'utilisera aura selectionné des plateformes valides avant d'arriver sur cette page
  const validPlatforms = ["netflix", "disney+", "hulu", "amazon", "hbo"];

  async function fetchTrendings() {
    try {
      const plateformes = userTest.plateformes.filter(platform => validPlatforms.includes(platform));
      if (plateformes.length === 0) {
        throw new Error('No valid platforms provided');
      }
      //encodeURIcomponent permet de transformer un objet en chaine de caractère , ici on transforme le tableau de plateformes en chaine de caractère , pour l'envoyer dans l'url en requete get
      //sinon il faudrai une requete post plus lourde
      const plateformesParam = encodeURIComponent(JSON.stringify(plateformes));
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
  //on ne fetch pas à l'infini , on fetch une seule fois au chargement de la page , si la liste de film est vide 
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

    //on envoi en props le resultat de la requete fetch , si on est en chargement , on affiche un message de chargement
    //Movie est un composant qui affiche un film , on lui envoi en props le poster du film et une fonction qui permet d'ouvrir le modal
    //l'utilisateur verra un poster du composant Movie puis cliquera dessus pour acceder au composant MovieModal qui affiche le film en grand
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

    //
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
