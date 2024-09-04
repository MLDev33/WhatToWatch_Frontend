import { Text, View , StyleSheet, Image } from 'react-native';
//import arrowLeftIcon from "../assets/icons/arrowLeftIcon.png";
//import arrowRightIcon from "../assets/icons/arrowRightIcon.png";

export default function HeaderTitle({
    title,
}) {
    return (
        <View style={styles.headerTitleContainer}>
            <View style={styles.leftIconContainer}>
                {/* <Image style={styles.leftIcon} source={arrowLeftIcon} /> */}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {title}
                </Text>
            </View>
            <View style={styles.rightIconContainer}>
                {/* <Image style={styles.rightIcon} source={arrowRightIcon}/> */}
            </View>
         </View>
    );
}

const styles = StyleSheet.create({
    headerTitleContainer:{
        flexDirection: "row",
        justifyContent:"center",
        alignItems: "center",
    },
    leftIconContainer: {
        width: 24,
    },
    leftIcon:{
        width: 21.5,
        height: 21.5,
    },
    textContainer:{
        width: 280,
        height:30,
        justifyContent:'center',
    },
    text:{
        color: "white",
        textAlign: "center",
        fontSize: 17,
        fontWeight: "bold",
    },
    rightIconContainer: {
        width: 24,
    },
    rightIcon:{
        width: 21.5,
        height: 21.5,

    },
});