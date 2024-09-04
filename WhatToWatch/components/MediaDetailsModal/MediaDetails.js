import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Animated,
    SafeAreaView,
    StatusBar,
    Platform,
    ScrollView,
  } from 'react-native'
  import React, { Fragment, useCallback } from 'react'
  import { LinearGradient } from 'expo-linear-gradient'
  
  const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const { width, height } = Dimensions.get("screen")
  
  export default function MediaDetails({
    index,
    title,
    description,
    annee,
    genre,
    type,
    sourcePoster,
    popularite,
    vote,
    plateformes,
    lien,
    isFirst,
    swipe,
    titlSign,
    ...rest
  }) {
    const ios = Platform.ios == 'ios';
  
    const rotate = Animated.multiply(swipe.x, titlSign).interpolate({
      inputRange: [-100, 0, 100],
      outputRange: ['8deg', '0deg', '-8deg']
    })
  
    const animatedCardStyles = {
      transform: [...swipe.getTranslateTransform(), { rotate }]
    }
  
    const likeOpacity = swipe.x.interpolate({
      inputRange: [25, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })
  
    // opacity animation for nope
    const nopeOpacity = swipe.x.interpolate({
      inputRange: [-100, -25],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })
  
    const renderChoice = useCallback(() => {
      return (
        <Fragment>
          <Animated.View
            style={[
              styles.choicesContainer,
              styles.heartContainer,
              { opacity: likeOpacity }
            ]}
          >
            <Media_ChoiceToSwipe type="like" />
          </Animated.View>
          <Animated.View
            style={[
              styles.choicesContainer,
              styles.closeContainer,
              { opacity: nopeOpacity }
            ]}
          >
            <Media_ChoiceToSwipe type="nope" />
          </Animated.View>
        </Fragment>
      )
    }, [likeOpacity, nopeOpacity])
  
    return (
      <Animated.View style={[
        styles.container,
        isFirst && animatedCardStyles
      ]} {...rest}>
        <View style={styles.container}>
          <SafeAreaView style={ios ? { margin: -2 } : { margin: -3 }} >
            <StatusBar style="light" />
          </SafeAreaView>
          <View >
            <Image source={{ uri: `${TMDB_IMAGE_BASE_URL}/${sourcePoster}` }} style={styles.poster} />
            <LinearGradient
              colors={['transparent', 'rgba(20,20,20,0.8)', 'rgba(20,20,20,1)']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.gradient}
            >
            </LinearGradient>
          </View>
          <View style={styles.infosMediaContainer}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.typeEtAnnee}>{type} | Année • {annee}</Text>
              <Text style={styles.genre}>Genres • {genre}</Text>
            </View>
            <View>
              <View style={styles.populariteEtVoteContainer}>
                <View style={styles.populariteEtVoteContenu}>
                  <Text style={styles.populariteEtVote}>Popularité : {popularite}</Text>
                </View>
                <View style={styles.populariteEtVoteContenu}>
                  <Text style={styles.populariteEtVote}>Vote : {vote}</Text>
                </View>
              </View>
              <View style={styles.separationBarTop}></View>
                <Text style={styles.description}>
                  {
                    description.length > 100
                    ? `${description.substring(0, 300)}...`
                    : description
                  }
                </Text>
              <View style={styles.separationBarBottom}></View>
              {/* {Array.isArray(plateformes) &&
                plateformes.length > 0 ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {plateformes.map((p, index) => (
                    <TouchableOpacity
                      key={index}
                      //onPress={() => handlePlatformClick(p)}
                    >
                      <View style={styles.platformContainer}>
                        <Image
                          source={{ uri: `${TMDB_IMAGE_BASE_URL}${p.logo}` }}
                          style={styles.platformLogo}
                        />
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              ) : (
                "N/A"
              )} */}
              <Text style={styles.lien}>{lien}</Text>
            </View>
          </View>
        </View>
        {isFirst && renderChoice()}
      </Animated.View>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: width,
      //backgroundColor: "#000027",
  
    },
    safeAreaView: {
  
    },
    poster: {
      position: "absolute",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      width: width,
      height: height * 0.45,
      resizeMode:"cover",
    },
    gradient: {
      bottom: 0,
      height: height * 1,
      width: width,
    },
    infosMediaContainer: {
      marginTop: -(height * 0.60),
    },
    title: {
      color: "white",
      textAlign: "center",
      fontSize: 25,
      lineHeight: 36,
      fontWeight: "bold",
    },
    typeEtAnnee: {
      color: "white",
      fontWeight: "semibold",
      textAlign: "center",
      fontSize: 16,
      marginTop: 10,
    },
    genre: {
      color: "white",
      fontWeight: "semibold",
      textAlign: "center",
      fontSize: 16,
      marginBottom: 5,
    },
    populariteEtVoteContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 20,
      marginHorizontal: 20,
      gap: 20,
    },
    populariteEtVoteContenu: {
      borderColor: "#7C4DFF",
      borderWidth: 1,
      padding: 5,
      borderRadius: 5,
    },
    populariteEtVote: {
      color: "white",
    },
    separationBarTop: {
      width: width * 0.5,
      alignSelf: "center",
      borderColor: "#7C4DFF",
      borderWidth: 1,
      marginTop: 15,
      marginBottom: 5,
    },
    description: {
      color: "white",
      textAlign: "justify",
      fontSize: 16,
      paddingHorizontal: 20,
    },
    separationBarBottom: {
      width: width * 0.5,
      alignSelf: "center",
      borderColor: "#7C4DFF",
      borderWidth: 1,
      marginBottom: 15,
      marginTop: 5,
    },
  })
  