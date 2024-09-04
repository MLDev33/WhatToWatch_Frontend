import { Text, TouchableOpacity, } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from "expo-linear-gradient";

export default function GenreComponent({ 
  stylesButtonContainer, 
  stylesButton, 
  stylesButtonLabel,
  clickGenres,
  stylesLinearGradient,
  key,
  label,
  results,
} ){
 
  const [toggleGenreButton, setToggleGenreButton] = useState(false);

  /**
   * Fonction qui ajoute le genre cliked dans les genres
   * cliked
   * @param {{"id": number, "name": string, "type": []}} item 
   */
  const handleAddGenre = (item) => {
    console.log("Item", results)
      clickGenres(item)
  }

    return (
        <>
            <LinearGradient
            locations={[0,1,1]}
            colors={[
              toggleGenreButton ? "#7C4DFF" : "#FFF",
              toggleGenreButton ? "#F94A56" : "#FFF",
              toggleGenreButton ? "#FF1744" : "#FFF",
            ]}
            style={stylesLinearGradient}
            useAngle={true} // ??? ne fonctionne pas
            angle={70} // ??? ne fonctionne pas
            angleCenter={{x: 0.5, y: 0.5}} // ??? ne fonctionne pas
            >
                <TouchableOpacity 
                  style={stylesButton} 
                  onPress={() => {
                    setToggleGenreButton(!toggleGenreButton),
                    handleAddGenre(results),
                    console.log(`Dans parameters genres: ${label} is clicked ${toggleGenreButton}`)
                  }}
                >
                    <Text style={stylesButtonLabel}>
                        {label}
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        </>
    );
};