
import { Text, View , StyleSheet } from 'react-native';


export default function SearchScreen() {
    return (
        <View style={styles.container}>
            <Text>Welcome to the SearchScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },  
});