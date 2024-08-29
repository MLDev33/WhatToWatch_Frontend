import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";


// Avatar par défaut
const defaultAvatar = "https://res.cloudinary.com/ddr0yckcq/image/upload/v1724492055/avatar-1_wrlvvd.png";


const Header = ({ welcomeText, username, avatar, setAvatarModalVisible, isProfileScreen }) => {
  
    // Fonction pour obtenir l'avatar ou l'avatar par défaut
    const getAvatar = () => {
      return avatar || defaultAvatar;
    };


  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Image source={require("../assets/imgsmall.png")} style={styles.logo} />
        <View style={styles.textAndImageContainer}>
          {welcomeText && <Text style={styles.welcomeText}>{welcomeText}</Text>}
          <Text style={styles.text}>{username}</Text>
          {avatar === undefined ? (
            <TouchableOpacity onPress={() => setAvatarModalVisible(true)}>
<Image source={{ uri: getAvatar() }} style={styles.profileImage} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setAvatarModalVisible(true)}>
              <Image source={{ uri: avatar }} style={styles.profileImage} />
              {isProfileScreen && <Avatar.Accessory size={20} />}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  textAndImageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 16,
    color: "#fff",
    marginRight: 15
  },
  text: {
    fontSize: 16,
    color: "#fff",
    marginRight: 5,
  },
  logo: {
    width: 80,
    height: 60,
    borderRadius: 30,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  username: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default Header;