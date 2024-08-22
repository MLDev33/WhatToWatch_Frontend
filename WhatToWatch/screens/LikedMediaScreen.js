import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

const LikedMediaScreen = ({ navigation }) => {
    const route = useRoute();
    const { likedMedia } = route.params; // Récupère les médias aimés passés en paramètre

    const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
    console.log('Liked Media:', likedMedia);
    likedMedia.forEach(item => {
        console.log('Providers for', item.title, ':', item.providers);
    });

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => console.log('Naviguer vers les détails du média', item)}>
            <Image source={{ uri: `${TMDB_IMAGE_BASE_URL}/${item.poster}` }} style={styles.poster} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description} numberOfLines={3}>{item.description}</Text>
                <Text style={styles.details}>Genre: {item.genre.join(", ")}</Text>
                <Text style={styles.details}>Année: {new Date(item.release_date).getFullYear()}</Text>
                <Text style={styles.details}>Popularité: {item.popularity}</Text>
                <Text style={styles.details}>Votes: {item.vote_count}</Text>
                <Text style={styles.details}>
                    Plateformes:{" "}
                    {Array.isArray(item.providers) && item.providers.length > 0 ? (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {item.providers.map((p, index) => (
                                <View key={index} style={styles.platformContainer}>
                                    <Image
                                        source={{ uri: `${TMDB_IMAGE_BASE_URL}${p.logoPath}` }}
                                        style={styles.platformLogo}
                                    />
                                </View>
                            ))}
                        </ScrollView>
                    ) : (
                        <Text>Aucune plateforme disponible</Text>
                    )}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Retour</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Mes éléments likés</Text>
            </View>
            <FlatList
                data={likedMedia}
                renderItem={renderItem}
                keyExtractor={(item) => item.tmdbId.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#fff',
        elevation: 5,
    },
    backButton: {
        padding: 10,
    },
    backButtonText: {
        fontSize: 16,
        color: '#007BFF',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    card: {
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 5,
    },
    poster: {
        width: '100%',
        height: 200,
    },
    infoContainer: {
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
    details: {
        fontSize: 12,
        color: '#999',
    },
    platformContainer: {
        marginRight: 10,
    },
    platformLogo: {
        width: 20,
        height: 20,
    },
});

export default LikedMediaScreen;