import { LocationGeocodedAddress } from 'expo-location'
import { exp } from 'react-native-reanimated'

//category
export interface Category{
    id: string,
    title: string,
    icon: string
}

//food model
export interface FoodModel{
    _id: string,
    name: string,
    description: string,
    category: string,
    price: number,
    readyTime: number,
    images: [string],
    unit: number
}

//restaurant model
export interface Restaurant{
    _id: string,
    name: string,
    foodType: string,
    address: string,
    phone: string,
    images: [string],
    foods: [FoodModel]
}

export interface FoodAvailability{
    categories: [Category],
    restaurants: [Restaurant],
    foods: [FoodModel]
}

//todo : Modify later
//User Model
export interface UserModel{
    email: string,
    token: string,
    verified: boolean
}

export interface UserState{
    user: UserModel,
    location: LocationGeocodedAddress,
    error: string | undefined,
    Cart: [FoodModel]
}

export interface ShoppingState{
    availability: FoodAvailability,
    availableFoods: [FoodModel]
    //other models
}