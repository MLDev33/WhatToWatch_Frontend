import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { buildCreateSlice } from "@reduxjs/toolkit";


export default function MediaCardForList({
    styleMediaCardContainer,
    styleInfosContainer,
    onPress,
    stylePosterMedia,
    sourcePoster,
    styleTextInfoMediaContainer,
    styleTitleMedia,
    title,
    descriptionMedia,
    styleDescriptionMedia,
    vote,
    styleTextVote,
    popularite,
    styleTextPopularite,
    styleVoteEtPopuariteContainer,
    genre,
    styleTextGenre
}) {
    return (
        <View >
            <LinearGradient
                locations={[0, 1, 1]}
                colors={[
                    "#7876A0",
                    "#7876A0",
                    "#7876A0",
                ]}
                style={styleMediaCardContainer}
                useAngle={true} // ??? ne fonctionne pas
                angle={70} // ??? ne fonctionne pas
                angleCenter={{ x: 0.5, y: 0.5 }} // ??? ne fonctionne pas
            >
                <TouchableOpacity style={styleInfosContainer} onPress={() => onPress()}>
                    <Image style={stylePosterMedia} source={sourcePoster} />
                    <View style={styleTextInfoMediaContainer}>
                        <Text style={styleTitleMedia}>
                            {title}
                        </Text>
                        <Text style={styleDescriptionMedia}>
                            {
                                descriptionMedia == undefined ? "N/A" : (descriptionMedia.length > 100 ? `${descriptionMedia.substring(0, 150)}...` : descriptionMedia)
                            }
                        </Text>
                        <Text style={styleTextGenre}>
                            <Text style={{color: "black", fontWeight:"bold"}}>Genre : </Text>
                            {genre}
                        </Text>
                        <View style={styleVoteEtPopuariteContainer}>
                            <Text style={styleTextPopularite}>
                                <Text style={{color: "black", fontWeight:"bold"}}>Popularité : </Text>
                                {popularite}
                            </Text>
                            <Text style={styleTextVote}>
                                <Text style={{color: "black", fontWeight:"bold"}}>Vote : </Text>
                                {vote}
                            </Text>
                        </View>
                    </View>

                </TouchableOpacity>
            </LinearGradient>

        </View>
    );
};

