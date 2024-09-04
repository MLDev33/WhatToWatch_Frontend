import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import CenteredGradientButton from "../CenteredGradientButton";

const RecoveredPasswordModal = ({ modalVisible, setModalVisible }) => {
  return (

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Email Sent</Text>
            <Text style={styles.modalText}>
              If an account with this email address exists, a password reset
              link will be sent. The link will expire in 2 hours for security
              reasons.{" "}
            </Text>
            <TouchableOpacity
              style={styles.closeButtonContainer}
              onPress={() => setModalVisible(false)}
            >
              <FontAwesome name="times" size={20} color="white" />
            </TouchableOpacity>
            <View style={styles.mainButtonContainer}>
            <CenteredGradientButton
              style={{ height: 40, width: 40 }}
              buttonText="Resend Email"
            />
          </View>
          </View>
        </View>
      </Modal>
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
      padding: 40,
      backgroundColor: "#0d0f2b",
      borderRadius: 10,
      alignItems: "center",
  },
  modalTitle: {
      fontSize: 20,
      marginBottom: 20,
      color: "white",
      fontWeight: 'bold',
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 20,
    color: "white",
},
  closeButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  mainButtonContainer: {
    marginTop: 40,
    height: 40,
    width: "80%",
    justifyContent: "center",
    textAlign: "center",
  },
});

export default RecoveredPasswordModal;
