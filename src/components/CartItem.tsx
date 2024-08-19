import { Image, View, Text, TouchableOpacity, StyleSheet, ImageSourcePropType, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { BorderRadius, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";
import CustomIcon from "./CustomIcon";
import axios from "axios";
import { useEffect, useState } from "react";


interface CartItemProps {
    index: number;
    name: string;
    ima: ImageSourcePropType;
    prices: any;
    quantity: number;
    table: number;
    onQuantityChange: () => void;
    //incrementCartItemQuantityHandler: any;
    //decrementCartItemQuantityHandler: any;
}

const CartItem: React.FC<CartItemProps> = ({
    index,
    name,
    ima,
    prices,
    quantity,
    table,
    onQuantityChange
}) => {
    const [localQuantity, setLocalQuantity] = useState(quantity);
   // const [itemPrice, setItemPrice] = useState(prices);

    useEffect(() => {
        setLocalQuantity(quantity);
        //setItemPrice(prices);
    }, [quantity, prices]);

    useEffect(() => {
        //setItemPrice(prices*localQuantity);
    }, [localQuantity]);

    const updateCartItem = async (reqData: any) => {
        try {
            const response = await axios.put(`http://192.168.1.135:8080/api/cart-item/update/${table}`,
                reqData.data
            );
            // Alert.alert('Success', 'Item updated to cart');
            setLocalQuantity(reqData.data.quantity);
            onQuantityChange();
            //navigate("Cart",{table:table})
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to update item to cart');
            setLocalQuantity(quantity);
        }
    };

    const removeCartItem = async ({ cartItemId, table }: any) => {
        try {
            const response = await axios.delete(`http://192.168.1.135:8080/api/cart-item/${cartItemId}/remove/${table}`);
            // Alert.alert('Success', 'Item removed to cart');
            console.log('Remove Response:', response.data);
            onQuantityChange();
            // Refetch the cart items
            // fetchCart();
            //navigate("Cart",{table:table})
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to remove item to cart');
        }
    };
    const handleUpdateCartItem = (value: any) => {
        if (value === -1 && localQuantity === 1) {
            handleRemoveCartItem();
        } else {
            const data = { cartItemId: index, quantity: localQuantity + value }
            setLocalQuantity(localQuantity + value);
            updateCartItem({ data, table });
        }

    }
    const handleRemoveCartItem = () => {
        removeCartItem({ cartItemId: index, table })

        setLocalQuantity(0);
    }
    if (localQuantity === 0) return null; 

    return (
        <View>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]} style={styles.CartItemSingleLinearGradient}>
                <View style={styles.CartItemRow}>
                    <Image source={ima} style={styles.CartItemImage} />
                </View>
                <View style={styles.CartItemSingleInfoContainer}>
                    <View>
                        <Text style={styles.CartItemTitle}>{name}</Text>
                    </View>
                    <View style={styles.CartItemSingleSizeValueContainer}>
                        <Text style={styles.SizePrice}>$ {(prices * localQuantity).toFixed(2)}</Text>
                    </View>
                    <View style={styles.CartItemSingleQuantityContainer}>
                        <TouchableOpacity
                            style={styles.CartItemIcon}
                            onPress={() => {
                                handleUpdateCartItem(-1);
                            }}>
                            <CustomIcon
                                name="minus"
                                color={COLORS.primaryWhiteHex}
                                size={FONTSIZE.size_10}

                            />
                        </TouchableOpacity>
                        <View style={styles.CartItemQuantityContainer}>
                            <Text style={styles.CartItemQuantityText}>
                                {localQuantity}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.CartItemIcon}
                            onPress={() => {
                                handleUpdateCartItem(1);
                            }}>
                            <CustomIcon
                                name="add"
                                color={COLORS.primaryWhiteHex}
                                size={FONTSIZE.size_10}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>

        </View>
    );
};

const styles = StyleSheet.create({
    CartItemSingleLinearGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.space_12,
        gap: SPACING.space_12,
        borderRadius: BorderRadius.radius_25,
    },
    CartItemRow: {
        flexDirection: 'row',
        gap: SPACING.space_12,
        flex: 1,
    },
    CartItemImage: {
        height: 130,
        width: 130,
        borderRadius: BorderRadius.radius_20
    },
    CartItemSingleInfoContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'space-around',
    },
    CartItemTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    },
    CartItemSingleSizeValueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    SizePrice: {
        color: COLORS.primaryWhiteHex,
    },
    CartItemSingleQuantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    CartItemIcon: {
        backgroundColor: COLORS.primaryOrangeHex,
        padding: SPACING.space_12,
        borderRadius: BorderRadius.radius_10,
    },
    CartItemQuantityContainer: {
        backgroundColor: COLORS.primaryBlackHex,
        width: 80,
        borderRadius: BorderRadius.radius_10,
        borderWidth: 2,
        borderColor: COLORS.primaryOrangeHex,
        alignItems: 'center',
        paddingVertical: SPACING.space_4,
    },
    CartItemQuantityText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
    },

});
export default CartItem;