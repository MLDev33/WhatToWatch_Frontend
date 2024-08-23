import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import OnBoardingScreen from "./screens/OnBoardingScreen";
import SignUp from "./screens/SignUpScreen";
import SignIn from "./screens/SignInScreen";
import HomeScreen from "./screens/HomeScreen";
import ListScreen from "./screens/ListScreen";
import LikedMediaScreen from './screens/LikedMediaScreen';
import SearchScreen from "./screens/SearchScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProfileSettingsScreen from "./screens/ProfileSettingsScreen";
import { LinearGradient } from "expo-linear-gradient";
import WatchScheduleScreen from "./screens/WatchScheduleScreen";
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

const CustomTabBarIcon = ({ focused, iconName, label }) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      {focused ? (
        <LinearGradient
          colors={["#ec008c", "#fc6767"]}
          style={{
            padding: 10,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome name={iconName} size={24} color="#fff" />
        </LinearGradient>
      ) : (
        <FontAwesome name={iconName} size={24} color="gray" />
      )}
      <Text
        style={{
          color: focused ? "#fff" : "gray",
          marginTop: 5,
          fontSize: 12,
        }}
      >
        {label}
      </Text>
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          let label;
          if (route.name === "Home") {
            iconName = "home";
            label = "Home";
          } else if (route.name === "List") {
            iconName = "list";
            label = "List";
          } else if (route.name === "Search") {
            iconName = "search";
            label = "Search";
          } else if (route.name === "Profile") {
            iconName = "user";
            label = "Profile";
          }

          return (
            <CustomTabBarIcon
              focused={focused}
              iconName={iconName}
              label={label}
            />
          );
        },
        tabBarStyle: {
          backgroundColor: "#0d0f2b",
          borderTopWidth: 0,
          height: 70,
        },
        tabBarLabel: () => null,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="List" component={ListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// function RetrievePassword() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator name="SignUp" component={SignUp} />
//       <Stack.Navigator name="SignIn" component={SignIn} />
//       <Stack.Navigator name="ForgottenPassword" component={ForgottenPassword} />
//     </NavigationContainer>
//   );
// }

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
    });
  }, []);

  // not to see the onboarding screen while loading and setting the state to true
  if (isFirstLaunch === null) {
    return;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
        {/* <Stack.Screen
          name="RetrievePassword"
          component={AuthNavigation}
          options={{ headerShown: false }}
        /> */}
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isFirstLaunch && (
              <>
                <Stack.Screen
                  name="OnBoardingScreen"
                  component={OnBoardingScreen}
                />
                <Stack.Screen name="SignUp" component={SignUp} />
              </>
            )}
            {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
            
            <Stack.Screen name="SignIn" component={SignIn} />
            
            {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
     {/* <Stack.Screen name="ForgottenPassword" component={ForgottenPassword} /> */}
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="ProfileSettingsScreen" component={ProfileSettingsScreen} />
            <Stack.Screen name="WatchSchedule" component={WatchScheduleScreen} />
            <Stack.Screen name="LikedMedia" component={LikedMediaScreen} />
            {/* <Stack.Screen name="ForgottenPassword" component={ForgottenPassword} />  */}
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
