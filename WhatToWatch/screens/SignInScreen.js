import { useState, useEffect } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import ForgottenPassword from "../components/SignInUp/ForgottenPassword";
// import RecoveredPasswordModal from "../components/SignInUp/RecoveredPassword";
// import { LinearGradient } from "expo-linear-gradient";
import Icon from 'react-native-vector-icons/Ionicons';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google'
import { jwtDecode } from "jwt-decode";
import GradientButton from '../components/GradientButton';

  //google login //
WebBrowser.maybeCompleteAuthSession();

export default function SignIn({ navigation }) {

  //google login //
  const webClientId = '226449682566-nqg576flhhq5oq2cu9174i2u1pfup607.apps.googleusercontent.com'

  const androidClientId = '226449682566-6865tj5olk8helr5ovkquli7otr2pljq.apps.googleusercontent.com'
  
  const iosClientId = '226449682566-3inppfas8ej8qmd99qpf9pqlgp9pp4pn.apps.googleusercontent.com'
   
  const config = {
    webClientId,
    iosClientId,
    androidClientId
  }

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
      if(response?.type === 'success') {
        const token = response?.authentication?.idToken;
        const decodedToken = jwtDecode(token)
        const googleUser = decodedToken?.name;
        const googleUserEmail = decodedToken?.email;
      console.log(jwtDecode(token),googleUserEmail, 'google ok !')
      fetch(`${baseUrl}users/signinWithGoogle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: googleUserEmail,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (!data.result) {
            console.log("false");
          } else {
            dispatch(
              login({
                username: data.username,
                token: data.token,
                email: data.email,
                selectedPlatforms: data.selectedPlatforms,
                googleUser: true,
              })
              
            );
            setIsGoogleUser(true);
            navigation.navigate("TabNavigator");
          }
          console.log("button signin clicked");

      } )
    }
    }
  
  
    useEffect(() => {
      handleToken()
    }, [response])



  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-slash");
      setHidePassword(!hidePassword);
    } else if (rightIcon === "eye-slash") {
      setRightIcon("eye");
      setHidePassword(!hidePassword);
    }
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
        console.log(data);
        console.log(signInUsername);
        console.log(signInPassword);
        if (!data.result) {
          console.log("false");
          setError(true)
          setErrorMessage(data.error)
        } else {
          dispatch(
            login({
              username: signInUsername,
              token: data.token,
              email: data.email,
              selectedPlatforms: data.selectedPlatforms
            })
          );
          setSignInUsername("");
          setSignInPassword("");
          navigation.navigate("TabNavigator");
        }
        console.log("button signin clicked");
      });
  };



  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image source={require('../assets/background.png')} style={styles.background} />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            source={require("../assets/imgsmall.png")}
            style={styles.logo}
          />
        </View>
      </View>

      <Text style={styles.textH1}>Welcome to {"\n"}What To Watch</Text>
      <Text style={styles.textH2}>
        If you're ready to chill and watch a movie, then signin !
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          placeholderTextColor={'white'}
          autoCapitalize="none"
          onChangeText={(value) => setSignInUsername(value)}
          value={signInUsername}
          style={styles.input}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor={'white'}
          keyboardType="password"
          autoCapitalize="none"
          onChangeText={(value) => setSignInPassword(value)}
          value={signInPassword}
          style={styles.input}
        />

        
      </View>
      {/* <TouchableOpacity onPress={handlePasswordVisibility}>
        <Icon name={rightIcon} size={25} />
      </TouchableOpacity> */}

      {error && (
        <Text style={styles.error}>{errorMessage}</Text>
      )}
      {/* <View style={styles.bottomContent}> */}
     
        <View style={styles.mainButtonContainer}>
           <GradientButton
          // iconName="login"
          style={{height: 40, width: 40}}
          buttonText="Login"
          onPress={() => handleSubmit()}
        />
        </View>

             {/* <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.button}
          activeOpacity={0.8}
        > */}
          {/* <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity> */}


        <View style={styles.bottomContent}>
        <Text style={styles.textH4}>Or connect with</Text>
        <TouchableOpacity onPress={() => promptAsync()}>
          <Image
            source={require("../assets/google-logo.png")}
            style={styles.googleLogo}
          />
        </TouchableOpacity>
        <View style={styles.texts}>
          <Text style={styles.textH4}>Don't have an account?</Text>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.textButton}>Sign up here</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.texts}>
          <Text style={styles.textH4}>Forgotten password? </Text>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textButton}>Click here</Text>
          </TouchableOpacity>
        </View>
        <ForgottenPassword
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0f2b",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  header: {
    alignItems: "flex-start",
    marginBottom: 40,
    marginTop: "10%",
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 80,
    borderRadius: 40,
  },
  title: {
    width: "80%",
    fontSize: 38,
    fontWeight: "600",
  },
  textH1: {
    textAlign: "flex-start",
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    paddingHorizontal: 20,
  },
  textH2: {
    marginTop: 10,
    marginHorizontal: 7,
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
  textH4: {
    color: "white",
    marginHorizontal: 5,
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
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
  bottomContent: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  googleLogo: {
    width: 80,
    height: 80,
    borderRadius: 30,
    margin: 30,
  },
  textButton: {
    fontWeight: "600",
    color: "white",
  },
  texts: {
    flexDirection: "row",
    marginTop: 30,
    color: "white",
  },
  buttonContainer: {
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  error: {
    textAlign: "center",
    color: "red",
    fontSize: 16,
    margin: 20,
  },
  mainButtonContainer:{
    marginTop: 40,
    // alignItems: "center",
    justifyContent: "center",
    textAlign: 'center'
  },
  login: {
    // alignItems: 'center',
    // height: 40,
    // width: "80%",
    textAlign: 'center'
  },
  background: {
    overflow: 'hidden',
    position: 'absolute',
    width: '100%',
    height: '32%',
    margin: 10,
    marginTop: 52,
    opacity: 0.4,
    backgroundSize: 'cover',
    borderRadius: 10,
  }
});
