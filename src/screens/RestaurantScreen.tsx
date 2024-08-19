// RestaurantScreen.tsx
import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../restaurantproject/types";
import axios from "axios";
import ActionSheet from 'react-native-actionsheet';
import { COLORS } from "../theme/theme";
import HeaderBar from "../components/HeaderBar";


type Props = NativeStackScreenProps<RootStackParamList, "Restaurant">;

const RestaurantScreen: React.FC<Props> = ({ route, navigation: { navigate } }) => {
    const { id ,firstname,lastname}: any = route.params; // Access the passed id
    const [restaurantName, setRestaurantName] = useState('');
    const [rvcs, setRvcs] = useState([]);
    const [rvcid, setRvcId] = useState(0);
    const [rvcname, setRvcName] = useState('');

    const fetchRestaurantName = async () => {
        try {
            const response = await axios.get(`http://192.168.1.135:8080/server/getRestaurant/${id}`);
            console.log(response.data.name)
            setRestaurantName(response.data.name);
            setRvcs(response.data.rvcs)
        } catch (error) {
            console.log('Failed to fetch restaurant name');
        }
    }
    useEffect(() => {
        fetchRestaurantName()
    }, [id])




    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity onPress={() => { setRvcId(item.id);setRvcName(item.name); console.log("Selected RVC ID:", item.id); navigate("DinningTable", { id: item.id,name:item.name,firstname:firstname,lastname:lastname }); }}>
            <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <FlatList
                ListHeaderComponent={<HeaderBar title={restaurantName} name="menu" />}
                data={rvcs}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.ScrollViewFlex}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
    },
    ScrollViewFlex: {
        flexGrow: 1,
    },
    itemText: {
        fontSize: 18,
        color: COLORS.black,
    },
    itemContainer: {
        backgroundColor: COLORS.primaryOrangeHex, // White background for each item
        padding: 15,
        marginVertical: 9,
        margin: 12,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default RestaurantScreen;
