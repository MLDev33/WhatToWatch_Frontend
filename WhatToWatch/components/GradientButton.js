import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const GradientButton = ({ iconName, buttonText, onPress }) => {
  return (
    <LinearGradient
      colors={['#7C4DFF', '#F94A56', '#FF1744']}
      start={{ x: 0, y: 0 }}
      end={{ x: 2, y: 5 }}
      style={styles.buttonContainer}
    >
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon name={iconName} size={20} color="#fff" />
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 60,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
});

export default GradientButton;