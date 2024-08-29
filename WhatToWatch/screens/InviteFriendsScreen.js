import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Share, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import ShareButton from '../components/ShareButton';

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const InviteFriendsScreen = ({navigation}) => {
    const user = useSelector((state) => state.user.value);
    let usertoken = user.token;

    const [friendEmail, setFriendEmail] = useState('')
    const [emailConfirmationModal, setEmailConfirmationModal] = useState(false)

    const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
    const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
    const baseUrl = localUrl;

    const shareNative = async() => {
      //app link to be added
      const link = `http://www.google.com`;
      try {
        const result = await Share.share({
          message: `Decouvre cette application trop cool pour decouvrir des nouveaux films et series !!'\n${link}`,
          title: `Partage What to Watch avec tes amis !!!`,
          url: link,
        });
        if (result.action === Share.sharedAction) {
          console.log('Partage réussi');
        } else if (result.action === Share.dismissedAction) {
          console.log('Partage annulé');
        }
      } catch (error) {
        console.error('Erreur lors du partage', error);
      }
    };

    return (
        <SafeAreaView style={styles.container}>
           <Image
            source={require("../assets/imgsmall.png")}
            style={styles.logo}
          />
                    <Text style={styles.sectionTitle}>Invite your friends to join {'\n'} What to Watch</Text>
                    {/* //react native share// */}
                    {/* <Text style={styles.textH2}>Please enter your friend's email address</Text> */}
                    {/* <TextInput
          autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
          keyboardType="email-address" // https://reactnative.dev/docs/textinput#keyboardtype
          textContentType="emailAddress" // https://reactnative.dev/docs/textinput#textcontenttype-ios
          autoComplete="email"
          placeholder="Email address"
          placeholderTextColor={'white'}
          onChangeText={(value) => setFriendEmail(value)}
          value={friendEmail}
          style={styles.input}
        /> */}
          {/* <TouchableOpacity
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
      > */}
        {/* <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Email Sent</Text> */}
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
            <ShareButton onShare={shareNative} />
          {/* </View> */}
        {/* // </View> */}
      {/* // </Modal> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0d0f2b",
        paddingHorizontal: 10,
        paddingTop: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    textH2: {
        marginTop: 10,
        marginHorizontal: 7,
        textAlign: "center",
        color: "white",
        fontSize: 16,
      },
      // input: {
      //   height: 50,
      //   width: "80%",
      //   backgroundColor: "rgb(108, 122, 137)",
      //   borderRadius: 10,
      //   marginTop: 20,
      //   paddingLeft: 10,
      //   fontSize: 18,
      // },
      logo: {
       marginBottom: 100,
      }

});

export default InviteFriendsScreen;