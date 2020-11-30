import React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';

const Input = ({inputStyle, titleStyle, title, colorValue, onChangeColor}) => {
    return <View style={styles.container}>
        <Text style={titleStyle}>{title}</Text>
        <TextInput
        style = {inputStyle}
        value = { colorValue } 
        keyboardType='numeric'
        onChangeText= { onChangeColor }
        />
    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10
    }
})
export default Input;