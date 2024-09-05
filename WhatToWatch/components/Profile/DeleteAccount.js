import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import DeleteAccountConfirmation from "./DeleteAccountConfirmation";
import CenteredGradientButton from "../CenteredGradientButton";
import Icon from "react-native-vector-icons/Ionicons";

//-----POUR RECUPERER L'URL DE L'API EN FONCTION DE L'ENVIRONNEMENT DE TRAVAIL---//
const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
// Utiliser une condition pour basculer entre les URLs
//const baseUrl = vercelUrl; // POUR UTILISER AVEC VERCEL
const baseUrl = localUrl; // POUR UTILISER EN LOCAL

const DeleteAccount = ({
  deleteAccountModalVisible,
  setDeleteAccountModalVisible,
}) => {
  const [
    deleteAccountConfirmationModalVisible,
    setDeleteAccountConfirmationModalVisible,
  ] = useState(false);

  const handleDeleteButton = () => {
    setDeleteAccountModalVisible(false);
    setDeleteAccountConfirmationModalVisible(true);
  };

  const handleCloseButton = () => {
    setDeleteAccountModalVisible(false);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteAccountModalVisible}
        onRequestClose={handleCloseButton}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Delete Account</Text>
              <Icon
                name="warning-outline"
                size={120}
                color="red"
                style={styles.inputIcon}
              />
              {/* <FontAwesome
                name="exclamation"
                size={80}
                color="red"
                style={styles.exclamationIcon}
              /> */}
              <Text style={styles.modalText}>
                Are you sure you want to delete your account ?
              </Text>
              <View style={styles.modalButtons}>
                <View style={styles.modalButtonWrapper}>
                  <CenteredGradientButton
                    buttonText="Cancel"
                    onPress={() => handleCloseButton()}
                  />
                </View>
                <View style={styles.modalButtonWrapper}>
                  <CenteredGradientButton
                    buttonText="Delete Account"
                    onPress={() => handleDeleteButton()}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <DeleteAccountConfirmation
        modalVisible={deleteAccountConfirmationModalVisible}
        setModalVisible={setDeleteAccountConfirmationModalVisible}
      />
    </View>
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
    marginBottom: 20,
    fontWeight: "bold",
    color: "white",
  },
  modalText: {
    fontSize: 15,
    marginBottom: 20,
    ontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  textH2: {
    marginTop: 10,
    marginHorizontal: 7,
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
  exclamationIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtons: {
    flexDirection: "row",
    // marginHorizontal: 10,
    // flexWrap: 'wrap',
  },
  modalButtonWrapper: {
    flex: 1,
    // flexWrap: 'wrap',
    marginRight: 10,
    textAlign: 'center',

  },
});

export default DeleteAccount;
