import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, View , StyleSheet } from 'react-native';
import { login } from "../reducers/user";

export default function ProfileScreen() {

    const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);
  let username = user.username;

  const handleLogOut = () => {
    dispatch(logout());
    console.log("logout");
  };

    return (
        <View style={styles.container}>
            <Text>Welcome to the ProfileScreen {username}</Text>
            <TouchableOpacity style={styles.button2} activeOpacity={0.8} onPress={handleLogOut}>
          <Text style={styles.textButton}>LOGOUT</Text>
        </TouchableOpacity>
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