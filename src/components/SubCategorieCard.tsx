import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ImageProps, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SPACING, BorderRadius, COLORS, FONTSIZE, FONTFAMILY } from "../theme/theme";
import CardTitle from "react-native-paper/lib/typescript/components/Card/CardTitle";
import CustomIcon from "./CustomIcon";

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

interface SubCategoryCard {
    id: string;
    index: number;
    ima: ImageProps;
    subcategorie: any;
    price: any;
    buttonPressHandler: any;
}
const SubCategoryCard: React.FC<SubCategoryCard> = ({
    id,
    index,
    ima,
    subcategorie,
    price,
    buttonPressHandler,
}) => {
    return (
        
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.CardLineareGradientContainer}
            key={id}
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>

            <ImageBackground
                source={ima}
                style={styles.CardImageBG}
                resizeMode="cover">
                <View style={styles.CardRatingContainer}>
                    <Text style={styles.CardTitle}>
                        {subcategorie.name}
                        {console.log('resultat', subcategorie)}
                    </Text>
                </View>
            </ImageBackground >
            
        </LinearGradient >
    );
}
const styles = StyleSheet.create({
    CardLineareGradientContainer: {
        padding: SPACING.space_15,
        borderRadius: BorderRadius.radius_25,
    },
    CardTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
    },
    CardImageBG: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: BorderRadius.radius_20,
        marginBottom: SPACING.space_15,
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

})
export default SubCategoryCard;