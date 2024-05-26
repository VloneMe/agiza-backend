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
                <PageLogo resizeMode="cover" source={require("../assets/image/image2.png")} />
                <ExtraView>
                    <ExtraText>GET STARTED SEND AND RECEIVE YOUR PARCEL SAFETLY WITH US</ExtraText>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingBottom: 30,
    },
    header: {
        backgroundColor: Colors.blue,
        paddingTop: parameters.statusBarHeight,
        height: parameters.headerHeight,
        alignItems: 'flex-start',
    },
    image1: {
        width: 100,
        height: 100,
    },
    image2: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    home: {
        backgroundColor: Colors.blue,
        paddingLeft: 20,
    },
    text1: {
        color: Colors.white,
        fontSize: 21,
        paddingBottom: 20,
        paddingTop: 20,
    },
    text2: {
        color: Colors.white,
        fontSize: 16,
    },
    View1: {
        flexDirection: 'row',
        flex: 1,
        paddingTop: 20,
    },
    button1: {
        backgroundColor: Colors.black,
        width: 150,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    button1text: {
        color: Colors.white,
        fontSize: 17,
        marginTop: -2,
    },
    card: {
        alignItems: 'center',
        margin: SCREEN_WIDTH/22,
    },
    view2: {
        marginBottom: 5,
        borderRadius: 15,
        backgroundColor: Colors.grey6,
    },
    title: {
        color: Colors.black,
        fontSize: 16,
    },
    view3: {
        flexDirection: 'row',
        marginTop: 5,
        backgroundColor: Colors.grey6,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 15,
    },
    text3: {
        color: Colors.black,
        fontSize: 20,
        marginLeft: 15,
    },
    view4: {
        flexDirection: 'row',
        marginRight: 15,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'space-between',
        parddingHorizontal: 10,
        parddingVertical: 2,
        borderRadius: 20,
    },
    view5: {
        flexDirection: 'row',
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'space-between',
        parddingVertical: 25,
        marginHorizontal: 15,
        borderbottomWidth: 1,
        borderBottomColor: Colors.grey4,
        flex: 1,
    },
    view6: {
        alignItems: 'center',
        flex: 5,
        flexDirection: 'row',
    },  
    view7: {
        backgroundColor: Colors.grey6,
        height: 40,
        width: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
    },
    map: {
        height: 150,
        marginvertical: 0,
        width: SCREEN_WIDTH*0.92,
    },
    text4: {
        color: Colors.black,
        marginLeft: 20,
        fontSize: 20,
        marginBottom: 20,
    },
    icon1: {
        marginTop: 5,
    },
    view8: {
        marginTop: -25,
        marginLeft: 10,
    },
    carsAround: {
        width: 28,
        height: 14,
    },
    location: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: Colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
    },
    view9: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: white,
    },

})