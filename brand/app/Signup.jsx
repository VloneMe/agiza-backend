import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  StyledContainer,
  InnerContainer,
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
import { Picker } from '@react-native-picker/picker';

const { brand, darkLight, primary } = Colors;

// Validation schema
const validationSchema = Yup.object().shape({
  username: Yup.string().min(4, 'Username must be at least 4 characters long').required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().min(5, 'Phone Number must be at least 5 digits').required('Phone Number is required'),
  password: Yup.string().min(3, 'Password must be at least 3 characters long').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  role: Yup.string().required('Role is required'),
});

const Signup = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const router = useRouter(); // Initialize the router

  const handleSubmit = async (values) => {
    const userData = {
      username: values.username,
      email: values.email,
      phone: values.phone,
      password: values.password,
      role: values.role,
    };

    // Log the URL and user data to debug
    const url = 'http://192.168.252.127:4000/api/users/register'; // replace with your local IP
    console.log('Sending request to:', url);
    console.log('User data:', userData);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('User registered successfully');
        router.push('/Login'); // Redirect to login screen
      } else {
        Alert.alert('User registration failed', data.message || 'Error');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Network error. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle>aGIZA</PageTitle>
          <SubTitle>Account Signup</SubTitle>
          <Formik
            initialValues={{ username: '', email: '', phone: '', password: '', confirmPassword: '', role: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Full Name"
                  icon="person"
                  placeholder="Omari Rasuli"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />
                {touched.username && errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

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
                {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <MyTextInput
                  label="Phone Number"
                  icon="device-mobile"
                  placeholder="+255 657707046"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                />
                {touched.phone && errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

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
                {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

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
                {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                <StyledInputLabel>Role</StyledInputLabel>
                <Picker
                  selectedValue={values.role}
                  onValueChange={(itemValue) => setFieldValue('role', itemValue)}
                  style={{ height: 50, width: '100%' }}
                >
                  <Picker.Item label="Select Role" value="" />
                  <Picker.Item label="customer" value="customer" />
                  <Picker.Item label="courier" value="courier" />
                </Picker>
                {touched.role && errors.role && <Text style={styles.errorText}>{errors.role}</Text>}

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

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default Signup;