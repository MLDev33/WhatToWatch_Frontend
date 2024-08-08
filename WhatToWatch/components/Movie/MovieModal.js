// MovieModal.js
import React from 'react';
import { View, Text, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView,  } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

const MovieModal = ({ 
  visible, 
  movie, 
  onClose, 
  onSwipe,
  onLike,
  onDislike,
  onShare,
  onUndo
}) => {
  if (!movie) return null;

 console.log( movie.type , movie.genre);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PanGestureHandler onGestureEvent={onSwipe} onHandlerStateChange={onSwipe}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image style={styles.modalImage} source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster}` }} />
              <Text style={styles.modalTitle}>{movie.titre}</Text>
              <Text style={styles.modalDescription}>
                {movie.description.length > 100
                  ? `${movie.description.substring(0, 120)}...`
                  : movie.description}
              </Text>
              <View style={styles.modalDetailsRow}>
                <Text> genre : {movie.genre.join(', ')}</Text>
                <Text> type : {movie.type} </Text>
                <Text style={styles.modalDetails}>Année: {movie.annee}</Text>
                <Text style={styles.modalDetails}>Popularité: {movie.popularite}</Text>
                <Text style={styles.modalDetails}>Votes: {movie.vote}</Text>
              </View>
              <Text style={styles.modalDetails}>
                Plateformes: {Array.isArray(movie.plateformes) ? movie.plateformes.map(p => p.nom).join(', ') : 'N/A'}
              </Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={onUndo} style={styles.button}>
                  <FontAwesome name="undo" size={24} color="orange" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDislike} style={styles.button}>
                  <FontAwesome name="close" size={24} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onLike} style={styles.button}>
                  <FontAwesome name="heart" size={24} color="green" />
                </TouchableOpacity>

                <TouchableOpacity onPress={onShare} style={styles.button}>
                  <FontAwesome name="share" size={24} color="blue" />
                </TouchableOpacity>
      
              </View>
              <View style={styles.closeButtonContainer}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <FontAwesome name="times" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    overflow: 'hidden',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'flex-start',
  },
  modalImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 10, // Réduire l'espacement
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5, // Réduire l'espacement
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 5, // Réduire l'espacement
    alignItems: 'flex-start',
  },
  modalDetailsRow: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5, // Réduire l'espacement
  },
  modalDetails: {
    fontSize: 14,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10, // Réduire l'espacement
    width: '100%',
  },
  button: {
    marginHorizontal: 10,
  },
  closeButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10, // Réduire l'espacement
  },
  closeButton: {
    marginTop: 10, // Réduire l'espacement
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default MovieModal;
