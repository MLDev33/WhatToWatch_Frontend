import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View , StyleSheet, TouchableOpacity } from 'react-native';
import { logout } from "../reducers/user";
import DeleteAccount from "../components/Profile/DeleteAccount";


export default function ProfileScreen({ navigation }) {

    const dispatch = useDispatch();

    const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);

  const user = useSelector((state) => state.user.value);
  let username = user.username;

  const handleLogOut = () => {
    dispatch(logout());
    console.log("logout");
    navigation.replace('SignIn')
  };

    return (
        <View style={styles.container}>
            <Text>Welcome to the ProfileScreen {username}</Text>
            <TouchableOpacity style={styles.button2} activeOpacity={0.8} onPress={handleLogOut}>
          <Text style={styles.textButton}>LOGOUT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} activeOpacity={0.8} onPress={() => setDeleteAccountModalVisible(true)}>
          <Text style={styles.textButton}>DELETE ACCOUNT</Text>
        </TouchableOpacity>
        <DeleteAccount deleteAccountModalVisible={deleteAccountModalVisible} setDeleteAccountModalVisible={setDeleteAccountModalVisible} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },  
    button2: {
        fontWeight: '300'
        },
        textButton: {
          fontWeight: '600',
          // color:"white",
        },
});