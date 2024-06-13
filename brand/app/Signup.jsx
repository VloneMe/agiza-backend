import { StatusBar } from 'expo-status-bar';
import { View, Text, Touchable, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
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
    const [isSelected, setSelection] = useState(false);

  return (
    <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                {/* <PageLogo resizeMode="cover" source={require("./../assets/image/img1.png")} /> */}
                <PageTitle>aGIZA</PageTitle>
                <SubTitle>Account Signup</SubTitle>
                <Formik 
                    initialValues={{ fullName: '', email: '', PhoneNumber: '', password: '', confirmPassword: '', isSelected: false }}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, setFieldValue, values}) => (<StyledFormArea>
                        <MyTextInput 
                            label="Full Name"
                            icon="person"
                            placeholder="Omari Rasuli"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('fullName')}
                            onBlur={handleBlur('fullName')}
                            value={values.fullName}
                        />
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
                            label="Phone Number"
                            icon="plus"
                            placeholder="+255 657707046"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('PhoneNumber')}
                            onBlur={handleBlur('PhoneNumber')}
                            value={values.PhoneNumber}
                        />
                        <MyTextInput 
                            label="Password"
                            icon="lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />
                        <MyTextInput 
                            label="Confirm Password"
                            icon="lock"
                            placeholder="* * * * * * * *"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />
                        <View style={styles.checkboxContainer}>
                            <Checkbox
                            value={values.isSelected}
                            onValueChange={(value) => setFieldValue('isSelected', value)}
                            style={styles.checkbox}
                            />
                             <Text style={styles.label}>Are you a Driver?</Text>
                         </View>
                             <Text>If yes select the checkbox above: {values.isSelected ? '👍' : '👎'}</Text>
                        <MsgBox>...</MsgBox>
                        <StyledButton onPress={handleSubmit}>
                            <ButtonText>Submit</ButtonText>
                        </StyledButton>
                        <Line />
                        <ExtraView>
                            <ExtraText>Already have an account? </ExtraText>
                            <TextLink>
                                <TextLinkContent><Link href="/Login">Login</Link></TextLinkContent>
                            </TextLink>
                        </ExtraView>
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
                    <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    checkboxContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: 'center',
    },
    label: {
      margin: 8,
    },
  });

export default Signup