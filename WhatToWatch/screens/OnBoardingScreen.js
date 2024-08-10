import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Button,
  useWindowDimensions
} from "react-native";
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from "@react-navigation/native";

export default function OnBoardingScreen() {
const navigation = useNavigation();

const { width, height } = useWindowDimensions();

    const Square = ({ isLight, selected }) => {
        let backgroundColor;
        if (isLight) {
          backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
        } else {
          backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
        }
        return (
          <View
            style={{
              width: 10,
              height: 6,
              marginHorizontal: 3,
              backgroundColor,
            }}
          />
        );
      };

      const Next = ({ isLight, ...props }) => (
        <Button
          title={'Next'}
        //   buttonStyle={{
        //     // backgroundColor: backgroundColor(isLight),
        //   }}
          containerViewStyle={{
            marginVertical: 10,
            width: 70,
            // backgroundColor: backgroundColor(isLight),
          }}
        //   textStyle={{ color: color(isLight) }}
        //   {...props}
        />
      );

  return (
    <SafeAreaView style={styles.container}>
      <Onboarding
      onDone={()=> navigation.replace('SignUp')}
      DotComponent={Square}
      NextButtonComponent={Next}
        pages={[
          {
            backgroundColor: "#fff",
            image: <Image source={require('../assets/images/onboarding-image-2.jpg')} style={[styles.image, { width, height, resizeMode: "contain" }]}/>,
            title: " Welcome to What To Watch ",
            subtitle:
              "Stay informed about the latest releases of movies or series on your favorite platforms (Netflix, Disney+, OCS, etc.). Plan your next movie night alone or with a group!",
          },
          {
            backgroundColor: "#fff",
            image: <Image />,
            title: " Welcome to What To Watch ",
            subtitle:
              "Not sure what to watch on your next date? Create a list of your favorite movie genres, like films or series, and share everything with the group! A match? Perfect, your movie night is planned!",
          },
        ]}
        bottomBarColor='white'
        showSkip={false}
        // showNext={false}
        // showDone={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    image:{
      position: 'absolute',
      marginTop: 0
    } 
});
