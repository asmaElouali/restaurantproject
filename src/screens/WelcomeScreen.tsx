import {
    Dimensions,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import { SPACING, FONTSIZE, COLORS, FONTFAMILY, BorderRadius } from "../theme/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
const { height } = Dimensions.get("window");
import { RootStackParamList } from "../../../restaurantproject/types";


type Props = NativeStackScreenProps<RootStackParamList, "Welcome">

const WelcomeScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
    
    return (
        <SafeAreaView>
            <View>
                <ImageBackground
                    style={{
                        height: height / 2,
                    }}
                    resizeMode="contain"
                    source={require("../assets/images/welcome-img.jpg")}
                />
                <View style={{
                    paddingHorizontal: SPACING.space_10 * 4,
                    paddingTop: SPACING.space_10 * 1,
                }}>
                    <Text style={{
                        fontSize: FONTSIZE.size_30,
                        color: COLORS.primaryOrangeHex,
                        fontFamily: FONTFAMILY.poppins_bold,
                        textAlign: "center",
                    }}>Make Every Client Experience Memorable</Text>

                </View>
                <View
                    style={{ paddingHorizontal: SPACING.space_10 * 2, paddingTop: SPACING.space_10 * 7, alignItems: 'center' }}>

                    <TouchableOpacity onPress={() => navigate("Login")} style={{
                        backgroundColor: COLORS.primaryOrangeHex,
                        paddingVertical: SPACING.space_10 * 1.5,
                        paddingHorizontal: SPACING.space_10 * 2,
                        width: "48%",
                        borderRadius: BorderRadius.radius_10,
                        shadowColor: COLORS.primary,
                        shadowOffset: {
                            width: 0,
                            height: SPACING.space_10,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: SPACING.space_10,

                    }}>
                        <Text style={{ fontFamily: FONTFAMILY.poppins_bold, color: COLORS.primaryWhiteHex, fontSize: FONTSIZE.size_20, textAlign: "center" }}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
};
export default WelcomeScreen;
const styles = StyleSheet.create({});