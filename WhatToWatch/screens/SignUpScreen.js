import { useEffect, useState } from "react";
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
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import GradientButton from "../components/GradientButton";

export default function SignUp({ navigation }) {
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

  //-----POUR RECUPERER L'URL DE L'API EN FONCTION DE L'ENVIRONNEMENT DE TRAVAIL---//
  const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
  const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;

  // Utiliser une condition pour basculer entre les URLs
  //const baseUrl = vercelUrl; // POUR UTILISER AVEC VERCEL
  const baseUrl = localUrl; // POUR UTILISER EN LOCAL

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

    // Determine password strength based on suggestions
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

  const providers = [
    {
      "Amazon Prime Video": 119,
      id: 119,
      "Amazon Prime Video": 119,
      name: "Amazon Prime",
      logo: "",
    },
    { "Disney Plus": 337, id: 337, name: "Disney Plus", logo: "" },
    { Netflix: 8, id: 8, name: "Netflix", logo: "" },
    { "HBO Max": 384, id: 384, name: "HBO Max", logo: "" },
    { "Canal+": 381, id: 381, name: "Canal+", logo: "" },
    { "Apple TV": 2, id: 2, name: "Apple TV", logo: "" },
    { Starz: 43, id: 43, name: "Starz", logo: "" },
    { Crunchyroll: 283, id: 283, name: "Crunchyroll", logo: "" },
    { "OCS Go": 56, id: 56, "OCS Go": 56, name: "OCS", logo: "" },
    { ABC: 148, id: 148, name: "ABC", logo: "" },
    {
      "Universal Pictures": 184,
      id: 184,
      name: "Universal Pictures",
      logo: "",
    },
    { Arte: 234, id: 234, name: "Arte", logo: "" },
    { "France TV": 236, id: 236, name: "France TV", logo: "" },
    { Boomerang: 248, id: 248, name: "Boomerang", logo: "" },
    { Sky: 210, id: 210, name: "Sky", logo: "" },
    { "Rai Play": 222, id: 222, name: "Rai Play", logo: "" },
  ];

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-slash");
      setHidePassword(!hidePassword);
    } else if (rightIcon === "eye-slash") {
      setRightIcon("eye");
      setHidePassword(!hidePassword);
    }
  };

  const handleRegister = () => {
    if (!signUpEmail || !signUpPassword || !signUpUsername) {
      setMissingFieldError(true);
      console.log("errorMessageMissingfield");
    }
    if (!checkEmail.test(signUpEmail)) {
      setWrongEmail(true);
      console.log("wrongEmail");
    } else {
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
          }
        });
    }
  };

  const handleSubmit = () => {
    if (selectedProviders < 1) {
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
        });
    }
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
        If you're ready to chill and watch a movie, then signup !
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          placeholderTextColor={'white'}
          autoCapitalize="none"
          onChangeText={(value) => setSignUpUsername(value)}
          value={signUpUsername}
          style={styles.input}
        />
        <TextInput
          autoCapitalize="none" // https://reactnative.dev/docs/textinput#autocapitalize
          keyboardType="email-address" // https://reactnative.dev/docs/textinput#keyboardtype
          textContentType="emailAddress" // https://reactnative.dev/docs/textinput#textcontenttype-ios
          autoComplete="email"
          placeholder="Email address"
          placeholderTextColor={'white'}
          onChangeText={(value) => setSignUpEmail(value)}
          value={signUpEmail}
          style={styles.input}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor={'white'}
          keyboardType="password"
          autoCapitalize="none"
          onChangeText={(value) => {
            setSignUpPassword(value), validatePassword(value);
          }}
          value={signUpPassword}
          style={styles.input}
        />
      </View>
      <Text style={styles.strengthText}>{strength}</Text>
      <Text style={styles.suggestionsText}>
        {suggestions.map((suggestion, index) => (
          <Text key={index}>
            {suggestion} {"\n"}
          </Text>
        ))}
      </Text>
      <View style={styles.strengthMeter}>
        <View
          style={{
            width: `${
              strength === "Very Strong"
                ? 100
                : strength === "Strong"
                ? 75
                : strength === "Moderate"
                ? 50
                : strength === "Weak"
                ? 25
                : 0
            }%`,
            height: 20,
            backgroundColor:
              strength === "Too Weak"
                ? "red"
                : strength === "Weak"
                ? "orange"
                : strength === "Moderate"
                ? "yellow"
                : strength === "Strong"
                ? "green"
                : "limegreen",
          }}
        ></View>
      </View>
      <TouchableOpacity onPress={handlePasswordVisibility}>
        {/* <Icon name={rightIcon} size={25} /> */}
      </TouchableOpacity>

      {missingFieldError && (
        <Text style={styles.error}>
          Please complete all fields to register!
        </Text>
      )}
      {error && <Text style={styles.error}>{errorMessage}</Text>}

      <View style={styles.bottomContent}>
        <TouchableOpacity
          onPress={handleRegister}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>REGISTER</Text>
        </TouchableOpacity>
        <Text style={styles.textH4}>Or login with</Text>
        <TouchableOpacity>
          <Image
            source={require("../assets/google-logo.png")}
            style={styles.googleLogo}
          />
        </TouchableOpacity>
        <View style={styles.haveAccount}>
          <Text style={styles.textH4}>Already have an account?</Text>
          <TouchableOpacity
            style={styles.button2}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text style={styles.textButton}>Sign in here!</Text>
          </TouchableOpacity>
        </View>
      </View>
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
            <Text style={styles.textH4}>Select at least one platform</Text>
            <FlatList
              data={providers}
              numColumns={1}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.providers}
                  onPress={() => {
                    setSelectedProviders((providers) => [
                      ...providers,
                      item.name,
                    ]);
                  }}
                >
                  <Text>{item.name}</Text>
                  {/* <Image source={{ uri: `${TMDB_IMAGE_BASE_URL}${p.logo}` }}></Image> */}
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />

            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={() => setPlatformsModalVisible(false)}
              >
                <Text style={styles.modalTitle}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleSubmit()}
                style={styles.button}
                activeOpacity={0.8}
              >
                <Text style={styles.modalTitle}>REGISTER</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0f2b",
    // paddingHorizontal: 10,
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
    paddingLeft: 10,
    fontSize: 18,
    color: "white",
  },
  haveAccount: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "space-around",
    // marginTop: 30,
    paddingHorizontal: 10,
  },
  button: {
    alignItems: "center",
    paddingTop: 8,
    width: "80%",
    margin: 30,
    // borderRadius: 10,
    // marginBottom: 80,
    backgroundColorolor: "white",
  },
  button2: {
    fontWeight: "300",
  },
  textButton: {
    fontWeight: "600",
    color: "white",
  },
  googleLogo: {
    width: 80,
    height: 80,
    borderRadius: 30,
    margin: 30,
  },
  bottomContent: {
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 10,
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
  title: {
    fontSize: 32,
  },
  providers: {
    marginTop: 10,
    backgroundColor: "grey",
    fontSize: 20,
  },
  // button: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: 'transparent',
  //   paddingVertical: 15,
  //   paddingHorizontal: 10,
  //   borderRadius: 10,
  //   marginBottom: 10,
  //   height: 60,
  // },
  // buttonText: {
  //   color: '#fff',
  //   fontSize: 16,
  //   marginLeft: 10,
  //   flex: 1,
  // },
});
