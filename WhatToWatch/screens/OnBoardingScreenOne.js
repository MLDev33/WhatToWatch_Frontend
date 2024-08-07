import React from 'react';
import { Text, View , StyleSheet, FlatList } from 'react-native';

import OnboardingItems from '../components/Onboarding/OnboardingItems';
import OnBoarding from '../components/Onboarding/Onboarding';

export default function OnBoardingOne() {
    return (
        <View style={styles.container}>
            < OnBoarding />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
       
    },  
});