import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import moment from 'moment';

const MyList = ({ items, onPress, onSchedule }) => {
  return (
    <View style={styles.container}>
      {items.length > 0 ? (
        items.map((item) => {
          const formattedDate = moment(item.release_date).format('DD/MM/YYYY');
          return (
            <View key={item._id} style={styles.card}>
              <TouchableOpacity onPress={() => onPress(item)}>
                <Text style={styles.itemText}>{item.title} , {formattedDate}</Text>
              </TouchableOpacity>
              <Button title="Planifier" onPress={() => onSchedule(item)} />
            </View>
          );
        })
      ) : (
        <Text style={styles.noDataText}>No items found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  card: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    backgroundColor: '#1c1c1c',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#ffffff', // Texte en blanc pour les items
  },
  noDataText: {
    color: '#ffffff', // Texte en blanc pour les messages d'absence de données
  },
});

export default MyList;