// MovieModal.js
import React from 'react';
import { View, Text, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView, State } from 'react-native-gesture-handler';

const MovieModal = ({ visible, movie, onClose, onSwipe }) => {
  if (!movie) return null;

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
                  ? `${movie.description.substring(0, 100)}...`
                  : movie.description}
              </Text>
              <View style={styles.modalDetailsRow}>
                <Text style={styles.modalDetails}>Année: {movie.annee}</Text>
                <Text style={styles.modalDetails}>Popularité: {movie.popularite}</Text>
                <Text style={styles.modalDetails}>Votes: {movie.vote}</Text>
              </View>
              <Text style={styles.modalDetails}>
                Plateformes: {Array.isArray(movie.plateformes) ? movie.plateformes.map(p => p.nom).join(', ') : 'N/A'}
              </Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Fermer</Text>
              </TouchableOpacity>
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

export default MovieModal;
