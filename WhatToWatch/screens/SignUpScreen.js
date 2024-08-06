import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { login, logout } from '../reducers/user';

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();

  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');


  
  const handleSubmit = () => {
    // dispatch(login(username, email, password));
    
    fetch('http://localhost:3000/users/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username : signUpUsername, email: signUpEmail, password: signUpPassword }),
		}).then(response => response.json())
			.then(data => {
                console.log(data);
				if (data.result) {
					dispatch(login({username: signUpUsername, token: data.token, email: data.email}));
          setSignUpEmail('');
					setSignUpUsername('');
					setSignUpPassword('');
          navigation.navigate('TabNavigator');
				}
                console.log('button clicked')
			});
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Text style={styles.title}>Welcome to What To Watch !</Text>
      <TextInput placeholder="Username" onChangeText={(value) => setSignUpUsername(value)} value={signUpUsername} style={styles.input} />
      <TextInput placeholder="Email address" onChangeText={(value) => setSignUpEmail(value)} value={signUpEmail} style={styles.input} />
      <TextInput placeholder="Password" onChangeText={(value) => setSignUpPassword(value)} value={signUpPassword} style={styles.input} />
      <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>REGISTER</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.button} activeOpacity={0.8}> */}
        <Text style={styles.textButton}>Or connect with</Text>
      {/* </TouchableOpacity> */}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width: '80%',
    fontSize: 38,
    fontWeight: '600',
  },
  input: {
    width: '80%',
    marginTop: 25,
    borderBottomColor: '#ec6e5b',
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
//   textButton: {
//     color: '#ffffff',
//     height: 30,
//     fontWeight: '600',
//     fontSize: 16,
//   },
});