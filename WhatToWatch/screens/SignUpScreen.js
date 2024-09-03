import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ImageBackground,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import GradientButton from "../components/GradientButton";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { jwtDecode } from "jwt-decode";
import Icon from "react-native-vector-icons/Ionicons";

WebBrowser.maybeCompleteAuthSession();

export default function SignUp({ navigation }) {
  //google signup//
  const webClientId =
    "226449682566-nqg576flhhq5oq2cu9174i2u1pfup607.apps.googleusercontent.com";
  const androidClientId =
    "226449682566-6865tj5olk8helr5ovkquli7otr2pljq.apps.googleusercontent.com";
  const iosClientId =
    "226449682566-3inppfas8ej8qmd99qpf9pqlgp9pp4pn.apps.googleusercontent.com";

  const config = {
    webClientId,
    iosClientId,
    androidClientId,
  };

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  const handleToken = () => {
    if (response?.type === "success") {
      // const{authentication} = response;
      const token = response?.authentication?.idToken;
      const decodedToken = jwtDecode(token);
      const googleUser = decodedToken?.name;
      const googleUserEmail = decodedToken?.email;
      console.log(jwtDecode(token), googleUser, "google ok !");
      // console.log(jwtDecode(googleUser), 'google ok !')
      fetch(`${baseUrl}users/checkUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: googleUser,
          email: googleUserEmail,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.result === false) {
            console.log(data.error);
            setError(true);
            setErrorMessage(data.error);
          } else {
            setGoogleUser(googleUser);
            setGoogleUserEmail(googleUserEmail);
            setPlatformsModalVisible(true);
            setIsGoogleUser(true);
          }
        });
    }
  };

  useEffect(() => {
    handleToken();
  }, [response]);

  const dispatch = useDispatch();

  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);
  const [credentialError, setCredentialError] = useState("");
  const [missingFieldError, setMissingFieldError] = useState(false);
  const [rightIcon, setRightIcon] = useState("eye");
  const [hidePassword, setHidePassword] = useState(true);
  const [validPassword, setValidPassword] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [strength, setStrength] = useState("");
  const [platformsModalVisible, setPlatformsModalVisible] = useState(false);
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [googleUser, setGoogleUser] = useState("");
  const [googleUserEmail, setGoogleUserEmail] = useState("");

  const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
  const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
  const baseUrl = localUrl;

  const checkEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
  const checkPassword = RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i);

  const validatePassword = (input) => {
    let newSuggestions = [];
    if (input.length < 8) {
      newSuggestions.push("At least 8 characters");
    }
    if (!/\d/.test(input)) {
      newSuggestions.push("At least one number");
    }

    if (!/[A-Z]/.test(input) || !/[a-z]/.test(input)) {
      newSuggestions.push("Both upper and lower case letters");
    }

    if (!/[^A-Za-z0-9]/.test(input)) {
      newSuggestions.push("At least one special character");
    }

    setSuggestions(newSuggestions);

    if (newSuggestions.length === 0) {
      setStrength("Very Strong Password");
    } else if (newSuggestions.length <= 1) {
      setStrength("Strong Password");
    } else if (newSuggestions.length <= 2) {
      setStrength("Moderate Password");
    } else if (newSuggestions.length <= 3) {
      setStrength("Weak Password");
    } else {
      setStrength("Too Weak Password");
    }
  };

  //penser a ajouter logo
  //list updated with platforms that provide results
  const providers = [
    { id: 119, name: "Amazon Prime Video" },
    { id: 337, name: "Disney Plus" },
    { id: 8, name: "Netflix" },
    { id: 381, name: "Canal+" },
    { id: 2, name: "Apple TV" },
    { id: 283, name: "Crunchyroll" },
    { id: 11, name: "MUBI" },
    { id: 192, name: "YouTube" },
    { id: 35, name: "Rakuten TV" },
    { id: 56, name: "OCS" },
    //universal only one movie on trendings
    { id: 184, name: "Universal Pictures" },
    { id: 234, name: "Arte" },
    { id: 236, name: "France TV" },
  ];

  const handlePasswordVisibility = () => {
    setRightIcon(rightIcon === "eye" ? "eye-slash" : "eye");
    setHidePassword(!hidePassword);
  };

  const handleRegister = () => {
    if (!signUpEmail || !signUpPassword || !signUpUsername) {
      setError(true);
      setMissingFieldError(true);
      setErrorMessage("Please complete all fields to register !");
      console.log("errorMessageMissingfield");
      return;
    }
    if (!checkEmail.test(signUpEmail)) {
      setWrongEmail(true);
      console.log("wrongEmail");
    }
    // else if (!checkPassword.test(signUpPassword)) {
    //   setError(true);
    //   setErrorMessage('Password not valid')
    //   setValidPassword(false);
    //   console.log("wrongEmail");
    // }
    else {
      fetch(`${baseUrl}users/checkUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: signUpUsername,
          email: signUpEmail,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.result === false) {
            console.log(data.error);
            setError(true);
            setErrorMessage(data.error);
          } else {
            setPlatformsModalVisible(true);
            setGoogleUser(false);
          }
        });
    }
  };

  const handleSubmit = () => {
    if (selectedProviders.length < 1) {
      setErrorMessage(true);
    } else {
      fetch(`${baseUrl}users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: signUpUsername,
          email: signUpEmail,
          password: signUpPassword,
          favouritePlatforms: selectedProviders,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Something went wrong: " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          console.log(selectedProviders, "providers");
          if (data.result === true) {
            dispatch(
              login({
                username: signUpUsername,
                token: data.token,
                email: data.email,
              })
            );
            setSignUpEmail("");
            setSignUpUsername("");
            setSignUpPassword("");
            setSelectedProviders([]);
            navigation.navigate("TabNavigator");
            setPlatformsModalVisible(false);
          } else {
            setCredentialError(data.error);
          }
          console.log("button clicked");
        })
        .catch((error) => {
          console.error("Error during sign up:", error);
        });
    }
  };

  const handleSubmitWithGoogle = () => {
    if (selectedProviders.length < 1) {
      setErrorMessage(true);
    } else {
      fetch(`${baseUrl}users/signupWithGoogle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: googleUser,
          email: googleUserEmail,
          favouritePlatforms: selectedProviders,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Something went wrong: " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          console.log(selectedProviders, "providers");
          if (data.result === true) {
            dispatch(
              login({
                username: googleUser,
                token: data.token,
                email: data.email,
                googleUser: true,
              })
            );
            setSelectedProviders([]);
            navigation.navigate("TabNavigator");
            setPlatformsModalVisible(false);
          } else {
            setCredentialError(data.error);
          }
          console.log("button clicked");
        })
        .catch((error) => {
          console.error("Error during sign up:", error);
        });
      console.log(googleUser, googleUserEmail);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <ImageBackground
            source={require("../assets/background.png")} // Votre image d'arrière-plan
            style={styles.backgroundImage}
            imageStyle={styles.backgroundImageStyle} // Pour ajuster l'image d'arrière-plan
          >
            <View style={styles.overlay} />
            <View style={styles.header}>
              {/* <View style={styles.headerContent}> */}
              <Image
                source={require("../assets/imgsmall.png")}
                style={styles.logo}
              />
            </View>
            {/* </View> */}

            <View style={styles.content}>
              <Text style={styles.title}>Welcome to {"\n"}What To Watch</Text>
              <Text style={styles.subtitle}>
                If you're ready to chill and watch a movie, then signup !
              </Text>
            </View>
          </ImageBackground>

          <View style={styles.formContent}>
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
                  onChangeText={(value) => setSignUpUsername(value)}
                  value={signUpUsername}
                  style={styles.input}
                />
              </View>
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
                  onChangeText={(value) => setSignUpEmail(value)}
                  value={signUpEmail}
                  style={styles.input}
                />
              </View>
              <View style={styles.inputWrapper}>
                <Icon
                  name="lock-closed-outline"
                  size={24}
                  color="#fff"
                  style={styles.inputIcon}
                />
                <TextInput
                  secureTextEntry={true}
                  placeholder="Password"
                  placeholderTextColor="#8e8e93"
                  keyboardType="password"
                  autoCapitalize="none"
                  onChangeText={(value) => {
                    setSignUpPassword(value), validatePassword(value);
                  }}
                  value={signUpPassword}
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
            </View>

            <Text style={styles.strengthText}>{strength}</Text>
            <Text style={styles.suggestionsText}>
              {suggestions.map((suggestion, index) => (
                <Text key={index}>
                  {suggestion} {"\n"}
                </Text>
              ))}
            </Text>

            <TouchableOpacity
              onPress={handlePasswordVisibility}
            ></TouchableOpacity>

            {/* {missingFieldError && (
        <Text style={styles.error}>
          Please complete all fields to register!
        </Text>
      )} */}
            {error && <Text style={styles.error}>{errorMessage}</Text>}

            <View style={styles.buttonWrapper}>
              <GradientButton
                iconName="log-in"
                buttonText="Sign Up"
                onPress={handleRegister}
              />
            </View>
            <View style={styles.bottomContent}>
              <Text style={styles.textH4}>or sign up with</Text>

              <TouchableOpacity onPress={() => promptAsync()}>
                <Image
                  source={require("../assets/google-logo-dark.png")}
                  style={styles.googleLogo}
                />
              </TouchableOpacity>

              <View style={styles.bottomLinks}>
                <Text style={styles.link}>Already have an account? </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("SignIn")}
                >
                  <Text style={styles.button2}> Sign in here!</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* //platform modal // */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={platformsModalVisible}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>
                    Choose your streaming services
                  </Text>
                  <Text style={styles.modalTitle}>
                    Select at least one platform
                  </Text>
                  <View style={styles.scrollView}>
                    <FlatList
                      data={providers}
                      numColumns={1}
                      renderItem={({ item }) => {
                        const isSelected = selectedProviders.includes(
                          item.name
                        );
                        return (
                          <TouchableOpacity
                            style={[
                              styles.providers,
                              isSelected && styles.selectedProvider,
                            ]}
                            onPress={() => {
                              setSelectedProviders((prevProviders) =>
                                prevProviders.includes(item.name)
                                  ? prevProviders.filter(
                                      (provider) => provider !== item.name
                                    )
                                  : [...prevProviders, item.name]
                              );
                            }}
                          >
                            <Text
                              style={
                                isSelected ? styles.selectedProviderText : null
                              }
                            >
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                      keyExtractor={(item) => item.id.toString()}
                    />
                  </View>
                  <View style={styles.buttons}>
                    <View style={styles.buttonWrapper}>
                      <GradientButton
                        // iconName="log-in"
                        buttonText="Cancel"
                        onPress={() => setPlatformsModalVisible(false)}
                      />
                    </View>
                    {isGoogleUser ? (
                      <View style={styles.buttonWrapper}>
                        <GradientButton
                          iconName="log-in"
                          buttonText="Sign Up"
                          onPress={() => handleSubmitWithGoogle()}
                        />
                      </View>
                    ) : (
                      <View style={styles.buttonWrapper}>
                        <GradientButton
                          iconName="log-in"
                          buttonText="Sign Up"
                          onPress={() => handleSubmit()}
                        />
                      </View>
                    )}

                  </View>
                </View>
              </View>
            </Modal>
            {/* //end of modal// */}

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0f2b",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 20,
    opacity: 0.9,
    height: "100%",
  },
  backgroundImageStyle: {
    resizeMode: "cover", // Pour que l'image de fond couvre tout l'espace défini
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay semi-transparent
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    marginLeft: 20,
    marginTop: 5, // Ajuster la marge pour positionner le logo en haut à gauche
  },
  logo: {
    width: 100, // Augmenter la taille du logo
    height: 100,
    resizeMode: "contain",
  },
  content: {
    paddingHorizontal: 30,
    marginTop: 50,
    justifyContent: "center", // Centre le texte à l'intérieur de l'image de fond
  },
  title: {
    color: "white",
    fontSize: 40, // Augmenter la taille de la police pour plus de visibilité
    fontWeight: "bold",
    marginVertical: 30,
    textAlign: 'left',
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Ajouter une ombre pour plus de visibilité
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    color: "white", // Changer la couleur en blanc
    fontSize: 20, // Augmenter la taille de la police pour plus de visibilité
    marginBottom: 30,
    textAlign: "left",
    textShadowColor: "rgba(0, 0, 0, 0.75)", // Ajouter une ombre pour plus de visibilité
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  formContent: {
    paddingHorizontal: 30, // Pour aligner le formulaire avec le texte
    marginTop: 0, // Ajoute un espacement entre l'image de fond et le champ email
  },
  textH4: {
    color: "#8e8e93",
    textAlign: "center",
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    marginBottom: 15,
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
  eyeIcon: {
    paddingRight: 15,
  },
  buttonWrapper: {
    marginTop: 20,
    marginBottom: 20,
  },
  googleButton: {
    alignItems: "center",
  },
  googleLogo: {
    width: 80,
    height: 80,
    marginBottom: 30,
  },
  bottomLinks: {
    flexDirection: "row",
    justifyContent: "center",
  },
  link: {
    color: "#8e8e93",
    marginBottom: 10,
  },
  button2: {
    fontWeight: "350",
    color: "white",
  },
  button2: {
    fontWeight: "350",
    color: "white",
  },
  suggestionsText: {
    textAlign: "center",
    alignItems: "center",
    fontWeight: "600",
    color: "red",
  },
  error: {
    textAlign: "center",
    color: "red",
    fontSize: 16,
    margin: 20,
  },
  bottomContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  button: {
    marginHorizontal: 10,
  },
  buttons: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  // title: {
  //   fontSize: 32,
  // },
  providers: {
    marginTop: 10,
    backgroundColor: "grey",
    fontSize: 20,
  },
  scrollView: {
    maxHeight: 200,
  },

  // strengthMeter: {
  //   borderColor: "red",
  //   color: "red",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  providers: {
    marginTop: 10,
    backgroundColor: "grey",
    fontSize: 20,
    padding: 10,
    borderRadius: 5,
  },
  selectedProvider: {
    backgroundColor: "green",
  },
  selectedProviderText: {
    color: "white",
  },
});
