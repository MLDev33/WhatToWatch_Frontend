import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const CenteredGradientButton = ({ iconName, buttonText, onPress }) => {
  return (
    <LinearGradient
      colors={['#7C4DFF', '#F94A56', '#FF1744']}
      start={{ x: 0, y: 0 }}
      end={{ x: 2, y: 5 }}
      style={styles.buttonContainer}
    >
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.buttonContent}>
        <Icon name={iconName} size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText2}>{buttonText}</Text>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 60,
  },
  buttonText2: {
    color: '#fff',
    fontSize: 16,
    // marginLeft: 10,
    // flex: 1,
    textAlign: 'center',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default CenteredGradientButton;