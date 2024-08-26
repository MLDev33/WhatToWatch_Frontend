import React from "react";
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Share,
  ScrollView,
} from "react-native";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

//-----POUR RECUPERER L'URL DE L'API EN FONCTION DE L'ENVIRONNEMENT DE TRAVAIL---//
const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
// Utiliser une condition pour basculer entre les URLs
//const baseUrl = vercelUrl; // POUR UTILISER AVEC VERCEL
const baseUrl = localUrl; // POUR UTILISER EN LOCAL

const MovieModal = ({ visible, movie, onClose, onSwipe }) => {
  if (!movie) return null;

  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [platformModalVisible, setPlatformModalVisible] = useState(false);
  console.log(movie.type, movie.genre, movie.annee);
  const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const userToken = useSelector((state) => state.user.value.token);
  console.log("userToken", userToken);
  //-------------------- Fonction pour ajouter un film en favoris-----------------------------//
  const onLike = async (movie) => {
    console.log("likepress on", movie.titre, "id", movie.id, "for the user", userToken, "annee", movie.annee);
    try {
      const response = await fetch(`${baseUrl}movies/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userToken: userToken,
          mediaDetails: {
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
              providerId: p.providerId,
              providerName: p.nom,
              logoPath: p.logo,
            })),
          },
          listToken: "<list-token>", // Optionnel, uniquement si l'element figure dans une liste spécifique
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Média ajouté aux favoris");
      } else {
        alert(`Erreur: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue lors de l'ajout aux favoris.");
    }
  };
  //-------------------- Fonction pour partager le lien de l'application-----------------------------//
  const shareNative = async () => {
    // Mapper les types de votre application aux types de l'URL
    const typeMap = {
      film: "movie",
      série: "tv",
    };

    const link = `https://www.themoviedb.org/${typeMap[movie.type]}/${movie.id}`;

    try {
      const result = await Share.share({
        message: `Regarde ${movie.type === 'film' ? 'ce film' : 'cette série'}: ${movie.titre}\n${link}`,
        title: `Partager ${movie.titre}`,
        url: link, // Note: url est seulement supporté sur iOS
        // Android utilisera message et title
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Partagé avec le type d'activité:", result.activityType);
        } else {
          console.log("Partagé avec succès");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Partage annulé");
      }
    } catch (error) {
      console.error("Erreur lors du partage:", error.message);
    }
  };

  const handlePlatformClick = (platform) => {
    setSelectedPlatform(platform);
    setPlatformModalVisible(true);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PanGestureHandler onGestureEvent={onSwipe} onHandlerStateChange={onSwipe}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <FontAwesome name="times" size={20} color="white" />
                </TouchableOpacity>
                <Image
                  style={styles.modalImage}
                  source={{ uri: `${TMDB_IMAGE_BASE_URL}/${movie.poster}` }}
                />
                <Text style={styles.modalTitle} numberOfLines={1}>{movie.titre}</Text>
                <Text style={styles.modalDescription}>
                  {movie.description.length > 100
                    ? `${movie.description.substring(0, 150)}...`
                    : movie.description}
                </Text>
                <View style={styles.modalDetailsRow}>
                  {movie.genre && movie.genre.length > 0 ? (
                    <Text style={styles.modalDetailsText}>genre : {movie.genre.join(", ")}</Text>
                  ) : (
                    <Text style={styles.modalDetailsText}>genre : N/A</Text>
                  )}
                  <Text style={styles.modalDetailsText}>type : {movie.type}</Text>
                  <Text style={styles.modalDetailsText}>Année: {movie.annee}</Text>
                  <Text style={styles.modalDetailsText}>
                    Popularité: {movie.popularite}
                  </Text>
                  <Text style={styles.modalDetailsText}>Votes: {movie.vote}</Text>
                </View>
                <Text style={styles.modalDetailsText}>
                  Plateformes:{" "}
                  {Array.isArray(movie.plateformes) &&
                  movie.plateformes.length > 0 ? (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {movie.plateformes.map((p, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => handlePlatformClick(p)}
                        >
                          <View style={styles.platformContainer}>
                            <Image
                              source={{ uri: `${TMDB_IMAGE_BASE_URL}${p.logo}` }}
                              style={styles.platformLogo}
                            />
                          </View>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  ) : (
                    "N/A"
                  )}
                </Text>

                <View style={styles.buttonsContainer}>
                  <TouchableOpacity style={styles.button}>
                    <FontAwesome name="undo" size={24} color="orange" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}>
                    <FontAwesome name="close" size={24} color="red" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onLike(movie)}
                    style={styles.button}
                  >
                    <FontAwesome name="heart" size={24} color="green" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={shareNative}
                    style={styles.button}
                  >
                    <FontAwesome name="share" size={24} color="blue" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={platformModalVisible}
              onRequestClose={() => setPlatformModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>{selectedPlatform?.nom}</Text>
                  <TouchableOpacity
                    style={styles.closeButtonContainer}
                    onPress={() => setPlatformModalVisible(false)}
                  >
                    <FontAwesome name="times" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </SafeAreaView>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingTop: 50, 
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#0d0f2b", 
    borderRadius: 10,
    padding: 20,
    alignItems: "flex-start",
    position: "relative",
    paddingBottom: 40, 
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 1,
  },
  modalImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 2 / 3,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "contain",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white", 
  },
  modalDescription: {
    fontSize: 14,
    marginBottom: 5,
    color: "white",
  },
  modalDetailsRow: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 5,
  },
  modalDetailsText: {
    fontSize: 14,
    color: "white",
  },
  platformContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  platformLogo: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  button: {
    marginHorizontal: 0,
    bottom: 18,
  },
  shareOptionsContainer: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  shareOptionButton: {
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    marginVertical: 5,
    width: "80%",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeButtonContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 1,
  },
});

export default MovieModal;