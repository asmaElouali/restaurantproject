import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
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
        marginTop:'3%',
        justifyContent:'center'
    },
    menuCardItem: {
        width:wp('35%'),
        height:hp('27.5%'),
        backgroundColor:'green',
        margin:'7.5%',
        borderRadius:8,
        alignItems:'center',
        justifyContent: 'center',
    },
    menuCardItemTxt:{
        fontFamily:"OpenSans-Bold",
        fontSize:hp('1.75%'),
        color:'dark_grey',
        paddingTop:hp('2%'),
    }

})