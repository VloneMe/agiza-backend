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
    StyledTextInput,
    StyledInputLabel,
    LeftIcon,
    RightIcon,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
    Colors,
    } from './../components/styles';



    //import icons

    import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';


    //import colors
   // import { Colors } from './../components/styles';
const { brand, darkLight } = Colors;




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
                {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                    <MyTextInput 
                        label="Email Address"
                        icon="mail"
                        placeholder="rasuliomari4@gmail.com"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType="email-address"
                    />
                    <MyTextInput 
                        label="Password"
                        icon="lock"
                        placeholder="* * * * * * * *"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry={true}
                        isPassword={true}
                        hidePassword={true}
                        setHidePassword={true}
                    />
                </StyledFormArea>)}

            </Formik>
        </InnerContainer>
    </StyledContainer>
  )
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )
}

export default Login