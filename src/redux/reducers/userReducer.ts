import { LocationGeocodedAddress } from 'expo-location'
import { UserAction } from '../actions'
import { FoodModel, UserModel, UserState } from '../models'

const initialState: UserState = {
    user: {} as UserModel,
    location: {} as LocationGeocodedAddress,
    error: undefined,
    Cart: {} as [FoodModel]

}

const UserReducer = (state: UserState = initialState, action: UserAction) => {

    switch(action.type){
        case 'ON_UPDATE_LOCATION':
            return {
                ...state,
                location: action.payload
            }
        
        default:
            return state
    }

}

export { UserReducer }