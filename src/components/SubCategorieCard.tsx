import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ImageSourcePropType, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SPACING, BorderRadius, COLORS, FONTSIZE, FONTFAMILY } from "../theme/theme";
import CardTitle from "react-native-paper/lib/typescript/components/Card/CardTitle";
import CustomIcon from "./CustomIcon";
import BGIcon from "./BGIcon";

const CARD_WIDTH = Dimensions.get('window').width * 0.36;

interface SubCategoryCard {
    id: number;
    name: string;
    description: string;
    ima: ImageSourcePropType;
    price: any;
    buttonPressHandler: any;
}
const SubCategoryCard: React.FC<SubCategoryCard> = ({
    id,
    name,
    description,
    ima,
    price,
    buttonPressHandler,
}) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.CardLineareGradientContainer}
            //key={id}
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
            <ImageBackground
                source={ima}
                style={styles.CardImageBG}
                resizeMode="cover">
            </ImageBackground >
            <Text style={styles.CardTitle}>
                {name}
            </Text>
            <View style={styles.CardFooterRow}>
                <Text style={styles.CardPriceCurrency}>
                    $ <Text style={styles.CardPrice}>{price}</Text>
                </Text>
                <TouchableOpacity
         /* onPress={() => {
            buttonPressHandler({
              id,
              index,
              type,
              roasted,
              imagelink_square,
              name,
              special_ingredient,
              prices: [{...price, quantity: 1}],
            });
          }}*/>
                    <BGIcon
                        color={COLORS.primaryWhiteHex}
                        name={'star'}
                        BGColor={COLORS.primaryOrangeHex}
                        size={FONTSIZE.size_10}
                    />
                </TouchableOpacity>
            </View>
        </LinearGradient >
    );
}
const styles = StyleSheet.create({
    CardLineareGradientContainer: {
        padding: SPACING.space_10,
        margin: SPACING.space_10,
        borderRadius: BorderRadius.radius_25,
        width: Dimensions.get('window').width*0.42,
    },
    CardTitle: {
        fontFamily: FONTFAMILY.poppins_bold,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_12,
    },
    CardImageBG: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: BorderRadius.radius_20,
        marginBottom: SPACING.space_15,
        marginRight: 7,
        overflow: 'hidden',
    },
    CardRatingContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primaryBlackRGBA,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.space_10,
        paddingHorizontal: SPACING.space_15,
        position: 'absolute',
        borderBottomLeftRadius: BorderRadius.radius_20,
        borderTopRightRadius: BorderRadius.radius_20,
        top: 0,
        right: 0,
    },
    CardFooterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.space_15,
    },
    CardPriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_18,
    },
    CardPrice: {
        color: COLORS.primaryWhiteHex,
    },

})
export default SubCategoryCard;