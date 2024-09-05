import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
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
import Header from "../components/Header";
import arrowLeftIcon from "../assets/Icons/arrowLeftIcon.png";

const ProfileSettingsScreen = ({ navigation, hasAvatar, setHasAvatar }) => {
  //-----POUR RECUPERER L'URL DE L'API EN FONCTION DE L'ENVIRONNEMENT DE TRAVAIL---//
  const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
  const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;

  // Utiliser une condition pour basculer entre les URLs
  //const baseUrl = vercelUrl; // POUR UTILISER AVEC VERCEL
  const baseUrl = vercelUrl; // POUR UTILISER EN LOCAL

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
  const [rightIcon, setRightIcon] = useState("eye");
  const [hidePassword, setHidePassword] = useState(true);

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
          setError(true);
          setErrorMessage("Username updated!");
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
      setWrongEmail(false);
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
            setWrongEmail(true);
            setWrongEmailMessage("Email address updated!");
          }
          console.log("button change email clicked");
        });
    }
  };

  const handlePasswordVisibility = () => {
    setRightIcon(rightIcon === "eye" ? "eye-slash" : "eye");
    setHidePassword(!hidePassword);
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
        setPasswordError(true);
        setPasswordErrorMessage("Passwords not matching");
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
            setPasswordError(true);
            setPasswordErrorMessage("Password updated !");
          });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.header}>
      <Header
        username={username}
        avatar={avatar}
        setAvatarModalVisible={setAvatarModalVisible}
        isProfileScreen={true}
      />
      </View>
      {/* <View style={styles.header}> */}
        {/* <View style={styles.leftIconContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image style={styles.leftIcon} source={arrowLeftIcon} />
                    </TouchableOpacity>
                </View> */}
        {/* <View style={styles.headerContent}> */}
        {/* <Image
            source={require("../assets/imgsmall.png")}
            style={styles.logo}
          /> */}
        {/* <View style={styles.textAndImageContainer}>
            {/* <Text style={styles.text}>{username}</Text> */}
        {/* {avatar === undefined ? (
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
            )} */}
        {/* </View> */}
        {/* </View> */}

        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={styles.leftIcon} source={arrowLeftIcon} />
          </TouchableOpacity>

          <Icon
            name="settings-outline"
            size={24}
            color="#fff"
            style={styles.settingsIcon}
          />
        </View>
        <View style={styles.titleView}>
          <View style={styles.bottomBar}>
            <Text style={styles.title}>Profile Settings</Text>

            {/* <Icon
            name="settings-outline"
            size={24}
            color="#fff"
            style={styles.settingsIcon}
          /> */}
          </View>
        </View>
      {/* </View> */}
      <ScrollView>
        <View style={styles.section}>
        <View style={styles.bottomBar}>
          <Text style={styles.sectionTitle}>NAME</Text>
          </View>
          <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Icon
              name="person-outline"
              size={24}
              color="#fff"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Username"
              placeholderTextColor="#8e8e93"
              autoCapitalize="none"
              onChangeText={(value) => setNewUsername(value)}
              value={newUsername}
              style={styles.input}
            />
          </View>
          </View>
          {error && <Text style={styles.error}>{errorMessage}</Text>}
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.button2}
              onPress={() => handleNewUsername()}
            >
              <Text style={styles.buttonText}>Change Username</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* if GoogleUser, user cannot change email or password */}
        <View style={styles.section}>
          {!isGoogleUser ? (
            <>
            <View style={styles.bottomBar}>
              <Text style={styles.sectionTitle}>EMAIL</Text>
              </View>
              <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Icon
                  name="mail-outline"
                  size={24}
                  color="#fff"
                  style={styles.inputIcon}
                />
                <TextInput
                  autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
                  keyboardType="email-address" // https://reactnative.dev/docs/textinput#keyboardtype
                  textContentType="emailAddress" // https://reactnative.dev/docs/textinput#textcontenttype-ios
                  autoComplete="email"
                  placeholder="Email address"
                  placeholderTextColor="#8e8e93"
                  onChangeText={(value) => setNewEmail(value)}
                  value={newEmail}
                  style={styles.input}
                />
              </View>
</View>
              {wrongEmail && (
                <Text style={styles.error}>{wrongEmailMessage}</Text>
              )}
              <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => handleNewEmail()}
                >
                  <Text style={styles.buttonText}>Change Email</Text>
                </TouchableOpacity>
              </View>
              {/* <View style={styles.section}> */}
              {/* <View style={styles.bottomBar}> */}
                {/* <Text style={styles.sectionTitle}>LANGUAGE</Text> */}
                {/* </View> */}
                {/* <View style={styles.buttonWrapper}> */}
                  {/* <TouchableOpacity
                    style={styles.button2}
                    onPress={console.log("Button language")}
                  >
                    <Text style={styles.buttonText}>Confirm</Text>
                  </TouchableOpacity> */}
                {/* </View> */}
              {/* </View> */}

              <View style={styles.section}>
              <View style={styles.bottomBar}>
                <Text style={styles.sectionTitle}>PASSWORD</Text>
                </View>
                <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Icon
                    name="lock-closed-outline"
                    size={24}
                    color="#fff"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    secureTextEntry={hidePassword}
                    placeholder="Current Password"
                    placeholderTextColor="#8e8e93"
                    autoCapitalize="none"
                    onChangeText={(value) => setUserPassword(value)}
                    value={userPassword}
                    style={styles.input}
                  />
                  <TouchableOpacity
                    onPress={handlePasswordVisibility}
                    style={styles.eyeIcon}
                  >
                    <Icon
                      name={hidePassword ? "eye-outline" : "eye-off-outline"}
                      size={24}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputWrapper}>
                  <Icon
                    name="lock-closed-outline"
                    size={24}
                    color="#fff"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    secureTextEntry={hidePassword}
                    placeholder="New Password"
                    placeholderTextColor="#8e8e93"
                    autoCapitalize="none"
                    onChangeText={(value) => setNewPassword(value)}
                    value={newPassword}
                    style={styles.input}
                  />
                  <TouchableOpacity
                    onPress={handlePasswordVisibility}
                    style={styles.eyeIcon}
                  >
                    <Icon
                      name={hidePassword ? "eye-outline" : "eye-off-outline"}
                      size={24}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputWrapper}>
                  <Icon
                    name="lock-closed-outline"
                    size={24}
                    color="#fff"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    secureTextEntry={hidePassword}
                    placeholder="Confirm New Password"
                    placeholderTextColor="#8e8e93"
                    autoCapitalize="none"
                    onChangeText={(value) => setConfirmNewPassword(value)}
                    value={confirmNewPassword}
                    style={styles.input}
                  />
                  {/* </View> */}
                  <TouchableOpacity
                    onPress={handlePasswordVisibility}
                    style={styles.eyeIcon}
                  >
                    <Icon
                      name={hidePassword ? "eye-outline" : "eye-off-outline"}
                      size={24}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
                </View>
                {/* </View> */}
                {PasswordError && (
                  <Text style={styles.error}>{PasswordErrorMessage}</Text>
                )}
                {/* <TouchableOpacity
                  style={styles.button2}
                  onPress={() => handleChangePassword()}
                >
                  <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity> */}

                <View style={styles.buttonWrapper}>
                  <TouchableOpacity
                    style={styles.button2}
                    onPress={() => handleChangePassword()}
                  >
                    <Text style={styles.buttonText}>Change Password</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <></>
          )}

          <View style={styles.section}>
          <View style={styles.bottomBar}>
            <Text style={styles.sectionTitle}>ACCOUNT</Text>
            </View>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={styles.button2}
                activeOpacity={0.8}
                onPress={() => setDeleteAccountModalVisible(true)}
              >
                <Text style={styles.textButton}>DELETE ACCOUNT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

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
    marginVertical: 20,
    paddingHorizontal: 10,
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
  title: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginVertical: 5,
  },
  sectionTitle: {
    textAlign: "flex-start",
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginVertical: 5,
  },
  section: {
    borderColor: "red",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  button2: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 1,
    opacity: 0.7,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    width: "60%",
  },
  textButton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    marginTop: 15,
    paddingHorizontal: 10,
  },
  inputIcon: {
    paddingLeft: 5,
  },
  input: {
    flex: 1,
    height: 50,
    color: "white",
    paddingLeft: 10,
  },
  error: {
    textAlign: "center",
    color: "red",
    fontSize: 16,
    margin: 20,
  },
  backButton: {
    flexDirection: "row",
    paddingTop: 20,
    right: 180,
  },
  backButtonText: {
    fontSize: 16,
    color: "#007BFF",
  },
  buttonWrapper: {
    alignItems: "center",
  },
  titleView: {
    flexDirection: "row",
  },
  bottomBar: {
    flex: 1,
    borderBottomColor: "#7C4DFF",
    borderBottomWidth: 2,
    marginHorizontal: 15,
    marginVertical: 20,
  },
  inputContainer: {
    marginHorizontal: 15,
  },
  // iconsContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignContent: "space-around",
  // }
});

export default ProfileSettingsScreen;
