import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useStore } from "../redux/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
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


const dialPadSize = width * 0.2;
const OrderHistoryScreen = ({ navigation }: any) => {
    const OrderHistoryList = useStore((state: any) => state.OrderHistoryList);
    const tabBarHeight = useBottomTabBarHeight();
    const [showAnimation, setShowAnimation] = useState(false);

    const navigationHandler = ({ index }: any) => {
        navigation.push('Details', {
            index,
        });
    };

    const buttonPressHandler = () => {
        setShowAnimation(true);
        setTimeout(() => {
            setShowAnimation(false);
        }, 2000);
    };
    const navigations = useNavigation(); 
    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            {showAnimation ? (
                <PopUpAnimation style={styles.LottieAnimation} source={require('../lottie/download.json')} />
            ) : (
                <></>
            )}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
                <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
                    <View style={styles.ItemContainer}>
                        <HeaderBar title="Order History" />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <ModalScreen />
                            <TouchableOpacity  style={{ marginLeft: 160 }} onPress={() =>navigation.push('qr-code')} >
                                <Ionicons
                                    name="qr-code-outline"
                                    size={dialPadSize / 2}
                                    color={COLORS.primaryOrangeHex}
                                />
                            </TouchableOpacity>
                        </View>
                        {OrderHistoryList.length == 0 ? (
                            <EmptyListAnimation title={'No Order History'} />
                        ) : (
                            <View style={styles.ListItemContainer}>
                                {OrderHistoryList.map((data: any, index: any) => (
                                    <OrderHistoryCard key={index.toString()} navigationHandler={navigationHandler} CartList={data.CartList} CartListPrice={data.CartListPrice} OrderDate={data.OrderDate} />
                                ))}
                            </View>
                        )}
                    </View>
                    {OrderHistoryList.length > 0 ? (
                        <TouchableOpacity
                            style={styles.DownloadButton}
                            onPress={() => {
                                buttonPressHandler();
                            }}>
                            <Text style={styles.ButtonText}>Download</Text>
                        </TouchableOpacity>
                    ) : (
                        <></>
                    )}
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


