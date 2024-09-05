import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../reducers/user";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import GradientButton from "../GradientButton";
import { FontAwesome } from "@expo/vector-icons";

//-----POUR RECUPERER L'URL DE L'API EN FONCTION DE L'ENVIRONNEMENT DE TRAVAIL---//
const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
// Utiliser une condition pour basculer entre les URLs
//const baseUrl = vercelUrl; // POUR UTILISER AVEC VERCEL
const baseUrl = localUrl; // POUR UTILISER EN LOCAL

const DeleteAccountConfirmation = ({ modalVisible, setModalVisible }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const user = useSelector((state) => state.user.value);
  let token = user.token;
  let isGoogleUser = user.googleUser;

  const [userUsername, setUserUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [missingFieldError, setMissingFieldError] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [hidePassword, setHidePassword] = useState(true);

  const handlePasswordVisibility = () => {
    setRightIcon(rightIcon === "eye" ? "eye-slash" : "eye");
    setHidePassword(!hidePassword);
  };

  const handleDeleteAccount = () => {
    if (!userPassword) {
      setMissingFieldError(true);
      console.log("errorMessageMissingfield");
    } else {
      fetch(`${baseUrl}users/${token}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: userPassword,
        }),
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
          console.log("button delete account clicked");
        });
      setUserPassword("");
    }
  };

  const handleDeleteGoogleAccount = () => {
    if (!userUsername) {
      setMissingFieldError(true);
      console.log("errorMessageMissingfield");
    } else {
      fetch(`${baseUrl}users/deleteWithGoogle/${token}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userUsername,
        }),
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
          console.log("button delete google account clicked");
        });
      setUserUsername("");
    }
  };

  const handleCloseButton = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseButton}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseButton}
          >
            <FontAwesome name="times" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Delete Account</Text>
          {/* //if Google user delete account done with confirmation of username, otherwise user has to confirm PW  */}
          {isGoogleUser ? (
            <>
              {/* googleUser */}
              <Text style={styles.textH2}>
                Please confirm your username in order to proceed to account
                deletion.{" "}
              </Text>
              <View style={styles.inputWrapper}>
                <Icon
                  name="person-outline"
                  size={24}
                  color="#fff"
                  style={styles.inputIcon}
                />
                <TextInput
                  placeholder="Username"
                  placeholderTextColor="#8e8e93"
                  autoCapitalize="none"
                  onChangeText={(value) => setUserUsername(value)}
                  value={userUsername}
                  style={styles.input}
                />
              </View>
            </>
          ) : (
            <>
              {/* not a google user */}
              <Text style={styles.textH2}>
                Please enter your current password to proceed to account
                deletion.{" "}
              </Text>
              <View style={styles.inputWrapper}>
                <Icon
                  name="lock-closed-outline"
                  size={24}
                  color="#fff"
                  style={styles.inputIcon}
                />
                <TextInput
                  secureTextEntry={hidePassword}
                  placeholder="Password"
                  placeholderTextColor="#8e8e93"
                  autoCapitalize="none"
                  onChangeText={(value) => setUserPassword(value)}
                  value={userPassword}
                  style={styles.input}
                />
                <TouchableOpacity
                  onPress={handlePasswordVisibility}
                  style={styles.eyeIcon}
                >
                  <Icon
                    name={hidePassword ? "eye-outline" : "eye-off-outline"}
                    size={24}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
          <Text style={styles.textH3}>
            Deleting your account is permanent and cannot be undone. Please make
            sure that you have saved any important data before proceeding. If
            you have any doubts, please cancel the deleting process.{" "}
          </Text>
          {/* same button but different function that calls a different route depending on wheter user is a google user */}
          {isGoogleUser ? (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={handleDeleteGoogleAccount} >
                <Text style={styles.buttonText}>Delete Account</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.button}
                onPress={handleDeleteAccount} >
                <Text style={styles.buttonText}>Delete Account</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#0d0f2b",
    borderRadius: 10,
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalTitle: {
    fontSize: 20,
    marginVertical: 20,
    fontWeight: "bold",
    color: "white",
  },
  textH2: {
    marginTop: 10,
    marginHorizontal: 7,
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
  textH3: {
    marginVertical: 10,
    marginHorizontal: 7,
    textAlign: "center",
    color: "red",
    fontSize: 16,
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  inputIcon: {
    paddingLeft: 5,
  },
  input: {
    flex: 1,
    height: 50,
    color: "white",
    paddingLeft: 10,
  },
  eyeIcon: {
    paddingRight: 15,
  },
  buttonContainer: {
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 60,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    flex: 1,
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 1,
  },
});

export default DeleteAccountConfirmation;
