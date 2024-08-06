
import { Text, View , StyleSheet } from 'react-native';


export default function ListScreen() {
    return (
        <View style={styles.container}>
            <Text>Welcome to the ListScreen</Text>
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