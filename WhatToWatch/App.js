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
import LikedMediaScreen from "./screens/LikedMediaScreen";
import SearchScreen from "./screens/SearchScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProfileSettingsScreen from "./screens/ProfileSettingsScreen";
import { LinearGradient } from "expo-linear-gradient";
import WatchScheduleScreen from "./screens/WatchScheduleScreen";
import InviteFriendsScreen from "./screens/InviteFriendsScreen";
import { useState, useEffect } from "react";
// import {
// 	GOOGLE_WEB_CLIENT_ID,
// 	GOOGLE_ANDROID_CLIENT_ID,
// 	GOOGLE_IOS_CLIENT_ID,
// } from '@env';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

const webClientId =
  "226449682566-nqg576flhhq5oq2cu9174i2u1pfup607.apps.googleusercontent.com";

const androidClientId =
  "226449682566-6865tj5olk8helr5ovkquli7otr2pljq.apps.googleusercontent.com";

const iosClientId =
  "226449682566-3inppfas8ej8qmd99qpf9pqlgp9pp4pn.apps.googleusercontent.com";

// const config = {
//   webClientId,
//   iosClientId,
//   androidClientId
// }

// GoogleSignin.configure({
// 	webClientId: GOOGLE_WEB_CLIENT_ID,
// 	androidClientId: GOOGLE_ANDROID_CLIENT_ID,
// 	iosClientId: GOOGLE_IOS_CLIENT_ID,
// 	scopes: ['profile', 'email'],
// });

WebBrowser.maybeCompleteAuthSession();

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
            marginVertical: -10,
            paddingVertical: 8, // hauteur
            paddingHorizontal: 15, //  largeur
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome name={iconName} size={24} color="#fff" />
          <Text
            style={{
              color: "#fff",
              marginTop: 5,
              fontSize: 12,
            }}
          >
            {label}
          </Text>
        </LinearGradient>
      ) : (
        <>
          <FontAwesome name={iconName} size={24} color="gray" />
          <Text
            style={{
              color: "gray",
              marginTop: 5,
              fontSize: 12,
            }}
          >
            {label}
          </Text>
        </>
      )}
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
          height: 60,
        },
        tabBarLabel: () => null,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="List" component={ListScreen} />
      <Tab.Screen name="Profile" component={UserProfileNavigationLayout} />
    </Tab.Navigator>
  );
};

function UserProfileNavigationLayout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen
        name="ProfileSettingsScreen"
        component={ProfileSettingsScreen}
      />
      <Stack.Screen name="WatchSchedule" component={WatchScheduleScreen} />
      <Stack.Screen name="LikedMedia" component={LikedMediaScreen} />
      <Stack.Screen name="InviteFriends" component={InviteFriendsScreen} />
    </Stack.Navigator>
  );
}
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
            {/* <Stack.Screen name="ProfileSettingsScreen" component={ProfileSettingsScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} /> */}
            {/* <Stack.Screen name="WatchSchedule" component={WatchScheduleScreen} />
            <Stack.Screen name="LikedMedia" component={LikedMediaScreen} />
            <Stack.Screen name="InviteFriends" component={InviteFriendsScreen} />
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
