import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native'
import React from 'react'

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    } from './../components/styles'


const Login = () => {
  return (
    <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
            <PageLogo resizeMode="cover" source={require("./../assets/image/img1.png")} />
            <PageTitle>aGIZA</PageTitle>
        </InnerContainer>
    </StyledContainer>
  )
}

export default Login