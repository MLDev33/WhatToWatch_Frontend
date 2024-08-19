import React from "react";
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons as Icon } from '@expo/vector-icons';

import { useState } from "react";

//-----POUR RECUPERER L'URL DE L'API EN FONCTION DE L'ENVIRONNEMENT DE TRAVAIL---//
const vercelUrl = process.env.EXPO_PUBLIC_VERCEL_URL;
const localUrl = process.env.EXPO_PUBLIC_LOCAL_URL;
// Utiliser une condition pour basculer entre les URLs
//const baseUrl = vercelUrl; // POUR UTILISER AVEC VERCEL
const baseUrl = localUrl; // POUR UTILISER EN LOCAL

const providers = [
    {id : 1, "Amazon Prime Video": 119, name: 'Amazon Prime', logo:''}, 
    {id : 2, "Disney Plus": 337, name: 'Disney Plus', logo: ''}, 
    {id : 3,  Netflix: 8, name: 'Netflix', logo:''}, 
    {id : 4, "HBO Max": 384, name: 'HBO Max',  logo: ''},  
    {id : 5,"Canal+": 381, name: 'Canal+', logo: ''}, 
    {id : 6, "Apple TV": 2, name:  "Apple TV",  logo:''},
    {id : 7, Starz: 43, name: 'Starz', logo: ''}, 
    {id : 8, Crunchyroll: 283, name: 'Crunchyroll', logo: ''}, 
    {id : 9, MUBI: 11, name: 'MUBI', logo:''}, 
    {id : 10, YouTube: 192, name: 'YouTube', logo:''}, 
    {id : 11, Hulu: 15, name: 'Hulu', logo: ''}, 
    {id : 12, "Rakuten TV": 35, name: 'Rakuten TV', logo: ''}, 
    {id : 13, "BBC iPlayer": 38, name: 'BBC iPlayer', logo: ''}, 
    {id : 14, "OCS Go": 56, name: 'OCS', logo: ''}, 
    {id : 15, ABC: 148, name: 'ABC', logo: ''}, 
    {id : 16, "Universal Pictures": 184, name: 'Universal Pictures', logo: ''}, 
    {id : 17,Arte: 234, name: 'Arte', logo: ''}, 
     {id : 18, "France TV": 236, name: 'France TV', logo: ''}, 
     {id : 19, Boomerang: 248, name: 'Boomerang', logo: ''}, 
     {id : 20, Sky: 210, name: 'Sky', logo: ''}, 
     {id : 21, "Rai Play": 222, name: 'Rai Play', logo: ''},   
 ];
   


const SelectPlatformModal = ({ platformsModalVisible, setPlatformsModalVisible }) => {

    const [selectedProviders, setSelectedProviders] = useState([]);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={platformsModalVisible}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Choose your streaming services
            </Text>
            <Text style={styles.modalTitle}>Select at least one platform</Text>
            <SectionedMultiSelect 
            items={providers}
            IconRenderer={Icon}
            uniqueKey="id"
            onSelectedItemsChange={setSelectedProviders}
            selectedProviders={selectedProviders}
            />
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={() => setPlatformsModalVisible(false)}
              >
                <Text style={styles.modalTitle}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                // onPress={() => handleSubmit()}
                style={styles.button}
                activeOpacity={0.8}
              >
                <Text style={styles.modalTitle}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    marginHorizontal: 10,
  },
  buttons: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SelectPlatformModal;
