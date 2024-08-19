import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  useWindowDimensions
} from "react-native";
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from "@react-navigation/native";

export default function OnBoardingScreen() {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  const Square = ({ selected }) => {
    let backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
    return (
      <View
        style={{
          width: 6,
          height: 6,
          marginHorizontal: 3,
          backgroundColor,
        }}
      />
    );
  };

  const Next = ({ ...props }) => (
    <TouchableOpacity style={[styles.buttonContainer, styles.nextButtonContainer]} {...props}>
      <Text style={styles.buttonText}>Next</Text>
    </TouchableOpacity>
  );

  const Done = ({ ...props }) => (
    <TouchableOpacity style={[styles.buttonContainer, styles.doneButtonContainer]} {...props}>
      <Text style={styles.buttonText}>Done</Text>
    </TouchableOpacity>
  );

  const Skip = ({ ...props }) => (
    <TouchableOpacity style={[styles.buttonContainer, styles.skipButtonContainer]} {...props}>
      <Text style={styles.buttonText}>Skip</Text>
    </TouchableOpacity>
  );

  return (
    <Onboarding
      DotComponent={Square}
      onDone={() => navigation.replace('SignUp')}
      onSkip={() => navigation.replace('SignUp')}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      SkipButtonComponent={Skip}
      pages={[
        {
          backgroundColor: "#000027",
          image: 
          <View style={styles.imageContainer}>
            <Image source={require('../assets/onboarding-image-1.png')} 
              style={[styles.image, { width, height: height * 0.5 }]}
            />
          </View>,
          title: `Welcome to ${'\n'} What To Watch`,
          subtitle:
            "Stay informed about the latest releases of movies or series on your favorite platforms (Netflix, Disney+, OCS, etc.). Plan your next movie night alone or with a group!",
        },
        {
          backgroundColor: "#000027",
          image: 
          <View style={styles.imageContainer}>
            <Image source={require('../assets/onboarding-image-2.jpg')} 
              style={[styles.image, { width, height: height * 0.5 }]}
            />
          </View>,
          title: `Welcome to ${'\n'} What To Watch`,
          subtitle:
            "Not sure what to watch ? Create a list of your favorite genres, films or series, and share everything with the group! A match? Perfect, your movie night is planned!",
        },
      ]}
      bottomBarHeight={60}
      titleStyles={styles.textH1}
      subTitleStyles={styles.textBody14}
      showDone={true}
      showSkip={true}
      showNext={true}
      bottomBarHighlight={false}
      bottomBarStyle={styles.bottomBar}
    />
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: '50%',
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
    marginBottom: 20,
  },
  textH1: {
    marginTop: '-35%',
    textAlign: "center",
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  textBody14: {
    marginTop: '-5%',
    fontSize: 20,
    color: "white",
    textAlign: "center",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  nextButtonContainer: {
    backgroundColor: 'purple',
  },
  doneButtonContainer: {
    backgroundColor: 'green',
  },
  skipButtonContainer: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  bottomBar: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
});