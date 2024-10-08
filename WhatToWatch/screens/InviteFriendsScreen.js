import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Share, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import ShareButton from '../components/ShareButton';
import Icon from "react-native-vector-icons/Ionicons";
import CenteredGradientButton from '../components/CenteredGradientButton';
import arrowLeftIcon from "../assets/Icons/arrowLeftIcon.png";

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
           <View style={styles.backButtonView}>
             <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={styles.backButton} source={arrowLeftIcon} />
          </TouchableOpacity>
        </View>
           <Image
            source={require("../assets/imgsmall.png")}
            style={styles.logo}
          />
                    <Text style={styles.sectionTitle}>Invite your friends to join {'\n'}           What to Watch</Text>
       
            <View style={styles.buttonWrapper}>
                        <CenteredGradientButton
                          iconName="share"
                          buttonText="Send invitation"
                          onPress={() => shareNative()}
                        />
                      </View>
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
      logo: {
       marginBottom: 100,
      },
      backButton: {
        flexDirection: "row",
        right: 180,
        top: -160
      },
      backButtonText: {
        fontSize: 16,
        color: "#007BFF",
      },
      buttonWrapper: {
        marginTop: 40,
        marginBottom: 20,
        width: '60%',
      },
      backButton: {
        justifyContent: "flex-start",
        right: 180,
        bottom: 120,
      },

});

export default InviteFriendsScreen;