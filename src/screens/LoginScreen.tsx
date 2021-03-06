import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, TextInput, Image} from 'react-native'
import { connect } from 'react-redux'
import { ApplicationState, onUserLogin, onUserSignUp, UserState } from '../redux'
import { ButtonWithIcon, ButtonWithTitle, TextField } from '../components'


interface LoginProps{

    onUserSignUp: Function
    onUserLogin: Function
    userReducer: UserState

}

const _LoginScreen: React.FC<LoginProps> = ({ onUserLogin, onUserSignUp, userReducer }) => {


    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [title, setTitle] = useState('Login')
    const [isSignup, setIsSignup] = useState(false)

    const onTapOptions = () => {
        setIsSignup(!isSignup)
        setTitle(!isSignup ? 'Signup' : 'Login')

    }

    const onTapAuthenticate = () => {
        
        if(isSignup){
            onUserSignUp(email, phone, password)
        }else{
            onUserLogin(email, password)
        }

    }



    return (<View style={styles.container}>

        <View style={styles.navigation}><Text style={{fontSize: 30}}>Login</Text></View>

        <View style={styles.body}>
            <TextField placeholder="Email" onTextChange={setEmail}></TextField>
            {isSignup &&
                <TextField placeholder="Phone" onTextChange={setPhone}></TextField>
            }
            <TextField placeholder="Password" onTextChange={setPassword} isSecure={true}></TextField>
            <ButtonWithTitle title={title} onTap={onTapAuthenticate} width={300} height={50}></ButtonWithTitle>
            <ButtonWithTitle title={!isSignup ? "No Account? Signup Here" : "Have an Account? Login Here"} onTap={() => onTapOptions()} width={310} height={50} isNoBg={true}></ButtonWithTitle>
        </View> 

        <View style={styles.footer}></View>

    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navigation: {
        flex: 2,
        paddingLeft: 50,
        paddingTop: 50
    },
    body: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
    }
})

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer
})

const LoginScreen = connect(mapToStateProps, { onUserLogin, onUserSignUp })(_LoginScreen)

export { LoginScreen }