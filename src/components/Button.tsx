import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../theme/theme";
export type ButtonProps = {
  title: string;
  backgroundcolor?: string;
  color?:string;
  onPress: () => void;
};
export const Button = ({ title, onPress,backgroundcolor,color }: ButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: backgroundcolor || COLORS.primaryOrangeHex }]} onPress={onPress}>
      <Text style={[styles.text,{color:color}]}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    //backgroundColor: COLORS.primaryOrangeHex,
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 13,
    width: "60%",
    alignItems: "center",
  },
  text: {
    fontWeight: "700",
    fontSize: 18,
  },
});