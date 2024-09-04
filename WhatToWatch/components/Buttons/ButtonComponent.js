import { 
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";


export default function ButtonComponent({ 
    color, 
    size,
    buttonContainer,
    button,
    onItemPress,
    buttonLabel,
    label,
    icon,
} ){
    return(
        <View style={buttonContainer}>
            <LinearGradient
              locations={[0,1,1]}
              colors={[
                "#7C4DFF",
                "#F94A56",
                "#FF1744",
              ]}
              style={[{borderRadius: 10}, button]}
              useAngle={true} // ??? ne fonctionne pas
              angle={70} // ??? ne fonctionne pas
              angleCenter={{x: 0.5, y: 0.5}} // ??? ne fonctionne pas
              >
                <TouchableOpacity style={[button, color, size]} onPress={onItemPress}>
                    { icon ? 
                        <FontAwesome name={icon}/>
                    :
                        <Text style={buttonLabel}>
                            {label}
                        </Text>
                    }
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};
