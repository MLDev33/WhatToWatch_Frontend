import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Dimensions
} from "react-native";
import { useRoute } from "@react-navigation/native";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const LikedMediaScreen = ({ navigation }) => {
  const route = useRoute();
  const { likedMedia } = route.params;

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMedia, setFilteredMedia] = useState(likedMedia);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showFullDescription, setShowFullDescription] = useState(false);

  const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
  const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
  const baseUrl = localUrl;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const username = user.username;
  const usertoken = user.token;

  useEffect(() => {
    setFilteredMedia(
      likedMedia.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, likedMedia]);

  const handleSelectMedia = (item) => {
    setSelectedMedia(item);
    setShowFullDescription(false);
  };

  const handleDateChange = (event, date) => {
    if (event?.type === "dismissed") {
      setShowDatePicker(false);
      return;
    }
    setShowDatePicker(false);
    setSelectedDate(date || selectedDate);
    setShowTimePicker(true);
  };

  const handleTimeChange = (event, time) => {
    if (event?.type === "dismissed") {
      setShowTimePicker(false);
      return;
    }
    const selectedTime = time || selectedDate;
    setShowTimePicker(false);
    setSelectedDate(selectedTime);

    if (selectedMedia) {
      addToWatchlist(selectedMedia.tmdbId, selectedTime);
    }
  };

  const addToWatchlist = async (tmdbId, scheduledTime) => {
    try {
      const payload = { movie_id: tmdbId, scheduled_time: scheduledTime };
      const response = await fetch(`${baseUrl}movies/watchlist/${usertoken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.result) {
        console.log("Film/série ajouté(e) à la watchlist:", data.watchlist);
      } else {
        console.error("Erreur lors de l'ajout à la watchlist:", data.error);
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  //affichage des elements likes sur la page LikedMediaScreen (non pressé)
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleSelectMedia(item)}>
      <View style={styles.posterContainer}>
        <Image 
          source={{ uri: `${TMDB_IMAGE_BASE_URL}/${item.poster}` }} 
          style={styles.poster} 
          resizeMode="cover"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={3}>{item.description}</Text>
        <Text style={styles.details}>Genre: {item.genre.join(", ")}</Text>
        <Text style={styles.details}>Année: {new Date(item.release_date).getFullYear()}</Text>
        <Text style={styles.details}>Popularité: {item.popularity}</Text>
        <Text style={styles.details}>Votes: {item.vote_count}</Text>
        <View style={styles.platformsContainer}>
          <Text style={styles.details}>Plateformes: </Text>
          {Array.isArray(item.providers) && item.providers.length > 0 ? (
            <View style={styles.platformsList}>
              {item.providers.map((p, index) => (
                <View key={index} style={styles.platformContainer}>
                  <Image
                    source={{ uri: `${TMDB_IMAGE_BASE_URL}${p.logoPath}` }}
                    style={styles.platformLogo}
                  />
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.details}>Aucune plateforme disponible</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const currentDate = new Date();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mes éléments likés</Text>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher par titre..."
        placeholderTextColor="#ccc"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredMedia}
        renderItem={renderItem}
        keyExtractor={(item) => item.tmdbId.toString()}
      />
      {selectedMedia && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedMedia}
          onRequestClose={() => setSelectedMedia(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView>
                <Image
                  source={{
                    uri: `${TMDB_IMAGE_BASE_URL}/${selectedMedia.poster}`,
                  }}
                  style={styles.modalPoster}
                />
                <Text style={styles.modalTitle}>{selectedMedia.title}</Text>
                <Text style={styles.details}>Disponible sur :</Text>
                <View style={styles.platformsContainer}>
                  {Array.isArray(selectedMedia.providers) &&
                  selectedMedia.providers.length > 0 ? (
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      {selectedMedia.providers.map((p, index) => (
                        <View key={index} style={styles.platformContainer}>
                          <Image
                            source={{
                              uri: `${TMDB_IMAGE_BASE_URL}${p.logoPath}`,
                            }}
                            style={styles.platformLogo}
                          />
                        </View>
                      ))}
                    </ScrollView>
                  ) : (
                    <Text style={styles.details}>
                      Aucune plateforme disponible
                    </Text>
                  )}
                </View>

                <Text
                  style={styles.modalDescription}
                  numberOfLines={showFullDescription ? undefined : 3}
                >
                  {selectedMedia.description}
                </Text>
                <TouchableOpacity
                  onPress={() => setShowFullDescription(!showFullDescription)}
                >
                  <Text style={styles.readMoreText}>
                    {showFullDescription ? "Lire moins" : "Lire plus"}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.modalDetails}>
                  Type: {selectedMedia.mediaType}
                </Text>
                <Text style={styles.modalDetails}>
                  Genre: {selectedMedia.genre.join(", ")}
                </Text>
                <Text style={styles.modalDetails}>
                  Année: {new Date(selectedMedia.release_date).getFullYear()}
                </Text>
                <Text style={styles.modalDetails}>
                  Popularité: {selectedMedia.popularity}
                </Text>
                <Text style={styles.modalDetails}>
                  Votes: {selectedMedia.vote_count}
                </Text>
                <View style={styles.likedAtContainer}>
                  <Icon name="heart-outline" size={20} color="#fff" />
                  <Text style={styles.modalDetails}>
                    {" "}
                    Aimé le: {formatDate(selectedMedia.likedAt)}
                  </Text>
                </View>
              </ScrollView>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.watchPlannerButton}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Icon name="calendar-outline" size={30} color="#fff" />
                  <Text style={styles.watchPlannerButtonText}>Watch Planner</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedMedia(null)}
                >
                  <Icon name="close-outline" size={30} color="#fff" />
                  <Text style={styles.closeButtonText}>Fermer</Text>
                </TouchableOpacity>
              </View>
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                  minimumDate={currentDate}
                />
              )}
              {showTimePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="time"
                  display="default"
                  onChange={(event, time) => {
                    const selectedTime = time || selectedDate;
                    if (selectedTime < currentDate) {
                      alert("Veuillez sélectionner une heure future.");
                      return;
                    }
                    handleTimeChange(event, selectedTime);
                  }}
                />
              )}
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0f2b",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#1a1c3b",
    elevation: 5,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: "#007BFF",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  searchBar: {
    padding: 10,
    margin: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#1a1c3b",
    color: "#fff",
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1c1c1c',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0, 
  },
  posterContainer: {
    width: screenWidth * 0.35,
    aspectRatio: 2 / 3,
    flex: 1,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 5,
  },
  details: {
    fontSize: 12,
    color: '#ffffff',
    marginBottom: 3,
  },
  platformsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    flexWrap: 'wrap',
  },
  platformsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  platformContainer: {
    marginRight: 5,
    marginBottom: 5,
  },
  platformLogo: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#1a1c3b",
    borderRadius: 10,
    padding: 20,
    elevation: 10,
    position: 'relative', // Ajouté pour positionner le bouton "Fermer"
  },
  modalPoster: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: "#ccc",
    marginVertical: 10,
  },
  readMoreText: {
    fontSize: 14,
    color: "#007BFF",
    marginVertical: 5,
  },
  modalDetails: {
    fontSize: 14,
    color: "#999",
    marginVertical: 3, // Réduire la marge verticale
  },
  likedAtContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3, // Réduire la marge verticale
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#1a1c3b',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  watchPlannerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#0056b3",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
    marginRight: 5,
  },
  watchPlannerButtonText: {
    color: "#fff", // Texte en blanc
    marginLeft: 5,
  },
  closeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#e60000",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
    marginLeft: 5,
  },
  closeButtonText: {
    color: "#fff", // Texte en blanc
    marginLeft: 5,
  },
});

export default LikedMediaScreen;