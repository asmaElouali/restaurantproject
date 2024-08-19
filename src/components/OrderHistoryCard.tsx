import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import OrderItemCard from "./OrderItemCard";
import moment from 'moment';

interface OrderHistoryCardProps {
   // navigationHandler: any;
    CartList: any;
    CartListPrice: any;
    OrderDate: any;
    status:any
}
const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({
//navigationHandler,
    CartList,
    CartListPrice,
    OrderDate,
    status
}) => {
    const formattedDate = moment(OrderDate).format('MMMM Do YYYY, h:mm:ss a');
    return (
        <View style={styles.CardContainer}>
            <View style={styles.CardHeader}>
                <View>
                    <Text style={styles.HeaderTitle}>Order Time</Text>
                    <Text style={styles.HeaderSubtitle}>{formattedDate}</Text>
                    <Text style={styles.HeaderPrice}>status of order : {status}</Text>
                </View>
              
                <View style={styles.PriceContainer}>
                    <Text style={styles.HeaderTitle}>Total Amount</Text>
                    <Text style={styles.HeaderPrice}>$ {CartListPrice.toFixed(2)}</Text>
                </View>
            </View>
            <View style={styles.ListContainer}>
                {CartList.map((data: any, index: any) => (
                    <TouchableOpacity key={index.toString()} onPress={() => {
                       // navigationHandler({ index: data.index });
                    }}>
                        <OrderItemCard name={data.item.name} image={{uri:data.item.image}} prices={data.item.price}  quantity={data.quantity} status={data.orderStatus} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    CardContainer: {
        gap: SPACING.space_10,
    },
    CardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: SPACING.space_20,
        alignItems: 'center',
    },
    HeaderTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
    },
    HeaderSubtitle: {
        fontFamily: FONTFAMILY.poppins_light,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
    },
    PriceContainer: {
        alignItems: 'flex-end',
    },
    HeaderPrice: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
    },
    ListContainer: {
        gap: SPACING.space_20,
    },
});

export default OrderHistoryCard;