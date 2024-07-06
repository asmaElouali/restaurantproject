import React from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useStore } from "../redux/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { COLORS, SPACING } from "../theme/theme";
import HeaderBar from "../components/HeaderBar";
import PaymentFooter from "../components/PaymentFooter";
import EmptyListAnimation from "../components/EmptyListAnimation";
import CartItem from "../components/CartItem";

const CartScreen = ({ navigation, route }: any) => {
    console.log("route : ",route.params);
    const CartList = useStore((state: any) => state.CartList);
    const CartPrice = useStore((state: any) => state.CartPrice);
    const incrementCartItemQuantity = useStore((state: any) => state.incrementCartItemQuantity,);
    const decrementCartItemQuantity = useStore((state: any) => state.decrementCartItemQuantity,);
    const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
    const tabBarHeight = useBottomTabBarHeight();
    console.log("cartlistItem",CartList[0]);
    console.log("CartPrice:",CartPrice)
    const buttonPressHandler = () => {
        navigation.push('Payment', { amount: CartPrice });
    };

    const incrementCartItemQuantityHandler = (index: number) => {
        incrementCartItemQuantity(index);
        calculateCartPrice();
    }

    const decrementCartItemQuantityHandler = (index: number) => {
        decrementCartItemQuantity(index);
        calculateCartPrice();
    };
    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>
                <View
                    style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
                    <View style={styles.ItemContainer}>
                        <HeaderBar title="Cart" />

                        {CartList.length == 0 ? (
                            <EmptyListAnimation title={'Cart is Empty'} />
                        ) : (
                            <View style={styles.ListItemContainer}>
                                {CartList.map((data: any) => (
                                    <TouchableOpacity onPress={() => {
                                      /*  navigation.push('Details', {
                                            index: data.index,
                                            price: data.price,
                                            name: data.name,
                                            image: data.image,
                                        });*/
                                    }}
                                        key={data.index}>
                                        <CartItem index={data.index} name={data.name} ima={data.image} prices={data.prices[0].price} quantity={data.prices[0].quantity} incrementCartItemQuantityHandler={incrementCartItemQuantityHandler} decrementCartItemQuantityHandler={decrementCartItemQuantityHandler} />
                                    </TouchableOpacity>
                                ))}

                            </View>
                        )}

                    </View>
                    {CartList.length != 0 ? (
                        <PaymentFooter price={CartPrice} buttonPressHandler={buttonPressHandler} buttonTitle="Pay" />
                    ) : (
                        <></>
                    )}

                </View>
            </ScrollView>

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
});

export default CartScreen;