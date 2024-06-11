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

    // const navigation = useNavigation();
  return (
    <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style="black" />
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require("./../assets/img1.png")} />
                <ExtraView>
                    <ExtraText>Ditch the stress of deliveries!
                    aGIZA puts the power in your hands.  Order pickups and deliveries with a few taps, track your parcels in real-time, and enjoy the peace of mind that comes with knowing your package is in good hands.  Stop wasting time waiting in lines or dealing with unreliable couriers. Download aGIZA today and experience a delivery revolution!</ExtraText>
                </ExtraView>
                <PageLogo resizeMode="cover" source={require("./../assets/image2.png")} />
                <ExtraView>
                    <ExtraText>Download aGIZA, your one-stop app for effortless parcel delivery! Get your packages picked up and delivered on your schedule, with real-time tracking and exclusive discounts. Whether you're a busy professional, a frequent online shopper, or just someone who values convenience, aGIZA makes your life easier. Sign up today and experience the future of delivery!</ExtraText>
                </ExtraView>
                <StyledButton>
                    <Link href="/Login">
                    <ButtonText>GET STARTED HERE</ButtonText>
                    </Link>
                 </StyledButton>
            </InnerContainer>
        </StyledContainer>  
    </KeyboardAvoidingWrapper>
    );
}
export default Layout
{/* <ExtraText>GET STARTED SEND AND RECEIVE YOUR PARCEL SAFETLY WITH US</ExtraText> */}