import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const WatchScheduleScreen = () => {
    const user = useSelector((state) => state.user.value);
    let usertoken = user.token;
    const [likes, setLikes] = useState([]);
    const [error, setError] = useState(null);
    const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
    const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
    const baseUrl = localUrl;

    const fetchLikes = async () => {
        try {
            const response = await fetch(`${baseUrl}movies/watchlist/${usertoken}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.result) {
                setLikes(data.watchlist);
                console.log('Likes:', data.watchlist);
            } else {
                console.error('Erreur lors de la récupération des likes:', data.error);
                setError(data.error);
            }
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchLikes();
    }, []);

    const handleSelectMedia = (item) => {
        // Logique pour gérer la sélection du média
        console.log('Média sélectionné:', item);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleSelectMedia(item)}>
            <Image source={{ uri: `${TMDB_IMAGE_BASE_URL}/${item.movie_id.poster}` }} style={styles.poster} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.movie_id.title}</Text>
                <Text style={styles.description} numberOfLines={3}>{item.movie_id.description}</Text>
                <Text style={styles.details}>Genre: {item.movie_id.genre.join(", ")}</Text>
                <Text style={styles.details}>Année: {new Date(item.movie_id.release_date).getFullYear()}</Text>
                <Text style={styles.details}>Popularité: {item.movie_id.popularity}</Text>
                <Text style={styles.details}>Votes: {item.movie_id.vote_count}</Text>
                <Text style={styles.details}>Heure programmée: {new Date(item.scheduled_time).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).replace(':', 'H')}</Text>
                <View style={styles.platformsContainer}>
                    <Text style={styles.details}>Plateformes: </Text>
                    {Array.isArray(item.movie_id.providers) && item.movie_id.providers.length > 0 ? (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {item.movie_id.providers.map((p, index) => (
                                <View key={index} style={styles.platformContainer}>
                                    <Image
                                        source={{ uri: `${TMDB_IMAGE_BASE_URL}${p.logoPath}` }}
                                        style={styles.platformLogo}
                                    />
                                </View>
                            ))}
                        </ScrollView>
                    ) : (
                        <Text style={styles.details}>No platform available yet</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {error ? (
                <Text>Erreur: {error}</Text>
            ) : (
                <>
                    <Text style={styles.sectionTitle}>Your Likes</Text>
                    {likes.length === 0 ? (
                        <Text style={styles.placeholder}>Nothing added yet, like a movie or a serie and plan a viewing session soon</Text>
                    ) : (
                        <FlatList
                            data={likes}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.movie_id._id.toString()}
                        />
                    )}
                    <Text style={styles.sectionTitle}>Other Lists</Text>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0d0f2b",
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#1c1c1c',
        borderRadius: 5,
        marginBottom: 10,
        overflow: 'hidden',
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
        color: '#ffffff',
    },
    description: {
        fontSize: 14,
        color: '#888',
        marginVertical: 5,
    },
    details: {
        fontSize: 14,
        color: '#ffffff',
    },
    platformsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    platformContainer: {
        marginRight: 10,
    },
    platformLogo: {
        width: 30,
        height: 30,
    },
    placeholder: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
    },
});

export default WatchScheduleScreen;