import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const UndoButton = ({ onUndo }) => (
  <TouchableOpacity onPress={onUndo} style={styles.button}>
    <FontAwesome name="undo" size={24} color="orange" />
  </TouchableOpacity>
);

const styles = {
  button: {
    padding : 10,
    bottom: 18,
  },
};

export default UndoButton;