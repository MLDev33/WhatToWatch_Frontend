import { 
  Text, 
  View , 
  TouchableOpacity, 
  StyleSheet,
  Image,
} from 'react-native';
import { useEffect, useState } from 'react';
import { LinearGradient } from "expo-linear-gradient";
//import { Result } from 'antd';

export default function ListAvatarComponent({ 
  stylesButton, 
  stylesButtonLabel,
  clickAvatar,
  stylesLinearGradient,
  stylesAvatar,
  label,
  source,
  results,
} ){
 
  /**
   * State qui renvoie le statue true ou false de l'avatar selectionné
   * State non utilisé pour avatar de la list ( à supprimer ?)
   */
  const [toggleAvatarButton, setToggleAvatarButton] = useState(false);

  /**
   * Permet d'envoyer au compoant parent l'avatar cliked'
   * 
   * @param {{key: number, source: string, value: string }} item
   */
  const handleChangeAvatar = (item) => {
    console.log("Item", results)
      clickAvatar(item)
  }

    return (
        <>
            <LinearGradient
            locations={[0,1,1]}
            colors={[
                "#7C4DFF",
                "#F94A56",
                "#FF1744",
            ]}
            style={stylesLinearGradient}
            useAngle={true} // ??? ne fonctionne pas
            angle={70} // ??? ne fonctionne pas
            angleCenter={{x: 0.5, y: 0.5}} // ??? ne fonctionne pas
            >
                <TouchableOpacity 
                  style={stylesButton} 
                  onPress={() => {
                    setToggleAvatarButton(!toggleAvatarButton),
                    handleChangeAvatar(results)
                    //console.log(`Dans parameters list: ${label} is clicked ${toggleAvatarButton}`)
                  }}
                >
                    <View style={stylesAvatar}>
                        <Image style={stylesAvatar} source={source}/>
                    </View>
                    <Text style={stylesButtonLabel}>
                        {label}
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        </>
    );
};

