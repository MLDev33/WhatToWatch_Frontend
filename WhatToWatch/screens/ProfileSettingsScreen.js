import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Switch, Image, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState  } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { logout } from "../reducers/user";
import DeleteAccount from "../components/Profile/DeleteAccount";
import { Avatar } from "react-native-elements";
import AvatarModal from "../components/Profile/AvatarModal";
import { FontAwesome } from '@expo/vector-icons';




const ProfileSettingsScreen = ({ navigation, hasAvatar, setHasAvatar }) => {


  const dispatch = useDispatch();
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);

  const user = useSelector((state) => state.user.value);
  let username = user.username;
  let avatar = user.avatar

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image 
            source={require("../assets/imgsmall.png")}
            style={styles.logo}
          />
          <View style={styles.textAndImageContainer}>
            <Text style={styles.text}>{username}</Text>
            {avatar === undefined ? (
              <TouchableOpacity onPress={() => setAvatarModalVisible(true)}>
                <Avatar
                  size={84}
                  rounded
                  icon={{ name: "pencil", type: "font-awesome" }}
                  containerStyle={{ backgroundColor: "#6733b9" }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setAvatarModalVisible(true)}>
                <Image source={{ uri: avatar }} style={styles.profileImage} />
                <Avatar.Accessory size={24} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text style={styles.username}>Profile Settings</Text>
        <TouchableOpacity
                            style={styles.closeButtonContainer}
                            onPress={() => navigation.navigate('ProfileScreen')}
                        >
                            <FontAwesome name="times" size={20} color="white" />
                        </TouchableOpacity>
      </View>

      <View style={styles.section}>
      <Text style={styles.text}>NAME</Text>
      <Text style={styles.text}>EMAIL</Text>
      <Text style={styles.text}>PHONE NUMBER</Text>
      <Text style={styles.text}>LANGUAGE</Text>
      <Text style={styles.text}>PASSWORD</Text>
      <Text style={styles.text}>ACCOUNT</Text>
    

      </View>

      <TouchableOpacity
        style={styles.button2}
        activeOpacity={0.8}
        onPress={() => setDeleteAccountModalVisible(true)}
      >
        <Text style={styles.textButton}>DELETE ACCOUNT</Text>
      </TouchableOpacity>

      <AvatarModal
        avatarModalVisible={avatarModalVisible}
        setAvatarModalVisible={setAvatarModalVisible}
      />
      
      <DeleteAccount
        deleteAccountModalVisible={deleteAccountModalVisible}
        setDeleteAccountModalVisible={setDeleteAccountModalVisible}
      />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0f2b',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  textAndImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#fff',
    marginRight: 10,
  },
  logo: {
    width: 100,
    height: 80,
    borderRadius: 40,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  username: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
  },
  section: {
    marginBottom: 20,
  },
  buttonContainer: {
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    height: 60,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  switchContainer: {
    justifyContent: 'space-between',
  },
  logoutButton: {
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    width: '60%',
    paddingVertical: 15,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button2: {
    backgroundColor: '#F94A56',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  textButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileSettingsScreen;