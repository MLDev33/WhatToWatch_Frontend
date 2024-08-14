import React from "react";
import { Text, View, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function ForgottenPassword({ modalVisible, setModalVisible }) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Forgotten Password</Text>
                    <TouchableOpacity
                        style={styles.closeButtonContainer}
                        onPress={() => setModalVisible(false)}
                    >
                        <FontAwesome name="times" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
    },
    closeButtonContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});