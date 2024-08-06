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
import { login } from '../reducers/user';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();

  const [signInUsername, setSignInUsername] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const handleSubmit = () => {
    fetch('http://localhost:3000/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username: signInUsername, password: signInPassword }),
    }).then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(signInUsername)
            console.log(signInPassword)
            if (!data.result) {
                console.log('false')
            } else {
                dispatch(login({username: signInUsername, token: data.token, email: data.email}));
                setSignInUsername('');
                setSignInPassword('');
                navigation.navigate('TabNavigator');
            }
            console.log('button signin clicked')
            }
  )};

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Text style={styles.title}>Welcome to What To Watch !</Text>
      <TextInput placeholder="Username" onChangeText={(value) => setSignInUsername(value)} value={signInUsername} style={styles.input} />
      {/* <TextInput placeholder="Email address" onChangeText={(value) => setEmail(value)} value={email} style={styles.input} /> */}
      <TextInput placeholder="Password" onChangeText={(value) => setSignInPassword(value)} value={signInPassword} style={styles.input} />
      <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Don't have an account? Sign up here</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Forgotten password? Click Here</Text>
      </TouchableOpacity>
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