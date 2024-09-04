import React from "react";
import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import RecoveredPasswordModal from "./RecoveredPassword";
import CenteredGradientButton from "../CenteredGradientButton";
import Icon from "react-native-vector-icons/Ionicons";

const checkEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

export default function ForgottenPassword({ modalVisible, setModalVisible }) {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [recoveredModalVisible, setRecoveredModalVisible] = useState(false);

  const handleSubmit = () => {
    if (!checkEmail.test(email)) {
      setErrorMessage(true);
      setModalVisible(true);
      console.log("error to be displayed");
    } else {
      console.log("good email");
      setEmail("");
      setModalVisible(false);
      setRecoveredModalVisible(true);
    }
  };
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Forgotten Password</Text>
            <Text style={styles.modalText}>
              Please enter the email address associated with your account {"\n"}{" "}
              What To Watch
            </Text>
            <TouchableOpacity
              style={styles.closeButtonContainer}
              onPress={() => setModalVisible(false)}
            >
              <FontAwesome name="times" size={20} color="white" />
            </TouchableOpacity>
            <View style={styles.inputWrapper}>
              <Icon name="mail-outline" size={24} color="#fff" style={styles.inputIcon} />
              <TextInput
                autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
                keyboardType="email-address" // https://reactnative.dev/docs/textinput#keyboardtype
                textContentType="emailAddress" // https://reactnative.dev/docs/textinput#textcontenttype-ios
                autoComplete="email"
                placeholder="Email address"
                placeholderTextColor="#8e8e93"
                onChangeText={(value) => setEmail(value)}
                value={email}
                style={styles.input}
              />
              </View>
            <View style={styles.buttonWrapper}>
              <CenteredGradientButton
                buttonText="Recover Password"
                onPress={() => handleSubmit()}
              />
            </View>
          </View>
        </View>
      </Modal>
      <RecoveredPasswordModal
        modalVisible={recoveredModalVisible}
        setModalVisible={setRecoveredModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#0d0f2b",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  modalText: {
    fontSize: 15,
    marginBottom: 20,
    ontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  closeButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
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
  buttonWrapper: {
    marginTop: 10, 
    marginBottom: 20,
    height: 40,
    width: "80%",
    textAlign: "center",
  },
});
