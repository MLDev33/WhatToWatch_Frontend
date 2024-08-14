import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const ListScreen = () => {
    const [yourLikes, setYourLikes] = useState([]);
    const [loading, setLoading] = useState(true);


  //-----POUR RECUPERER L'URL DE L'API EN FONCTION DE L'ENVIRONNEMENT DE TRAVAIL---//
const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
// Utiliser une condition pour basculer entre les URLs
//const baseUrl = vercelUrl; // POUR UTILISER AVEC VERCEL
const baseUrl = localUrl; // POUR UTILISER EN LOCAL
  // Simuler la récupération des données
const userToken = useSelector((state) => state.user.value.token);

//--------------------PUREMENT POUR TESTER LES LIKES DE L UTILISATEUR------------//

useEffect(() => {
    console.log('User token:', userToken);
    fetch(`${baseUrl}movies/user-likes?userToken=${userToken}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); // Utilisez text() au lieu de json() pour le débogage initial
      })
      .then((text) => {
        try {
          const data = JSON.parse(text); // Parsez manuellement le texte en JSON
          if (data.success) {
            setYourLikes(data.likedMedia);
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
          console.error('Response text:', text); // Affichez le texte brut pour le débogage
        }
      })
      .catch((error) => console.error('Fetch error:', error))
      .finally(() => setLoading(false));
  }, [baseUrl, userToken]);

  return (
    <View style={styles.container}>
      <Text>Test</Text>
      <View style={styles.section}>
        <Text style={styles.header}>Other Lists</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          yourLikes.map((like) => (
            <View key={like._id} style={styles.itemContainer}>
              <Text style={styles.itemText}>{like.title}</Text>
            </View>
          ))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
});

export default ListScreen;