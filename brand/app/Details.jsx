import { StatusBar } from 'expo-status-bar';
import { View, Text, Touchable } from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';



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
    } from '../components/styles';



    //import icons

    import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';


    //import colors
   // import { Colors } from './../components/styles';
const { brand, darkLight, primary } = Colors;


// keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const Signup = () => {
    const [hidePassword, setHidePassword] = useState(true);

  return (
    <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageTitle>aGIZA</PageTitle>
                <SubTitle>Parcel Details </SubTitle>
                <Formik 
                    initialValues={{ fullName: '', addres: '', PhoneNumber: '', Details: '', Inside: ''}}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                        <MyTextInput 
                            label="Full Name of Receiver of the Parcel"
                            icon="person"
                            placeholder="Mokaka Mogasa"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('fullName')}
                            onBlur={handleBlur('fullName')}
                            value={values.fullName}
                        />
                        <MyTextInput 
                            label="Street Address"
                            icon="location"
                            placeholder="Kijitonyama"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('addres')}
                            onBlur={handleBlur('addres')}
                            value={values.addres}
                            keyboardType="addres-address"
                        />
                        <MyTextInput 
                            label="Phone Number"
                            icon="plus"
                            placeholder="+255 657707046"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('PhoneNumber')}
                            onBlur={handleBlur('PhoneNumber')}
                            value={values.PhoneNumber}
                        />
                        <MyTextInput 
                            label="Decription of the Parcel"
                            icon="mail"
                            placeholder="Small Box or Envelope or Bag or Other"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('Detail')}
                            onBlur={handleBlur('Detail')}
                            value={values.Detail}
                        />
                        <MyTextInput 
                            label="What is inside the Parcel"
                            icon="info"
                            placeholder="Describe anythig inside the parcel"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('Inside')}
                            onBlur={handleBlur('Inside')}
                            value={values.Inside}
                        />
                        <MsgBox>.....</MsgBox>
                        <MsgBox>....</MsgBox>
                        <MsgBox>..</MsgBox>
                        <MsgBox>.</MsgBox>
                        <StyledButton onPress={handleSubmit}>
                            <Link href='Destination'><ButtonText>Next</ButtonText></Link>
                        </StyledButton>
                    </StyledFormArea>)}

                </Formik>
            </InnerContainer>
        </StyledContainer>
    </KeyboardAvoidingWrapper>
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

export default Signup