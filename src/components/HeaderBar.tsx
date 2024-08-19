import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import GradientBGIconProps from './GradientBGIcon';
import ProfilePic from './ProfilePic';
import { Screen } from 'react-native-screens';


interface HeaderBarProps {
    title?: string;
    name: string;
    BackHandler?: any;
    Screen?: any;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ title, name ,BackHandler,Screen}) => {
    return (
        <View style={styles.HeaderContainer}>
            <TouchableOpacity onPress={()=> BackHandler(name)}>
                <GradientBGIconProps name={name} color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />
            </TouchableOpacity>
            <Text style={styles.HeaderText}>{title}</Text>
            {Screen}
        </View>
    )
}
const styles = StyleSheet.create({
    HeaderContainer: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    HeaderText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryWhiteHex,
    },
});
export default HeaderBar;