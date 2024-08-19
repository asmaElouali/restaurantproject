import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import {
  BorderRadius,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import GradientBGIcon from '../components/GradientBGIcon';
import PaymentMethod from '../components/PaymentMethod';
import PaymentFooter from '../components/PaymentFooter';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import { useStore } from '../redux/store';
import PopUpAnimation from '../components/PopUpAnimation';
import { RootStackParamList } from '../../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';
import { useStripe} from '@stripe/stripe-react-native';

const PaymentList = [
  {
    name: 'Wallet',
    icon: 'icon',
    isIcon: true,
  },
  {
    name: 'Google Pay',
    icon: require('../assets/images/paymentMode/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Pay',
    icon: require('../assets/images/paymentMode/applepay.png'),
    isIcon: false,
  },
  {
    name: 'Amazon Pay',
    icon: require('../assets/images/paymentMode/amazonpay.png'),
    isIcon: false,
  },
];


type Props = NativeStackScreenProps<RootStackParamList, "Payment">;

const PaymentScreen: React.FC<Props> = ({ navigation, route }: any) => {
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const addToOrderHistoryListFromCart = useStore(
    (state: any) => state.addToOrderHistoryListFromCart,
  );
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { amount, rvcId, table }: any = route.params
  const [paymentMode, setPaymentMode] = useState('Credit Card');
  const [showAnimation, setShowAnimation] = useState(false);
  

  const handleOrder = async () => {
    try {
      const orderDto = { rvcId: rvcId }; // Adjust according to your needs
      const response = await axios.post(`http://192.168.1.135:8080/api/order/${table}`, orderDto);
      console.log("Order created", response.data);
      console.log("Order created", response.data.payment_url);
      /* if (response.data.payment_url) {
           // window.location.href=response.data.payment_url;
           Linking.openURL(response.data.payment_url);
       }
      //  navigate("Order",{tableId:table})
      const { paymentIntentClientSecret } = response.data;

      if (paymentIntentClientSecret) {
        // Initialize the PaymentSheet with the client secret
        await initPaymentSheet({
          paymentIntentClientSecret,
        });
      
        // Present the PaymentSheet
        const { error } = await presentPaymentSheet();
        if (error) {
          console.error("Payment failed", error);
        } else {
          // Navigate to OrderHistory on successful payment
         
          navigation.navigate("Order",{tableId:table})
        }
      }*/
      const paymentUrl = response.data.payment_url;
      const clientSecret = paymentUrl.split('_secret_')[1] ? `pi_${paymentUrl.split('_secret_')[0].split('pi_')[1]}_secret_${paymentUrl.split('_secret_')[1]}` : null;

      if (clientSecret) {
        // Initialize the PaymentSheet with the extracted client secret

        await initPaymentSheet({
          paymentIntentClientSecret: clientSecret,
          merchantDisplayName: "Your Merchant Name",
          googlePay: {
            // Provide the necessary Google Pay configuration
            currencyCode: 'USD',
            merchantCountryCode: 'US',
            testEnv:true,
            
          },
        });
        // Present the PaymentSheet
        const { error } = await presentPaymentSheet();
        if (error) {
          console.error("Payment failed", error);
          Alert.alert("Payment failed", error.message)
        } else {
          setShowAnimation(true);
          setTimeout(async () => {
            setShowAnimation(false);
            //navigation.navigate('Order', { tableId: table });
            // Clear cart after successful payment
            await axios.put(`http://192.168.1.135:8080/api/cart/clear/${table}`);
            // Navigate to OrderHistory on successful payment
            navigation.navigate("Order", { tableId: table });
          }, 2000);

        }
      }

    } catch (error) {
      console.error("Error creating order", error);
    }
  };

  const buttonPressHandler = () => {
    // setShowAnimation(true);
    handleOrder();
    // calculateCartPrice();
    /* setTimeout(() => {
       setShowAnimation(false);
       //navigation.navigate('Order', { tableId: table });
     }, 2000);*/
  };
  console.log("color 1", COLORS.primaryGreyHex);
  console.log("color 2", COLORS.primaryBlackHex);
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      {showAnimation ? (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require('../lottie/successful.json')}
        />
      ) : (
        <></>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View style={styles.HeaderContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <GradientBGIcon
              name="left"
              color={COLORS.primaryLightGreyHex}
              size={FONTSIZE.size_16}
            />
          </TouchableOpacity>
          <Text style={styles.HeaderText}>Payments</Text>
          <View style={styles.EmptyView} />
        </View>

        <View style={styles.PaymentOptionsContainer}>
          <TouchableOpacity
            onPress={() => {
              setPaymentMode('Credit Card');
            }}>
            <View
              style={[
                styles.CreditCardContainer,
                {
                  borderColor:
                    paymentMode == 'Credit Card'
                      ? COLORS.primaryOrangeHex
                      : COLORS.primaryGreyHex,
                },
              ]}>
              <Text style={styles.CreditCardTitle}>Credit Card</Text>
              <View style={styles.CreditCardBG}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.LinearGradientStyle}
                  colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
                  <View style={styles.CreditCardRow}>
                    <CustomIcon
                      name="chip"
                      size={FONTSIZE.size_20 * 2}
                      color={COLORS.primaryOrangeHex}
                    />
                    <CustomIcon
                      name="visa"
                      size={FONTSIZE.size_30 * 2}
                      color={COLORS.primaryWhiteHex}
                    />
                  </View>
                  <View style={styles.CreditCardNumberContainer}>
                    <Text style={styles.CreditCardNumber}>3879</Text>
                    <Text style={styles.CreditCardNumber}>8923</Text>
                    <Text style={styles.CreditCardNumber}>6745</Text>
                    <Text style={styles.CreditCardNumber}>4638</Text>
                  </View>
                  <View style={styles.CreditCardRow}>
                    <View style={styles.CreditCardNameContainer}>
                      <Text style={styles.CreditCardNameSubitle}>
                        Card Holder Name
                      </Text>
                      <Text style={styles.CreditCardNameTitle}>
                        Restaurant client
                      </Text>
                    </View>
                    <View style={styles.CreditCardDateContainer}>
                      <Text style={styles.CreditCardNameSubitle}>
                        Expiry Date
                      </Text>
                      <Text style={styles.CreditCardNameTitle}>02/30</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>
          {/*PaymentList.map((data: any) => (
            <TouchableOpacity
              key={data.name}
              onPress={() => {
                setPaymentMode(data.name);
              }}>
              <PaymentMethod
                paymentMode={paymentMode}
                name={data.name}
                icon={data.icon}
                isIcon={data.isIcon}
              />
            </TouchableOpacity>
          ))*/}
        </View>
      </ScrollView>

      <PaymentFooter
        buttonTitle={`Pay with ${paymentMode}`}
        price={amount}
        buttonPressHandler={buttonPressHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  LottieAnimation: {
    flex: 1,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  HeaderContainer: {
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  EmptyView: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
  PaymentOptionsContainer: {
    padding: SPACING.space_15,
    gap: SPACING.space_15,
  },
  CreditCardContainer: {
    padding: SPACING.space_10,
    gap: SPACING.space_10,
    borderRadius: BorderRadius.radius_15 * 2,
    borderWidth: 3,
  },
  CreditCardTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginLeft: SPACING.space_10,
  },
  CreditCardBG: {
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: BorderRadius.radius_25,
  },
  LinearGradientStyle: {
    borderRadius: BorderRadius.radius_25,
    gap: SPACING.space_36,
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_10,
  },
  CreditCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CreditCardNumberContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  CreditCardNumber: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
    letterSpacing: SPACING.space_4 + SPACING.space_2,
  },
  CreditCardNameSubitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  CreditCardNameTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  CreditCardNameContainer: {
    alignItems: 'flex-start',
  },
  CreditCardDateContainer: {
    alignItems: 'flex-end',
  },
});

export default PaymentScreen;
