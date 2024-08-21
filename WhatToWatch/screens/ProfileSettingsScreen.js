import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Switch, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState  } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { logout } from "../reducers/user";
import DeleteAccount from "../components/Profile/DeleteAccount";
import { Avatar } from "react-native-elements";



const ProfileSettingsScreen = ({   navigation }) => {


  const dispatch = useDispatch();
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);



    /*
<Avatar
        rounded
        containerStyle={{ height: 50, width: 50 }}
        source={require("../assets/avatar-1.png")}
      />
     

    */



  const user = useSelector((state) => state.user.value);
  let username = user.username;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image 
            source={require("../assets/imgsmall.png")}
            style={styles.logo}
          />
          <View style={styles.textAndImageContainer}>
            <Text style={styles.text}>{username}</Text>
            <Image
              source={require("../assets/avatar-1.png")}
              style={styles.profileImage}
            />
          </View>
        </View>
        <Text style={styles.username}>Profil</Text>
      </View>

      <View style={styles.section}>
        <LinearGradient
          colors={['#7C4DFF', '#F94A56', '#FF1744']}
          start={{ x: 0, y: 0 }}
          end={{ x: 2, y: 5 }}
          style={styles.buttonContainer}
        >
          <TouchableOpacity style={styles.button}>
            <Icon name="settings-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Profile setting</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={['#7C4DFF', '#F94A56', '#FF1744']}
          start={{ x: 0, y: 0 }}
          end={{ x: 2, y: 5 }}
          style={styles.buttonContainer}
        >
          <TouchableOpacity style={styles.button}>
            <Icon name="time-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Watch history</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={['#7C4DFF', '#F94A56', '#FF1744']}
          start={{ x: 0, y: 0 }}
          end={{ x: 2, y: 5 }}
          style={styles.buttonContainer}
        >
          <TouchableOpacity style={styles.button}>
            <Icon name="calendar-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Watch schedule</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={['#7C4DFF', '#F94A56', '#FF1744']}
          start={{ x: 0, y: 0 }}
          end={{ x: 2, y: 5 }}
          style={styles.buttonContainer}
        >
          <TouchableOpacity style={styles.button}>
            <Icon name="people-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Invite your friends</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={['#7C4DFF', '#F94A56', '#FF1744']}
          start={{ x: 0, y: 0 }}
          end={{ x: 2, y: 5 }}
          style={styles.buttonContainer}
        >
          <TouchableOpacity style={styles.button}>
            <Icon name="tv-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Streaming platforms</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient
          colors={['#7C4DFF', '#F94A56', '#FF1744']}
          start={{ x: 0, y: 0 }}
          end={{ x: 2, y: 5 }}
          style={[styles.button, styles.switchContainer]}
        >
          <Icon name="moon-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Dark mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            thumbColor={darkMode ? "#3B2077" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </LinearGradient>

        <LinearGradient
          colors={['#7C4DFF', '#F94A56', '#FF1744']}
          start={{ x: 0, y: 0 }}
          end={{ x: 2, y: 5 }}
          style={[styles.button, styles.switchContainer]}
        >
          <Icon name="notifications-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Publish notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            thumbColor={notifications ? "#3B2077" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </LinearGradient>
      </View>

      <LinearGradient
        colors={['#7C4DFF', '#F94A56', '#FF1744']}
        start={{ x: 0, y: 0 }}
        end={{ x: 2, y: 5 }}
        style={styles.logoutButton}
      >
        <TouchableOpacity onPress={handleLogOut}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </LinearGradient>
      <TouchableOpacity
        style={styles.button2}
        activeOpacity={0.8}
        onPress={() => setDeleteAccountModalVisible(true)}
      >
        <Text style={styles.textButton}>DELETE ACCOUNT</Text>
      </TouchableOpacity>

      <DeleteAccount
        deleteAccountModalVisible={deleteAccountModalVisible}
        setDeleteAccountModalVisible={setDeleteAccountModalVisible}
      />
    </View>
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