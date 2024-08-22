import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WatchScheduleScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Watch Schedule Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0d0f2b',
        paddingHorizontal: 10,
        paddingTop: 20,
        },
      });

export default WatchScheduleScreen;