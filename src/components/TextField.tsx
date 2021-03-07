import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, TextInput, Image} from 'react-native'


interface TextFieldProps{
    placeholder: string
    isSecure?: boolean
    onTextChange: Function
    isOTP?: boolean    
}

export const TextField: React.FC<TextFieldProps> = ({ placeholder, isSecure = false, onTextChange, isOTP = false }) => {


    if(isOTP){

        return (<View style={styles.container}>

            <TextInput placeholder={placeholder}
            maxLength={6}
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(text) => onTextChange(text)}
            style={styles.otpTextField}>
    
            </TextInput>
    
        </View>)

    }else{

        return (<View style={styles.container}>

            <TextInput placeholder={placeholder}
            autoCapitalize="none"
            secureTextEntry={isSecure}
            onChangeText={(text) => onTextChange(text)}
            style={styles.textField}>
    
            </TextInput>
    
        </View>)

    }


}

const styles = StyleSheet.create({
    container: {
        width: 300,
        backgroundColor: '#DBDBDB',
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingRight: 20,
        paddingLeft: 20
    },
    textField: {
        flex: 1,
        width: 250,
        height: 50,
        fontSize: 20,
        color: '#000'
    },
    otpTextField: {
        flex: 1,
        width: 250,
        height: 50,
        fontSize: 30,
        color: '#000',
        textAlign: 'center'
    }

})