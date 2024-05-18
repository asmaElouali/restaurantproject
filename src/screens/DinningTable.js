import React, { Component } from "react";
import { View, Text, Image, TouchableWithoutFeedback, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { global_styles } from "../style/globalstyle";

export default class DinningTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      main_menu: ["ALL", "RESTAURANT", "TERRASSE", "JARDIN", "ROOFTOP",],
      selected_mainMenu: "ALL",
      menuItemsList: [
        { name: "Table 1" },
        { name: "Table 2" },
        { name: "Table 3" },
        { name: "Table 4" },
        { name: "Table 5" },
        { name: "Table 6" },
        { name: "Table 7" },
        { name: "Table 8" },
        { name: "Table 9" },
        { name: "Table 10" },
      ]
    };
  }
  onMenuCardItemPress = (data) => {
    if (data == "ALL") {
      this.setState({
        selected_mainMenu: "ALL",
        menuItemsList: [
          { name: "Table 1" },
          { name: "Table 2" },
          { name: "Table 3" },
          { name: "Table 4" },
          { name: "Table 5" },
          { name: "Table 6" },
          { name: "Table 7" },
          { name: "Table 8" },
          { name: "Table 9" },
          { name: "Table 10" },
        ]
      })
    } else if (data == "RESTAURANT") {
      this.setState({
        selected_mainMenu: "RESTAURANT",
        menuItemsList: [
          { name: "Table 1" },
          { name: "Table 2" },
        ]
      })
    } else if (data == "TERRASSE") {
      this.setState({
          selected_mainMenu: "TERRASSE" ,
          menuItemsList: [
            { name: "Table 3" },
            { name: "Table 4" },
          ]
      })
    } else if (data == "JARDIN") {
      this.setState({
          selected_mainMenu: "JARDIN" ,
          menuItemsList : [
            { name: "Table 5" },
            { name: "Table 6" },
          ]
      })
    } else if (data == "ROOFTOP") {
      this.setState({
          selected_mainMenu: "ROOFTOP" ,
          menuItemsList : [
            { name: "Table 7" },
            { name: "Table 8" },
            { name: "Table 9" },
            { name: "Table 10" }
          ]
      })
    }
  }

  OnMenuItemPress = (data) => {
    this.setState({ selected_mainMenu: data })
  }

  render() {
    const mainMenuList = this.state.main_menu.map((data, index) => {
      if (this.state.selected_mainMenu == data) {
        return (
          <View key={data + index.toString()} style={global_styles.mainMenuTxtSelectedView}><Text style={global_styles.mainMenuTxt}>{data}</Text></View>
        )
      } else {
        return (
          <TouchableOpacity key={data + index.toString()} style={global_styles.mainMenuTxtView} onPress={() => this.onMenuCardItemPress(data)}>
            <Text style={global_styles.mainMenuTxt}>
              {data}
            </Text>
          </TouchableOpacity>
        )
      }
    })
    return (
      <View style={global_styles.content}>
        <View style={global_styles.headerView}>
          <Text style={global_styles.headingTxt}>Dinning Table</Text>
          <TouchableWithoutFeedback onPress={() => { console.log("Hamburger") }}>
            <Image style={global_styles.hamburgerImage} source={require('../assets/images/nav_icons/humberger.png')} />
          </TouchableWithoutFeedback>
        </View>
        <View style={global_styles.mainMenuView}>
          <ScrollView showsHorizontalScrollIndicator={false} style={global_styles.horizontalScroll} horizontal={true}>
            {mainMenuList}
            <View style={global_styles.mainMenuTxtView} />
            <View style={global_styles.mainMenuTxtView} />
          </ScrollView>
        </View>
        <View style={global_styles.menuFlatList}>
          <FlatList
            numColumns={2}
            data={this.state.menuItemsList}
            keyExtractor={(item, index) => { index.toString() + item.toString() }}
            renderItem={
              ({ item }) =>
                <View style={global_styles.menuCardItem}>
                  <Text style={global_styles.menuCardItemTxt}>{item.name}</Text>
                </View>
            }
          />
        </View>
      </View>
    );
  }
}