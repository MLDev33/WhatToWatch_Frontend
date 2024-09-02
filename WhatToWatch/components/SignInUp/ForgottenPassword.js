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
import GradientButton from "../GradientButton";

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
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
              placeholder="Email address"
              placeholderTextColor={"white"}
              onChangeText={(value) => setEmail(value)}
              value={email}
              style={styles.input}
            />
            {/* <GradientButton
              // iconName="login"
            //   style={{ height: 30, width: 100 }}
              buttonText="Login"
              onPress={() => handleSubmit()}
            /> */}
            {/* <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.modalTitle}>Recover Password</Text>
            </TouchableOpacity> */}

            <View style={styles.mainButtonContainer}>
              <GradientButton
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
    // height: "60%",
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
  input: {
    height: 50,
    width: "80%",
    backgroundColor: "rgb(108, 122, 137)",
    borderRadius: 10,
    marginTop: 20,
    fontSize: 18,
    color: "white",
    paddingLeft: 10,
  },
  mainButtonContainer: {
    marginTop: 40,
    height: 40,
    width: "80%",
    justifyContent: "center",
    textAlign: "center",
  },
});
