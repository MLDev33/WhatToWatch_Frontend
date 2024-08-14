import React from "react";
import { useRef } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Button,
  useWindowDimensions,
  TouchableOpacity,
  Text
} from "react-native";
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from "@react-navigation/native";

export default function OnBoardingScreen() {
const navigation = useNavigation();

const { width, height } = useWindowDimensions();

// const skip = ( {...props} ) => ( <TouchableOpacity style={{marginHorizontal:10}} {...props} > <Text style={{fontSize:16}}>Done</Text> </TouchableOpacity> );


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
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Next = ({  ...props }) => (
  <Button
    title={'Next'}
    // buttonStyle={{
    //   backgroundColor: backgroundColor(isLight),
    // }}
    containerViewStyle={{
      marginVertical: 10,
      width: 70,
      // backgroundColor: backgroundColor(isLight),
    }}
    // textStyle={{ color: color(isLight) }}
    {...props}
  />
);

const Done = ({  ...props }) => (
  <Button
    title={'Done'}
    // buttonStyle={{
    //   backgroundColor: backgroundColor(isLight),
    // }}
    containerViewStyle={{
      marginVertical: 10,
      width: 70,
      // backgroundColor: backgroundColor(isLight),
    }}
    // textStyle={{ color: color(isLight) }}
    {...props}
  />
);

  return (
    <SafeAreaView 
    style={styles.container}
    >
      <Onboarding
DotComponent={Square}
      // onDone={()=> navigation.replace('SignUp')}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
        pages={[
          {
            backgroundColor: "#000027",
            image: 
            <View style={styles.imageContainer}>
              <Image source={require('../assets/onboarding-image-1.png')} 
            style={[style=styles.image,
              { width }]}
            />
            </View>,
            title: ` Welcome to ${'\n'} What To Watch `,
            subtitle:
              "Stay informed about the latest releases of movies or series on your favorite platforms (Netflix, Disney+, OCS, etc.). Plan your next movie night alone or with a group!",
          },
          {
            backgroundColor: "#000027",
            image: 
            <View style={styles.imageContainer}>
              <Image source={require('../assets/onboarding-image-2.jpg')} 
            style={[style=styles.image,
              { width }]}
            />
            </View>,
            
            title: ` Welcome to ${'\n'} What To Watch `,
            subtitle:
              "Not sure what to watch on your next date? Create a list of your favorite movie genres, like films or series, and share everything with the group! A match? Perfect, your movie night is planned!",
          },
        ]}
     
        containerStyles={{
          marginTop: -200, 
          borderColor: "yellow",
          borderWidth: 2,  
          }}
        titleStyles={styles.textH1}
        subTitleStyles={styles.textBody14}
        showDone={true}
        // showSkip={false}
        // skipLabel={skip}
        showNext={true}
      />
      
    </SafeAreaView>
  );
}

// / const Font = require('../styles/globalFonts');
// const Color = require('../styles/globalColors');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: "green",
        borderWidth: 2,
        backgroundColor: "#000027",
    }, 
  //   imageContainer:{
  //     borderColor: "red",
  //     borderWidth: 2,
  //     resizeMode: "cover",
  //     flexDirection: "column",
  // },
  image: {
      height: 450,
  },
  textH1: {
    textAlign: "center",
    color:"white",
    fontSize: 40,
    fontWeight: "bold",
},
textBody14: {
fontSize: 14,
color: "white",
textAlign: "center",
marginVertical: 20,
},
buttonContainer:{
  flex: "auto",
  alignItems: "center",
}
});




// import { StyleSheet, View, Text, Image } from "react-native";
// import img001 from "../assets/images/img001.png";
// import Button from "../components/Button.js";
// export default function Onboarding1Screen(){
//     return( 
//         <View style={styles.container}>
//             <View style={styles.imageContainer}>
//                 <Image source={img001} style={styles.image}/>
//             </View>
//             <View style={styles.textContainer}>
//                 <Text style={styles.texth1}>
//                     Welcome to What to Whatch
//                 </Text>
//                 <Text style={styles.textBody14}>
//                     Stay informed about the latest releases of movies or series on
//                     your favorite platforms (Netflix, Disney+, OCS, etc.). Plan your 
//                     next movie night alone or with a group!
//                 </Text>
//             </View>
//             <View style={styles.buttonContainer}>
                
//                 <Button label="Next" colorBg=""/>
//             </View>
//             <View>
//                 <Text>skip</Text>
//             </View>
//         </View>
//     );
// }

//     textContainer: {
//         width: 344.75,
//         justifyContent: "center",
//         alignItems: "center",
//         marginVertical: 20,
//         paddingHorizontal: 20,
//     },
//     texth1: {
//         textAlign: "center",
//         color:"white",
//         fontSize: 40,
//         fontWeight: "bold",
// },
// textBody14: {
//     fontSize: 14,
//     color: "white",
//     textAlign: "center",
//     marginVertical: 20,
// },

// })
