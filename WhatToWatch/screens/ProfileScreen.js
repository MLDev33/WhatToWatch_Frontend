import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Switch,
  Image,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../reducers/user";
import DeleteAccount from "../components/Profile/DeleteAccount";
import { Avatar } from "react-native-elements";
import GradientButton from "../components/GradientButton";
import AvatarModal from "../components/Profile/AvatarModal";
import Header from "../components/Header"; // Importer le nouveau composant Header
import CenteredGradientButton from "../components/CenteredGradientButton";

const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
const baseUrl = localUrl;

const ProfileScreen = ({ navigation, hasAvatar, setHasAvatar }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(false);

  const dispatch = useDispatch();
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);

  const user = useSelector((state) => state.user.value);
  let username = user.username;
  let avatar = user.avatar;

  console.log(avatar);

  const handleLogOut = () => {
    dispatch(logout());
    console.log("logout");
    navigation.replace("SignIn");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header
          username={username}
          avatar={avatar}
          setAvatarModalVisible={setAvatarModalVisible}
          isProfileScreen={true}
        />
      </View>
      <View style={styles.section}>
        <GradientButton
          iconName="settings-outline"
          buttonText="Profile setting"
          onPress={() => navigation.navigate("ProfileSettingsScreen")}
        />
        <GradientButton
          iconName="time-outline"
          buttonText="Watch history"
          onPress={() => {}}
        />
        <GradientButton
          iconName="calendar-outline"
          buttonText="Watch schedule"
          onPress={() => navigation.navigate("WatchSchedule")}
        />
        <GradientButton
          iconName="people-outline"
          buttonText="Invite your friends"
          onPress={() => navigation.navigate("InviteFriends")}
        />
        <GradientButton
          iconName="tv-outline"
          buttonText="Streaming platforms"
          onPress={() => {}}
        />

        <LinearGradient
          colors={["#7C4DFF", "#F94A56", "#FF1744"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 2, y: 5 }}
          style={[styles.button, styles.switchContainer]}
        >
          <Icon name="moon-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Dark mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            thumbColor={darkMode ? "#3B2077" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </LinearGradient>

        <LinearGradient
          colors={["#7C4DFF", "#F94A56", "#FF1744"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 2, y: 5 }}
          style={[styles.button, styles.switchContainer]}
        >
          <Icon name="notifications-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Publish notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            thumbColor={notifications ? "#3B2077" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </LinearGradient>
      </View>

      <CenteredGradientButton
        buttonText="Logout"
        onPress={handleLogOut}
        style={styles.logoutButton}
      />
      <AvatarModal
        avatarModalVisible={avatarModalVisible}
        setAvatarModalVisible={setAvatarModalVisible}
      />
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
  header: {
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  section: {
    marginVertical: 30,
  },
  buttonContainer: {
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    height: 60,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  switchContainer: {
    justifyContent: "space-between",
  },
  logoutButton: {
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    width: "60%",
    paddingVertical: 15,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  button2: {
    backgroundColor: "#F94A56",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  textButton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    backgroundColor: "#ccc",
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  firstAvatar: {
    backgroundColor: "grey",
  },
});

export default ProfileScreen;
