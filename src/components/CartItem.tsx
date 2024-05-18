import { Image, ImageProps, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { BorderRadius, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";
import CustomIcon from "./CustomIcon";


interface CartItemProps {
    index: number;
    name: string;
    ima: ImageProps;
    prices: any;
    quantity:number;
    incrementCartItemQuantityHandler: any;
    decrementCartItemQuantityHandler: any;
}

const CartItem: React.FC<CartItemProps> = ({
    index,
    name,
    ima,
    prices,
    quantity,
    incrementCartItemQuantityHandler,
    decrementCartItemQuantityHandler,
}) => {
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
                        <Text style={styles.SizePrice}> {prices.price}</Text>
                    </View>
                    <View style={styles.CartItemSingleQuantityContainer}>
                        <TouchableOpacity
                            style={styles.CartItemIcon}
                            onPress={() => {
                                decrementCartItemQuantityHandler(index);
                            }}>
                            <CustomIcon
                                name="minus"
                                color={COLORS.primaryWhiteHex}
                                size={FONTSIZE.size_10}
                            />
                        </TouchableOpacity>
                        <View style={styles.CartItemQuantityContainer}>
                            <Text style={styles.CartItemQuantityText}>
                                {quantity}
                            </Text>
                        </View>
                            <TouchableOpacity
                                style={styles.CartItemIcon}
                                onPress={() => {
                                    incrementCartItemQuantityHandler(index);
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