import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ShareButton = ({ onShare }) => (
  <TouchableOpacity onPress={onShare} style={styles.button}>
    <FontAwesome name="share" size={24} color="blue" />
  </TouchableOpacity>
);

const styles = {
  button: {
    padding : 10,
    bottom: 18,
  },
};

export default ShareButton;