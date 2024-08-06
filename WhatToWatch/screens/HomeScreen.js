import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Movie from "../components/Movie/Movie";
/*


Workspace
FlatList est un composant de React Native utilisé pour afficher des listes défilantes de données. Il est particulièrement efficace pour gérer de grandes quantités de données car il ne rend que les éléments visibles à l'écran, ce qui améliore les performances par rapport à une simple boucle de rendu de tous les éléments.
*/
export default function HomeScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [movies, setMovies] = useState([]);

  //mock data for user
  const mockUser = {
    username: "John Doe",
    region: "FR",
    plateformes: ["Netflix"],
    limit: 30,
  };

  //cas d'un utilisateur qui renseigne en plateforme de Streaming "Netflix" , en region "FR" , et une limite arbitraire de 30 films

  async function fetchTrendings () {
    try {
        const response = await fetch ('http://192.168.1.83:3000/movies/trendings?platform=netflix&region=en&limit=30');
        if (!response.ok) {
            throw new Error('Something went wrong' + response.status);
        }
        const data = await response.json();
        console.log("data is : " , data);
        console.log(JSON.stringify(data , null , 2));
        const movies = data.results;
    } catch (error) {
        console.error("erreur : " , error);
    }
}

useEffect(() => {
    fetchTrendings();
}, []);

useEffect(() => {
    movies.map(movie => {
        console.log(movie.title);
    });
}, [movies]);

let username = "John Doe";

return (
<View style={styles.container}>
  <Text>Welcome {username}</Text>
    <View style={styles.movies}>
    <Text>Here are some movies you might like:</Text>
    </View>  
</View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
alignItems: 'center',
justifyContent: 'center',
},
movies: {
marginTop: 20,
},
});