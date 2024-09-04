import { 
    StyleSheet, 
 } from "react-native";
import { useState, useEffect, useCallback} from "react";
import { useSelector } from "react-redux";
import chevron_navigate_right from "../../assets/Icons/chevron_navigate_right.png";
import ParameterContainer from "../Parameters/ParameterContainer.js";
import ParameterListGenres_ModalGenres from "./ParameterListGenres_ModalGenres.js";

//-----POUR RECUPERER L'URL DE L'API EN FONCTION DE L'ENVIRONNEMENT DE TRAVAIL---//
const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
// Utiliser une condition pour basculer entre les URLs
//const baseUrl = vercelUrl; // POUR UTILISER AVEC VERCEL
const baseUrl = localUrl; // POUR UTILISER EN LOCAL


export default function ParameterListGenres({typesOfList}){

    // State qui gére l'ouverture de la modal genre
    // au click sur la flèche du titre du paramètre genres
    const [isModalGenresVisible, setIsModalGenresVisible] = useState(false);
    const [genresMovieFetch, setGenresMovieFetch] = useState([]);
    const [genresTvFetch, setGenresTvFetch] = useState([]);
    const [allGenresFetch, setAllGenresFetch] = useState([]);


    const list = useSelector((state) => state.list.value) 

    /**
     * Fonction qui fetch les genres pour les media de type movie
     */
    const fetchMovieGenres = async () => {
            const response = await fetch(`${baseUrl}genres/get/movie`);
            const data = await response.json();
            //console.log("Genres movie existante:", data.results.genres)
            setGenresMovieFetch(data.results.genres);
    }

    /**
     * Fonction qui fetch les genres pour les media de type tv
     */
    const fetchTvGenres = async () => {
            const response = await fetch(`${baseUrl}genres/get/tv`);
            const data = await response.json();
            //console.log("Genres tv existante:", data.results.genres)
            setGenresTvFetch(data.results.genres);
    }
    /**
     * Fonction qui vérifie si le paramètre est un array et s'il n'est pas vide
     * 
     * @param {*} array 
     * @returns 
     */
    function isEmptyArray(array){
        return Array.isArray(array) && array.length === 0
    }

    /**
     * Fonction qui retourne la liste fusionnée puis triée des genres pour les movies et les series
     * Parametre : "types" est un array qui contient les types de la list
     *              exemple: ["Movie", "TV"] retourné par le state de la catégorie selectionné par l'utilisateur
     * 
     * NOTA fonction à revoir -> pb affichage vide au premier click puis ok au deuxième click
     * et valeur tv ne s'joute pas dans l'objet ???
     * 
     * @param {Array.<String>} genresMedia 
     * @returns 
     */
    async function getGenres(genresMedia){
        fetchMovieGenres()
        fetchTvGenres()

        let listAllGenres = [];
        let movieGenresValid =  genresMovieFetch;
        let tvGenresValid = genresTvFetch;

        //console.log("function getGenres for types:", genresMedia)
        //console.log("value genre movie:", genresMedia.includes("Movie"))

        //console.log("movieGenreValid", movieGenresValid)

        // Ajoute les genres movie si la propriété movie est inclus dans l'objet type
        if(genresMedia.includes("Movie")){
            movieGenresValid.map((genreM) => {
                //console.log("genreMovie", genreM);
                addElement = genreM;
                addElement.type = ["movie"];
                listAllGenres.push(addElement);
                //console.log("AddMovieGenre", addElement);
            })
        }
        else{
            listAllGenres = [];
        }

        // Ajoute les genres tv si la propriété tv est inclus dans l'objet type
        //console.log("tvGenreValid", tvGenresValid)
        if(genresMedia.includes("TV")){
            //console.log("value genre TV:", genresMedia.TV)
            const genresListSet = new Set();
            listAllGenres.map((genre) => {
                //console.log("genre", genre);
                genresListSet.add(genre.id)
          })
          //console.log("id présent dans listAllGenres :", genresListSet);

          // si le genre tv n'est pas dans la liste, il est ajouté
          tvGenresValid.map((genreTv) => {
              if (!genresListSet.has(genreTv.id)) { 
                  addElement = genreTv;
                  addElement.type = ["tv"];
                  listAllGenres.push(addElement);
                  //console.log("genreTV",genreTv)
              }
              else {

                // ajouter ["Movie", "TV"]...

                //console.log("debug", genreTv)
                // si le genre tv est dans la liste ajouter le type TV
                //console.log("doublons:", genreTv);
                //let index = genresListSet.findIndex(obj => obj.id == genreTv.id );
                //listAllGenres[index].type = ["movie", "tv"];
                //console.log("view", listAllGenres[index].type );
              }
          })
        }
        //console.log("ALLGENRES View:", listAllGenres)
        listAllGenres = listAllGenres.sort((a, b) => a.name > b.name ? 1 : -1);
        setAllGenresFetch(listAllGenres);
        //console.log("result listAllGenres", Genres)
        //console.log("results listAllGenres", resultsAllGenres)
        return listAllGenres
    };

    const onPressIcon = async() => {
        if(isEmptyArray(list.types)) return alert("Categorie requiere !!!")
        const afficherGenres = getGenres(typesOfList)
        setIsModalGenresVisible(true)
    }

    const onClose = () => {
        setIsModalGenresVisible(false)
    }

    
    return(
        <ParameterContainer 
            name={"GENRES"}
            image={chevron_navigate_right}
            onPressIcon={onPressIcon}
            styleParameterContenuContainer={styles.parameterContenuContainer}
            contenu={
                <ParameterListGenres_ModalGenres
                    visible={isModalGenresVisible}
                    unVisible={onClose}
                    typesOfList={allGenresFetch}
                />
            }
        />
    );
}

const styles = StyleSheet.create({
    parameterContenuContainer:{
        flexDirection: "row",
        flexDirection: "row",
        justifyContent:"space-around",
        paddingTop: 5,
        paddingBottom: 5,
        alignItems:"center",
    },

    parameterContenuContainerColumn:{
        flexDirection: "column",
        //height:"100%",
        gap:2,
    },
});