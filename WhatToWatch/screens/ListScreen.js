import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons"; // Importation de FontAwesome pour l'icône de cœur
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import ButtonComponent from "../components/Lists/ButtonComponent.js";
import { addLists, addMediaListSelected } from "../reducers/list.js";
const ListScreen = ({ navigation }) => {
    const [yourLikes, setYourLikes] = useState([]);
    const [userLists, setUserLists] = useState([]);
    const [loadingLikes, setLoadingLikes] = useState(true);
    const [loadingLists, setLoadingLists] = useState(true);
    const [errorLists, setErrorLists] = useState(null);
    const [selectList, setSelectList] = useState(null);
    const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
    const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
    const baseUrl = localUrl; // Changez en vercelUrl pour utiliser avec Vercel
    let user = useSelector((state) => state.user.value);
    const list = useSelector((state) => state.list.value)
    let username = user.username;
    let userAvatar = user.avatar;
    const userToken = useSelector((state) => state.user.value.token);
    const dispatch = useDispatch();



    const fetchUserLikes = useCallback(() => {
        console.log("User token:", userToken);
        fetch(`${baseUrl}movies/user-likes?userToken=${userToken}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    console.log("Liked media:", data.likedMedia);
                    if (Array.isArray(data.likedMedia)) {
                        setYourLikes(data.likedMedia);
                    } else {
                        console.error("likedMedia is not an array");
                    }
                } else {
                    console.error(data.message);
                }
            })
            .catch((error) => console.error("Fetch error:", error))
            .finally(() => setLoadingLikes(false));
    }, [baseUrl, userToken]);

    const fetchUserLists = useCallback(() => {
        let responseClone; // 1 - etape pour fix l'erreur format token non reconnu -> Fetch error: [SyntaxError: JSON Parse error: Unexpected character: <]

        fetch(`${baseUrl}movielists/user/lists/${userToken}`)// corriger dans users le "s" en trop ici et en backend
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 404) {
                        setErrorLists("You have not created any lists yet.");
                    } else {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                }
                responseClone = response.clone(); // 2 - etape pour fix l'erreur format token non reconnu 
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    console.log("User lists:", data.listsMedia);
                    if (Array.isArray(data.listsMedia)) {
                        setUserLists(data.listsMedia);
                    } else {
                        console.error("lists is not an array");
                    }
                } else {
                    console.error(data.message);
                }
            }, function (rejectionReason) { // 3 - etape pour fix l'erreur format token non reconnu 
                console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4 - etape pour fix l'erreur format token non reconnu 
                responseClone.text() // 5 - etape pour fix l'erreur format token non reconnu 
                    .then(function (bodyText) {
                        console.log('Received the following instead of valid JSON:', bodyText); // 6 - etape pour fix l'erreur format token non reconnu -> voir les infos dans le terminal l'erreur ne s'affiche plus
                    });
            })
            .catch((error) => {
                if (error.message !== "HTTP error! status: 404") {
                    console.error("Fetch error:", error);
                }
            })
            .finally(() => setLoadingLists(false));
    }, [baseUrl, userToken]);

    useFocusEffect(
        useCallback(() => {
            fetchUserLikes();
            fetchUserLists(); // Désactivé car la route n'est pas encore implémentée
        }, [fetchUserLikes, fetchUserLists])
    );

    /**
     * Fonction qui permet d'être redirigé dans la liste de media cliked
     * via l'item récupéré dans la map des movies de la liste
     * 
     * @param {*} item 
     */
    const handlePress = (item) => {
        console.log("List clicked:", item)
        setSelectList(item);
        dispatch(addMediaListSelected(item));
        navigation.navigate("ListMediaScreen", { listSelected: selectList });
    };

    const handleLikesPress = () => {
        if (yourLikes.length > 0) {
            navigation.navigate("LikedMedia", { likedMedia: yourLikes });
        } else {
            console.log("No liked media to display.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                username={username}
                avatar={userAvatar}
                isProfileScreen={false}
                setAvatarModalVisible={() => { }}
            />
            <View style={styles.bodyScreenContainer}>
                <View style={styles.section}>
                    <Text style={styles.header}>Your Likes</Text>
                    {loadingLikes ? (
                        <ActivityIndicator size="large" color="#ffffff" />
                    ) : (
                        <TouchableOpacity
                            style={styles.likesContainer}
                            onPress={handleLikesPress}
                        >
                            <Image
                                source={userAvatar ? { uri: userAvatar } : require("../assets/avatar-1.png")}
                                style={styles.avatar}
                            />
                            <View style={styles.likesInfo}>
                                <Text style={styles.likesName}>Your likes</Text>
                                <Text style={styles.likesDetails}>{yourLikes.length} titles</Text>
                            </View>
                            <FontAwesome
                                name="heart"
                                size={24}
                                color="#ff5b5b"
                                style={styles.heartIcon}
                            />
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.section}>
                    <Text style={styles.header}>Your Lists</Text>
                    <ScrollView>
                        {loadingLists ? (
                            <Text style={styles.loadingText}>Loading...</Text>
                        ) : userLists.length > 0 ? (
                            userLists.map((list) => (
                                // <TouchableOpacity
                                //   key={list._id}
                                //   style={styles.itemContainer}
                                //   onPress={() => handlePress(list)}
                                // >
                                //   <Text style={styles.itemText}>{list.name}</Text>
                                // </TouchableOpacity>
                                <TouchableOpacity
                                    key={list._id}
                                    style={styles.listCardContainer}
                                    onPress={() => handlePress(list)}
                                >
                                    <View style={styles.listCardInfosContainer}>
                                        <Image
                                            source={require("../assets/avatar-1.png")}
                                            style={styles.avatar}
                                        />
                                        <View style={styles.listCardTextContainer}>
                                            <Text style={styles.listCardTextTitle}>{list.list_name}</Text>
                                            <Text style={styles.listCardTextLength}>{list.movies.length} titles</Text>
                                        </View>
                                        <View style={styles.shareIconContainer}>
                                            <FontAwesome
                                                name="share-alt"
                                                size={50}
                                                color="#ffF"
                                                style={styles.shareIcon}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.listCardMembersContainer} >
                                        <View style={styles.listCardMembersAvatar}></View>
                                        <View style={styles.listCardMembersAvatar}></View>
                                        {/* avatars des friends */}
                                    </View>
                                </TouchableOpacity>
                            ))
                        ) : (
                            <View style={styles.textAddListContainer}>
                                <Text style={styles.textH2}>
                                    Ready to create your next watchlist?
                                </Text>
                                <Text style={styles.textBody14}>
                                    Create a custom collection of series,
                                    movies, from your favorite streaming platforms.
                                    Share your picks with friends and discover new
                                    favorites together !
                                </Text>
                                <Text style={styles.textBody14}>
                                    {errorLists || "You have not created any lists yet."}
                                </Text>
                            </View>
                        )}
                    </ScrollView>
                    <ButtonComponent
                        label="Add a list"
                        buttonContainer={styles.buttonContent}
                        button={styles.button}
                        buttonLabel={styles.buttonLabel}
                    //onItemPress={handleAddListPress}
                    />
                </View>
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0d0f2b",
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    section: {
        marginBottom: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#ffffff",
    },
    bodyScreenContainer: {
        flex: 1,
        justifyContent: "Top",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        borderTopColor: "#7C4DFF",
        borderBottomColor: "#7C4DFF",
        borderWidth: 2,
    },
    likesContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: "#1c1c1c",
        borderRadius: 5,
        marginBottom: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    likesInfo: {
        flex: 1,
    },
    likesName: {
        fontSize: 16,
        color: "#ffffff",
    },
    likesDetails: {
        fontSize: 14,
        color: "#888",
    },
    heartIcon: {
        marginLeft: 10,
    },
    itemContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    itemText: {
        fontSize: 16,
        color: "#ffffff",
    },
    loadingText: {
        color: "#ffffff",
    },
    noDataText: {
        color: "#ffffff",
    },

    ////////// Message si pas de list  /////////
    textAddListContainer: {
        height: "50%",
        justifyContent: "center",
    },
    textH2: {
        textAlign: "center",
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    textBody14: {
        fontSize: 14,
        color: "white",
        textAlign: "center",
        marginVertical: 20,
    },


    ////////// Button styles /////////
    buttonContent: {
        width: 220,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 15,
        padding: 5,
        marginTop: 10,
        alignSelf: "center",
    },
    button: {
        borderRadius: 10,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    buttonLabel: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",

    },


    ////////// ListCard styles /////////
    listCardContainer: {
        backgroundColor: "white",
        justifyContent: "center",
        margin: 10,
        height: 100,
        width: 360,
        backgroundColor: "#4C4C67",
        borderWidth: 1,
        borderRadius: 10,
    },
    listCardInfosContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 10,
        paddingEnd: 10,
        paddingStart: 10,
    },
    listCardTextContainer: {
        flex: 1,
        alignItems: "flex-start",
    },
    listCardTextTitle: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    listCardTextLength: {
        fontSize: 14,
        color: "white",
        color: "#fff",
    },
    listCardMembersContainer: {
        //flex:1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        marginBottom: 5,
    },
    listCardMembersAvatar: {
        backgroundColor: "orange",
        borderWidth: 2,
        borderRadius: 50,
        height: 20,
        width: 20,
    },
    shareIconContainer: {
        height: 60,
        width: 60,
        justifyContent: "center",
        alignItems: "center",
        // borderColor:"red",
        // borderWidth:2,
    },
    shareIcon: {
        alignSelf: "center",
    },




});

export default ListScreen;
