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

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";



WebBrowser.maybeCompleteAuthSession();

//try fix modal swipping issue

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import list from "./reducers/list";

const store = configureStore({
  reducer: { user, list },
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
      <Tab.Screen name="Home" component={HomeNavigationLayout} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="List" component={UserListNavigationLayout} />
      <Tab.Screen name="Profile" component={UserProfileNavigationLayout} />
    </Tab.Navigator>
  );
};



function HomeNavigationLayout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="LikedMedia" component={LikedMediaScreen} />
    </Stack.Navigator>
  );
}


function UserListNavigationLayout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListScreen" component={ListScreen} />
      <Stack.Screen name="LikedMedia" component={LikedMediaScreen} />
    </Stack.Navigator>
  );
}



function UserProfileNavigationLayout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen
        name="ProfileSettingsScreen"
        component={ProfileSettingsScreen}
      />
      <Stack.Screen name="WatchSchedule" component={WatchScheduleScreen} />
      <Stack.Screen name="InviteFriends" component={InviteFriendsScreen} />
    </Stack.Navigator>
  );
}


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

  if (isFirstLaunch === null) {
    return;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
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
            <Stack.Screen name="SignIn" component={SignIn} />
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
