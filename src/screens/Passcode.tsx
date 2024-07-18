import { Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { COLORS } from "../theme/theme";
import { Authorization, Authentication, Token, GetMenu, GetFamilyGroup, GetMenuItemByFamily, TenderMedia } from "../api/authservice";
const { width, height } = Dimensions.get("window");

const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, "checkmark", 0, "del"];
const dialPadSize = width * 0.2;
const pinLength = 6;

const Passcode = ({ navigation }: any) => {

    const getAutorize = async () => {
        await Authorization().then(res => {
            console.log("resultat", res.data);
        })
            .catch(error => {
                console.log('ERRRrr', error);
            })
    }
    const getSignIn = async () => {
        await Authentication().then(res => {
            console.log("signIn", res.data);
        })
            .catch(error => {
                console.log('Error', error);
            })
    }
    const getToken = async () => {
        await Token().then(res => {
            console.log("Token", res.data);
        })
            .catch(error => {
                console.log('Error', error);
            })
    }
    const getMenu = async () => {
        await GetMenu().then(res => {
            console.log("Menu", res.data);
        })
            .catch(error => {
                console.log('Error', error);
            })
    }
    const getFamily = async () => {
        await GetFamilyGroup().then(res => {
            console.log("Family Group", res.data);
        })
            .catch(error => {
                console.log('Error', error);
            })
    }

    const getMenuItems = async () => {
        await GetMenuItemByFamily(11101).then(res => {
            const names = res.data.map((item: any[]) =>
                item.map(definition => definition.name)
            );
            console.log("Menu Item Family Group", names);
        })
            .catch(error => {
                console.log('Error', error);
            })
    }
    const getTender = async () => {
        await TenderMedia().then(res => {
            console.log("Tender Media", res.data);
        })
            .catch(error => {
                console.log('Error', error);
            })
    }
    

    useEffect(() => {
        getAutorize()
        //getSignIn(),
        //getToken(),
        //getTender()
    }, []);

    const [pinCode, setPinCode] = useState<number[]>([]);

    const DialPad = ({ onPress }: any) => {
        return (
            <View style={{ height: 420 }}>
                <FlatList
                    data={dialPad}
                    numColumns={3}
                    style={{ flexGrow: 1 }}
                    keyExtractor={(_, index) => index.toString()}
                    scrollEnabled={false}
                    columnWrapperStyle={{ gap: 30 }}
                    contentContainerStyle={{ gap: 30 }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => onPress(item)} disabled={item === ""}>
                                <View style={{ width: dialPadSize, height: dialPadSize, borderRadius: dialPadSize / 2, borderWidth: 1, borderColor: COLORS.primaryOrangeHex, alignItems: "center", justifyContent: "center", }}>
                                    {item === "del" ? (
                                        <Ionicons name="backspace-outline" size={dialPadSize / 2} color={COLORS.primaryOrangeHex} />
                                    ) : item === "checkmark" ? (
                                        <Ionicons name="checkmark-outline" size={dialPadSize / 2} color={COLORS.primaryOrangeHex} />
                                    ) : (
                                        <Text style={{ fontSize: dialPadSize / 2, color: COLORS.primaryOrangeHex, }}>
                                            {item}
                                        </Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        );
    };
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.primaryBlackHex, alignItems: "center", justifyContent: "center", }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 42, color: COLORS.primaryOrangeHex, }}>
                Login with Passcode
            </Text>
            <View style={{ flexDirection: "row", gap: 20, marginBottom: 40, height: 30, alignItems: "flex-end" }}>
                {pinCode.map((_, index) => (
                    <View key={index} style={{
                        width: 22,
                        height: 22,
                        borderRadius: 22,
                        backgroundColor: COLORS.primaryOrangeHex,
                    }} />
                ))}
            </View>

            <DialPad onPress={(item: any) => {
                if (item === "del") {
                    setPinCode((prevCode) => prevCode.slice(0, prevCode.length - 1));
                } else if (typeof item === "number") {
                    setPinCode((prevCode) => [...prevCode, item]);
                } else if (item === "checkmark") {
                    navigation.push('rvc');
                }
            }} />
        </View>
    )

}
export default Passcode;