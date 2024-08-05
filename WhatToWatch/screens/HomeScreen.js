import { useEffect , useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet , Text , View } from 'react-native';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [movies, setMovies] = useState([]);

    //mock data for user
    
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