import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useStore } from "../redux/store";
//import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { BorderRadius, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";
import PopUpAnimation from "../components/PopUpAnimation";
import { Header } from "react-native/Libraries/NewAppScreen";
import HeaderBar from "../components/HeaderBar";
import EmptyListAnimation from "../components/EmptyListAnimation";
import OrderItemCard from "../components/OrderItemCard";
import OrderHistoryCard from "../components/OrderHistoryCard";
import ModalScreen from "../components/ModalComponent";
import Ionicons from "react-native-vector-icons/Ionicons";
const { width, height } = Dimensions.get("window");
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Order">;

const dialPadSize = width * 0.2;
const OrderHistoryScreen: React.FC<Props> = ({ navigation, route }: any) => {
    const { tableId }: any = route.params;
    const [orderHistory, setOrderHistory] = useState([]);
    //const tabBarHeight = useBottomTabBarHeight();
    const [showAnimation, setShowAnimation] = useState(false);

    const fetchOrderHistory = async () => {
        try {
            const response = await axios.get(`http://192.168.1.135:8080/api/order/dinning/${tableId}`);
            setOrderHistory(response.data);
        } catch (error) {
            console.error("Error fetching order history:", error);
        }
    };

    useEffect(() => {
        fetchOrderHistory();
    }, [tableId]);
    /*const navigationHandler = ({ index }: any) => {
        navigation.push('Details', {
            index,
        });
    };*/

    const buttonPressHandler = () => {
        setShowAnimation(true);
        setTimeout(() => {
            setShowAnimation(false);
        }, 2000);
    };
    //const navigations = useNavigation(); 
    const BackHandler = () => {
        navigation.pop()
    };
    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <HeaderBar title="Order History" name="left" BackHandler={BackHandler}/>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
                <View style={styles.ScrollViewInnerView}>
                    <View style={styles.ItemContainer}>
                        {orderHistory.length == 0 ? (
                            <EmptyListAnimation title={'No Order History'} />
                        ) : (
                            <View style={styles.ListItemContainer}>
                                {orderHistory.map((data: any, index: any) => (
                                    <OrderHistoryCard key={index.toString()} CartList={data.orderItems} CartListPrice={data.totalPrice} OrderDate={data.createdAt} status={data.orderStatus} />
                                ))}
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>

            <View />
        </View>
    );
};

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
        paddingBottom:20,
    },
    LottieAnimation: {
        height: 250,
    },
    ScrollViewFlex: {
        flexGrow: 1,
    },
    ScrollViewInnerView: {
        flex: 1,
        justifyContent: 'space-between',
    },
    ItemContainer: {
        flex: 1,
    },
    ListItemContainer: {
        paddingHorizontal: SPACING.space_20,
        gap: SPACING.space_30,
    },
    DownloadButton: {
        margin: SPACING.space_20,
        backgroundColor: COLORS.primaryOrangeHex,
        alignItems: 'center',
        justifyContent: 'center',
        height: SPACING.space_36 * 2,
        borderRadius: BorderRadius.radius_20,
    },
    ButtonText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    },
});

export default OrderHistoryScreen;


