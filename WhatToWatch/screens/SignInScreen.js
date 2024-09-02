import React, { useState, useEffect } from "react";
import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import jwtDecode from "jwt-decode";
import Icon from "react-native-vector-icons/Ionicons";
import GradientButton from "../components/GradientButton";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn({ navigation }) {
  const webClientId = '226449682566-nqg576flhhq5oq2cu9174i2u1pfup607.apps.googleusercontent.com';
  const androidClientId = '226449682566-6865tj5olk8helr5ovkquli7otr2pljq.apps.googleusercontent.com';
  const iosClientId = '226449682566-3inppfas8ej8qmd99qpf9pqlgp9pp4pn.apps.googleusercontent.com';
  
  const config = {
    webClientId,
    iosClientId,
    androidClientId
  };

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  const dispatch = useDispatch();

  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [rightIcon, setRightIcon] = useState("eye");
  const [hidePassword, setHidePassword] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);

  const checkEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

  //-----POUR RECUPERER L'URL DE L'API EN FONCTION DE L'ENVIRONNEMENT DE TRAVAIL---//
  const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
  const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;

  // Utiliser une condition pour basculer entre les URLs
  //const baseUrl = vercelUrl; // POUR UTILISER AVEC VERCEL
  const baseUrl = localUrl; // POUR UTILISER EN LOCAL

//handleToken for Google login
  const handleToken = () => {
    if (response?.type === 'success') {
      const token = response?.authentication?.idToken;
      const decodedToken = jwtDecode(token);
      const googleUserEmail = decodedToken?.email;
      fetch(`${baseUrl}users/signinWithGoogle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: googleUserEmail }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            dispatch(login({
              username: data.username,
              token: data.token,
              email: data.email,
              selectedPlatforms: data.selectedPlatforms,
              googleUser: true,
            }));
            setIsGoogleUser(true);
            navigation.navigate("TabNavigator");
          }
        });
    }
  };

  useEffect(() => {
    handleToken();
  }, [response]);

  const dispatch = useDispatch();
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [rightIcon, setRightIcon] = useState("eye");
  const [hidePassword, setHidePassword] = useState(true);
  const [isGoogleUser, setIsGoogleUser] = useState(false);

  const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
  const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
  const baseUrl = localUrl;

  const handlePasswordVisibility = () => {
    setRightIcon(rightIcon === "eye" ? "eye-slash" : "eye");
    setHidePassword(!hidePassword);
  };

  const handleSubmit = () => {
    fetch(`${baseUrl}users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({
            username: signInUsername,
            token: data.token,
            email: data.email,
            selectedPlatforms: data.selectedPlatforms
          }));
          setSignInUsername("");
          setSignInPassword("");
          navigation.navigate("TabNavigator");
        } else {
          setErrorMessage(true);
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <ImageBackground
            source={require("../assets/SignupBackground.png")} // Votre image d'arrière-plan
            style={styles.backgroundImage}
            imageStyle={styles.backgroundImageStyle} // Pour ajuster l'image d'arrière-plan
          >
            <View style={styles.overlay} />
            <View style={styles.header}>
              <Image
                source={require("../assets/imgsmall.png")}
                style={styles.logo}
              />
            </View>

            <View style={styles.content}>
              <Text style={styles.title}>Welcome to{'\n'}What to Watch</Text>
              <Text style={styles.subtitle}>
                If you're ready to chill and watch a movie, then sign up!
              </Text>
            </View>
          </ImageBackground>

          <View style={styles.formContent}>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Icon name="mail-outline" size={24} color="#fff" style={styles.inputIcon} />
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#8e8e93"
                  autoCapitalize="none"
                  onChangeText={(value) => setSignInUsername(value)}
                  value={signInUsername}
                  style={styles.input}
                />
              </View>
              <View style={styles.inputWrapper}>
                <Icon name="lock-closed-outline" size={24} color="#fff" style={styles.inputIcon} />
                <TextInput
                  secureTextEntry={hidePassword}
                  placeholder="Password"
                  placeholderTextColor="#8e8e93"
                  autoCapitalize="none"
                  onChangeText={(value) => setSignInPassword(value)}
                  value={signInPassword}
                  style={styles.input}
                />
                <TouchableOpacity onPress={handlePasswordVisibility} style={styles.eyeIcon}>
                  <Icon name={hidePassword ? "eye-outline" : "eye-off-outline"} size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.buttonWrapper}>
              <GradientButton
                iconName="log-in"
                buttonText="Login"
                onPress={handleSubmit}
              />
            </View>

            <Text style={styles.orText}>or login with</Text>

            <TouchableOpacity style={styles.googleButton} onPress={() => promptAsync()}>
              <Image
                source={require("../assets/google-logo-dark.png")}
                style={styles.googleLogo}
              />
            </TouchableOpacity>

            <View style={styles.bottomLinks}>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.link}>Don't have an account? Sign up here</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                <Text style={styles.link}>Forgotten password? Click here</Text>
              </TouchableOpacity>
            </View>
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
    justifyContent: 'center',
    paddingBottom: 20,
    opacity: 0.9, 
  },
  backgroundImageStyle: {
    resizeMode: 'cover', // Pour que l'image de fond couvre tout l'espace défini
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay semi-transparent
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    marginLeft: 20,
    marginTop: 20, // Ajuster la marge pour positionner le logo en haut à gauche
  },
  logo: {
    width: 100, // Augmenter la taille du logo
    height: 100,
    resizeMode: 'contain',
  },
  content: {
    paddingHorizontal: 30,
    marginTop: 50,
    justifyContent: 'center', // Centre le texte à l'intérieur de l'image de fond
  },
  title: {
    color: "white",
    fontSize: 40, // Augmenter la taille de la police pour plus de visibilité
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: 'left',
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Ajouter une ombre pour plus de visibilité
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    color: "white", // Changer la couleur en blanc
    fontSize: 20, // Augmenter la taille de la police pour plus de visibilité
    marginBottom: 30,
    textAlign: 'left',
    textShadowColor: 'rgba(0, 0, 0, 0.75)', // Ajouter une ombre pour plus de visibilité
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  formContent: {
    paddingHorizontal: 30, // Pour aligner le formulaire avec le texte
    marginTop: 20, // Ajoute un espacement entre l'image de fond et le champ email
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
  orText: {
    color: "#8e8e93",
    textAlign: 'center',
    marginBottom: 20,
  },
  googleButton: {
    alignItems: 'center',
    marginBottom: 30,
  },
  googleLogo: {
    width: 40,
    height: 40,
  },
  bottomLinks: {
    alignItems: 'center',
  },
  link: {
    color: "#8e8e93",
    marginBottom: 10,
  },
});