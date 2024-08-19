import React from "react";
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Share,
  ScrollView,
  TextInput,
} from "react-native";
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/user";

import { useState } from "react";

//-----POUR RECUPERER L'URL DE L'API EN FONCTION DE L'ENVIRONNEMENT DE TRAVAIL---//
const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
// Utiliser une condition pour basculer entre les URLs
//const baseUrl = vercelUrl; // POUR UTILISER AVEC VERCEL
const baseUrl = localUrl; // POUR UTILISER EN LOCAL

const DeleteAccountConfirmation = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  let username = user.username;
  let token = user.token;
  const [userPassword, setUserPassword] = useState("");

  const [
    deleteAccountConfirmationModalVisible,
    setDeleteAccountConfirmationModalVisible,
  ] = useState(false);

  const handleDeleteAccount = () => {
    fetch(`${baseUrl}users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: userPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(username);
        console.log(userPassword);
        if (!data.result) {
          console.log("false");
        } else {
          console.log("true");
          fetch(`${baseUrl}users/${token}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              if (!data.result) {
                console.log("falseR");
              } else {
                console.log("trueR");
                dispatch(logout());
                navigation.navigate("SignUp");
              }
              console.log("button signin clicked");
            });
        }

        setUserPassword("");
      });
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
    //   visible={visible}
    //   onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* <TouchableOpacity onPress={onClose}>
            <FontAwesome name="times" size={20} color="black" />
          </TouchableOpacity> */}
          <Text>Delete Account</Text>
          <Text>
            Please enter your current password to proceed to account deletion.{" "}
          </Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            keyboardType="password"
            autoCapitalize="none"
            onChangeText={(value) => setUserPassword(value)}
            value={userPassword}
            style={styles.input}
          />
          <Text>
            Deleting your account is permanent and cannot be undone. Please make
            sure that you have saved any important data before proceeding. If
            you have any doubts, please cancel the deleting process.{" "}
          </Text>

          <TouchableOpacity onPress={handleDeleteAccount}>
            <Text>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  exclamationIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  // closeButton: {
  //   position: "absolute",
  //   top: 10,
  //   right: 10,
  //   zIndex: 1,
  //   backgroundColor: "rgba(0, 0, 0, 0.5)",
  //   borderRadius: 15,
  //   padding: 5,
  // },
  modalImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 2 / 3,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "contain",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalDetailsRow: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 5,
  },
  modalDetails: {
    fontSize: 14,
  },
  platformContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  platformLogo: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  button: {
    marginHorizontal: 10,
  },
  shareOptionsContainer: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  shareOptionButton: {
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
    marginVertical: 5,
    width: "80%",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeButton: {
    fontSize: 16,
    color: "black",
  },
});

export default DeleteAccountConfirmation;
