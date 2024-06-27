import { StatusBar } from 'expo-status-bar';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { Formik } from 'formik';
import { Link, useRouter } from 'expo-router';
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
import { Octicons, Ionicons } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import { UserContext } from '../context/UserContext';
import {jwtDecode} from 'jwt-decode';
import { API_BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userDataHook } from '../hook/userDataHook';

const { brand, darkLight, primary } = Colors;

const Login = () => {
    const router = useRouter();
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const { userInfo, setUserInfo } = useContext(UserContext);
    const { userData } = userDataHook();

    const handleLogin = async (credentials, setSubmitting) => {
        handleMessage(null);
const url = `${API_BASE_URL}/api/users/login`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                handleMessage(errorData.message || 'Login failed', 'FAILED');
                return;
            }

            const { token } = await response.json();

            if (!token) {
                handleMessage('Invalid response from server', 'FAILED');
                return;
            }

            await AsyncStorage.setItem("token", token);

            if (userData.role === 'customer') {
                router.push('/Welcome');
            } else if (userData.role === 'courier'  ) {
                router.push('/Driver');
            } else {
                router.push('/Admin');
            }

        } catch (error) {
            console.error("An error occurred:", error);
            handleMessage('An error occurred. Please try again', 'FAILED');
        } finally {
            setSubmitting(false);
        }
    };

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    };

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageLogo resizeMode="cover" source={require("../assets/img1.png")} />
                    <PageTitle>aGIZA</PageTitle>
                    <SubTitle>Account Login</SubTitle>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values, { setSubmitting }) => {
                            if (values.email === '' || values.password === '') {
                                handleMessage('Please fill all the fields');
                                setSubmitting(false);
                            } else {
                                handleLogin(values, setSubmitting);
                            }
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                            <StyledFormArea>
                                <MyTextInput
                                    label="Email Address"
                                    icon="mail"
                                    placeholder="example@example.com"
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
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                <MsgBox type={messageType}>{message}</MsgBox>
                                {!isSubmitting && (
                                    <StyledButton onPress={handleSubmit}>
                                        <ButtonText>Login</ButtonText>
                                    </StyledButton>
                                )}
                                {isSubmitting && (
                                    <StyledButton disabled={true}>
                                        <ActivityIndicator size="large" color={primary} />
                                    </StyledButton>
                                )}
                                <Line />
                                <ExtraView>
                                    <ExtraText>Don't have an account already? </ExtraText>
                                    <TextLink>
                                        <TextLinkContent>
                                            <Link href="/Signup">Signup</Link>
                                        </TextLinkContent>
                                    </TextLink>
                                </ExtraView>
                            </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
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
    );
};

export default Login;