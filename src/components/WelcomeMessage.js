// WelcomeMessage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WelcomeMessage = () => {
  return (
    <View>
      <Text style={styles.title}>
        <Text style={styles.bold}>

        </Text>

        <Text style={styles.bold}></Text>
  
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    marginTop: 20,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default WelcomeMessage;
