import React, { Component, useCallback, useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { global_styles } from './src/style/globalstyle';
//import DinningTable from "./screens/DinningTable";
//import Pinauthentication from "./screens/Pinauthentication";
//import AppNavigator from "./navigator/app.navigator";
import Menu from "./src/screens/Menu";
import SplashScreen from 'react-native-splash-screen';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import TabNavigator from "./src/navigator/TabNavigator";
import DetailsScreen from './src/screens/DetailsScreen';
import TabNavigator from "./src/navigator/TabNavigator";
import MenuData from "./src/data/MenuData";
import OrderItemCard from "./src/components/OrderItemCard";
import PaymentScreen from "./src/screens/PaymentScreen";
import Passcode from "./src/screens/Passcode";
import RvcScreen from "./src/screens/RvcScreen";
import OrderHistory from "./src/screens/OrderHistoryScreen";
import ModalTester from "./src/components/ModalComponent";
import HeaderBar from "./src/components/HeaderBar";
//import ScannerScreen from "./src/screens/Scanner";
//import QRCodeScanner from "react-native-qrcode-scanner";
//import { RNCamera } from "react-native-camera";
import Scanner from "./src/screens/Scanner";
import Welcome from "./src/screens/WelcomeScreen";

import { ThemeContext } from './src/context/AuthContext';
import * as Keychain from 'react-native-keychain';
import { Provider } from "react-redux";
import { RootStackParamList } from "./../restaurantproject/types";
import LoginScreen from "./src/screens/LoginScreen";
import { COLORS } from "./src/theme/theme";
//import stores, { persistor } from "./src/redux/stores";
// { PersistGate } from "redux-persist/integration/react";
import Toast from 'react-native-toast-message';
import RestaurantScreen from "./src/screens/RestaurantScreen";



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
  const authContext = useContext(ThemeContext);
  const [status, setStatus] = useState('loading');

  const loadJWT = useCallback(async () => {
    try {
      const value = await Keychain.getGenericPassword();

      if (value) {
        const jwt = JSON.parse(value.password);
        authContext?.setAuthState({
          accessToken: jwt.accessToken || null,
          refreshToken: jwt.refreshToken || null,
          authenticated: jwt.accessToken !== null,
        });
        setStatus('success');
        // Continue with your code using jwt
      } else {
        // Handle the case where no password was found
        console.error("No password found");
        // You can also set a default value for jwt or handle this scenario as needed
      }
    } catch (error) {
      setStatus('error');
      console.log('Keychain Error: ${error.message}');
      authContext?.setAuthState({
        accessToken: null,
        refreshToken: null,
        authenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  if (authContext?.authState?.authenticated == false) {
    return <SignInScreen />
  } else {
    return <Passcode />
  }
};

export default App;*/
const Stack = createNativeStackNavigator<RootStackParamList>();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.primaryBlackHex,
  },
};
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (


    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ animation: 'slide_from_bottom' }} >
        </Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen}  />
        <Stack.Screen name="Restaurant" component={RestaurantScreen}/>
        <Stack.Screen
          name="rvc"
          component={RvcScreen}
          options={{ animation: 'slide_from_bottom' }} >
        </Stack.Screen>
        <Stack.Screen
          name="history"
          component={OrderHistory}
          options={{ animation: 'slide_from_bottom' }} >
        </Stack.Screen>
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{ animation: 'slide_from_bottom' }}>
        </Stack.Screen>
        <Stack.Screen
          name="qr-code"
          component={Scanner}
          options={{ animation: 'slide_from_bottom' }} >
        </Stack.Screen>
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ animation: 'slide_from_bottom' }}>
        </Stack.Screen>
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ animation: 'slide_from_bottom' }}>
        </Stack.Screen>
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>


  );
};

export default App;