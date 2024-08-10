<<<<<<< HEAD

import { StyleSheet } from "react-native";
=======
import { StyleSheet, View } from "react-native";
>>>>>>> 3ee643bb6a8a4094bf8a14dbaf09c2823f465918
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SplashScreen from "./screens/SplashScreen";
import OnBoardingScreen from "./screens/OnBoardingScreen";
import SignUp from "./screens/SignUpScreen";
import SignIn from "./screens/SignInScreen";
import HomeScreen from "./screens/HomeScreen";
import ListScreen from "./screens/ListScreen";
import SearchScreen from "./screens/SearchScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { useState, useEffect } from "react";



// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import {
// 	GOOGLE_WEB_CLIENT_ID,
// 	GOOGLE_ANDROID_CLIENT_ID,
// 	GOOGLE_IOS_CLIENT_ID,
// } from '@env';

// GoogleSignin.configure({
// 	webClientId: GOOGLE_WEB_CLIENT_ID,
// 	androidClientId: GOOGLE_ANDROID_CLIENT_ID,
// 	iosClientId: GOOGLE_IOS_CLIENT_ID,
// 	scopes: ['profile', 'email'],
// });

//try fix modal swipping issue

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";

const store = configureStore({
  reducer: { user },
});

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "List") {
            iconName = "list";
          } else if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Profile") {
            iconName = "user";
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarLabelStyle : {
          marginBottom: 5,
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="List" component={ListScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

                //<Stack.Screen name="OnBoardingOne" component={OnBoardingOne} /> a replacer ligne 73
export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);


//useEffect to check if user has already seen the onboarding- it checks if there is a value - 
// if value is null (user has not seen the app before) it logs already launched on the storage for next connection
// plus set state isFirstLaunch -> true to display onboarding
  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    })   
  }, []);

  // not to see the onboarding screen while loading and setting the state to true
  if(isFirstLaunch===null){
    return
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isFirstLaunch && (
              <>
            <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
            {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
            </>
            )} 
            {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
