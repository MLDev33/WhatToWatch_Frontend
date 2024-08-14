import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Icon,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [rightIcon, setRightIcon] = useState('eye');
  const [hidePassword, setHidePassword] = useState(true);

  const checkEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

  //-----POUR RECUPERER L'URL DE L'API EN FONCTION DE L'ENVIRONNEMENT DE TRAVAIL---//
  const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
  const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
  
  // Utiliser une condition pour basculer entre les URLs
  //const baseUrl = vercelUrl; // POUR UTILISER AVEC VERCEL
   const baseUrl = localUrl; // POUR UTILISER EN LOCAL 

  const handlePasswordVisibility = () => {  
    if (rightIcon === 'eye') {  
        setRightIcon('eye-slash');  
        setHidePassword(!hidePassword);  
    } else if (rightIcon === 'eye-slash') {  
        setRightIcon('eye');  
        setHidePassword(!hidePassword);  
    }  
  }

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
      <Text style={styles.title}>Welcome to What To Watch !</Text>
      <TextInput
        placeholder="Username"
        autoCapitalize="none"
        onChangeText={(value) => setSignInUsername(value)}
        value={signInUsername}
        style={styles.input}
      />
      {/* <TextInput placeholder="Email address" onChangeText={(value) => setEmail(value)} value={email} style={styles.input} /> */}
      <TextInput
        secureTextEntry={true}
        placeholder="Password"
        keyboardType="password"
        autoCapitalize="none"
        onChangeText={(value) => setSignInPassword(value)}
        value={signInPassword}
        style={styles.input}
      />
      <TouchableOpacity
      onPress={handlePasswordVisibility}>
  {/* <Icon name={rightIcon} size={25} /> */}
  </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>LOGIN</Text>
      </TouchableOpacity>
      <View style={styles.texts}>
      <Text 
      // style={styles.textButton}
      >
          Don't have an account?
        </Text>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} 
      onPress ={() => {navigation.navigate('SignUp')}}
      >
        <Text style={styles.textButton}>
         Sign up here
        </Text>
      </TouchableOpacity>
      </View>
      <View style={styles.texts}>
      <Text 
      // style={styles.textButton}
      >Forgotten password? </Text>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} 
      onPress={() => navigation.navigate('ForgottenPassword')}
      >
        <Text style={styles.textButton}>Click here</Text>
      </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    width: "80%",
    fontSize: 38,
    fontWeight: '600',
  },
  input: {
    width: "80%",
    marginTop: 25,
    borderBottomColor: "#ec6e5b",
    borderBottomWidth: 1,
    fontSize: 18,
  },
  //   button: {
  //     alignItems: 'center',
  //     paddingTop: 8,
  //     width: '80%',
  //     marginTop: 30,
  //     backgroundColor: '#ec6e5b',
  //     borderRadius: 10,
  //     marginBottom: 80,
  //   },
    textButton: {
      fontWeight: '600',
    },
    texts:{
      flexDirection: 'row',
      marginTop: 10
    },
    button2: {
      fontWeight: '300'
      },
});
