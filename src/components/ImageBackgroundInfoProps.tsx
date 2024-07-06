import React from "react";
import {
    ImageProps,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
} from "react-native";

import GradientBGIconProps from "./GradientBGIcon";
import { BorderRadius, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from "./CustomIcon";
import GradientBGIcon from "./GradientBGIcon";

interface ImageBackgroundInfoProps {
    EnableBackHandler: boolean;
    image: ImageProps;
    name: string;
    type: string;
    index: number;
    price: number;
    favourite: boolean;
    BackHandler?: any;
    ToggleFavourite: any
}

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
    EnableBackHandler,
    image,
    name,
    type,
    index,
    price,
    favourite,
    BackHandler,
    ToggleFavourite,
}) => {
    return (
        <View>
            <ImageBackground
                source={image}
                style={styles.ImageBackgroundImage}>
                {EnableBackHandler ? (
                    <View style={styles.ImageHeaderBarContainerWithBack}>
                        <TouchableOpacity
                            onPress={() => {
                                BackHandler();
                            }}>
                            <GradientBGIcon
                                name="left"
                                color={COLORS.primaryLightGreyHex}
                                size={FONTSIZE.size_16}
                            />
                        </TouchableOpacity>
                        {/*
                        <TouchableOpacity
                            onPress={() => {
                                ToggleFavourite(favourite, type, index);
                            }}>
                            <GradientBGIcon
                                name="like"
                                color={
                                    favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                                }
                                size={FONTSIZE.size_16}
                            />
                        </TouchableOpacity>
                       */}
                    </View>
                ) : (
                    <View style={styles.ImageHeaderBarContainerWithoutBack}>
                        {/*
                        <TouchableOpacity
                            onPress={() => {
                                ToggleFavourite(favourite, type, index);
                            }}>
                            <GradientBGIcon
                                name="like"
                                color={
                                    favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                                }
                                size={FONTSIZE.size_16}
                            />
                        </TouchableOpacity>
                       */}
                    </View>       
                )}

                <View style={styles.ImageInfoOuterContainer}>
                    <View style={styles.ImageInfoInnerContainer}>
                        <View style={styles.InfoContainerRow}>
                            <View>
                                <Text style={styles.ItemTitleText}>{name}</Text>
                            </View>
                            {/*
                            <View style={styles.ItemPropertiesContainer}>
                                <View style={styles.ProperFirst}>
                                    <Text
                                        style={[
                                            styles.PropertyTextFirst,
                                            {
                                                marginTop: SPACING.space_2,

                                            },
                                        ]}>
                                        {type}
                                    </Text>
                                </View>
                            </View>
                            */}
                        </View>
                    </View>
                    <View style={styles.InfoContainerRow}>
                        <View style={styles.RatingContainer}>
                            <Text style={styles.RatingText}>{price}</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>

    )

}
const styles = StyleSheet.create({
    ImageBackgroundImage: {
        width: '100%',
        //height:700,
        aspectRatio: 15 / 25,
        justifyContent: 'space-between',
    },
    ImageHeaderBarContainerWithBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ImageHeaderBarContainerWithoutBack: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    ImageInfoOuterContainer: {
        paddingVertical: SPACING.space_24,
        paddingHorizontal: SPACING.space_30,
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopLeftRadius: BorderRadius.radius_20 * 2,
        borderTopRightRadius: BorderRadius.radius_20 * 2,
    },
    ImageInfoInnerContainer: {
        justifyContent: 'space-between',
        gap: SPACING.space_15,
    },
    InfoContainerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ItemTitleText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_24,
        color: COLORS.primaryWhiteHex,
    },
    RatingContainer: {
        flexDirection: 'row',
        gap: SPACING.space_10,
        alignItems: 'center',
    },
    RatingText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    },
    PropertyTextFirst: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex,
    },
    ItemPropertiesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.space_20,
    },
    ProperFirst: {
        height: 55,
        width: 55,
        borderRadius: BorderRadius.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryBlackHex,
    },



})
export default ImageBackgroundInfo;