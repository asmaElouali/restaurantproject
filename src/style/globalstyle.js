import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { COLORS, FONTFAMILY } from "../theme/theme";


export const global_styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: 'white' ,
    },
    headingTxt: {
        color:'brown',
        fontSize:hp('4%'),
        fontFamily:"Oxygen-Bold",
        letterSpacing:2.5,   
    },
    headerView: {
        flexDirection:'row',
        justifyContent:'space-between',
        padding:'3%'
    },
    hamburgerImage: {
           aspectRatio:1.45,
           height:undefined,
           width:"10%",
           overflow:'visible',
           alignSelf:'center'
    },
    mainMenuView: {
        width: '100%',
        height:'5%',
        paddingLeft:'3%',
        justifyContent:'center'
    },
    horizontalScroll: {
       // width:'100%',
       // backgroundColor: 'grey'
       overflow:'visible'
    },
    mainMenuTxt: {
        alignSelf:'center',
        fontFamily:'OpenSans-Regular',
        color:'light_grey',
        fontSize:hp('2%'),
    },
    mainMenuTxtSelectedView:{
        borderBottomColor:'brown',
        borderBottomWidth:1,
        marginLeft:'3.5%'
    },
    mainMenuTxtView:{
        paddingLeft:'3.5%'
    },
    menuFlatList: {
        width:'100%',
        height:'100%',
        flex:1,
        flexDirection:'row',
        marginTop:'1%',
        justifyContent:'center'
    },
    menuCardItem: {
        width:wp('44%'),
        height:hp('19%'),
        backgroundColor:COLORS.primaryOrangeHex,
        margin:'2.8%',
        borderRadius:8,
        alignItems:'center',
        justifyContent: 'center',
    },
    menuCardItemTxt:{
        fontFamily:FONTFAMILY.poppins_extrabold,
        fontSize:hp('2.75%'),
        color:COLORS.primaryBlackHex,
        paddingTop:hp('2%'),
    },
    ScreenContainer:{
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
    },
   
})