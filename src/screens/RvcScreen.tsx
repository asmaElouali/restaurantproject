import React from 'react';
import { Animated, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import HeaderBar from '../components/HeaderBar';
import { COLORS } from '../theme/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const options = [
  <Text style={{color: COLORS.primaryBlackHex,fontSize:20,fontWeight: "bold"}}>Cancel</Text>,
  <Text style={{color: COLORS.primaryOrangeHex,fontSize:20,fontWeight: "bold"}}>1-OXF Restaurant</Text>,
  <Text style={{color: COLORS.primaryOrangeHex,fontSize:20,fontWeight: "bold"}}>2-OXF Counter</Text>,
  <Text style={{color: COLORS.primaryOrangeHex,fontSize:20,fontWeight: "bold"}}>3-OXF Bar</Text>,
  <Text style={{color: COLORS.primaryOrangeHex,fontSize:20,fontWeight: "bold"}}>4-OXF Coffee Shop</Text>,
  <Text style={{color: COLORS.primaryOrangeHex,fontSize:20,fontWeight: "bold"}}>5-OXF Sports Concessions</Text>,
  <Text style={{color: COLORS.primaryOrangeHex,fontSize:20,fontWeight: "bold"}}>6-OXF Sports Hospitality Box</Text>,
  <Text style={{color: COLORS.primaryOrangeHex,fontSize:20,fontWeight: "bold"}}>7-OXF Retail</Text>,
];

class RvcScreen extends React.Component {
  private actionSheet: ActionSheet | null = null;
  private scaleAnim = new Animated.Value(1);

  showActionSheet = () => {
    this.actionSheet?.show();
  };

  handlePressIn = () => {
    Animated.spring(this.scaleAnim, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };

  handlePressOut = () => {
    Animated.spring(this.scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start(this.showActionSheet);
  };

  render() {
    const animatedStyle = {
      transform: [{ scale: this.scaleAnim }],
    };
    const { navigation }:any = this.props;

    return (
      <View style={styles.ScreenContainer}>
        <StatusBar backgroundColor={COLORS.primaryBlackHex} />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
          <View style={styles.ScrollViewInnerView}>
            <View style={styles.ItemContainer}>
              <HeaderBar title="Revenue Center" />
              <View style={styles.centeredContainer}>
                <TouchableOpacity
                  onPressIn={this.handlePressIn}
                  onPressOut={this.handlePressOut}
                  style={styles.circleButton}>
                  <Animated.View style={[styles.circle, animatedStyle]}>
                    <Text style={styles.circleText}>RVC</Text>
                  </Animated.View>
                </TouchableOpacity>
              </View>
              <ActionSheet
                ref={(o: any) => (this.actionSheet = o)}
                title={<Text style={{ color: '#000', fontSize: 18 }}>Which one do you select?</Text>}
                options={options}
                cancelButtonIndex={0}
                destructiveButtonIndex={4}
                onPress={(index: number) => { navigation.push('Tab') }}
                styles={{
                  //titleBox: styles.titleBox,
                  messageBox: styles.messageBox,
                  optionsBox: styles.optionsBox,
                  //cancelButtonBox: styles.cancelButtonBox,
                  optionText: styles.optionText,
                  cancelButtonText: styles.cancelButtonText,
                  background: styles.background,
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 70,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  titleBox: {
    backgroundColor: '#f00', // Background color of the title box
  },
  messageBox: {
    backgroundColor: '#f00', // Background color of the message box
  },
  optionsBox: {
    backgroundColor: '#f00', // Background color of the options box
  },
  cancelButtonBox: {
    backgroundColor: '#f00', // Background color of the cancel button box
  },
  optionText: {
    color: '#fff', // Text color for options
  },
  cancelButtonText: {
    color: '#fff', // Text color for the cancel button
  },
  background: {
    backgroundColor: COLORS.primaryOrangeHex,
  }
});

export default RvcScreen;
