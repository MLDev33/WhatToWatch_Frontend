import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const DislikeButton = ({ onDislike }) => (
  <TouchableOpacity onPress={onDislike} style={styles.button}>
    <FontAwesome name="close" size={24} color="red" />
  </TouchableOpacity>
);

const styles = {
  button: {
    padding : 10,
    bottom: 18,
  },
};

export default DislikeButton;