import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
const LikedMediaScreen = ({ navigation }) => {
    const route = useRoute();
    const { likedMedia } = route.params; // Récupère les médias aimés passés en paramètre

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMedia, setFilteredMedia] = useState(likedMedia);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
    const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
    const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
    const baseUrl = localUrl; // POUR UTILISER EN LOCAL

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const username = user.username;
    const usertoken = user.token;
    console.log("username", username , "usertoken", usertoken);

    useEffect(() => {
        setFilteredMedia(
            likedMedia.filter(item =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, likedMedia]);

    const handleSelectMedia = (item) => {
        setSelectedMedia(item);
    };

    const handleDateChange = (event, date) => {
        if (event?.type === 'dismissed') {
            setShowDatePicker(false);
            return;
        }
        setShowDatePicker(false);
        setSelectedDate(date || selectedDate);
        setShowTimePicker(true); // Afficher le time picker après la sélection de la date
        console.log("Date sélectionnée:", selectedDate);
    };

    const handleTimeChange = (event, time) => {
        if (event?.type === 'dismissed') {
            setShowTimePicker(false);
            return;
        }
        const selectedTime = time || selectedDate;
        setShowTimePicker(false);
        setSelectedDate(selectedTime);
        console.log("Date et heure sélectionnées:", selectedTime);

        // Appeler la fonction pour ajouter à la watchlist
        if (selectedMedia) {
            addToWatchlist(selectedMedia.tmdbId, selectedTime);
        }
    };

    const addToWatchlist = async (tmdbId, scheduledTime) => {
        try {
            const payload = { movie_id: tmdbId, scheduled_time: scheduledTime };
            console.log("Payload:", payload);
            const response = await fetch(`${baseUrl}movies/watchlist/${usertoken}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ movie_id: tmdbId, scheduled_time: scheduledTime }),
            });

            const data = await response.json();
            if (data.result) {
                console.log('Film/série ajouté(e) à la watchlist:', data.watchlist);
            } else {
                console.error('Erreur lors de l\'ajout à la watchlist:', data.error);
            }
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleSelectMedia(item)}>
            <Image source={{ uri: `${TMDB_IMAGE_BASE_URL}/${item.poster}` }} style={styles.poster} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description} numberOfLines={3}>{item.description}</Text>
                <Text style={styles.details}>Genre: {item.genre.join(", ")}</Text>
                <Text style={styles.details}>Année: {new Date(item.release_date).getFullYear()}</Text>
                <Text style={styles.details}>Popularité: {item.popularity}</Text>
                <Text style={styles.details}>Votes: {item.vote_count}</Text>
                <View style={styles.platformsContainer}>
                    <Text style={styles.details}>Plateformes: </Text>
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
                        <Text style={styles.details}>Aucune plateforme disponible</Text>
                    )}
                </View>
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
            <TextInput
                style={styles.searchBar}
                placeholder="Rechercher par titre..."
                placeholderTextColor="#ccc"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={filteredMedia}
                renderItem={renderItem}
                keyExtractor={(item) => item.tmdbId.toString()}
            />
            {selectedMedia && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={!!selectedMedia}
                    onRequestClose={() => setSelectedMedia(null)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <ScrollView>
                                <Image source={{ uri: `${TMDB_IMAGE_BASE_URL}/${selectedMedia.poster}` }} style={styles.modalPoster} />
                                <Text style={styles.modalTitle}>{selectedMedia.title}</Text>
                                <View style={styles.platformsContainer}>
                                    {Array.isArray(selectedMedia.providers) && selectedMedia.providers.length > 0 ? (
                                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                            {selectedMedia.providers.map((p, index) => (
                                                <View key={index} style={styles.platformContainer}>
                                                    <Image
                                                        source={{ uri: `${TMDB_IMAGE_BASE_URL}${p.logoPath}` }}
                                                        style={styles.platformLogo}
                                                    />
                                                </View>
                                            ))}
                                        </ScrollView>
                                    ) : (
                                        <Text style={styles.details}>Aucune plateforme disponible</Text>
                                    )}
                                </View>
                                <Text style={styles.modalDescription}>{selectedMedia.description}</Text>
                                <Text style={styles.modalDetails}>Genre: {selectedMedia.genre.join(", ")}</Text>
                                <Text style={styles.modalDetails}>Année: {new Date(selectedMedia.release_date).getFullYear()}</Text>
                                <Text style={styles.modalDetails}>Popularité: {selectedMedia.popularity}</Text>
                                <Text style={styles.modalDetails}>Votes: {selectedMedia.vote_count}</Text>
                                <View style={styles.likedAtContainer}>
                                    <Icon name="heart-outline" size={20} color="#fff" />
                                    <Text style={styles.modalDetails}> Aimé le: {new Date(selectedMedia.likedAt).toLocaleDateString()}</Text>
                                </View>
                                <TouchableOpacity style={styles.watchPlannerButton} onPress={() => setShowDatePicker(true)}>
                                    <Icon name="calendar-outline" size={30} color="#fff" />
                                    <Text style={styles.watchPlannerButtonText}>Watch Planner</Text>
                                </TouchableOpacity>
                                {showDatePicker && (
                                    <DateTimePicker
                                        value={selectedDate}
                                        mode="date"
                                        display="default"
                                        onChange={handleDateChange}
                                    />
                                )}
                                {showTimePicker && (
                                    <DateTimePicker
                                        value={selectedDate}
                                        mode="time"
                                        display="default"
                                        onChange={handleTimeChange}
                                    />
                                )}
                            </ScrollView>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedMedia(null)}>
                                <Icon name="close-outline" size={30} color="#fff" />
                                <Text style={styles.closeButtonText}>Fermer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0d0f2b',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#1a1c3b',
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
        color: '#fff',
    },
    searchBar: {
        padding: 10,
        margin: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#1a1c3b',
        color: '#fff',
    },
    card: {
        margin: 10,
        backgroundColor: '#1a1c3b',
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
        color: '#fff',
    },
    description: {
        fontSize: 14,
        color: '#ccc',
    },
    details: {
        fontSize: 12,
        color: '#999',
        marginVertical: 2,
    },
    platformsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
    },
    platformContainer: {
        marginRight: 10,
    },
    platformLogo: {
        width: 30,
        height: 30,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#1a1c3b',
        borderRadius: 10,
        padding: 20,
        elevation: 10,
    },
    modalPoster: {
        width: '100%',
        height: 300,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginVertical: 10,
    },
    modalDescription: {
        fontSize: 16,
        color: '#ccc',
        marginVertical: 10,
    },
    modalDetails: {
        fontSize: 14,
        color: '#999',
        marginVertical: 5,
    },
    likedAtContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    watchPlannerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#007BFF',
        borderRadius: 10,
    },
    watchPlannerButtonText: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 5,
    },
    closeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#ff4d4d',
        borderRadius: 10,
        marginTop: 20,
    },
    closeButtonText: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 5,
    },
});

export default LikedMediaScreen;