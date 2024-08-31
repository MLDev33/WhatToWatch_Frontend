import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const LikeButton = ({ onLike }) => (
  <TouchableOpacity onPress={onLike} style={styles.button}>
    <FontAwesome name="thumbs-up" size={24} color="white" />
  </TouchableOpacity>
);

const styles = {
  button: {
    padding: 10,
    bottom: 18,
    backgroundColor: '#32cd32', // Couleur de fond
    borderRadius: 25, // Bordures arrondies
    shadowColor: '#000', // Couleur de l'ombre
    shadowOffset: { width: 0, height: 2 }, // Décalage de l'ombre
    shadowOpacity: 0.8, // Opacité de l'ombre
    shadowRadius: 2, // Rayon de l'ombre
    elevation: 5, // Élévation pour Android
    alignItems: 'center', // Centrer le contenu horizontalement
    justifyContent: 'center', // Centrer le contenu verticalement
  },
};

export default LikeButton;