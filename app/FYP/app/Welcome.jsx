import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React from 'react'
// import { Icons } from 'react-native-elements'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
const SCREEN_WIDTH = Dimensions.get('window').width;

import { Colors, parameters } from '../components/global/styles';
// import { Clors } from '../components/styles'
import Constants from 'expo-constants';
const { buttons, grey, grey1, grey2, grey3, grey4, grey5, grey6, grey7, grey10, CardComment, cardbackground, statusbar, heaherText, lightgreen, blue, black, white, darkBlue, pagebackground } = Colors;
const statusBarHeight = Constants.statusBarHeight;


const Welcome = () => {
  return (
    <View style={styles.container}>
      <View styles={styles.header}></View>
        <View style={styles.icon1}>
            <Icon 
                type = "material-community"
                name = "menu"
                color = {Colors.white}
                size = {40}
            />
        </View>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.white,
        paddingBottom:30,
        paddingTop:parameters.statusBarHeight
    },
    header:{
      backgroundColor:blue,
      height:parameters.headerHeight,
      alignItems:"flex-start"
     
    },
    
    image1:{
     
      height:100,
      width:100,
    
    },
    
    image2:{height:60,width:60,
            borderRadius:30,
          },
    
    home:{
     backgroundColor:Colors.blue,
     paddingLeft:20,
     
    },
    
    text1:{
     color:Colors.white,
     fontSize:21,
     paddingBottom:20,
     paddingTop:20
    },
    
    text2:{
     color:Colors.white,
     fontSize:16
    },
    
    view1:{
     flexDirection:"row",
     flex:1,
     paddingTop:30
    },
    
    button1:{
      height:40,
      width:150,
      backgroundColor:Colors.black,
      borderRadius:20,
      alignItems:"center",
      justifyContent:"center",
      marginTop:20
    },
    
    button1Text:{
     color:Colors.white,
     fontSize:17,
     marginTop:-2
    
    },
    card:{
     alignItems:"center",
     margin:SCREEN_WIDTH/22
    
    },
    
    view2:{marginBottom:5,
          borderRadius:15,
          backgroundColor:Colors.grey6
        },
    
        title:{
          color:Colors.black,
          fontSize:16
        },
    view3:{flexDirection:"row",
             marginTop :5,
             height:50,
             backgroundColor:Colors.grey6,
             alignItems:"center",
             justifyContent:"space-between",
            marginHorizontal:15
            
             },
    text3:{marginLeft:15,
            fontSize:20,
            color:Colors.black
      },
    
    view4:{ flexDirection:"row",
            alignItems:"center",
            marginRight:15,
            backgroundColor:"white",
            paddingHorizontal:10,
            paddingVertical:2,
            borderRadius:20
            },
    
    view5:{ flexDirection:"row",
    alignItems:"center",
    backgroundColor:"white",
    paddingVertical:25,
    justifyContent:"space-between",
    marginHorizontal:15,
    borderBottomColor:Colors.grey4,
    borderBottomWidth:1,
    flex:1
    },
    
    view6:{
    
    
    alignItems:"center",
    flex:5,
    flexDirection:"row"
    },
    view7:{
    backgroundColor:Colors.grey6,
    height:40,
    width:40,
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center",
    marginRight:20
    
    },
    
    map:{
       
    height: 150,
     marginVertical: 0,
     width:SCREEN_WIDTH*0.92
    },
    
    text4:{ fontSize:20,
          color:Colors.black,
          marginLeft:20,
          marginBottom:20
        },
    
    icon1:  {marginLeft:10,
           marginTop:5
          },

    view8: {flex:4,
          marginTop:-25
        } ,
    carsAround: {
    width: 28,
    height: 14,
    
    }, 
    
    location: {
      width: 16,
      height: 16,
      borderRadius:8,
      backgroundColor:Colors.blue,
      alignItems:"center",
      justifyContent:"center"
      
      }, 
      
    view9:{width:4,
    height:4,
    borderRadius:2,
    backgroundColor:"white"
    }


})


// import { StatusBar } from 'expo-status-bar';
// import { View, Text } from 'react-native'
// import React, { useState } from 'react'

// import { Formik } from 'formik';

// import {
//     StyledContainer,
//     InnerContainer,
//     PageLogo,
//     PageTitle,
//     SubTitle,
//     StyledFormArea,
//     StyledTextInput,
//     StyledInputLabel,
//     LeftIcon,
//     RightIcon,
//     ButtonText,
//     MsgBox,
//     Line,
//     ExtraView,
//     ExtraText,
//     TextLink,
//     TextLinkContent,
//     StyledButton,
//     Colors,
//     WelcomeContainer,
//     WelcomeImage,
//     Avatar,
//     } from '../components/styles';



// //import icons
// import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';


// const Welcome = () => {
//     const [hidePassword, setHidePassword] = useState(true);

//   return (
//     <>
//         <StatusBar style="dark" />
//         <InnerContainer>
//             <WelcomeImage resizeMode="cover" source={require("./../assets/image/aGIZA.jpeg")} />
//             <WelcomeContainer>
//                     <PageTitle welcome={true}>Welcome! Buddy</PageTitle>
//                     <SubTitle welcome={true}>Rasuli Omari</SubTitle>
//                     <SubTitle welcome={true}>rasuliomari4@gmail.com</SubTitle>
//                 <StyledFormArea>
//                     <Avatar resizeMode="cover" source={require("./../assets/image/img1.png")} />    
//                     <Line />
//                     <StyledButton onPress={() => {}}>
//                         <ButtonText>Logout</ButtonText>
//                     </StyledButton>
//                 </StyledFormArea>

//             </WelcomeContainer>
//         </InnerContainer>
//     </>
//   )
// }

// export default Welcome;