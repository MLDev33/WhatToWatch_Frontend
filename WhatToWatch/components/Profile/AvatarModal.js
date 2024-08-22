import React from "react";
import { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Modal, TextInput, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Avatar } from "react-native-elements";



export default function AvatarModal({ avatarModalVisible, setAvatarModalVisible }) {

    const avatars = [
        { key: 1, source: "../assets/avatar-1.png" },
        { key: 2, source: "../assets/avatar-2.png" },
        { key: 3, source: "../assets/avatar-3.png" },
        { key: 4, source: "../assets/avatar-4.png" },
        { key: 5, source: "../assets/avatar-5.png" },
        { key: 6, source: "../assets/avatar-6.png" },
        { key: 7, source: "../assets/avatar-7.png" },
        { key: 8, source: "../assets/avatar-8.png" },
        { key: 9, source: "../assets/avatar-9.png" },
        { key: 10, source: "../assets/avatar-10.png" },
      ];

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={avatarModalVisible}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        
                        <TouchableOpacity
                            style={styles.closeButtonContainer}
                            onPress={() => setAvatarModalVisible(false)}
                        >
                            <FontAwesome name="times" size={20} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Choose your avatar</Text>
                        <FlatList
        data={avatars}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
          // style={styles.providers}
          // onPress={() => {
          //   setSelectedProviders((providers) => [
          //     ...providers,
          //     item.id,
          //   ]);
          // }}
          >
            <Avatar rounded containerStyle={{ height: 50, width: 50 }} />
          </TouchableOpacity>
        )}
        keyExtractor={avatars.key}
      />
                     
                        <TouchableOpacity
                            // onPress={() => handleSubmit()}
                            style={styles.button}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.modalTitle}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        width: "80%",
        padding: 20,
        backgroundColor: "#0d0f2b",
        borderRadius: 10,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
        color: "white",
    },
    closeButtonContainer: {
        position: 'absolute',
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
        paddingLeft: 10
      },
});