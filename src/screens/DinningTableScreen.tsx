import React, { Component, useEffect, useState } from "react";
import { View, Text, Image, TouchableWithoutFeedback, ScrollView, TouchableOpacity, FlatList, StatusBar } from "react-native";
import { global_styles } from "../style/globalstyle";
import { RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import { COLORS, SPACING } from "../theme/theme";
import HeaderBar from "../components/HeaderBar";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

type Props = NativeStackScreenProps<RootStackParamList, "DinningTable">;

const DinningTableScreen: React.FC<Props> = ({ route , navigation: { navigate,pop }}) => {

  const { id, name,firstname,lastname }: any = route.params;
  const [dinningtable, setDinningTable] = useState([]);

  const fetchDinningTable = async () => {
    try {
      const response = await axios.get(`http://192.168.1.135:8080/table/getDinnigTables/${id}`);
      console.log(response.data)
      setDinningTable(response.data);
      // setRvcs(response.data.rvcs)
    } catch (error) {
      console.log('Failed to fetch restaurant name');
    }
  }
  useEffect(() => {
    fetchDinningTable()
  }, [id])

  const BackHandler=()=>{
      pop();
  }
  return (
    <View style={global_styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <View style={[global_styles.menuFlatList, { marginRight: SPACING.space_10 ,padding: SPACING.space_8 }]}>
        <FlatList
          ListHeaderComponent={<HeaderBar title={name} name="left" BackHandler={BackHandler}/>}
          numColumns={2}
          data={dinningtable}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={
            ({ item }) =>
              <TouchableOpacity onPress={()=>{navigate("Menus",{id:id,table:item.id,firstname:firstname,lastname:lastname})}}>
                <View style={global_styles.menuCardItem}>
                  <Text style={global_styles.menuCardItemTxt}>Table {item.numero}</Text>
                </View>
              </TouchableOpacity>
          } 
        />
      </View>
    </View>
  );
}
export default DinningTableScreen;
