import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Switch,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUsername, updateEmail } from "../reducers/user";
import DeleteAccount from "../components/Profile/DeleteAccount";
import { Avatar } from "react-native-elements";
import AvatarModal from "../components/Profile/AvatarModal";
import { FontAwesome } from "@expo/vector-icons";

const ProfileSettingsScreen = ({
  navigation,
  hasAvatar,
  setHasAvatar,
}) => {
  //-----POUR RECUPERER L'URL DE L'API EN FONCTION DE L'ENVIRONNEMENT DE TRAVAIL---//
  const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
  const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;

  // Utiliser une condition pour basculer entre les URLs
  //const baseUrl = vercelUrl; // POUR UTILISER AVEC VERCEL
  const baseUrl = localUrl; // POUR UTILISER EN LOCAL

  const dispatch = useDispatch();
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [missingFieldError, setMissingFieldError] = useState(false);
  const [PasswordError, setPasswordError] = useState(false);
  const [PasswordErrorMessage, setPasswordErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [wrongEmail, setWrongEmail] = useState(false);
  const [wrongEmailMessage, setWrongEmailMessage] = useState("");

  const user = useSelector((state) => state.user.value);
  let username = user.username;
  let avatar = user.avatar;
  let token = user.token;
  let isGoogleUser = user.googleUser;

  const checkEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
  const checkPassword = RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i);

  const handleNewUsername = () => {
    console.log("button change username clicked");
    fetch(`${baseUrl}users/updateUsername/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        username: newUsername,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // console.log(newUsername);
        if (!data.result) {
          console.log("false");
          setError(true);
          setErrorMessage(data.error);
        } else {
          dispatch(updateUsername(data.username));
          console.log("true");
          setNewUsername("");
        }
        console.log("button change username clicked");
      });
  };

  const handleNewEmail = () => {
    console.log("button change email clicked", newEmail);
    if (!checkEmail.test(newEmail)) {
      setWrongEmail(true);
      setWrongEmailMessage("Please enter a valid email address!");
      console.log("wrongEmail");
    } else {
      fetch(`${baseUrl}users/updateEmail/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          email: newEmail,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log(newUsername);
          if (!data.result) {
            console.log("false");
            setWrongEmail(true);
            setWrongEmailMessage(data.error);
          } else {
            dispatch(updateEmail(data.email));
            console.log("true");
            setNewEmail("");
          }
          console.log("button change email clicked");
        });
    }
  };

  const handleChangePassword = () => {
    if (!userPassword || !newPassword || !confirmNewPassword) {
      setPasswordError(true);
      setPasswordErrorMessage("Please fill in all fields");
      console.log("errorMessageMissingfield");
    } else if (
      checkPassword.test(userPassword) ||
      checkPassword.test(newPassword) ||
      checkPassword.test(confirmNewPassword)
    ) {
      setPasswordError(true);
      setPasswordErrorMessage("Invalid Password");
      console.log("true");
    } else {
      if (newPassword !== confirmNewPassword) {
        console.log("password not matching");
      } else {
        console.log(userPassword, newPassword, confirmNewPassword);
        fetch(`${baseUrl}users/updatePassword/${token}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: token,
            userpassword: userPassword,
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // if (!data.result) {
            //   console.log("false");
            // } else {
            //   console.log("true");
            // }
            console.log("button change password clicked");
          });


      }
    }
 
  };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
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
                <Image
                  source={require("../assets/avatar-1.png")}
                  style={styles.profileImage}
                />
                <Avatar.Accessory size={24} />
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
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <FontAwesome name="times" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>NAME</Text>
        <TextInput
          placeholder="Username"
          placeholderTextColor={"white"}
          autoCapitalize="none"
          onChangeText={(value) => setNewUsername(value)}
          value={newUsername}
          style={styles.input}
        />
        {error && <Text style={styles.error}>{errorMessage}</Text>}

        <TouchableOpacity
          style={styles.button2}
          onPress={() => handleNewUsername()}
        >
          <Text>Confirm</Text>
        </TouchableOpacity>
        {!isGoogleUser ? (
          <>
            <Text style={styles.text}>EMAIL</Text>
            <TextInput
              autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
              keyboardType="email-address" // https://reactnative.dev/docs/textinput#keyboardtype
              textContentType="emailAddress" // https://reactnative.dev/docs/textinput#textcontenttype-ios
              autoComplete="email"
              placeholder="Email address"
              placeholderTextColor={"white"}
              onChangeText={(value) => setNewEmail(value)}
              value={newEmail}
              style={styles.input}
            />
            {wrongEmail && (
              <Text style={styles.error}>{wrongEmailMessage}</Text>
            )}
            <TouchableOpacity
              style={styles.button2}
              onPress={() => handleNewEmail()}
            >
              <Text>Confirm</Text>
            </TouchableOpacity>
            <Text style={styles.text}>LANGUAGE</Text>
            <Text style={styles.text}>PASSWORD</Text>
            <TextInput
              secureTextEntry={true}
              placeholder="Current Password"
              placeholderTextColor={"white"}
              keyboardType="password"
              autoCapitalize="none"
              onChangeText={(value) => {
                setUserPassword(value);
              }}
              value={userPassword}
              style={styles.input}
            />
            <TextInput
              secureTextEntry={true}
              placeholder="New Password"
              placeholderTextColor={"white"}
              keyboardType="password"
              autoCapitalize="none"
              onChangeText={(value) => {
                setNewPassword(value);
              }}
              value={newPassword}
              style={styles.input}
            />
            <TextInput
              secureTextEntry={true}
              placeholder="Confirm New Password"
              placeholderTextColor={"white"}
              keyboardType="password"
              autoCapitalize="none"
              onChangeText={(value) => {
                setConfirmNewPassword(value);
              }}
              value={confirmNewPassword}
              style={styles.input}
            />
            {PasswordError && (
              <Text style={styles.error}>{PasswordErrorMessage}</Text>
            )}
            <TouchableOpacity
              style={styles.button2}
              onPress={() => handleChangePassword()}
            >
              <Text>Confirm Password</Text>
            </TouchableOpacity>
          </>
        ) : (
          <></>
        )}
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0f2b",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  textAndImageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#fff",
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
    color: "#fff",
    fontWeight: "bold",
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    height: 60,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  switchContainer: {
    justifyContent: "space-between",
  },
  logoutButton: {
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    width: "60%",
    paddingVertical: 15,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  button2: {
    backgroundColor: "#F94A56",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  textButton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    width: "80%",
    fontSize: 38,
    fontWeight: "600",
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
  error: {
    textAlign: "center",
    color: "red",
    fontSize: 16,
    margin: 20,
  },
});

export default ProfileSettingsScreen;
