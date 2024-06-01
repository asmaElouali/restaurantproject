import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RNCamera } from "react-native-camera";
import QRCodeScanner from "react-native-qrcode-scanner";

const Scanner = ({navigation}:any) => {
    const [data, Setdata] = useState('scan something')
    return (
        <QRCodeScanner
            onRead={({ data }) => Setdata(data)}
            flashMode={RNCamera.Constants.FlashMode.torch}
            reactivate={true}
            reactivateTimeout={500}
            showMarker={true}
            topContent={
                <View>
                    <Text style={styles.content}>{data}</Text>
                </View>
            }
            bottomContent={
                <View>
                    <Text>Qr Code Scanner</Text>
                </View>
            }
        />
    );
}
const styles = StyleSheet.create({
    content: {
        color: 'black',
        padding: 20,
        fontSize: 20,
        backgroundColor: 'grey',
        margin: 10
    }
})
export default Scanner;