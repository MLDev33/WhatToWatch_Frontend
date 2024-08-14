import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Modal } from 'react-native';

export default function ForgottenPassword() {

    return (
        <Modal
              animationType="slide"
              transparent={true}
            //   visible={platformModalVisible}
             
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Test</Text>
                  <TouchableOpacity
                    style={styles.closeButtonContainer}
                    // onPress={() => setPlatformModalVisible(false)}
                  >
                    <FontAwesome name="times" size={20} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
      )

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
      alignItems: "flex-start",
      position: "relative",
    },
    closeButton: {
      position: "absolute",
      top: 10,
      right: 10,
      zIndex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      borderRadius: 15,
      padding: 5,
    },
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