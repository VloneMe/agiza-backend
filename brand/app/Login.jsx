import { StatusBar } from 'expo-status-bar';
import { View, Text, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'

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



    //import icons

    import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';
    import axios from 'axios';


    //import colors
   // import { Colors } from './../components/styles';
const { brand, darkLight, primary } = Colors;


// keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const Login = () => {
    const router = useRouter();
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleLogin = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = 'http://192.168.1.164:4000/api/users/login';

        axios
        .post(url, credentials)
        .then((response) => {
            const result = response.data;
            const { status, message, data } = result;

            if (status !== 'SUCCESS') {
                handleMessage(message, status);
                router.push('/Welcome');
            } else {
                navigation.navigate('Welcome', { ...data[0] });
            }
            setSubmitting(false);
        })
        .catch((error) => {
            console.log(error.toJSON());
            setSubmitting(false);
            handleMessage('An error occurred. Please try again');
        })
    }
    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

  return (
    <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require("./../assets/img1.png")} />
                <PageTitle>aGIZA</PageTitle>
                <SubTitle>Account Login</SubTitle>
                <Formik 
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values, {setSubmitting}) => {
                        if (values.email == '' || values.password == '') {
                            handleMessage('Please fill all the fields');
                            setSubmitting(false);
                        }else {
                            handleLogin(values, setSubmitting);
                        }
                    }}
                >
                    {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                        <StyledFormArea>
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
                            secureTextEntry={hidePassword}
                            isPassword={true}
                            hidePassword={hidePassword}
                            setHidePassword={setHidePassword}
                        />
                        <MsgBox type={messageType}>{message}</MsgBox>
                        {!isSubmitting && <StyledButton onPress={handleSubmit}>
                            <ButtonText>Login</ButtonText>
                        </StyledButton>}
                        
                        {isSubmitting && <StyledButton disabled={true}>
                            <ActivityIndicator size="large" color={primary} />
                        </StyledButton>}

                        <Line />
                        <ExtraView>
                            <ExtraText>Don't have an account already? </ExtraText>
                            <TextLink>
                                <TextLinkContent>
                                <Link href="/Signup">Signup</Link>
                                </TextLinkContent>
                            </TextLink>
                        </ExtraView>
                    </StyledFormArea>)}

                </Formik>
            </InnerContainer>
        </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
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

export default Login

// import { StatusBar } from 'expo-status-bar';
// import { View, Text, ActivityIndicator, Alert } from 'react-native';
// import React, { useState } from 'react';
// import { Formik } from 'formik';
// import { Link, useRouter } from 'expo-router';
// import {
//   StyledContainer,
//   InnerContainer,
//   PageLogo,
//   PageTitle,
//   SubTitle,
//   StyledFormArea,
//   StyledTextInput,
//   StyledInputLabel,
//   LeftIcon,
//   RightIcon,
//   ButtonText,
//   MsgBox,
//   Line,
//   ExtraView,
//   ExtraText,
//   TextLink,
//   TextLinkContent,
//   StyledButton,
//   Colors,
// } from '../components/styles';

// // Import icons
// import { Octicons, Ionicons } from '@expo/vector-icons';
// import axios from 'axios';

// // Import colors
// const { brand, darkLight, primary } = Colors;

// // Keyboard avoiding view
// import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

// const Login = () => {
//   const router = useRouter();
//   const [hidePassword, setHidePassword] = useState(true);
//   const [message, setMessage] = useState();
//   const [messageType, setMessageType] = useState();

//   const handleLogin = async (credentials, setSubmitting) => {
//     handleMessage(null);
//     const url = 'http://192.168.1.165:4000/api/users/login';

//     try {
//       const response = await axios.post(url, credentials);
//       const result = response.data;
//       const { status, message, data } = result;

//       if (status !== 'SUCCESS') {
//         handleMessage(message, status);
//       } else {
//         const userRole = data[0].role; // Assuming the role is in the first element of the data array

//         if (userRole === 'customer') {
//           router.push('/Welcome');
//         } else if (userRole === 'courier') {
//           router.push('/Driver');
//         } else {
//           handleMessage('Unknown user role', 'FAILED');
//         }
//       }
//       setSubmitting(false);
//     } catch (error) {
//       console.log('Error:', error); // Log the error object
//       setSubmitting(false);
//       handleMessage('An error occurred. Please try again');
//     }
//   };

//   const handleMessage = (message, type = 'FAILED') => {
//     setMessage(message);
//     setMessageType(type);
//   };

//   return (
//     <KeyboardAvoidingWrapper>
//       <StyledContainer>
//         <StatusBar style="dark" />
//         <InnerContainer>
//           <PageLogo resizeMode="cover" source={require('./../assets/img1.png')} />
//           <PageTitle>aGIZA</PageTitle>
//           <SubTitle>Account Login</SubTitle>
//           <Formik
//             initialValues={{ email: '', password: '' }}
//             onSubmit={(values, { setSubmitting }) => {
//               if (values.email === '' || values.password === '') {
//                 handleMessage('Please fill all the fields');
//                 setSubmitting(false);
//               } else {
//                 handleLogin(values, setSubmitting);
//               }
//             }}
//           >
//             {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
//               <StyledFormArea>
//                 <MyTextInput
//                   label="Email Address"
//                   icon="mail"
//                   placeholder="rasuliomari4@gmail.com"
//                   placeholderTextColor={darkLight}
//                   onChangeText={handleChange('email')}
//                   onBlur={handleBlur('email')}
//                   value={values.email}
//                   keyboardType="email-address"
//                 />
//                 <MyTextInput
//                   label="Password"
//                   icon="lock"
//                   placeholder="* * * * * * * *"
//                   placeholderTextColor={darkLight}
//                   onChangeText={handleChange('password')}
//                   onBlur={handleBlur('password')}
//                   value={values.password}
//                   secureTextEntry={hidePassword}
//                   isPassword={true}
//                   hidePassword={hidePassword}
//                   setHidePassword={setHidePassword}
//                 />
//                 <MsgBox type={messageType}>{message}</MsgBox>
//                 {!isSubmitting && (
//                   <StyledButton onPress={handleSubmit}>
//                     <ButtonText>Login</ButtonText>
//                   </StyledButton>
//                 )}

//                 {isSubmitting && (
//                   <StyledButton disabled={true}>
//                     <ActivityIndicator size="large" color={primary} />
//                   </StyledButton>
//                 )}

//                 <Line />
//                 <ExtraView>
//                   <ExtraText>Don't have an account already? </ExtraText>
//                   <TextLink>
//                     <TextLinkContent>
//                       <Link href="/Signup">Signup</Link>
//                     </TextLinkContent>
//                   </TextLink>
//                 </ExtraView>
//               </StyledFormArea>
//             )}
//           </Formik>
//         </InnerContainer>
//       </StyledContainer>
//     </KeyboardAvoidingWrapper>
//   );
// };

// const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
//   return (
//     <View>
//       <LeftIcon>
//         <Octicons name={icon} size={30} color={brand} />
//       </LeftIcon>
//       <StyledInputLabel>{label}</StyledInputLabel>
//       <StyledTextInput {...props} />
//       {isPassword && (
//         <RightIcon onPress={() => setHidePassword(!hidePassword)}>
//           <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={darkLight} />
//         </RightIcon>
//       )}
//     </View>
//   );
// };

// export default Login;