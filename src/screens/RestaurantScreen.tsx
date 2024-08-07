// RestaurantScreen.tsx
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../restaurantproject/types";
import axios from "axios";

type Props = NativeStackScreenProps<RootStackParamList, "Restaurant">;

const RestaurantScreen: React.FC<Props> = ({ route }) => {
    const { id }: any = route.params; // Access the passed id
    const [restaurantName, setRestaurantName] = useState('');

    const fetchRestaurantName = async () => {
        try {
            const response = await axios.get(`http://192.168.1.135:8080/server/getRestaurantName/${id}`);
            setRestaurantName(response.data);
        } catch (error) {
            console.log('Failed to fetch restaurant name');
        }
    }
    useEffect(()=>{
        fetchRestaurantName()
    },[id])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text>Restaurant</Text>
            <Text>Restaurant Name: {restaurantName}</Text>
        </SafeAreaView>
    );
};

export default RestaurantScreen;
