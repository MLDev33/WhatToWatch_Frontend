import { useState } from "react";
import {
  KeyboardAvoidingView,
  Image,
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
import RecoveredPasswordModal from "../components/SignInUp/RecoveredPassword";
import { LinearGradient } from "expo-linear-gradient";
// import Icon from 'react-native-vector-icons/Ionicons';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [rightIcon, setRightIcon] = useState("eye");
  const [hidePassword, setHidePassword] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const checkEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

  //-----POUR RECUPERER L'URL DE L'API EN FONCTION DE L'ENVIRONNEMENT DE TRAVAIL---//
  const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
  const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;

  // Utiliser une condition pour basculer entre les URLs
  //const baseUrl = vercelUrl; // POUR UTILISER AVEC VERCEL
  const baseUrl = localUrl; // POUR UTILISER EN LOCAL

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
          setErrorMessage(true);
        } else {
          dispatch(
            login({
              username: signInUsername,
              token: data.token,
              email: data.email,
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
          autoCapitalize="none"
          onChangeText={(value) => setSignInUsername(value)}
          value={signInUsername}
          style={styles.input}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          keyboardType="password"
          autoCapitalize="none"
          onChangeText={(value) => setSignInPassword(value)}
          value={signInPassword}
          style={styles.input}
        />
      </View>
      <TouchableOpacity onPress={handlePasswordVisibility}>
        {/* <Icon name={rightIcon} size={25} /> */}
      </TouchableOpacity>
      {/* <LinearGradient
        colors={["#7C4DFF", "#F94A56", "#FF1744"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 2, y: 5 }}
        style={styles.buttonContainer}
      > */}

      {/* </LinearGradient> */}

      {errorMessage && (
        <Text style={styles.error}>User not found or wrong email</Text>
      )}
      <View style={styles.bottomContent}>
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.textH4}>Or connect with</Text>
        <Image
          source={require("../assets/google-logo.png")}
          style={styles.googleLogo}
        />

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
  },
  input: {
    width: "80%",
    marginTop: 25,
    borderBottomColor: "#ec6e5b",
    borderBottomWidth: 1,
    fontSize: 18,
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
});
