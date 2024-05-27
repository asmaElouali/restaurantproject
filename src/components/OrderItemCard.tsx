import { ImageProps, StyleSheet, View, Image, Text } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { BorderRadius, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";
import { Card } from "react-native-paper";

interface OrderItemCardProps {
    name: string;
    image: ImageProps;
    prices: any;
    ItemPrice: string;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({
    name,
    image,
    prices,
    ItemPrice,
}) => {
    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]} style={styles.CardLinearGradient} >
            <View style={styles.CardInfoContainer}>
                <View style={styles.CardImageInfoContainer}>
                    <Image source={image} style={styles.Image} />
                    <View>
                        <Text style={styles.CardTitle}>{name}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.CardCurrency}>
                        $ <Text style={styles.CardPrice}>{ItemPrice}</Text>
                    </Text>
                </View>
            </View>
            {prices.map((data:any, index:any) =>(
                <View style={styles.CardTableRow}>
                    <View style={styles.PriceBoxRight}>
                        <Text style={styles.PriceCurrency}>
                            <Text style={styles.Price}>{data.price}</Text>
                        </Text>
                    </View>

                    <View style={styles.CardTableRow}>
                        <Text style={styles.CardQuantityPriceText}>
                            X<Text style={styles.Price}>{data.quantity}</Text>
                        </Text>
                        <Text style={styles.CardQuantityPriceText}>
                            ${(data.quantity * data.price).toFixed(2).toString()}
                        </Text>
                    </View>
                </View>
            ))}
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    CardLinearGradient: {
        gap: SPACING.space_20,
        padding: SPACING.space_20,
        borderRadius: BorderRadius.radius_25,
    },
    CardInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    CardImageInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    Image: {
        height: 90,
        width: 90,
        borderRadius: BorderRadius.radius_15,
    },
    CardTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.secondaryLightGreyHex,
    },
    CardCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryOrangeHex,
    },
    CardPrice: {
        color: COLORS.primaryWhiteHex,
    },
    CardTableRow: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    CardSubtitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.secondaryLightGreyHex,
    },
    PriceBoxRight: {
        backgroundColor: COLORS.primaryBlackHex,
        height: 45,
        flex: 1,
        borderTopRightRadius: BorderRadius.radius_10,
        borderBottomRightRadius: BorderRadius.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: COLORS.primaryGreyHex,
    },
    PriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
    },
    CardQuantityPriceText: {
        flex: 1,
        textAlign: 'center',
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex
    },
    Price: {
        color: COLORS.primaryWhiteHex,
    },




})

export default OrderItemCard;