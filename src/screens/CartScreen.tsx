import React, { useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View, Linking, TouchableOpacity, Alert } from "react-native";
import { useStore } from "../redux/store";
//import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { COLORS, FONTSIZE, SPACING } from "../theme/theme";
import HeaderBar from "../components/HeaderBar";
import PaymentFooter from "../components/PaymentFooter";
import EmptyListAnimation from "../components/EmptyListAnimation";
import CartItem from "../components/CartItem";
import { RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import PaymentOrderFooter from "../components/PaymentOrderFooter";
//import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import Mailer from 'react-native-mail';
import Toast from "react-native-toast-message";

const sendCartItems = (cartItems: any[], table: string) => {
    // Convert cart items to a formatted string or JSON
    const cartItemsString = cartItems.map(item =>
        `Item: ${item.item.name}\nQuantity: ${item.quantity}\nPrice: ${item.item.price}\n\n`
    ).join('');

    // Compose email
    Mailer.mail({
        subject: `Order for Table ${table}`,
        recipients: ['asmaelouali372@gmail.com'], // Replace with the kitchen staff's email
        body: `Here are the order for table ${table}:\n\n${cartItemsString}`,
        isHTML: false,
        // Optional: Add attachments if needed
    }, (error, event) => {
        if (error) {
            Alert.alert('Error', 'Could not send the email. Please try again.');
        } else {
            Alert.alert('Success', 'Email sent successfully.');
        }
    });
};

type Props = NativeStackScreenProps<RootStackParamList, "Cart">;
const CartScreen: React.FC<Props> = ({ navigation: { navigate, push, pop }, route }: any) => {
    const { id, table, rvcid }: any = route.params;
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    //const tabBarHeight = useBottomTabBarHeight();




    const fetchCart = async () => {
        try {
            const response = await axios.get(`http://192.168.1.135:8080/api/cart/${table}`);
            console.log("cartItem", response.data);
            setCartItems(response.data.cartItems);
            setTotalAmount(response.data.total);
        } catch (error) {
           // console.error("probleme is here fetch", error);
            Toast.show({
                type: 'error',
                position: 'top',
                text1: '! Attention',
                text2: "Cart is null",
            });
        }
    };

    const updateTotalAmount = () => {
        // Recalculate total amount
        const newTotal = cartItems.reduce((sum, items: any) => sum + items.item.price * items.quantity, 0);
        setTotalAmount(newTotal);
    };

    useEffect(() => {
        fetchCart();
    }, [table]);

    useFocusEffect(
        React.useCallback(() => {
            fetchCart();
        }, [table])
    );
    useEffect(() => {
        updateTotalAmount();
    }, [cartItems]);

    const handleQuantityChange = () => {
        // Fetch cart to get updated cart items
        fetchCart();
    };


    const handleOrder = async () => {
        try {
            const orderDto = { rvcId: rvcid }; // Adjust according to your needs
            const response = await axios.post(`http://192.168.1.135:8080/api/order/${table}`, orderDto);
            console.log("Order created", response.data);
            console.log("Order created", response.data.payment_url);
            if (response.data.payment_url) {
                // window.location.href=response.data.payment_url;
                Linking.openURL(response.data.payment_url);
            }
            //  navigate("Order",{tableId:table})
            // Optionally navigate to another screen or show a success message
        } catch (error) {
            console.error("Error creating order", error);
        }
    };
    const buttonPressHandler = () => {
        push('Payment', { amount: totalAmount, rvcId: rvcid, table: table });
    };

    const handleSend = () => {
        sendCartItems(cartItems, table);
    }

    const BackHandler = (name: any) => {
        // navigate("Cart",{table:table,rvcid:rvc});
        // navigate("Order",{tableId:table});
        //navigate("Menus",{id:rvcid,table:table})

        pop(); // Go back to the previous screen

    };


    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <HeaderBar title="Cart" name="left" BackHandler={BackHandler} />
            <View style={styles.mainContent}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.ScrollViewFlex}
                >
                    <View style={styles.ScrollViewInnerView}>
                        {cartItems.length == 0 ? (
                            <EmptyListAnimation title={'Cart is Empty'} />
                        ) : (
                            <View style={styles.ListItemContainer}>
                                {cartItems.map((items: any) => (
                                    <TouchableOpacity key={items.id}>
                                        <CartItem
                                            index={items.id}
                                            name={items.item.name}
                                            ima={{ uri: items.item.image }}
                                            prices={items.item.price}
                                            quantity={items.quantity}
                                            table={table}
                                            onQuantityChange={handleQuantityChange}

                                        // decrementCartItemQuantityHandler={undefined}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                </ScrollView>
                <View style={styles.billDetails}>
                    <View style={styles.divider} />
                    <View style={styles.billDetails}>
                        <Text style={styles.title}>Bill Details</Text>
                        <View style={styles.detailsContainer}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Item Total</Text>
                                <Text style={styles.value}>${totalAmount}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Restaurant Charges</Text>
                                <Text style={styles.value}>$59</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.row}>
                                <Text style={styles.label}>Total pay</Text>
                                <Text style={styles.value}>${totalAmount + 59}</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </View>
            <PaymentOrderFooter
                buttonPressHandler={buttonPressHandler}
                buttonTitle="Pay" price={totalAmount} buttonSend={handleSend} />
        </View>
    )
}

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
    },
    mainContent: {
        flex: 1,
        justifyContent: 'space-between',
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
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    divider: {
        borderBottomWidth: 0.93,
        borderBottomColor: '#E0E0E0',
        marginVertical: 10,
    },
    billDetails: {
        paddingHorizontal: 14,
    },
    title: {
        fontWeight: '300',
        fontSize: FONTSIZE.size_20,
        paddingVertical: 10,
        color: COLORS.primaryWhiteHex
    },
    detailsContainer: {
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        color: '#9E9E9E',
    },
    label: {
        color: '#9E9E9E',
    },
    value: {
        color: '#9E9E9E',
    },
});

export default CartScreen;