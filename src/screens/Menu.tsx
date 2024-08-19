import React, { useEffect, useRef, useState } from "react";
import { Text, StatusBar, View, TouchableOpacity, StyleSheet, ScrollView, FlatList, Dimensions, ToastAndroid } from 'react-native';
import { BorderRadius, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";
import HeaderBar from "../components/HeaderBar";
import { useStore } from "../redux/store";
import CustomIcon from "../components/CustomIcon";
import { TextInput } from "react-native-paper";
import SubCategorieCard from "../components/SubCategorieCard";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import DetailsScreen from "./DetailsScreen";
import MenuData from "../data/MenuData";
import { GetFamilyGroup, GetMenu } from "../api/authservice";
import { RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import SubCategoryCard from "../components/SubCategorieCard";
import { global_styles } from "../style/globalstyle";
import { RouteProp } from "@react-navigation/native";
import ProfilePic from "../components/ProfilePic";


type Props = NativeStackScreenProps<RootStackParamList, "Menus">;



const getCategoriesFromData = (data: any) => {
    let temp: any = {};
    for (let i = 0; i < data.length; i++) {
        if (temp[data[i].name] == undefined) {
            temp[data[i].name] = 1;
        } else {
            temp[data[i].name]++;
        }
    }
    console.log("data", data)
    let categories = Object.keys(temp);
    categories.unshift('All');
    console.log("cate", categories);
    return categories;
};
const getCoffeeList = (category: string, data: any) => {
    if (category == 'All') {
        return data;
    } else {
        let coffeelist = data.filter((item: any) => item.name == category);
        return coffeelist;
    }
};


const Menu: React.FC<Props> = ({ route, navigation: { push, pop } }: any) => {
    const { id, table,firstname,lastname }: any = route.params;
    const [menuName, setMenuName] = useState('');
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [Categories, setCategorie] = useState<string[]>([]);
    const [categoryIndex, setCategoryIndex] = useState({
        index: 0,
        category: 'All',
    });
    const [sortedCoffee, setSortedCoffee] = useState<any[]>([]);

    const fetchMenu = async () => {
        try {
            const response = await axios.get(`http://192.168.1.135:8080/menu/getMenu/${id}`);
            setMenuName(response.data.name);
            setCategories(response.data.categories);
            setItems(response.data.categories.items);
        } catch (error) {
            console.log('Failed to fetch restaurant name');
        }
    };

    useEffect(() => {
        fetchMenu();
    }, [id]);

    useEffect(() => {
        const newCategories = getCategoriesFromData(categories);
        setCategorie(newCategories);
        setCategoryIndex({
            index: 0,
            category: newCategories[0] || 'All',
        });
        setSortedCoffee(getCoffeeList(newCategories[0] || 'All', categories));
    }, [categories]);

    const ListRef: any = useRef<FlatList<any>>();
    //const tabBarHeight = useBottomTabBarHeight();

    const searchCoffee = (search: string) => {
        if (search !== '') {
            ListRef?.current?.scrollToOffset({
                animated: true,
                offset: 0,
            });
            setCategoryIndex({ index: 0, category: Categories[0] });
            setSortedCoffee([
                ...categories.filter((item: any) =>
                    item.name.toLowerCase().includes(search.toLowerCase()),
                ),
            ]);
        }
    };

    const resetSearchCoffee = () => {
        ListRef?.current?.scrollToOffset({
            animated: true,
            offset: 0,
        });
        setCategoryIndex({ index: 0, category: Categories[0] });
        setSortedCoffee([...categories]);
        setSearchText('');
    };
    const BackHandler = () => {
        // navigate("Cart",{table:table,rvcid:rvc});
        // navigate("Order",{tableId:table});
        //navigate("Menus",{id:rvcid,table:table})
        pop()
    };

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <HeaderBar name="left" BackHandler={BackHandler} Screen={<ProfilePic rvc={id} tableId={table} firstname={firstname} lastname={lastname} />} />
            <Text style={styles.ScreenTitle}>
                {menuName}
            </Text>
            {/* Search Input */}
            <View style={styles.InputContainerComponent}>
                <TouchableOpacity
                    onPress={() => searchCoffee(searchText)}>
                    <CustomIcon
                        style={styles.InputIcon}
                        name="search"
                        size={FONTSIZE.size_18}
                        color={searchText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
                    />
                </TouchableOpacity>
                <TextInput
                    placeholder="Search Item"
                    value={searchText}
                    onChangeText={text => {
                        setSearchText(text);
                        searchCoffee(text);
                    }}
                    placeholderTextColor={COLORS.primaryLightGreyHex}
                    style={styles.TextInputContainer}
                />
                {searchText.length > 0 ? (
                    <TouchableOpacity onPress={() => { resetSearchCoffee(); }}>
                        <CustomIcon
                            style={styles.InputIcon}
                            name="close"
                            size={FONTSIZE.size_16}
                            color={COLORS.primaryLightGreyHex}
                        />
                    </TouchableOpacity>
                ) : (
                    <></>
                )}
            </View>
            {/* Category Scroller */}
            <View >
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.CategoryScrollViewStyle}>
                    {Categories.map((data, index) => (
                        <View key={index.toString()} style={styles.CategoryScrollViewContainer}>
                            <TouchableOpacity
                                style={styles.CategoryScrollViewItem}
                                onPress={() => {
                                    ListRef?.current?.scrollToOffset({
                                        animated: true,
                                        offset: 0,
                                    });
                                    setCategoryIndex({ index, category: Categories[index] });
                                    setSortedCoffee(getCoffeeList(Categories[index], categories));
                                }}>
                                <Text style={[
                                    styles.CategoryText,
                                    categoryIndex.index === index
                                        ? { color: COLORS.primaryOrangeHex }
                                        : {},
                                ]}>{data}</Text>
                                {categoryIndex.index === index ? (
                                    <View style={styles.ActiveCategory} />
                                ) : null}
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={global_styles.menuFlatList} >
                <FlatList
                    ref={ListRef}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    data={sortedCoffee.flatMap((coffee: any) => coffee.items)}
                    contentContainerStyle={
                        [
                            styles.FlatListContainer,
                        ]

                    }
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => { push('Details', { id: item.id, name: item.name, description: item.description, image: item.image, price: item.price, table: table, rvc: id }) }}>
                            <SubCategoryCard
                                id={item.id}
                                name={item.name}
                                description={item.description}
                                ima={{ uri: item.image }}
                                price={item.price}
                                buttonPressHandler={''}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>

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
    },
    ScreenTitle: {
        fontSize: FONTSIZE.size_28,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex,
        paddingLeft: SPACING.space_30,
    },
    InputContainerComponent: {
        flexDirection: 'row',
        margin: SPACING.space_30,
        borderRadius: BorderRadius.radius_20,
        backgroundColor: COLORS.primaryDarkGreyHex,
        alignItems: 'center',
    },
    InputIcon: {
        marginHorizontal: SPACING.space_20,
    },
    TextInputContainer: {
        flex: 1,
        height: SPACING.space_20 * 3,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
    },
    CategoryScrollViewStyle: {
        paddingHorizontal: SPACING.space_20,
        marginBottom: SPACING.space_20,
    },
    CategoryScrollViewContainer: {
        paddingHorizontal: SPACING.space_15,
    },
    CategoryScrollViewItem: {
        alignItems: 'center',
    },
    CategoryText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryLightGreyHex,
        marginBottom: SPACING.space_4,
    },
    ActiveCategory: {
        height: SPACING.space_10,
        width: SPACING.space_10,
        borderRadius: BorderRadius.radius_10,
        backgroundColor: COLORS.primaryOrangeHex,
    },
    EmptyListContainer: {
        width: Dimensions.get('window').width - SPACING.space_30 * 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.space_36 * 3.6,
    },
    FlatListContainer: {
        // gap: SPACING.space_10,
        flexGrow: 1,
        paddingVertical: SPACING.space_12,
        paddingHorizontal: SPACING.space_10,
    },
    ItemTitle: {
        fontSize: FONTSIZE.size_18,
        marginLeft: SPACING.space_30,
        marginTop: SPACING.space_10,
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.secondaryLightGreyHex,
    },

})

export default Menu;