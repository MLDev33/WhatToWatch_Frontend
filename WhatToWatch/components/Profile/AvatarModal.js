import React from "react";
import { useState } from 'react';
import { useSelector } from "react-redux";
import { Text, View, TouchableOpacity, StyleSheet, Modal, TextInput, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Avatar } from "react-native-elements";

  //-----POUR RECUPERER L'URL DE L'API EN FONCTION DE L'ENVIRONNEMENT DE TRAVAIL---//
  const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
  const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;

  // Utiliser une condition pour basculer entre les URLs
  //const baseUrl = vercelUrl; // POUR UTILISER AVEC VERCEL
  const baseUrl = localUrl; // POUR UTILISER EN LOCAL


export default function AvatarModal({ avatarModalVisible, setAvatarModalVisible }) {

    const [userAvatar, setUserAvatar]= useState('');

    const user = useSelector((state) => state.user.value);
    let token = user.token;

    const avatars = [
        { key: 1, source: require("../../assets/avatar-1.png"), src: "../assets/avatar-1.png" },
        { key: 2, source: require("../../assets/avatar-2.png"), src: "../assets/avatar-2.png" },
        { key: 3, source: require("../../assets/avatar-3.png"), src: "../assets/avatar-3.png" },
        { key: 4, source: require("../../assets/avatar-4.png"), src: "../assets/avatar-4.png" },
        { key: 5, source: require("../../assets/avatar-5.png"), src: "../assets/avatar-5.png" },
        { key: 6, source: require("../../assets/avatar-6.png"), src: "../assets/avatar-6.png" },
        { key: 7, source: require("../../assets/avatar-7.png"), src: "../assets/avatar-7.png" },
        { key: 8, source: require("../../assets/avatar-8.png"), src: "../assets/avatar-8.png" },
        { key: 9, source: require("../../assets/avatar-9.png"), src: "../assets/avatar-9.png" },
        { key: 10, source: require("../../assets/avatar-10.png"), src: "../assets/avatar-10.png" },
      ];

      const handleSubmit = () => {
        console.log(userAvatar);
        fetch(`${baseUrl}users/avatar/${token}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token: token,
              avatar: userAvatar,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            })
        setAvatarModalVisible(false)
      }
     
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
          <TouchableOpacity style={styles.avatar} onPress={()=> setUserAvatar(item.src)}>
            <Avatar rounded containerStyle={{ height: 50, width: 50 }} source={item.source}/>
          </TouchableOpacity>
        )}
        keyExtractor={avatars.key}
      />
                     
                        <TouchableOpacity
                            onPress={() => handleSubmit()}
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
      avatar: {
        margin: 10,
      }
});