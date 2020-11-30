import React from 'react';
import { View, StyleSheet } from 'react-native';
import Input from './Input';


const Inputs = ({redColor, greenColor, blueColor, setRedColor, setGreenColor, setBlueColor}) => {

    
   return(

    <View style = {styles.inputContainer}>
            <Input
            title = 'RED'
            titleStyle = {{color: 'red'}}
            inputStyle = {styles.inputRed}
            colorValue = {redColor}
            onChangeColor = {setRedColor}
            />
            <Input
            title = 'GREEN'
            titleStyle = {{color: 'green'}}
            inputStyle = {styles.inputGreen}
            colorValue = {greenColor}
            onChangeColor = {setGreenColor}
            />
            <Input
            title = 'BLUE'
            titleStyle = {{color: 'blue'}}
            inputStyle = {styles.inputBlue}
            colorValue = {blueColor}
            onChangeColor = {setBlueColor}
            />
    </View>  
   )
}
const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row'
    },
    inputRed: {
        borderColor: 'red',
        borderWidth: 2,
        height: 50,
        padding: 10
    },
    inputGreen: {
        borderColor: 'green',
        borderWidth: 2,
        height: 50,
        padding: 10
    },
    inputBlue: {
        borderColor: 'blue',
        borderWidth: 2,
        height: 50,
        padding: 10
    }
})
export default Inputs;