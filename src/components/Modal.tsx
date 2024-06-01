import React from "react";
import { StyleSheet, View, Text, Button, Dimensions } from "react-native";
import RNModal from "react-native-modal";
import { COLORS } from "../theme/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
const { width, height } = Dimensions.get("window");



const dialPadSize = width * 0.2;
type ModalProps = {
  isVisible: boolean;
  children: React.ReactNode;
  [x: string]: any;
};
export const Modal = ({
  isVisible = false,
  children,
  ...props
}: ModalProps) => {
  return (
    <RNModal
      isVisible={isVisible}
      animationInTiming={1000}
      animationOutTiming={1000}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      {...props}>
      {children}
    </RNModal>
  );
};

const ModalContainer = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.container}>{children}</View>
);

const ModalHeader = ({ title, icon }: { title: string; icon: string }) => (
  <View style={styles.header}>
     <Ionicons
            name={icon}
            size={dialPadSize / 2}
            color={COLORS.primaryOrangeHex}
          />
    <Text style={styles.text}>{title}</Text>
  </View>
);

const ModalBody = ({ children }: { children?: React.ReactNode }) => (
  <View style={styles.body}>{children}</View>
);

const ModalFooter = ({ children }: { children?: React.ReactNode }) => (
  <View style={styles.footer}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryBlackHex,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.primaryOrangeHex,
    borderStyle: "solid",
  },
  header: {
    marginTop:20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    paddingTop: 20,
    textAlign: "center",
    fontSize: 24,
    color:COLORS.primaryOrangeHex
  },
  body: {
    justifyContent: "center",
    paddingHorizontal: 15,
    minHeight: 10,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 70,
    flexDirection: "row",
  },
});

Modal.Header = ModalHeader;
Modal.Container = ModalContainer;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;