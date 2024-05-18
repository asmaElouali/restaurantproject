import { StyleSheet,Text,View,ImageProps } from "react-native";
import React from 'react';
import ImageBackgroundInfo from "./ImageBackgroundInfoProps";
import LinearGradient from "react-native-linear-gradient";
import { BorderRadius, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

interface FavoritesItemCardProps{
    index : number;
    image : ImageProps;
    name : string;
    price : number;
    description : string;
    favourite:boolean;
    ToggleFavouriteItem: any;
}

const FavoritesItemCard:React.FC<FavoritesItemCardProps> = ({
    index,
    image,
    name,
    price,
    description,
    favourite,
    ToggleFavouriteItem,

})=>{
    return(
        <View style={styles.CardContainer}>
            <ImageBackgroundInfo EnableBackHandler={false} image={image} index={index} name={name} type={""} price={price} favourite={favourite} ToggleFavourite={ToggleFavouriteItem} />
            <LinearGradient start={{x:0, y:0}} end={{x: 1, y: 1}} colors={[COLORS.primaryGreyHex , COLORS.primaryBlackHex]} style={styles.ContainerLinearGradient}>
                  <Text style={styles.DescriptionTitle}>Description</Text>
                  <Text style={styles.DescriptionText}>{description}</Text>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    CardContainer:{
           borderRadius: BorderRadius.radius_25,
           overflow: 'hidden',
    },
    ContainerLinearGradient: {
       gap:SPACING.space_10,
       padding: SPACING.space_20,
    },
    DescriptionText: {
        fontFamily:FONTFAMILY.poppins_regular,
        fontSize:FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
    },
    DescriptionTitle : {
        fontFamily:FONTFAMILY.poppins_semibold,
        fontSize:FONTSIZE.size_16,
        color: COLORS.secondaryLightGreyHex,
    }
})

export default FavoritesItemCard;
