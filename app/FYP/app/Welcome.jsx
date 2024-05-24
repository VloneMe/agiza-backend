import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native'
import React, { useState } from 'react'

import { Formik } from 'formik';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledTextInput,
    StyledInputLabel,
    LeftIcon,
    RightIcon,
    ButtonText,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
    StyledButton,
    Colors,
    WelcomeContainer,
    WelcomeImage,
    Avatar,
    } from '../components/styles';



    //import icons

    import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';


    //import colors
   // import { Colors } from './../components/styles';
// const { brand, darkLight, primary } = Colors;




const Welcome = () => {
    const [hidePassword, setHidePassword] = useState(true);

  return (
    <>
        <StatusBar style="dark" />
        <InnerContainer>
            <WelcomeImage resizeMode="cover" source={require("./../assets/image/img1.png")} />
            <WelcomeContainer>
                    <PageTitle welcome={true}>Welcome! Buddy</PageTitle>
                    <SubTitle welcome={true}>Rasuli Omari</SubTitle>
                    <SubTitle welcome={true}>rasuliomari4@gmail.com</SubTitle>
                <StyledFormArea>
                    <Avatar resizeMode="cover" source={require("./../assets/image/img1.png")} />    
                    <Line />
                    <StyledButton onPress={() => {}}>
                        <ButtonText>Logout</ButtonText>
                    </StyledButton>
                </StyledFormArea>

            </WelcomeContainer>
        </InnerContainer>
    </>
  )
}



export default Welcome;