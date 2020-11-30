import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Inputs from './Components/Inputs';
import  Validate  from './utils/Validate';


class ColorCreatorScreen extends Component {
    constructor(props) {
        super(props)
        this.loadColorList()
    }
    
    state = {
        redColor: '',
        greenColor: '',
        blueColor: '',
        rgbColorList: []
    }

    loadColorList = async () => {

        try {
        const colorList = await AsyncStorage.getItem('colorList')
        
        return colorList != null ? this.setState ({rgbColorList: JSON.parse(colorList)}) : this.props.rgbColorList;
       
        } catch (error) {
            // console.log("error from loadColorList : " + error)
        }
       
    }
    renderItem = ({item}) => {
        return (
        <View style = {styles.colorRow}>
            
            <Text>Color {item}</Text>  

            <View style={{
                width: 150,
                height: 25,
                marginLeft: 30,
                backgroundColor: item
            }}/>
        </View>)
    }
    onPress = async (previousColors) => {
        Keyboard.dismiss();
        const { dispatch, rgbColorList } = this.props;
        const {redColor, greenColor, blueColor } = this.state;

        const currentColors = previousColors.concat([this.renderRGB()])
        if ((Validate.isRGB(redColor)&&Validate.isRGB(greenColor)&&Validate.isRGB(blueColor))) {
        try {
            await dispatch({type: 'addElement', payload: [this.renderRGB()]})
            await AsyncStorage.setItem('colorList', JSON.stringify(currentColors))
        } catch (error) {
        //    console.error("AsynStorage Error from onpress : " + error) 
        }
        } else {
            this.renderError()
        }
     
    
    }
     
    renderRGB = () => {
        const {redColor, greenColor, blueColor } = this.state;
        return `rgb(${redColor}, ${greenColor}, ${blueColor})`
    }

    renderError () {
        const {redColor, greenColor, blueColor } = this.state;
        if (!Validate.isRGB(redColor)||!Validate.isRGB(greenColor)||!Validate.isRGB(blueColor)) {
        return <Text style ={{color: 'red'}}>
            The number must be between 0 and 255
        </Text>
        }
    }

    render() {
    const { redColor, greenColor, blueColor, rgbColorList } = this.state;
        
    return (
        <View style={styles.containter}>
            <Text style={styles.title}>Create Your Own Color</Text>
            <Text>Please input a number between 0 and 255 for 'RED', 'GREEN' and 'BLUE' respectively</Text>
            <Inputs
            redColor = {redColor}
            greenColor = {greenColor}
            blueColor = {blueColor}
            setRedColor = {(redColor) =>this.setState({redColor})}
            setGreenColor = {(greenColor) => this.setState({greenColor})}
            setBlueColor = {(blueColor) => this.setState({ blueColor})}
            />
            <View style = {{height: 20}}>{this.renderError()}</View>
            <TouchableOpacity
            onPress = {() => this.onPress(this.props.rgbColorList)}
            style = {styles.button}>
                <Text style ={{fontWeight: 'bold', color: 'white'}}>Add the color</Text>
            </TouchableOpacity>    
            <FlatList
             data = {this.props.rgbColorList.length !== 0 ?this.props.rgbColorList: rgbColorList}
             keyExtractor = {item => {`${item.id}+${Math.random}`}}
            renderItem = {({item, index}) => this.renderItem({item, index})}
            />
        </View>
    );
    }
}

const styles = StyleSheet.create({
    containter: {
        paddingTop: 40,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 40
    },
    button: {
        backgroundColor: 'grey',
        width: Dimensions.get('window').width/2,
        height: 40,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 30
    },
    colorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 1,
        justifyContent: 'space-between'
 
    }
})

const mapStateToProps = state => {
    return {
        rgbColorList: state.colorList
    }
}

export default connect(mapStateToProps, null)(ColorCreatorScreen);