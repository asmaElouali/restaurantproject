import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfoProps';
import { useStore } from '../redux/store';
import MenuData from '../data/MenuData';
import PaymentFooter from '../components/PaymentFooter';
const DetailsScreen = ({ navigation, route }: any) => {
    console.log('route = ', route.params)
    const ItemOfIndex = route.params;
    const addToCart = useStore((state: any) => state.addToCart);
    const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
    const [price, setPrice] = useState(ItemOfIndex.price);
    const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
    const  deleteFromFavoriteList = useStore((state:any)=> state.deleteFromFavoriteList)

    const ToggleFavourite = (favourite: boolean,index: number) => {
        favourite ?  deleteFromFavoriteList(index) : addToFavoriteList(index);
    };

    // const ItemMenu = MenuData;
    // const ItemOfIndex = route.params
    // const [price, setPrice] = useState(ItemOfIndex.);
    /*const MenuItem = ItemMenu.find((category:any) => {
        const subcategory = category.subcategories.find((sub:any) => {
            return sub.items && sub.items.length > route.params.index;
        });
        return subcategory != undefined;
    });

    const ItemOfIndex = MenuItem?.subcategories?.find((sub:any) => {
        return sub.items && sub.items.length > route.params.index;
    })?.items[route.params.index];*/

    console.log('resultat =', ItemOfIndex);
    const [fullDesc, setFullDesc] = useState(false);
    const BackHandler = () => {
        navigation.pop();
    };

    const addToCarthandler = ({
        index,
        name,
        image,
        price,
    }: any) => {
        addToCart({
            index,
            name,
            image,
            prices: [{ price, quantity: 1 }],
        });
        calculateCartPrice();
        navigation.navigate('Cart', {
            image: image,
            index: index,
            name: name,
            price: price,
        });
    };
    return (

        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}
            >
                <ImageBackgroundInfo EnableBackHandler={true} image={ItemOfIndex.image} name={ItemOfIndex.name} price={ItemOfIndex.price} type={''} index={ItemOfIndex.id} favourite={ItemOfIndex.favourite} ToggleFavourite={ToggleFavourite} BackHandler={BackHandler} />
                <View style={styles.FooterInfoArea}>
                    <Text style={styles.InfoTitle}>Description</Text>
                    {fullDesc ? (
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setFullDesc(prev => !prev);
                            }}>
                            <Text style={styles.DescriptionText}>
                                {ItemOfIndex.description}
                            </Text>
                        </TouchableWithoutFeedback>
                    ) : (
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setFullDesc(prev => !prev);
                            }}>
                            <Text numberOfLines={3} style={styles.DescriptionText}>
                                {ItemOfIndex.description}
                            </Text>
                        </TouchableWithoutFeedback>
                    )}
                </View>

                <PaymentFooter price={ItemOfIndex.price} buttonTitle="Add to Cart" buttonPressHandler={() => {
                    addToCarthandler({
                        index: ItemOfIndex.index,
                        name: ItemOfIndex.name,
                        image: ItemOfIndex.image,
                        price: price,
                    });

                }} />

            </ScrollView>

        </View >



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



