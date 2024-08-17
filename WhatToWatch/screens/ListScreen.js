import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';

const ListScreen = () => {
    const [yourLikes, setYourLikes] = useState([]);
    const [loading, setLoading] = useState(true);

    const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
    const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
    const baseUrl = localUrl; // Changez en vercelUrl pour utiliser avec Vercel
    const userToken = useSelector((state) => state.user.value.token);

    const fetchUserLikes = useCallback(() => {
        console.log('User token:', userToken);
        fetch(`${baseUrl}movies/user-likes?userToken=${userToken}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    console.log('Liked media:', data.likedMedia);
                    if (Array.isArray(data.likedMedia)) {
                        setYourLikes(data.likedMedia);
                    } else {
                        console.error('likedMedia is not an array');
                    }
                } else {
                    console.error(data.message);
                }
            })
            .catch((error) => console.error('Fetch error:', error))
            .finally(() => setLoading(false));
    }, [baseUrl, userToken]);

    useFocusEffect(
        useCallback(() => {
            fetchUserLikes();
        }, [fetchUserLikes])
    );

    return (
        <View style={styles.container}>
            <Text>Test</Text>
            <View style={styles.section}>
                <Text style={styles.header}>Other Lists</Text>
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    yourLikes.map((like) => {
                        const formattedDate = moment(like.release_date).format('YYYY-MM-DD');
                        return (
                            <View key={like._id} style={styles.itemContainer}>
                                <Text style={styles.itemText}>{like.title} , {formattedDate}</Text>
                            </View>
                        );
                    })
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