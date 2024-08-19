import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';

interface ProfilePicProp{
    rvc:any;
    tableId:any;
    firstname:any;
    lastname:any;
}
const ProfilePic: React.FC<ProfilePicProp> = ({rvc,tableId,firstname,lastname}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={()=> navigation.navigate("Setting",{rvcId:rvc,tableId:tableId,firstname:firstname,lastname:lastname})}>
            <View style={styles.ImageContainer}>
                <Image
                    source={require('../assets/images/setting.png')}
                    style={styles.Image}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    ImageContainer: {
        height: 40,
        width: 40,
        borderRadius: SPACING.space_8,
        borderWidth: 2,
        borderColor: COLORS.secondaryDarkGreyHex,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: COLORS.primaryDarkGreyHex,
    },
    Image: {
        height: SPACING.space_30,
        width: SPACING.space_30,
    },
});

export default ProfilePic;