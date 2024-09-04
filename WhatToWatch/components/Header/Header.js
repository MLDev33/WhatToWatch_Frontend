import { Text, View , StyleSheet, Image, TextInput, } from 'react-native';
//import userAvatar07 from "../assets/userAvatars/userAvatar07.png";
import logoHeaderIcon from "../../assets/imgsmall.png";
import { useSelector } from "react-redux";

export default function Header(props) {

    let user = useSelector((state) => state.user.value);

    return (
        <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
                <Image source={logoHeaderIcon} style={styles.logo}/>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textHeader}>{props.label}</Text>
            </View>
            <View style={styles.userAvatarContainer}>
                <Image source={user.avatar}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        height: 80,
        paddingLeft:5,
        paddingRight: 5,
    },
    logoContainer: {
  
    },
    logo: {
        resizeMode:"contain",
        width: 80,
        height: 60,
        borderRadius: 30,
        },
    textContainer: {
        flexDirection: "column",
        width: 160,
        justifyContent: "center",
    },
    textHeader: {
        color: "white",
        textAlign: "right",
        fontSize: 19,
    },
    userAvatarContainer: {

    },
});