import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";
import axios from 'axios';
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import RestaurantScreen from "./RestaurantScreen";
import { RootStackParamList } from "../../../restaurantproject/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Login">

const LoginScreen: React.FC<Props> = ({ navigation: { navigate } })  => {

    const [firstname, setFirstname] = useState('');
    const [num, setNum] = useState('');
    const [id, setId] = useState(0);
   // const navigation = useNavigation();

    const signIn = async () => {
        try {
            const response = await axios.post('http://192.168.1.135:8080/server/login', {
                firstname,
                num,
            });
            console.log("response",response)
            const data = response.data;

            if (response.status === 200) {
                const data = response.data;

                if (data.status) {
                    Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: 'Login Successful',
                        text2: data.message,
                    });
                    setId(data.id)
                    navigate("Restaurant", { id: data.id });
                } else {
                    Toast.show({
                        type: 'error',
                        position: 'top',
                        text1: 'Login Failed',
                        text2: data.message,
                    });
                }
            } else {
                throw new Error('Unexpected response status');
            }
        } catch (error) {
            console.error('Error during login:', error);
            return { success: false, message: 'An error occurred during login' };
        }
    };


    /*=============================================================================================================*/
    return (
        <SafeAreaView>
            <View style={{ padding: SPACING.space_10 * 2 }}>
                <View style={{ alignItems: "center" }}>
                    <Text style={{
                        fontSize: FONTSIZE.size_xxlarge,
                        color: COLORS.primaryOrangeHex,
                        fontFamily: FONTFAMILY.poppins_bold,
                        marginVertical: SPACING.space_10 * 3
                    }}>Login here</Text>

                </View>
                <View style={{ marginVertical: SPACING.space_10 * 3 }}>
                    <TextInput placeholder="Email"
                        placeholderTextColor={COLORS.black}
                        style={{
                            fontFamily: FONTFAMILY.poppins_regular,
                            fontSize: FONTSIZE.size_14,
                            padding: SPACING.space_10 * 2,
                            backgroundColor: COLORS.lightBlue,
                            borderRadius: SPACING.space_10,
                            marginVertical: SPACING.space_10,
                            color: COLORS.black,
                        }}
                        value={firstname}
                        onChangeText={setFirstname} />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor={COLORS.black}
                        secureTextEntry
                        style={{
                            fontFamily: FONTFAMILY.poppins_regular,
                            fontSize: FONTSIZE.size_14,
                            padding: SPACING.space_10 * 2,
                            backgroundColor: COLORS.lightBlue,
                            borderRadius: SPACING.space_10,
                            marginVertical: SPACING.space_10,
                            color: COLORS.black,
                        }}
                        value={num}
                        onChangeText={setNum} />
                </View>
                <TouchableOpacity style={{
                    padding: SPACING.space_10 * 2, backgroundColor: COLORS.primaryOrangeHex,
                    marginVertical: SPACING.space_10 * 3,
                    borderRadius: SPACING.space_10,
                    shadowColor: COLORS.blue,
                    shadowOffset: {
                        width: 0,
                        height: SPACING.space_10,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: SPACING.space_10,

                }} onPress={signIn}>
                    <Text style={{ fontFamily: FONTFAMILY.poppins_bold, color: COLORS.primaryWhiteHex, textAlign: "center", fontSize: FONTSIZE.size_20 }} >
                        Sign in
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    );
};
export default LoginScreen;
const styles = StyleSheet.create({});