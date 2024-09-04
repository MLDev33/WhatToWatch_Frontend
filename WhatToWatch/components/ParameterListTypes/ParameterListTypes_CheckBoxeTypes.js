import { 
    View , 
    StyleSheet, 
    Image 
} from 'react-native';
import { useState } from 'react';
import CheckBox from 'react-native-check-box';


export default function ParameterListTypes_CheckBoxeTypes({label, onClickCheckBox}){
    /**
     * State qui indique si un tpe a été clicked
     * State géré dans un composant parent car le paramètre 
     * type conditionne le rendu du paramètre genres
     */
    const [isTypeClick, setIsTypeClick] = useState(true);

    return(
        <View style={styles.parameterCheckBoxeContainer}>
            <CheckBox
                title={label}
                style={styles.checkbox}
                onClick={()=>{
                    setIsTypeClick(!isTypeClick)
                    onClickCheckBox(label)
                    console.log(`Dans composant Checkbox: ${label} is clicked ${isTypeClick}`)
                }}
                isChecked={!isTypeClick}
                rightText={label}
                rightTextStyle={styles.checkBoxLabel}
                checkedImage={
                    <Image 
                        source={require('../../assets/CheckBoxes/checkBoxChecked.png')} 
                        style={styles.checkBoxIcon}
                    />}
                unCheckedImage={
                    <Image 
                        source={require('../../assets/CheckBoxes/checkBoxDefault.png')} 
                        style={styles.checkBoxIcon}
                    />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    parameterCheckBoxeContainer:{
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    checkbox: {
        width:90,
        height:50,
        justifyContent:"center",

        // borderColor:"red",
        // borderWidth:2,
    },
    checkBoxIcon:{
        width: 24,
        height: 24,
    },
    checkBoxLabel: { 
        color: "white",
        textAlign: "left",
        fontSize: 16,
        justifyContent:"center",
        alignItems:"center",
    }
})