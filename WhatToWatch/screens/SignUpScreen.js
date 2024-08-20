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
  Modal
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons as Icon } from '@expo/vector-icons';

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
  const [platformsModalVisible, setPlatformsModalVisible] = useState(false)
  const [selectedProviders, setSelectedProviders] = useState({});

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
          favouritePlatforms: [selectedProviders]
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
          console.log(selectedProviders, "providers")
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
            setPlatformsModalVisible(false);
          }else {
            setCredentialError(data.error);
          }
          console.log("button clicked");
        });
    }
  };


    const providers = [
      {"Amazon Prime Video": 119, id : 1, "Amazon Prime Video": 119, name: 'Amazon Prime', logo:''}, 
      {"Disney Plus": 337, id : 2,  name: 'Disney Plus', logo: ''}, 
      {Netflix: 8, id : 3,  name: 'Netflix', logo:''}, 
      {"HBO Max": 384, id : 4, name: 'HBO Max',  logo: ''},  
      {"Canal+": 381, id : 5, name: 'Canal+', logo: ''}, 
      {"Apple TV": 2, id : 6, name:  "Apple TV",  logo:''},
      {Starz: 43, id : 7, name: 'Starz', logo: ''}, 
      {Crunchyroll: 283, id : 8, name: 'Crunchyroll', logo: ''}, 
      {MUBI: 11,  id : 9, name: 'MUBI', logo:''}, 
      {YouTube: 192,  id : 10, name: 'YouTube', logo:''}, 
      {Hulu: 15, id : 11, name: 'Hulu', logo: ''}, 
      {"Rakuten TV": 35, id : 12, name: 'Rakuten TV', logo: ''}, 
      {"BBC iPlayer": 38, id : 13, name: 'BBC iPlayer', logo: ''}, 
      {"OCS Go": 56, id : 14, "OCS Go": 56, name: 'OCS', logo: ''}, 
      {ABC: 148, id : 15, name: 'ABC', logo: ''}, 
      {"Universal Pictures": 184, id : 16, name: 'Universal Pictures', logo: ''}, 
      {Arte: 234, id : 17, name: 'Arte', logo: ''}, 
       {"France TV": 236, id : 18, name: 'France TV', logo: ''}, 
       {Boomerang: 248, id : 19, name: 'Boomerang', logo: ''}, 
       {Sky: 210, id : 20,  name: 'Sky', logo: ''}, 
       {"Rai Play": 222, id : 21, name: 'Rai Play', logo: ''},   
   ];

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
        onPress={() => setPlatformsModalVisible(true)}
        style={styles.button}
        activeOpacity={0.8}
      >
        {credentialError && <Text style={styles.error}>{credentialError}</Text>}
        <Text style={styles.textButton}>REGISTER</Text>
      </TouchableOpacity>
      <Text style={styles.textButton}>Or connect with</Text>
      <View style={styles.haveAccount}>
        <Text>Already have an account?</Text>
        <TouchableOpacity style={styles.button2} activeOpacity={0.8} onPress={()=>navigation.navigate('SignIn')}>
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
            <SectionedMultiSelect 
            items={providers}
            IconRenderer={Icon}
            uniqueKey="id"
            onSelectedItemsChange={setSelectedProviders}
            selectedProviders={selectedProviders}
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
                <Text style={styles.modalTitle}>Save</Text>
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
});
