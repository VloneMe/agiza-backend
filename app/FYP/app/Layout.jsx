import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native'
import React, { useState } from 'react'

import { Formik } from 'formik';
import { Link } from 'expo-router';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    ButtonText,
    ExtraView,
    ExtraText,
    StyledButton,
    Colors,
    } from '../components/styles';

//import icons
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';

//import colors
const { brand, darkLight, primary } = Colors;

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const Layout = () => {


  return (
    <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style="black" />
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require("./../assets/image/img1.png")} />
                <ExtraView>
                    <ExtraText>GET STARTED SEND AND RECEIVE YOUR PARCEL SAFETLY WITH US</ExtraText>
                </ExtraView>
                <ExtraView>
                    <ExtraText>ONGEZENI MANENO YAKUVUTIA ILI MTUMIAJI AVUTIWE KUITUMIA MANENO SINA YAKUVUTIA MPAKA SASAA </ExtraText>
                </ExtraView>
                <PageLogo resizeMode="cover" source={require("../assets/image/image2.png")} />
                <ExtraView>
                    <ExtraText>GET STARTED SEND AND RECEIVE YOUR PARCEL SAFETLY WITH US</ExtraText>
                </ExtraView>
                <ExtraView>
                    <ExtraText>ONGEZENI MANENO YAKUVUTIA ILI MTUMIAJI AVUTIWE KUITUMIA MANENO SINA YAKUVUTIA MPAKA SASAA </ExtraText>
                </ExtraView>
                <StyledButton>
                    <ButtonText><Link href="/Login">GET STARTED HERE</Link></ButtonText>
                 </StyledButton>
            </InnerContainer>
        </StyledContainer>  
    </KeyboardAvoidingWrapper>
    );
}
export default Layout
