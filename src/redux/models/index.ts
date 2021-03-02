import { LocationGeocodedAddress } from 'expo-location'
import { exp } from 'react-native-reanimated'

//category
export interface Category{
    title: String,
    icon: String
}

//food model
export interface FoodModel{
    _id: String,
    name: String,
    description: String,
    category: String,
    price: Number,
    readyTime: Number,
    image: [String]
}

//restaurant model
export interface Restaurant{
    _id: String,
    name: String,
    foodType: String,
    address: String,
    phone: String,
    images: [String],
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
    firstName: String,
    lastName: String,
    contactNumber: String,
    token: String
}

export interface UserState{
    user: UserModel,
    location: LocationGeocodedAddress,
    error: String | undefined
}

export interface ShoppingState{
    availability: FoodAvailability,
    //other models
}