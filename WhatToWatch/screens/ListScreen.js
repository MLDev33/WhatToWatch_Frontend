import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons"; // Importation de FontAwesome pour l'icône de cœur
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
const ListScreen = ({ navigation }) => {
  const [yourLikes, setYourLikes] = useState([]);
  const [userLists, setUserLists] = useState([]);
  const [loadingLikes, setLoadingLikes] = useState(true);
  const [loadingLists, setLoadingLists] = useState(true);
  const [errorLists, setErrorLists] = useState(null);
  const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
  const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
  const baseUrl = localUrl; // Changez en vercelUrl pour utiliser avec Vercel
  let user = useSelector((state) => state.user.value);
  let username = user.username;
  let userAvatar = user.avatar;
  const userToken = useSelector((state) => state.user.value.token);
  

  const fetchUserLikes = useCallback(() => {

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
            console.log("Your likes:", data.likedMedia);
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
    fetch(`${baseUrl}user/lists?userToken=${userToken}`)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            setErrorLists("You have not created any lists yet.");
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          console.log("User lists:", data.lists);
          if (Array.isArray(data.lists)) {
            setUserLists(data.lists);
          } else {
            console.error("lists is not an array");
          }
        } else {
          console.error(data.message);
        }
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
      //fetchUserLists(); // Désactivé car la route n'est pas encore implémentée
    }, [fetchUserLikes, fetchUserLists])
  );
  //Handlepress non utilisé pour le moment , pour les listes peut etre
  /*
  const handlePress = (item) => {
    navigation.navigate("MediaDetail", { media: item });
  };
  */
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
        username = {username}
        avatar= {userAvatar}
        isProfileScreen={false}
        setAvatarModalVisible = {()=>{}}
      />
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
        {loadingLists ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : userLists.length > 0 ? (
          userLists.map((list) => (
            <TouchableOpacity
              key={list._id}
              style={styles.itemContainer}
              onPress={() => handlePress(list)}
            >
              <Text style={styles.itemText}>{list.name}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noDataText}>
            {errorLists || "You have not created any lists yet."}
          </Text>
        )}
      </View>
    </SafeAreaView>
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
});

export default ListScreen;
