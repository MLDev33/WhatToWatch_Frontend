import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useSelector } from 'react-redux';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const InviteFriendsScreen = () => {
    const user = useSelector((state) => state.user.value);
    let usertoken = user.token;

    const [friendEmail, setFriendEmail] = useState('')
    const [emailConfirmationModal, setEmailConfirmationModal] = useState(false)

    const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
    const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
    const baseUrl = localUrl;

  
    return (
        <View style={styles.container}>
                    <Text style={styles.sectionTitle}>Invite your friends to join What to Watch</Text>
                    <Text style={styles.textH2}>Please enter your friend's email address</Text>
                    <TextInput
          autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
          keyboardType="email-address" // https://reactnative.dev/docs/textinput#keyboardtype
          textContentType="emailAddress" // https://reactnative.dev/docs/textinput#textcontenttype-ios
          autoComplete="email"
          placeholder="Email address"
          placeholderTextColor={'white'}
          onChangeText={(value) => setFriendEmail(value)}
          value={friendEmail}
          style={styles.input}
        />
          <TouchableOpacity
                onPress={() => setEmailConfirmationModal(true)}
                style={styles.button}
                activeOpacity={0.8}
              >
                <Text style={styles.sectionTitle}>Send Email</Text>
              </TouchableOpacity>         
       
              <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Email Sent</Text>
            <TouchableOpacity
              style={styles.closeButtonContainer}
              onPress={() => setModalVisible(false)}
            >
              <FontAwesome name="times" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
            //   onPress={handleSubmit()}
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.modalTitle}>Invite another friend</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0d0f2b",
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 10,
    },
    textH2: {
        marginTop: 10,
        marginHorizontal: 7,
        textAlign: "center",
        color: "white",
        fontSize: 16,
      },
      input: {
        height: 50,
        width: "80%",
        backgroundColor: "rgb(108, 122, 137)",
        borderRadius: 10,
        marginTop: 20,
        paddingLeft: 10,
        fontSize: 18,
      },

});

export default InviteFriendsScreen;