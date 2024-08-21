import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { logout } from "../reducers/user";
import DeleteAccount from "../components/Profile/DeleteAccount";
import { Avatar } from "react-native-elements";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    useState(false);

  const user = useSelector((state) => state.user.value);
  let username = user.username;

  const avatars = [
    { key: 1, source: "../assets/avatar-1.png" },
    { key: 2, source: "../assets/avatar-1.png" },
    { key: 3, source: "../assets/avatar-1.png" },
    { key: 4, source: "../assets/avatar-1.png" },
    { key: 5, source: "../assets/avatar-1.png" },
    { key: 6, source: "../assets/avatar-1.png" },
    { key: 7, source: "../assets/avatar-1.png" },
    { key: 8, source: "../assets/avatar-1.png" },
    { key: 9, source: "../assets/avatar-1.png" },
    { key: 10, source: "../assets/avatar-1.png" },
  ];

  const handleLogOut = () => {
    dispatch(logout());
    console.log("logout");
    navigation.replace("SignIn");
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the ProfileScreen {username}</Text>
      <Avatar
        rounded
        containerStyle={{ height: 50, width: 50 }}
        source={require("../assets/avatar-1.png")}
      />
      <FlatList
        data={avatars}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
          // style={styles.providers}
          // onPress={() => {
          //   setSelectedProviders((providers) => [
          //     ...providers,
          //     item.id,
          //   ]);
          // }}
          >
            <Avatar rounded containerStyle={{ height: 50, width: 50 }} />
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.button2}
        activeOpacity={0.8}
        onPress={handleLogOut}
      >
        <Text style={styles.textButton}>LOGOUT</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button2}
        activeOpacity={0.8}
        onPress={() => setDeleteAccountModalVisible(true)}
      >
        <Text style={styles.textButton}>DELETE ACCOUNT</Text>
      </TouchableOpacity>
      <DeleteAccount
        deleteAccountModalVisible={deleteAccountModalVisible}
        setDeleteAccountModalVisible={setDeleteAccountModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button2: {
    fontWeight: "300",
  },
  textButton: {
    fontWeight: "600",
    // color:"white",
  },
});
