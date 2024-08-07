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

const getCategoryFromData = (data: any) => {
    let temp: any = {};

    for (let i = 0; i < data.length; i++) {
        if (temp[data[i].name] == undefined) {
            temp[data[i].name] = 1;
        } else {
            temp[data[i].name]++;
        }

    }

    let categories = Object.keys(temp);
    categories.unshift('All');
    console.log({ zzzz: categories });
    console.log('Dta:', data);
    return categories;
}
const getSubCategoryFromData = (data: any) => {
    let temp: any = {};
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].subcategories.length; j++) {
            if (temp[data[i].subcategories[j].name] == undefined) {
                temp[data[i].subcategories[j].name] = 1;
            } else {
                temp[data[i].subcategories[j].name]++;
            }
        }
    }
    let subcategories = Object.keys(temp);
    //subcategories.unshift('');
    console.log({ kkk: subcategories })
    return subcategories;
}


const getSubCategoryList = (category: any, data: any) => {
   /* if (category === 'All') {
        let list = [];
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].subcategories.length; j++) {
                list.push(data[i].subcategories[j]);
            }
        }
        return list;
    } else {*/
        let categoryData = data.find((item: any) => item.name['en-US'] === category);
        console.log("ttttttt", categoryData);
        if (categoryData) {
            console.log("subcategorieCategory", categoryData);
            return categoryData.subcategories;
        } else {
            return [];
        }
    //}
};

const getItems = (subcategorie: string, data: any) => {
    if (subcategorie == '') {
        let list: any = [];
        let sub: any = {};
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].subcategories.length; j++) {
                for (let k = 0; k < data[i].subcategories[j].items.length; k++) {
                    sub = data[i].subcategories[j].items[k];
                    // console.log(sub); 
                    list.push(sub);
                }
            }
            console.log({ mmm: list });
        }
        return list;
    } else {
        for (let i = 0; i < data.length; i++) {
            let list: any = [];
            let subcategorylist = data[i].subcategories.filter((item: any) => item.name == subcategorie);
            if (subcategorylist.length > 0) {
                console.log("subcategorie :", subcategorylist[0].items);
                return subcategorylist[0].items;
            }
        }
    }
}
/*const getFamily = async () => {
    const array: string[] = [];
    await GetFamilyGroup().then(res => {
        console.log("Family Group", res.data);
        const categoryNames = res.data.map((item: any) => item.name['en-US']); // Adjust this based on your actual data structure
    })
        .catch(error => {
            console.log('Error', error);
            return [];
        })
}*/
type LocalizedNames = {
    [locale: string]: string;
};
type Category = {
    // Define the shape of your category object
    familyGroupItemID: number;
    name: LocalizedNames;
    // other properties...
};

type StateType = {
    familyGroupItemID: number;
    category: Category | undefined;
};
const Menu = ({ navigation }: any) => {
    // const MenuList = useStore((state: any) => state.DataList);
    const MenuList = MenuData;
    // console.log('Raw Data from GetFamilyGroup:', getFamily());

    const addToCart = useStore((state: any) => state.addToCart);
    const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
    const [searchText, setSearchText] = useState('');
    const [categories, setCategories] = useState([]);
    const [subcategorie, setSubCategories] = useState([]);
    useEffect(() => {
        const getFamily = async () => {
            await GetFamilyGroup().then(res => {
                console.log("Family Group", res.data);
                const categoryNames = res.data.map((item: any) => item.name['en-US']); // Adjust this based on your actual data structure
                setCategories(res.data);
                setCategoryIndex({
                    familyGroupItemID: res.data[0].familyGroupItemID,
                    category: res.data[0],
                });
                console.log("categories", categories)
            })
                .catch(error => {
                    console.log('Error', error);
                    return [];
                })
        }
        getFamily();
    }, [])
    useEffect(()=>{
        const getMenu = async () => {
            await GetMenu().then(res => {
                console.log("Menu", res.data);
                setSubCategories(res.data)
            })
                .catch(error => {
                    console.log('Error', error);
                })
        }
        getMenu();
    },[])
    console.log('Raw Data from GetFamilyGroup:', categories);
    const [categoryIdex, setCategoryIndex] = useState<StateType>({
        familyGroupItemID: 11101,
        category: categories[0],
    });
    console.log('Index:', categoryIdex.category)
    const [subcategoryIndex, setSubgategory] = useState({
        index: 0,
        subcategory: subcategorie[0],
    })
    useEffect(() => {
        const getFamily = async () => {
            await GetFamilyGroup().then(res => {
                console.log("Family Group", res.data);
                const categoryNames = res.data.map((item: any) => item.name['en-US']); // Adjust this based on your actual data structure
                setCategories(res.data);
                setCategoryIndex({
                    familyGroupItemID: res.data[0].familyGroupItemID,
                    category: res.data[0].name['en-US'],
                });
                console.log("categories", categories)
            })
                .catch(error => {
                    console.log('Error', error);
                    return [];
                })
        }
        getFamily();
    }, [])
    const [sortedSubCategory, setSortedSubCategory] = useState(getSubCategoryList(categoryIdex.category, subcategorie),);
    const [sortedItem, setSortedItem] = useState(getItems(subcategoryIndex.subcategory, MenuList),);
    const ListRef: any = useRef<FlatList>();
    const searchItem = (search: string) => {
        if (search !== '') {
            const filteredItems: any[] = [];
            MenuList.forEach((category: any) => {
                category.subcategories.forEach((subcategory: any) => {
                    const items = subcategory.items.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase()));
                    filteredItems.push(...items);
                });
            });
            setSortedItem(filteredItems);
        }
    }

    const resetSearchItem = () => {
        /// const list:any[] =[];
        //list.push(...MenuList.forEach((category : any) => {category.subcategories.forEach((subcategory:any) => {subcategory.items.forEach(((item:any) => item.name))})}))
        //console.log({hhhhhh:list});
        ListRef?.current?.scrollToOffset({
            animated: true,
            offset: 0,
        });
        setCategoryIndex({ familyGroupItemID: 0, category: categories[0] });
        const filteredItems: any[] = [];
        MenuList.forEach((category: any) => {
            category.subcategories.forEach((subcategory: any) => {
                const items = subcategory.items.filter((item: any) => item.name.toLowerCase());
                filteredItems.push(...items);
            });
        });
        setSortedItem(filteredItems);
        setSearchText('');
    }

    const ItemCardAddToCart = ({
        index,
        name,
        ima,
        prices
    }: any) => {
        addToCart({
            index,
            name,
            ima,
            prices
        });
        calculateCartPrice();
        ToastAndroid.showWithGravity(
            `${name} is Added to Cart`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    };



    return (
        <View style={styles.screenContainer} >
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.ScrollViewFlex} >
                <HeaderBar />
                <Text style={styles.ScreenTitle}>
                    Find the best{'\n'}item for you
                </Text>

                {/* Search Input*/}
                <View style={styles.InputContainerComponent}>
                    <TouchableOpacity onPress={() => { searchItem(searchText); }}>
                        <CustomIcon style={styles.InputIcon} name="search" size={FONTSIZE.size_18} color={
                            searchText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Find your product..."
                        value={searchText}
                        onChangeText={text => {
                            setSearchText(text);
                            searchItem(text);
                        }}
                        placeholderTextColor={COLORS.primaryDarkGreyHex}
                        style={styles.TextInputContainer}
                    />
                    {searchText.length > 0 ? (
                        <TouchableOpacity onPress={() => { resetSearchItem() }}>
                            <CustomIcon style={styles.InputIcon} name="close" size={FONTSIZE.size_16} color={COLORS.primaryLightGreyHex} />
                        </TouchableOpacity>
                    ) : (
                        <></>
                    )}

                </View>

                {/*Category Scroller*/}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.CategoryScrollViewStyle}>
                    {categories.map((data: any, index) => (

                        <View key={data.familyGroupItemID.toString()} style={styles.CategoryScrollViewContainer}>
                            <TouchableOpacity style={styles.CategoryScrollViewItem} onPress={() => {
                                ListRef?.current?.scrollToOffset({
                                    animated: true,
                                    offset: 0,
                                });
                                { console.log("Index: ", index, "data: ", data, "categories: ", categories[index]) }
                                setCategoryIndex({ familyGroupItemID: index, category: data });
                                setSortedSubCategory([...getSubCategoryList(data, MenuList),]);

                            }}>
                                <Text style={[styles.CategoryText, categoryIdex.familyGroupItemID == index ? { color: COLORS.primaryOrangeHex } : {},]}>
                                    {data.name['en-US']}
                                </Text>
                                {categoryIdex.familyGroupItemID == index ? (
                                    <View style={styles.ActiveCategory} />
                                ) : (
                                    <></>
                                )}
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
                {/*SubCategory Flatlist*/}
                <FlatList
                    ref={ListRef}
                    horizontal
                    ListEmptyComponent={
                        <View style={styles.EmptyListContainer}>
                            <Text style={styles.CategoryText}>No SubCategory Available</Text>
                        </View>
                    }
                    showsHorizontalScrollIndicator={false}
                    data={sortedSubCategory}
                    keyExtractor={item => item.name}
                    contentContainerStyle={[styles.FlatListContainer, /*{ marginBottom: tabBarHeight }*/]}
                    renderItem={({ item, index }) => {
                        console.log("Item: ", item.name);
                        return (
                            <TouchableOpacity onPress={() => {
                                ListRef?.current?.scrollToOffset({
                                    animated: true,
                                    offset: 0,
                                });
                                setSubgategory({ index: index, subcategory: subcategorie[index] });
                                //setCategoryIndex({ index: index, category: categories[index] });
                                setSortedItem([...getItems(subcategorie[index], MenuList),]);

                            }}>

                                <SubCategorieCard ima={item.ima} subcategorie={item} id={item.id} buttonPressHandler={undefined} index={0} price={undefined} />
                            </TouchableOpacity>
                        )
                    }}
                />
                {/* <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.CategoryScrollViewStyle}>*/}

                {/*<Text style={styles.ItemTitle}>Menu Item</Text>*/}
                {/*Article Flatlist*/}
                {/*
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={sortedItem}
                        contentContainerStyle={[
                            styles.FlatListContainer,
                        ]}
                        keyExtractor={item => item.name}
                        renderItem={({ item }) => {
                            { console.log("article id :", item) }

                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.push('Details', {
                                            index: item.index,
                                            //id: item.id,
                                            image: item.ima,
                                            description: item.description,
                                            name: item.name,
                                            price: item.price
                                        });
                                    }}
                                >
                                    <SubCategorieCard ima={item.ima} subcategorie={item} id={""} buttonPressHandler={ItemCardAddToCart} index={0} price={item.price} />
                                </TouchableOpacity>
                            )
                        }}
                    /> */}
                {/*</ScrollView>*/}
            </ScrollView>
        </View>

    )
}


const styles = StyleSheet.create({
    screenContainer: {
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
        gap: SPACING.space_20,
        paddingVertical: SPACING.space_20,
        paddingHorizontal: SPACING.space_30,
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