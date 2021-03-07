import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, TextInput, Image} from 'react-native'
import { connect } from 'react-redux'
import { ApplicationState, onUserLogin, onUserSignUp, UserState, onOTPRequest, onVerifyOTP } from '../redux'
import { ButtonWithIcon, ButtonWithTitle, TextField } from '../components'
import { useNavigation } from '../utils'


interface LoginProps{

    onUserSignUp: Function
    onUserLogin: Function
    userReducer: UserState
    onOTPRequest: Function 
    onVerifyOTP: Function

}

const _LoginScreen: React.FC<LoginProps> = ({ onUserLogin, onUserSignUp, userReducer, onOTPRequest, onVerifyOTP }) => {


    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [title, setTitle] = useState('Login')
    const [isSignup, setIsSignup] = useState(true)

    const [otp, setOtp] = useState('')
    const [verified, setVerified] = useState(false)
    const [requestOtpTitle, setRequestOtpTitle] = useState('Request a New OTP in')
    const [canRequestOtp, setCanRequestOtp] = useState(false)

    let countDown: number

    const { user } = userReducer

    const {navigate} = useNavigation()

    useEffect(() => {

        if(user.verified !== undefined){
            
            if(user.verified === true){
                navigate('CartPage')
            }else{
                setVerified(user.verified)
                onEnableOtpRequest()
            }

        }


        return () => {
            clearInterval(countDown)
        }

    }, [user])





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

    const onEnableOtpRequest = () => {

        const otpDate = new Date()
        otpDate.setTime(new Date().getTime() + (2 * 60 * 1000))
        const otpTime = otpDate.getTime()

        countDown = setInterval(function(){
            
            const currentTime = new Date().getTime()

            const totalTime = otpTime - currentTime

            let minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60))
            let seconds = Math.floor((totalTime % (1000 * 60)) / 1000)

            setRequestOtpTitle(`Request a New OTP in ${minutes}:${seconds}`)

            if(minutes < 1 && seconds < 1){
                setRequestOtpTitle(`Request a New OTP`)
                setCanRequestOtp(true)
                clearInterval(countDown)
            }

        }, 1000)

    }


    const onTapVerify = () => {

        onVerifyOTP(otp, user)

    }

    const onTapRequestNewOTP = () => {
        
        setCanRequestOtp(false)
        onOTPRequest(user)

    }


    if(!verified){
        //kode OTP page
        return (<View style={styles.container}>
    
            <View style={styles.body}>
                <Image source={require('../images/verify_otp.png')} 
                    style={{width: 120, height: 120, margin: 20}}
                />
                <Text style={{fontSize: 22, fontWeight: '500', margin: 10}}>Verification</Text>
                <Text style={{fontSize: 16, padding: 10, marginBottom: 20, color: '#716F6F'}}>Enter your OTP sent to your mobile number</Text>
                <TextField isOTP={true} placeholder="OTP" onTextChange={setOtp}></TextField>

                <ButtonWithTitle title="Verify OTP" onTap={onTapVerify} width={300} height={50}></ButtonWithTitle>
                <ButtonWithTitle disable={!canRequestOtp} title={requestOtpTitle} 
                isNoBg={true} onTap={onTapRequestNewOTP} width={430} height={50}></ButtonWithTitle>
            </View> 
    
            <View style={styles.footer}></View>
    
        </View>)

    }else{

        return (<View style={styles.container}>

            <View style={styles.navigation}><Text style={{fontSize: 30}}>Login</Text></View>
    
            <View style={styles.body}>
                <TextField placeholder="Email" onTextChange={setEmail}></TextField>
                {isSignup &&
                    <TextField placeholder="Phone" onTextChange={setPhone}></TextField>
                }
                <TextField placeholder="Password" onTextChange={setPassword} isSecure={true}></TextField>
                <ButtonWithTitle title={title} onTap={onTapAuthenticate} width={300} height={50}></ButtonWithTitle>
                <ButtonWithTitle title={!isSignup ? "No Account? Signup Here" : "Have an Account? Login Here"} 
                onTap={() => onTapOptions()} width={310} height={50} isNoBg={true}></ButtonWithTitle>
            </View> 
    
            <View style={styles.footer}></View>
    
        </View>)

    }


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

const LoginScreen = connect(mapToStateProps, { onUserLogin, onUserSignUp, onOTPRequest, onVerifyOTP })(_LoginScreen)

export { LoginScreen }