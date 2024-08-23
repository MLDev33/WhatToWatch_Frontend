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

  const [userPassword, setUserPassword] = useState("");
  const [missingFieldError, setMissingFieldError]=useState(true)

  const handleDeleteAccount = () => {
    if (!userPassword) {
      setMissingFieldError(true);
      console.log("errorMessageMissingfield");
    } else {
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
              console.log("button delete account clicked");
            });
        setUserPassword("");
      };
    }
  

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
          <Text style={styles.modalTitle}>Delete Account</Text>
          <Text style={styles.textH2}>
            Please enter your current password to proceed to account deletion.{" "}
          </Text>
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor={'white'}
            keyboardType="password"
            autoCapitalize="none"
            onChangeText={(value) => setUserPassword(value)}
            value={userPassword}
            style={styles.input}
          />
          <Text style={styles.textH3}>
            Deleting your account is permanent and cannot be undone. Please make
            sure that you have saved any important data before proceeding. If
            you have any doubts, please cancel the deleting process.{" "}
          </Text>

          <TouchableOpacity onPress={handleDeleteAccount}>
            <Text style={styles.modalTitle}>Delete Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCloseButton}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalTitle: {
    fontSize: 20,
    marginBottom: 20,
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
  marginTop: 10,
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
input: {
  height: 50,
  width: "80%",
  backgroundColor: "rgb(108, 122, 137)",
  borderRadius: 10,
  marginTop: 20,
  fontSize: 18,
  color: "white",
  paddingLeft: 10
},
});

export default DeleteAccountConfirmation;