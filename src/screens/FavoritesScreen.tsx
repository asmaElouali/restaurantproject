import React from "react";
import { useStore } from "../redux/store";
import { Button, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import HeaderBar from "../components/HeaderBar";
import FavoritesItemCard from "../components/FavoritesItemCard";
import { COLORS, SPACING } from "../theme/theme";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import EmptyListAnimation from "../components/EmptyListAnimation";

const FavoritesScreen = ({ navigation }: any) => {
    const FavoriteList = useStore((state: any) => state.FavoriteList);
    const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
    const deleteFromFavoriteList = useStore((state: any) => state.deleteFromFavoriteList);
    const tabBarHeight = useBottomTabBarHeight();
    const resetStore = useStore((state: any) => state.resetStore);
    const ToggleFavourite = (favourite: boolean, index: number) => {
        console.log("index ToggleFavourite", index);
        favourite ? deleteFromFavoriteList(index) : addToFavoriteList(index);
    }
    const handleReset = () => {
        resetStore();
    };
    return (

        <View style={styles.ScreenContainer} >
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
                <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
                    <View style={styles.ItemContainer}>
                        <HeaderBar title="Favourites" />
                        {FavoriteList.length == 0 ? (
                            <EmptyListAnimation title={'No Favourites'} />
                        ) : (
                            < View style={styles.ListItemContainer}>
                                {FavoriteList.map((data: any) => (
                                    <TouchableOpacity onPress={() => {
                                        console.log("key", data.index);
                                        navigation.push('Details', {
                                            index: data.index,
                                            image: data.ima,
                                            description: data.description,
                                            name: data.name,
                                            favourite: data.favourite,
                                            price: data.price,
                                        });
                                    }}
                                        key={data.index}>
                                        <FavoritesItemCard index={data.index} image={data.ima} name={data.name} price={data.price} description={data.description} favourite={data.favourite} ToggleFavouriteItem={ToggleFavourite} />

                                    </TouchableOpacity>
                                ))}

                            </View>
                        )}
                    </View>
                </View>

            </ScrollView >

        </View >
    );

};

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
    },
    ScrollViewFlex: {
        flexGrow: 1
    },
    ScrollViewInnerView: {
        flex: 1,
        justifyContent: 'space-between',
    },
    ItemContainer: {
        flex: 1,
    },
    ListItemContainer: {
        paddingHorizontal: SPACING.space_20,
        gap: SPACING.space_20,
    },
    ResetButtonContainer: {
        padding: SPACING.space_20,
    },
});
export default FavoritesScreen;