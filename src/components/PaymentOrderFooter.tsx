import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { BorderRadius, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";
import { useNavigation, useRoute } from "@react-navigation/native";

/*interface PriceProps{
    price : number;
}*/

interface PaymentFooterProps {
    price: number;
    buttonPressHandler: any;
    buttonSend:any,
    buttonTitle: string;
}

const PaymentOrderFooter: React.FC<PaymentFooterProps> = ({
    price,
    buttonPressHandler,
    buttonSend,
    buttonTitle,
}) => {
    const navigation = useNavigation();
   // const route = useRoute();
    return (
        <View style={styles.PriceFooter}>

            <TouchableOpacity style={styles.PayButton} onPress={()=> buttonSend()} >
                <Text style={styles.ButtonText}>Send</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.PayButton} onPress={() => buttonPressHandler()}>
                <Text style={styles.ButtonText}>{buttonTitle}</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    PriceFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.space_20,
        padding: SPACING.space_20,
    },
    PriceContainer: {
        alignItems: 'center',
        width: 140,
    },
    PriceTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.secondaryLightGreyHex,
    },
    PriceText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_24,
        color: COLORS.primaryOrangeHex,
    },
    Price: {
        color: COLORS.primaryWhiteHex,
    },
    PayButton: {
        backgroundColor: COLORS.primaryOrangeHex,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: SPACING.space_36 * 2,
        borderRadius: BorderRadius.radius_20
    },
    ButtonText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    },
});

export default PaymentOrderFooter;