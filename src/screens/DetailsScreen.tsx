import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableWithoutFeedback, Alert } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfoProps';
import { useStore } from '../redux/store';
import MenuData from '../data/MenuData';
import PaymentFooter from '../components/PaymentFooter';
import { RootStackParamList } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';


type Props = NativeStackScreenProps<RootStackParamList, "Details">;

const DetailsScreen: React.FC<Props> = ({ route , navigation: { navigate,pop }}) => {

    const { id, name, description, image, price, table,rvc }: any = route.params;
    const [fullDesc, setFullDesc] = useState(false);

    const BackHandler = () => {
       // navigate("Cart",{table:table,rvcid:rvc});
      // navigate("Order",{tableId:table});
       pop()
    };

    const addToCart = async () => {
        try {
            const response = await axios.put(`http://192.168.1.135:8080/api/cart/add/${table}`, {
                id: id,
                quantity: 1, // Adjust as needed
            });
           
            navigate("Cart",{table:table,rvcid:rvc})
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to add item to cart');
        }
    };


    
    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>
                <ImageBackgroundInfo
                    EnableBackHandler={true} image={{ uri: image }} name={name} price={price} BackHandler={BackHandler}
                />

                <View style={styles.FooterInfoArea}>
                    <Text style={styles.InfoTitle}>Description</Text>
                    {fullDesc ? (
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setFullDesc(prev => !prev);
                            }}>
                            <Text style={styles.DescriptionText}>
                                {description}
                            </Text>
                        </TouchableWithoutFeedback>
                    ) : (
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setFullDesc(prev => !prev);
                            }}>
                            <Text numberOfLines={3} style={styles.DescriptionText}>
                                {description}
                            </Text>
                        </TouchableWithoutFeedback>
                    )}
                </View>
                <PaymentFooter
                    price={price}
                    buttonTitle="Add to Cart"
                    buttonPressHandler={() => {
                        addToCart()
                    }}
                />
            </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({

    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
    },
    ScrollViewFlex: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    DescriptionText: {
        letterSpacing: 0.5,
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
        marginBottom: SPACING.space_30,

    },
    FooterInfoArea: {
        padding: SPACING.space_20,
    },
    InfoTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
        marginBottom: SPACING.space_10,
    }

});
export default DetailsScreen;



