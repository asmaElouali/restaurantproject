import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native"
import { RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { COLORS } from "../theme/theme";
import HeaderBar from "../components/HeaderBar";
import React, { useState } from "react";
import FeatherIcon from 'react-native-vector-icons/Feather';
import Toast from "react-native-toast-message";
import axios from "axios";

type Props = NativeStackScreenProps<RootStackParamList, "Setting">;
const Setting: React.FC<Props> = ({ route,navigation: { pop,navigate } }) => {

    const {rvc,tableId,firstname,lastname}:any=route.params;
    const [form, setForm] = useState({
        darkMode: false,
        emailNotifications: true,
        pushNotifications: false,
    });

    const LogOut = async () => {
        try {
            const response = await axios.post('http://192.168.1.135:8080/server/logout');
            console.log("response", response)
            const data = response.data;

            if (response.status === 200) {
                const data = response.data;
                    Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: 'Logout Successful',
                        text2: data.message,
                    });
                    navigate("Welcome");
          
            } else {
                throw new Error('Unexpected response status');
            }
        } catch (error) {
            console.error('Error during login:', error);
            return { success: false, message: 'An error occurred during Logout' };
        }
    };

    const BackHandler = () => {
        pop()
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primaryBlackHex }}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <HeaderBar title="Settings" name="left" BackHandler={BackHandler} />
            <ScrollView>
                <View style={styles.profile}>
                    <Text style={styles.profileName}>{lastname}</Text>
                    <Text style={styles.profileEmail}>{firstname}</Text>

                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferences</Text>
                    <View style={styles.sectionBody}>
                        <View style={[styles.rowWrapper, styles.rowFirst]}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigate("Order",{tableId:tableId})
                                }}
                                style={styles.row}>
                                <View
                                    style={[styles.rowIcon, { backgroundColor: '#fe9400' }]}>
                                    <FeatherIcon
                                        color="#fff"
                                        name="bell"
                                        size={20} />
                                </View>
                                <Text style={styles.rowLabel}>Order History</Text>
                                <View style={styles.rowSpacer} />
                                <Text style={styles.rowValue}></Text>

                            </TouchableOpacity>
                        </View>
                        <View style={styles.rowWrapper}>
                            <View style={styles.row}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigate("Cart",{table:tableId,rvcid:rvc})
                                    }}
                                    style={styles.row}>
                                    <View
                                        style={[styles.rowIcon, { backgroundColor: '#007AFF' }]}>
                                        <FeatherIcon
                                            color="#fff"
                                            name="shopping-cart"
                                            size={20} />
                                    </View>
                                    <Text style={styles.rowLabel}>Cart</Text>
                                    <View style={styles.rowSpacer} />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Log out</Text>
                    <View style={styles.sectionBody}>
                        <View style={[styles.rowWrapper, styles.rowFirst]}>
                            <View style={styles.row}>
                                <TouchableOpacity
                                    onPress={() => {
                                        LogOut()
                                    }}
                                    style={styles.row}>
                                    <View
                                        style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
                                        <FeatherIcon
                                            color="#fff"
                                            name="power"
                                            size={20} />
                                    </View>
                                    <Text style={styles.rowLabel}>Log Out</Text>
                                    <View style={styles.rowSpacer} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 0,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    contentFooter: {
        marginTop: 24,
        fontSize: 13,
        fontWeight: '500',
        color: '#929292',
        textAlign: 'center',
    },
    /** Header */
    header: {
        paddingHorizontal: 24,
        marginBottom: 12,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1d1d1d',
    },
    headerSubtitle: {
        fontSize: 15,
        fontWeight: '500',
        color: '#929292',
        marginTop: 6,
    },
    /** Profile */
    profile: {
        padding: 40,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: COLORS.primaryDarkGreyHex,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e3e3e3',
    },
    profileAvatar: {
        width: 60,
        height: 60,
        borderRadius: 9999,
    },
    profileName: {
        marginTop: 12,
        fontSize: 20,
        fontWeight: '600',
        color: COLORS.primaryWhiteHex,
    },
    profileEmail: {
        marginTop: 6,
        fontSize: 16,
        fontWeight: '400',
        color: COLORS.primaryWhiteHex,
    },
    profileAction: {
        marginTop: 12,
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007bff',
        borderRadius: 12,
    },
    profileActionText: {
        marginRight: 8,
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
    },
    /** Section */
    section: {
        paddingTop: 12,
    },
    sectionTitle: {
        marginVertical: 8,
        marginHorizontal: 24,
        fontSize: 14,
        fontWeight: '600',
        color: '#a7a7a7',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
    },
    sectionBody: {
        paddingLeft: 24,
        backgroundColor: COLORS.primaryDarkGreyHex,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e3e3e3',
    },
    /** Row */
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 16,
        height: 50,
    },
    rowWrapper: {
        borderTopWidth: 1,
        borderColor: '#e3e3e3',
    },
    rowFirst: {
        borderTopWidth: 0,
    },
    rowIcon: {
        width: 30,
        height: 30,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    rowLabel: {
        fontSize: 17,
        fontWeight: '500',
        color: COLORS.primaryWhiteHex,
    },
    rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    rowValue: {
        fontSize: 17,
        fontWeight: '500',
        color: '#8B8B8B',
        marginRight: 4,
    },
})
export default Setting;