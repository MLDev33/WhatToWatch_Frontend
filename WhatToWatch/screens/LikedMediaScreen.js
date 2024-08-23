import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';

const LikedMediaScreen = ({ navigation }) => {
    const route = useRoute();
    const { likedMedia } = route.params; // Récupère les médias aimés passés en paramètre

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMedia, setFilteredMedia] = useState(likedMedia);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
    console.log('Liked Media:', likedMedia);
    likedMedia.forEach(item => {
        console.log('Providers for', item.title, ':', item.providers);
    });

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
        console.log('Event:', event);
        console.log('Date:', date);
        if (event.type === 'dismissed' || event.nativeEvent.type === 'dismissed') {
            setShowDatePicker(false);
            return;
        }
        const selected = date || selectedDate;
        setShowDatePicker(false);
        setSelectedDate(selected);
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
            mode="datetime"
            display="default"
            onChange={handleDateChange}
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
        marginVertical: 2, // Réduire l'espace vertical entre les détails
    },
    platformsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2, // Réduire l'espace vertical entre les détails
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
        alignItems: 'center',
    },
    modalPoster: {
        width: '100%',
        height: 250,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginVertical: 10,
    },
    modalDescription: {
        fontSize: 16,
        color: '#ccc',
        marginVertical: 5,
    },
    modalDetails: {
        fontSize: 14,
        color: '#999',
        marginVertical: 2, // Réduire l'espace vertical entre les détails
    },
    likedAtContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2, // Réduire l'espace vertical entre les détails
    },
    watchPlannerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    watchPlannerButtonText: {
        fontSize: 18,
        color: '#fff',
        marginLeft: 10,
    },
    closeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    closeButtonText: {
        fontSize: 16,
        color: '#fff',
    },
});

export default LikedMediaScreen;