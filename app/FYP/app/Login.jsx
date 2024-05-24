import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native'
import React from 'react'

import { Formik } from 'formik';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    } from './../components/styles'


const Login = () => {
  return (
    <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
            <PageLogo resizeMode="cover" source={require("./../assets/image/img1.png")} />
            <PageTitle>aGIZA</PageTitle>
            <SubTitle>Account Login</SubTitle>
            <Formik 
                initialValues={{ email: '', password: '' }}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({handleChange, handleBlur, handleSubmit, values})} => <StyledFormArea></StyledFormArea>

            </Formik>
        </InnerContainer>
    </StyledContainer>
  )
}

export default Login