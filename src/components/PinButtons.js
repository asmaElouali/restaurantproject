import React from 'react';
import { View, Button, StyleSheet,Text } from 'react-native';

const PinButtons = ({ onPressChoose, onPressEnter, onPressClear }) => {
  return (
    <View style={styles.container}>
     <View style={styles.button}>
              <Text style={styles.title}>
                Click on this button to set your PIN.
              </Text>
              <Button
                onPress={onPressChoose}
                title="Set Pin"
              />
            </View>
            <View style={styles.seperator} />
            <View style={styles.button}>
              <Text style={styles.title}>
                Click on this button to enter your PIN.
              </Text>
              <Button
                onPress={onPressEnter}
                title="Enter Pin"
              />
            </View>
            <View style={styles.seperator} />
            <View style={styles.button}>
              <Text style={styles.title}>
                Click on this button to clear your PIN.
              </Text>
              <Button onPress={onPressClear} title="Clear Pin" />
            </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'col',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    marginBottom: 10,
    padding: 10,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    marginTop: 20,
  },
  bold: {
    fontWeight: "bold",
  },
  seperator: {
    margin: 10,
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

});

export default PinButtons;
