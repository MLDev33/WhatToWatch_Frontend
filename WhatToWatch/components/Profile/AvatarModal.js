import React from "react";
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Text, View, TouchableOpacity, StyleSheet, Modal, TextInput, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Avatar } from "react-native-elements";
import { addAvatar } from "../../reducers/user";

  //-----POUR RECUPERER L'URL DE L'API EN FONCTION DE L'ENVIRONNEMENT DE TRAVAIL---//
  const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
  const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;

  // Utiliser une condition pour basculer entre les URLs
  //const baseUrl = vercelUrl; // POUR UTILISER AVEC VERCEL
  const baseUrl = localUrl; // POUR UTILISER EN LOCAL


export default function AvatarModal({ avatarModalVisible, setAvatarModalVisible }) {

    const dispatch = useDispatch();

    const [userAvatar, setUserAvatar]= useState('');

    const user = useSelector((state) => state.user.value);
    let token = user.token;
    let avatar = user.avatar;
    let username = user.username

    const avatars = [
        { key: 1, url: "https://res.cloudinary.com/ddr0yckcq/image/upload/v1724492055/avatar-1_wrlvvd.png" },
        { key: 2, url: "https://res.cloudinary.com/ddr0yckcq/image/upload/v1724492529/avatar-2_r7qn9b.png" },
        { key: 3, url: "https://res.cloudinary.com/ddr0yckcq/image/upload/v1724492663/avatar-3_wboses.png"  },
        { key: 4, url: "https://res.cloudinary.com/ddr0yckcq/image/upload/v1724492697/avatar-4_up8rg1.png"  },
        { key: 5, url: "https://res.cloudinary.com/ddr0yckcq/image/upload/v1724492742/avatar-5_dwnesx.png"  },
        { key: 6, url: "https://res.cloudinary.com/ddr0yckcq/image/upload/v1724492757/avatar-6_jwwjza.png"  },
        { key: 7, url: "https://res.cloudinary.com/ddr0yckcq/image/upload/v1724492762/avatar-7_n733v6.png"  },
        { key: 8, url: "https://res.cloudinary.com/ddr0yckcq/image/upload/v1724492788/avatar-8_plhqnh.png"  },
        { key: 9, url: "https://res.cloudinary.com/ddr0yckcq/image/upload/v1724492813/avatar-9_l58snb.png"  },
        { key: 10, url: "https://res.cloudinary.com/ddr0yckcq/image/upload/v1724492820/avatar-10_hwbhpp.png" },
      ];

      const handleSubmit = () => {
        console.log(userAvatar, '1stlog"');
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
              if(data.result){
                console.log(data.avatar, '1')
                dispatch(addAvatar(data.avatar))
              }
            })

        setAvatarModalVisible(false)
       
      }
      console.log(avatar, '2')

      
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
        renderItem={({ item }) => {
          return (
      
          <TouchableOpacity style={styles.avatar} onPress={()=> setUserAvatar(item.url)}>
            <Avatar rounded containerStyle={{ height: 50, width: 50 }} source={{uri: item.url}}/>
          </TouchableOpacity>
    )}}
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