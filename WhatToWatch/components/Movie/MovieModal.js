import React, { useState, useMemo, useCallback } from 'react';
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Share, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LikeButton from '../LikeButton';
import DislikeButton from '../DislikeButton';
import ShareButton from '../ShareButton';
import UndoButton from '../UndoButton';

const MovieModal = React.memo(({ visible, movie, onClose, onLike, onDislike, onUndo, onSwipe, canUndo, showDislikeButton, showUndoButton }) => {
  if (!movie) return null;

  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [platformModalVisible, setPlatformModalVisible] = useState(false);

  const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const userToken = useSelector((state) => state.user.value.token);

  const memoizedMovie = useMemo(() => movie, [movie]);
  const memoizedUserToken = useMemo(() => userToken, [userToken]);

  console.log(memoizedMovie.type, memoizedMovie.genre, memoizedMovie.titre, memoizedMovie.annee);
  console.log("userToken", memoizedUserToken);

  const shareNative = async () => {
    const typeMap = {
      film: "movie",
      série: "tv",
    };
    const link = `https://www.themoviedb.org/${typeMap[memoizedMovie.type]}/${memoizedMovie.id}`;
    try {
      const result = await Share.share({
        message: `Regarde ${memoizedMovie.type === 'film' ? 'ce film' : 'cette série'}: ${memoizedMovie.titre}\n${link}`,
        title: `Partager ${memoizedMovie.titre}`,
        url: link,
      });
      if (result.action === Share.sharedAction) {
        console.log('Partage réussi');
      } else if (result.action === Share.dismissedAction) {
        console.log('Partage annulé');
      }
    } catch (error) {
      console.error('Erreur lors du partage', error);
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
          <View style={{ flex: 1 }}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <FontAwesome name="times" size={20} color="white" />
                </TouchableOpacity>
                <Image
                  style={styles.modalImage}
                  source={{ uri: `${TMDB_IMAGE_BASE_URL}/${memoizedMovie.poster}` }}
                />
                <Text style={styles.modalTitle} numberOfLines={1}>{memoizedMovie.titre}</Text>
                <Text style={styles.modalDescription}>
                  {memoizedMovie.description.length > 100
                    ? `${memoizedMovie.description.substring(0, 150)}...`
                    : memoizedMovie.description}
                </Text>
                <View style={styles.modalDetailsRow}>
                  {memoizedMovie.genre && memoizedMovie.genre.length > 0 ? (
                    <Text style={styles.modalDetailsText}>genre : {memoizedMovie.genre.join(", ")}</Text>
                  ) : (
                    <Text style={styles.modalDetailsText}>genre : N/A</Text>
                  )}
                  <Text style={styles.modalDetailsText}>type : {memoizedMovie.type}</Text>
                  <Text style={styles.modalDetailsText}>Année: {memoizedMovie.annee}</Text>
                  <Text style={styles.modalDetailsText}>
                    Popularité: {memoizedMovie.popularite}
                  </Text>
                  <Text style={styles.modalDetailsText}>Votes: {memoizedMovie.vote}</Text>
                </View>
                <Text style={styles.modalDetailsText}>
                  Plateformes:{" "}
                  {Array.isArray(memoizedMovie.plateformes) &&
                  memoizedMovie.plateformes.length > 0 ? (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {memoizedMovie.plateformes.map((p, index) => (
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
                  <LikeButton onLike={() => onLike(memoizedMovie)} />
                  {showDislikeButton && <DislikeButton onDislike={() => onDislike(memoizedMovie)} />}
                  <ShareButton onShare={shareNative} />
                  {showUndoButton && <UndoButton onUndo={onUndo} disabled={!canUndo} />}
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
          </View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </Modal>
  );
});

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
    // marginBottom: 15,
    height: Platform.OS === "ios" ? 30 : 30,
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
    marginTop: 50,
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