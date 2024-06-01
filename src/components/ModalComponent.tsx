import * as React from "react";
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Button } from "./Button";
import { Modal } from "./Modal";
import { COLORS, FONTSIZE, SPACING } from "../theme/theme";
import GradientBGIconProps from "./GradientBGIcon";
import Ionicons from "react-native-vector-icons/Ionicons";
const { width, height } = Dimensions.get("window");



const dialPadSize = width * 0.2;

export default function ModalScreen() {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isGuestModalVisible, setIsGuestModalVisible] = React.useState(false);

  const handleTableModal = () => setIsModalVisible(prev => !prev);
  const handleGuestModal = () => setIsGuestModalVisible(prev => !prev);

  const handleTableOkPress = () => {
    setIsModalVisible(false);
    setIsGuestModalVisible(true);
  };

  const handleGuestOkPress = () => {
    setIsGuestModalVisible(false);
  };

  return (
    <View style={styles.HeaderContainer}>
      <TouchableOpacity style={styles.customButton} onPress={handleTableModal}>
        <Text style={styles.buttonText}>Open Table</Text>
      </TouchableOpacity>

      {/* Guest Number Modal */}
      <Modal isVisible={isGuestModalVisible}>
        <Modal.Container>
          <Modal.Header title="Enter number of guest" icon="restaurant-outline" />
          <Modal.Body>
            <TextInput
              style={styles.input}
              placeholder="number of guest"
              placeholderTextColor="#888"
              keyboardType="numeric"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button title="Ok" color={COLORS.primaryWhiteHex}  backgroundcolor={COLORS.primaryOrangeHex} onPress={handleGuestOkPress}/>
            <View style={styles.spacer} />
            <Button title="Cancel" color={COLORS.primaryOrangeHex}  backgroundcolor={COLORS.primaryWhiteHex} onPress={handleGuestOkPress}/>
          </Modal.Footer>
        </Modal.Container>
      </Modal>

      {/* Table Number Modal */}
      <Modal isVisible={isModalVisible}>
        <Modal.Container>
          <Modal.Header title="Enter table number" icon="logo-tableau" />
          <Modal.Body>
            <TextInput
              style={styles.input}
              placeholder="number of table"
              placeholderTextColor="#888"
              keyboardType="numeric"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button title="Ok" color={COLORS.primaryWhiteHex} onPress={handleTableOkPress} backgroundcolor={COLORS.primaryOrangeHex}/>
            <View style={styles.spacer} />
            <Button title="Cancel" color={COLORS.primaryOrangeHex} onPress={handleTableOkPress} backgroundcolor={COLORS.primaryWhiteHex} />
          </Modal.Footer>
        </Modal.Container>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  HeaderContainer: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  /*input: {
    paddingTop: 10,
    borderColor: "grey",
    borderBottomWidth: 2,
  },*/
  footer: {
    backgroundColor: COLORS.primaryOrangeHex, // Change this to your desired color
    padding: 10,
    alignItems: 'center',
  },
  customButton: {
    backgroundColor: COLORS.primaryOrangeHex, // Example color
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16, // Adjust as needed
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 10,
    marginTop: 30,
    borderWidth: 1, // Sets the border width
    borderColor: COLORS.primaryOrangeHex, // Sets the border color
    borderRadius: 5, // Optional: Adds rounded corners
    color: "#fff"
  },
  spacer: {
    width: 10, // Ajustez cette valeur pour obtenir l'espace désiré
  },
});
