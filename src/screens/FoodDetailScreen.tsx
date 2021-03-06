import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, TextInput, Image, ImageBackground, Dimensions} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { ButtonWithIcon, FoodCard } from '../components'
import { ApplicationState, FoodModel, UserState, onUpdateCart } from '../redux'
import {connect} from 'react-redux'

import {useNavigation} from '../utils/useNavigation'
import { checkExistence } from '../utils'


interface FoodDetailProps{
    userReducer: UserState
    onUpdateCart: Function
    navigation: { getParam: Function, goBack: Function }
}

const _FoodDetailScreen: React.FC<FoodDetailProps> = (props) => {

    const {getParam, goBack} = props.navigation
    const food = getParam('food') as FoodModel
    const { navigate } = useNavigation()
    const {Cart} = props.userReducer


    return (<View style={styles.container}>
            <View style={styles.navigation}>
                <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={42} height={42}></ButtonWithIcon>
                <Text style={{fontSize: 22, fontWeight: '600', marginLeft: 20}}> {food.name}</Text>
            </View>
            <View style={styles.body}>
                <ImageBackground source={{uri: `${food.images[0]}`}} 
                style={{width: Dimensions.get('screen').width, height: 300, justifyContent: 'flex-end'}}>
                    <View style={{height:120, backgroundColor: 'rgba(0,0,0,0,6)', padding: 10}}>
                        <Text style={{color: '#FFF', fontSize: 30, fontWeight: '700'}}>{food.name}</Text>
                        <Text style={{color: '#FFF', fontSize: 25, fontWeight: '500'}}>{food.category}</Text>

                    </View>
                </ImageBackground>
                <View style={{display: 'flex', height: 180, padding: 20}}>
                    <Text>Food will be ready within ${food.readyTime} Minute(s)</Text>
                    <Text>{food.description}</Text>
                </View>
                <View style={{height: 120}}>
                    <FoodCard item={checkExistence(food, Cart)} onTap={()=> {}} onUpdateCart={props.onUpdateCart}></FoodCard>
                </View>
            

            </View>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2'
    },
    navigation: {
        flex: 1,
        marginTop: 43,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    body: {
        flex: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFF',
    }
})

const mapToStateProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})

const FoodDetailScreen = connect(mapToStateProps, { onUpdateCart })(_FoodDetailScreen)


export {FoodDetailScreen}