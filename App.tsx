import React, { Component, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { global_styles } from './src/style/globalstyle';
//import DinningTable from "./screens/DinningTable";
//import Pinauthentication from "./screens/Pinauthentication";
//import AppNavigator from "./navigator/app.navigator";
import Menu from "./src/screens/Menu";
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import TabNavigator from "./src/navigator/TabNavigator";
import DetailsScreen from './src/screens/DetailsScreen';
import TabNavigator from "./src/navigator/TabNavigator";
import MenuData from "./src/data/MenuData";


/*const Stack = createNativeStackNavigator();
export default class App extends Component {
  state: {};
  constructor(props: any) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Tab"
            component={TabNavigator}
            options={{ animation: 'slide_from_bottom' }}>
          </Stack.Screen>
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ animation: 'slide_from_bottom' }}>
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}*/

/*const App = () => {
  console.log("Globale data",MenuData[0].subcategories[0].items);
  return (
    <View style={global_styles.content}>
      <Menu />
    </View>
  );
};

export default App;*/
const Stack = createNativeStackNavigator();

const App = () => {
  /*useEffect(() => {
    SplashScreen.hide();
  }, []);*/
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{animation: 'slide_from_bottom'}}>
        </Stack.Screen>
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ animation: 'slide_from_bottom' }}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;