import { useState } from "react";
import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Icon,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();

  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState('false');
  const [credentialError, setCredentialError] = useState('');
  const [rightIcon, setRightIcon] = useState('eye');
  const [hidePassword, setHidePassword] = useState(true);
  const [validPassword, setValidPassword] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [strength, setStrength] = useState('');
  //-----POUR RECUPERER L'URL DE L'API EN FONCTION DE L'ENVIRONNEMENT DE TRAVAIL---//
  const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
  const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
  
  // Utiliser une condition pour basculer entre les URLs
  //const baseUrl = vercelUrl; // POUR UTILISER AVEC VERCEL
   const baseUrl = localUrl; // POUR UTILISER EN LOCAL 

  const checkEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
  const checkPassword = RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

    const validatePassword = (input) => {
        let newSuggestions = [];
        if (input.length < 8) {
            newSuggestions.push('At least 8 characters')
        }
        if (!/\d/.test(input)) {
            newSuggestions.push('At least one number')
        }

        if (!/[A-Z]/.test(input) || !/[a-z]/.test(input)) {
            newSuggestions.push('Both upper and lower case letters')
        }

        if (!/[^A-Za-z0-9]/.test(input)) {
            newSuggestions.push('At least one special character')
        }

        setSuggestions(newSuggestions);

        // Determine password strength based on suggestions
        if (newSuggestions.length === 0) {
            setStrength('Very Strong Password');
        }
        else if (newSuggestions.length <= 1) {
            setStrength('Strong Password')
        }
        else if (newSuggestions.length <= 2) {
            setStrength('Moderate Password')
        }
        else if (newSuggestions.length <= 3) {
            setStrength('Weak Password')
        }
        else {
            setStrength('Too Weak Password')
        }
    }
  

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
    if (!checkEmail.test(signUpEmail)) {
      setErrorMessage(true);
    } else {
      fetch(`${baseUrl}users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: signUpUsername,
          email: signUpEmail,
          password: signUpPassword,
        }),
      })
        .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong: ' + response.status);
        }
        return response.json();
         })
        .then((data) => {
          console.log(data);
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
            navigation.navigate("TabNavigator");
          }else {
            setCredentialError(data.error);
          }
          console.log("button clicked");
        });
    }
  };

  const onTap = () => {
    console.log('Button touched!');
    navigation.navigate('SignIn')}

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Welcome to {'\n'} What To Watch !</Text>
      <TextInput
        placeholder="Username"
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
        onChangeText={(value) => setSignUpEmail(value)}
        value={signUpEmail}
        style={styles.input}
      />
      <TextInput
        secureTextEntry={true}
        placeholder="Password"
        keyboardType="password"
        autoCapitalize="none"
        onChangeText={(value) => {setSignUpPassword(value), validatePassword(value)}}
        value={signUpPassword}
        style={styles.input}
      />
      <Text style={styles.strengthText}>
                {strength}
            </Text>
            <Text style={styles.suggestionsText}>
                {suggestions.map((suggestion, index) => (
                    <Text key={index}>
                        {suggestion} {'\n'}
                    </Text>))}
            </Text>
            <View style={styles.strengthMeter}>
                <View style={{width: `${(strength === 'Very Strong' ? 100 :
                                      (strength === 'Strong' ? 75 :
                                      (strength === 'Moderate' ? 50 :
                                      (strength === 'Weak' ? 25 : 0))))}%`,
                              height: 20,
                              backgroundColor: strength === 'Too Weak' ? 'red' :
                                      (strength === 'Weak' ? 'orange' :
                                      (strength === 'Moderate' ? 'yellow' :
                                      (strength === 'Strong' ? 'green' : 'limegreen')))}}>
                </View>
            </View>
      <TouchableOpacity
      onPress={handlePasswordVisibility}>
  {/* <Icon name={rightIcon} size={25} /> */}
  </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={styles.button}
        activeOpacity={0.8}
      >
        {credentialError && <Text style={styles.error}>{credentialError}</Text>}
        <Text style={styles.textButton}>REGISTER</Text>
      </TouchableOpacity>
      <Text style={styles.textButton}>Or connect with</Text>
      <View style={styles.haveAccount}>
        <Text>Already have an account?</Text>
        <TouchableOpacity style={styles.button2} activeOpacity={0.8} onPress={onTap}>
          <Text style={styles.textButton}>Sign in here!</Text>
        </TouchableOpacity>
      </View>
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
    fontWeight: '600',
    // color:"white",
  },
  input: {
    width: "80%",
    marginTop: 25,
    borderBottomColor: "#ec6e5b",
    borderBottomWidth: 1,
    fontSize: 18,
    // color:"white",
  },
  haveAccount: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
    button: {
      alignItems: 'center',
      paddingTop: 8,
      width: '80%',
      marginTop: 30,
      borderRadius: 10,
      marginBottom: 80,
    },
    button2: {
    fontWeight: '300'
    },
    textButton: {
      fontWeight: '600',
      // color:"white",
    },
    suggestionsText: {
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: '600',
      color: 'red'
    }
});
