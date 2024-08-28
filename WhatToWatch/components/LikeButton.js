import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const LikeButton = ({ onLike }) => (
  <TouchableOpacity onPress={onLike} style={styles.button}>
    <FontAwesome name="heart" size={24} color="red" />
  </TouchableOpacity>
);

const styles = {
  button: {
    padding : 10,
    bottom: 18,
  },
};

export default LikeButton;