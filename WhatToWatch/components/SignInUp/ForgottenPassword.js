import React from "react";
import { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import RecoveredPasswordModal from "./RecoveredPassword";


const checkEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

export default function ForgottenPassword({ modalVisible, setModalVisible }) {

    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const [recoveredModalVisible, setRecoveredModalVisible] = useState(false);

    const handleSubmit = () => {
        if (!checkEmail.test(email)) {
            setErrorMessage(true);
            setModalVisible(true);
            console.log('error to be displayed');
        } else {
            console.log("good email");
            setModalVisible(false);
            setRecoveredModalVisible(true);
        }
    };
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Forgotten Password</Text>
                        <Text style={styles.modalTitle}>Please enter the email address associated with your account {'\n'} What To Watch</Text>
                        <TouchableOpacity
                            style={styles.closeButtonContainer}
                            onPress={() => setModalVisible(false)}
                        >
                            <FontAwesome name="times" size={20} color="black" />
                        </TouchableOpacity>
                        <TextInput
                            autoCapitalize="none"
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            autoComplete="email"
                            placeholder="Email address"
                            onChangeText={(value) => setEmail(value)}
                            value={email}
                            style={styles.input}
                        />
                        <TouchableOpacity
                            onPress={() => handleSubmit()}
                            style={styles.button}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.modalTitle}>Recover Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <RecoveredPasswordModal modalVisible={recoveredModalVisible} setModalVisible={setRecoveredModalVisible} />
        </View>
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