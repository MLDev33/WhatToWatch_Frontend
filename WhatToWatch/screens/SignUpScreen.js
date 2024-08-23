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
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();

  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("false");
  const [credentialError, setCredentialError] = useState("");
  const [rightIcon, setRightIcon] = useState("eye");
  const [hidePassword, setHidePassword] = useState(true);
  const [validPassword, setValidPassword] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [strength, setStrength] = useState("");
  const [platformsModalVisible, setPlatformsModalVisible] = useState(false);
  const [selectedProviders, setSelectedProviders] = useState([]);

  const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
  const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
  const baseUrl = localUrl;

  const checkEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
  const checkPassword = RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

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
  const providers = [
    { id: 119, name: "Amazon Prime Video" },
    { id: 337, name: "Disney Plus" },
    { id: 8, name: "Netflix" },
    { id: 384, name: "HBO Max" },
    { id: 381, name: "Canal+" },
    { id: 2, name: "Apple TV" },
    { id: 43, name: "Starz" },
    { id: 283, name: "Crunchyroll" },
    { id: 11, name: "MUBI" },
    { id: 192, name: "YouTube" },
    { id: 15, name: "Hulu" },
    { id: 35, name: "Rakuten TV" },
    { id: 38, name: "BBC iPlayer" },
    { id: 56, name: "OCS" },
    { id: 148, name: "ABC" },
    { id: 184, name: "Universal Pictures" },
    { id: 234, name: "Arte" },
    { id: 236, name: "France TV" },
    { id: 248, name: "Boomerang" },
    { id: 210, name: "Sky" },
    { id: 222, name: "Rai Play" },
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
    if (!checkEmail.test(signUpEmail)) {
      setErrorMessage(true);
      console.log('errorMessage')
    } else {
      setPlatformsModalVisible(true);
    }
  };

  const handleSubmit = () => {
    if(selectedProviders.length < 1){
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
      <Text style={styles.title}>Welcome to {"\n"} What To Watch !</Text>
      <TextInput
        placeholder="Username"
        autoCapitalize="none"
        onChangeText={(value) => setSignUpUsername(value)}
        value={signUpUsername}
        style={styles.input}
      />
      <TextInput
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoComplete="email"
        placeholder="Email address"
        onChangeText={(value) => setSignUpEmail(value)}
        value={signUpEmail}
        style={styles.input}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Password"
        keyboardType="password"
        autoCapitalize="none"
        onChangeText={(value) => {
          setSignUpPassword(value), validatePassword(value);
        }}
        value={signUpPassword}
        style={styles.input}
      />
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
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleRegister}
        style={styles.button}
        activeOpacity={0.8}
      >
        {credentialError && <Text style={styles.error}>User already exists</Text>}
        <Text style={styles.textButton}>REGISTER</Text>
      </TouchableOpacity>
      <Text style={styles.textButton}>Or connect with</Text>
      <View style={styles.haveAccount}>
        <Text>Already have an account?</Text>
        <TouchableOpacity
          style={styles.button2}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.textButton}>Sign in here!</Text>
        </TouchableOpacity>
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
            <Text style={styles.modalTitle}>Select at least one platform</Text>
            <View style={styles.scrollView}>
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
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
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
    backgroundColor: "000",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    width: "80%",
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    width: "80%",
    marginTop: 25,
    borderBottomColor: "#ec6e5b",
    borderBottomWidth: 1,
    fontSize: 18,
  },
  haveAccount: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    alignItems: "center",
    paddingTop: 8,
    width: "80%",
    marginTop: 30,
    borderRadius: 10,
    marginBottom: 80,
  },
  button2: {
    fontWeight: "300",
  },
  textButton: {
    fontWeight: "600",
  },
  suggestionsText: {
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "600",
    color: "red",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
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
  scrollView: {
    maxHeight: 200,
  },
});