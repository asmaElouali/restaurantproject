import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from '@react-native-community/blur';
import { COLORS } from "../theme/theme";
import Menu from "../screens/Menu";
import { NavigationContainer } from "@react-navigation/native";
import CustomIcon from "../components/CustomIcon";
import CartScreen from "../screens/CartScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import OrderHistoryScreen from "../screens/OrderHistoryScreen";
import { RootStackParamList} from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";



const Tab = createBottomTabNavigator<RootStackParamList>();
type Props = NativeStackScreenProps<RootStackParamList, "Tab">;


const TabNavigator:React.FC<Props> =() => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBarStyle,
                tabBarBackground: () => (
                    <BlurView
                        overlayColor=""
                        blurAmount={15}
                        style={styles.BlurViewStyles}
                    />
                ),
            }}
        >
            <Tab.Screen name="Menus" component={Menu} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <CustomIcon name="home" size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />),
            }}>
            </Tab.Screen>
            <Tab.Screen name="Order" component={OrderHistoryScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <CustomIcon name="bell" size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />),
            }}>
            </Tab.Screen>
            <Tab.Screen name="Cart" component={CartScreen} options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <CustomIcon name="cart" size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />),
            }}>
            </Tab.Screen>
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 80,
        position: 'absolute',
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopWidth: 0,
        elevation: 0,
        borderTopColor: 'transparent',
    },
    BlurViewStyles: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default TabNavigator;