import axios from 'axios'
import { LocationGeocodedAddress } from 'expo-location'
import {Dispatch} from 'react'
import { BASE_URL } from '../../utils'
import AsyncStorage from '@react-native-async-storage/async-storage'


export interface UpdateLocationAction{
    readonly type: 'ON_UPDATE_LOCATION',
    payload: LocationGeocodedAddress
}

export interface UserErrorAction{
    readonly type: 'ON_USER_ERROR',
    payload: any
}

export type UserAction = UpdateLocationAction | UserErrorAction


//User actions trigger from components

export const onUpdateLocation = (location: LocationGeocodedAddress) => {
    
    return async ( dispatch: Dispatch<UserAction> ) => {

        try {
            const locationString = JSON.stringify(location)
            await AsyncStorage.setItem('user_location', locationString)
            //save our location in local storage
            dispatch({
                type: 'ON_UPDATE_LOCATION',
                payload: location
            })

        } catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }

    }
}