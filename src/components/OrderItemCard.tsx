import { ImageProps, StyleSheet, View, Image, Text, ImageSourcePropType } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { BorderRadius, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";


interface OrderItemCardProps {
    name: string;
    image: ImageSourcePropType;
    prices: number;
    quantity: number;
    status:any;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({
    name,
    image,
    prices,
    quantity,
}) => {
    const totalPrice = (quantity * prices).toFixed(2);

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
            style={styles.CardLinearGradient}
        >
            <View style={styles.CardInfoContainer}>
                <Image source={image} style={styles.Image} />
                <View style={styles.TextContainer}>
                    <Text style={styles.CardTitle}>{name}</Text>
                    <View style={styles.PriceAndQuantityContainer}>
                        <Text style={styles.PriceCurrency}>$ {prices.toFixed(2)}</Text>
                        <Text style={styles.CardQuantityPriceText}>
                        X <Text style={styles.Price}> {quantity}</Text>
                        </Text>
                        <Text style={styles.CardQuantityPriceText}>
                            $ {totalPrice}
                        </Text>
                    </View>
                </View>
            </View>
        </LinearGradient>
                 
    );
}

const styles = StyleSheet.create({
    CardLinearGradient: {
        padding: SPACING.space_20,
        borderRadius: BorderRadius.radius_25,
    },
    CardInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    Image: {
        height: 90,
        width: 90,
        borderRadius: BorderRadius.radius_15,
    },
    TextContainer: {
        flex: 1,
        marginLeft: SPACING.space_10,
    },
    CardTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.secondaryLightGreyHex,
        marginBottom: SPACING.space_10,
    },
    PriceAndQuantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    PriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    },
    CardQuantityPriceText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
    },
    Price: {
        color: COLORS.primaryWhiteHex,
    },
});

export default OrderItemCard;
