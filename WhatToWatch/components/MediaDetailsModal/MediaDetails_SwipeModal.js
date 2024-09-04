import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Animated,
    PanResponder,
    StatusBar,
} from 'react-native';
import {
    PanGestureHandler,
    GestureHandlerRootView,
} from "react-native-gesture-handler";
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import MediaDetails from "./MediaDetails.js";
import { useDispatch, useSelector } from "react-redux";
import Media_ControlsToSwipe from "../MoviesSwipeSystem/Media_ControlsToSwipe.js";
import { color } from "react-native-elements/dist/helpers/index.js";

const { width, height } = Dimensions.get("screen")

export default function MediaDetails_SwipeModal({
    visible,
    unVisible,
    media,
    index,
    //onSwipe,
}) {

    const [mediaDetail, setMediaDetail] = useState(null);
    const navigation = useNavigation();
    const list = useSelector((state) => state.list.value)

    const [movies, setMovies] = useState(media);

    const handlePressClose = () => {
        unVisible(false)
    }


    // valeur pour l'animation swipe
    const swipe = useRef(new Animated.ValueXY()).current;
    const titlSign = useRef(new Animated.Value(1)).current;

    // Panresponder config
    const panresponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,

        onPanResponderMove: (_, { dx, dy, y0 }) => {
            swipe.setValue({ x: dx, y: dy });
            titlSign.setValue(y0 > 0.9) / 2 ? 1 : -1
        },

        onPanResponderRelease: (_, { dx, dy, y0 }) => {
            const direction = Math.sign(dx);
            const isActionActive = Math.abs(dx) > 100;

            if (isActionActive) {
                // Swipe the card off the screen
                Animated.timing(swipe, {
                    duration: 100,
                    toValue: {
                        x: direction * 500,
                        y: dy
                    },
                    useNaviveDriver: true
                }).start(removeTopCard)
            } else {
                //return the card to its original position
                Animated.timing(swipe, {
                    duration: 100,
                    toValue: {
                        x: 0,
                        y: 0,
                    },
                    useNaviveDriver: true,
                    friction: 5
                }).start()
            }
        },

    })

    // remove the top card from the movies array
    const removeTopCard = useCallback(() => {
        swipe.setValue({ x: 0, y: 0 });
    })

    // handle  choice (left or right)
    const handleChoice = useCallback((direction) => {
        Animated.timing(swipe.x, {
            toValue: direction * 500,
            duration: 400,
            useNativeDriver: true
        }).start(removeTopCard)
    }, [removeTopCard, swipe.x])


    useFocusEffect(
        useCallback(() => {
            if (media) {
                if (!media.length) {
                    setMovies(media)
                }
            }
        }, [media ? media.length : ""])
    );


    const isFirst = index == 0;
    const dragHandlers = isFirst ? panresponder.panHandlers : {};

    return (
        <Modal
            // animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={unVisible}
            style={{ height: height * 0.9 }}
        >
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => handlePressClose()}
                    style={styles.fermerContainer}
                >
                    <Text
                        style={styles.fermerTextButton}
                    >
                        Fermer
                    </Text>
                </TouchableOpacity>
                <View>
                <StatusBar hidden={true} />
                {
                
                    <MediaDetails
                        index={index}
                        title={!media ? "" : media.titre}
                        description={!media ? "" : media.description}
                        annee={!media ? "" : media.annee}
                        genre={!media ? "" : media.genre}
                        type={!media ? "" : media.type}
                        sourcePoster={!media ? "" : media.poster}
                        popularite={!media ? "" : media.popularite}
                        vote={!media ? "" : media.vote}
                        plateformes={!media ? "" : media.plateformes}
                        lien={!media ? "" : "lien"}
                        isFirst={isFirst}
                        swipe={swipe}
                        titlSign={titlSign}
                        {...dragHandlers}
                    />
                }
                </View>
                <Media_ControlsToSwipe handleChoice={handleChoice} />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        margin: 0,
        padding: 0,
        backgroundColor: "#000027",
    },
    fermerContainer: {
        top: 40,
        left: 20,
        zIndex: 20,
        borderColor: "grey",
        borderWidth: 2,
        borderRadius: 10,
        height: 30,
        width: 60,
        alignSelf: "flex-start",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",

    },
    fermerTextButton: {
        textAlign: "center",
        color: "white",
        fontSize: 15,
        fontWeight: "500",
    },

})