import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
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
import { API_BASE_URL } from '@env'; // Import the environment variable

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
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const router = useRouter();

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const userData = {
      username: values.username,
      email: values.email,
      phone: values.phone,
      password: values.password,
      role: values.role,
    };

    const url = `http://192.168.58.127:4000/api/users/register`;

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
        router.push('/Login');
      } else {
        Alert.alert('User registration failed', data.message || 'Error');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Network error. Please try again.');
    } finally {
      setIsLoading(false);
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
                  {/* <Picker.Item label="courier" value="courier" /> */}
                  {/* <Picker.Item label="admin" value="admin" /> */}
                </Picker>
                {touched.role && errors.role && <Text style={styles.errorText}>{errors.role}</Text>}

                <MsgBox>...</MsgBox>
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Submit</ButtonText>
                </StyledButton>
                {isLoading && <ActivityIndicator size="large" color={primary} />}
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




// import { StatusBar } from 'expo-status-bar';
// import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
// import React, { useState } from 'react';
// import { Link, useRouter } from 'expo-router';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import {
//   StyledContainer,
//   InnerContainer,
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

// import { Octicons, Ionicons } from '@expo/vector-icons';
// import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
// import { Picker } from '@react-native-picker/picker';
// import { API_BASE_URL } from '@env';

// const { brand, darkLight, primary } = Colors;

// // Validation schema
// const validationSchema = Yup.object().shape({
//   username: Yup.string().min(4, 'Username must be at least 4 characters long').required('Username is required'),
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   phone: Yup.string().min(5, 'Phone Number must be at least 5 digits').required('Phone Number is required'),
//   password: Yup.string().min(3, 'Password must be at least 3 characters long').required('Password is required'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password'), null], 'Passwords must match')
//     .required('Confirm Password is required'),
//   role: Yup.string().required('Role is required'),
//   plateNumber: Yup.string().when('role', {
//     is: 'courier',
//     then: Yup.string().required('Plate Number is required'),
//   }),
//   vehicleName: Yup.string().when('role', {
//     is: 'courier',
//     then: Yup.string().required('Vehicle Name is required'),
//   }),
//   vehicleColor: Yup.string().when('role', {
//     is: 'courier',
//     then: Yup.string().required('Vehicle Color is required'),
//   }),
// });

// const Signup = () => {
//   const [hidePassword, setHidePassword] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (values) => {
//     setIsLoading(true);
//     const userData = {
//       username: values.username,
//       email: values.email,
//       phone: values.phone,
//       password: values.password,
//       role: values.role,
//       plateNumber: values.plateNumber,
//       vehicleName: values.vehicleName,
//       vehicleColor: values.vehicleColor,
//     };

//     const url = `http://192.168.81.127:4000/users/register`;

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Alert.alert('User registered successfully');
//         router.push('/Login');
//       } else {
//         Alert.alert('User registration failed', data.message || 'Error');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       Alert.alert('Network error. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingWrapper>
//       <StyledContainer>
//         <StatusBar style="dark" />
//         <InnerContainer>
//           <PageTitle>aGIZA</PageTitle>
//           <SubTitle>Account Signup</SubTitle>
//           <Formik
//             initialValues={{ username: '', email: '', phone: '', password: '', confirmPassword: '', role: '', plateNumber: '', vehicleName: '', vehicleColor: '' }}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
//               <StyledFormArea>
//                 <FormField
//                   label="Full Name"
//                   icon="person"
//                   placeholder="Omari Rasuli"
//                   placeholderTextColor={darkLight}
//                   onChangeText={handleChange('username')}
//                   onBlur={handleBlur('username')}
//                   value={values.username}
//                   name="username"
//                   touched={touched}
//                   errors={errors}
//                 />
//                 <FormField
//                   label="Email Address"
//                   icon="mail"
//                   placeholder="rasuliomari4@gmail.com"
//                   placeholderTextColor={darkLight}
//                   onChangeText={handleChange('email')}
//                   onBlur={handleBlur('email')}
//                   value={values.email}
//                   keyboardType="email-address"
//                   name="email"
//                   touched={touched}
//                   errors={errors}
//                 />
//                 <FormField
//                   label="Phone Number"
//                   icon="device-mobile"
//                   placeholder="+255 657707046"
//                   placeholderTextColor={darkLight}
//                   onChangeText={handleChange('phone')}
//                   onBlur={handleBlur('phone')}
//                   value={values.phone}
//                   name="phone"
//                   touched={touched}
//                   errors={errors}
//                 />
//                 <FormField
//                   label="Password"
//                   icon="lock"
//                   placeholder="* * * * * * * *"
//                   placeholderTextColor={darkLight}
//                   onChangeText={handleChange('password')}
//                   onBlur={handleBlur('password')}
//                   value={values.password}
//                   secureTextEntry={hidePassword}
//                   isPassword
//                   hidePassword={hidePassword}
//                   setHidePassword={setHidePassword}
//                   name="password"
//                   touched={touched}
//                   errors={errors}
//                 />
//                 <FormField
//                   label="Confirm Password"
//                   icon="lock"
//                   placeholder="* * * * * * * *"
//                   placeholderTextColor={darkLight}
//                   onChangeText={handleChange('confirmPassword')}
//                   onBlur={handleBlur('confirmPassword')}
//                   value={values.confirmPassword}
//                   secureTextEntry={hidePassword}
//                   isPassword
//                   hidePassword={hidePassword}
//                   setHidePassword={setHidePassword}
//                   name="confirmPassword"
//                   touched={touched}
//                   errors={errors}
//                 />
//                 <StyledInputLabel>Role</StyledInputLabel>
//                 <Picker
//                   selectedValue={values.role}
//                   onValueChange={(itemValue) => setFieldValue('role', itemValue)}
//                   style={{ height: 50, width: '100%' }}
//                 >
//                   <Picker.Item label="Select Role" value="" />
//                   <Picker.Item label="customer" value="customer" />
//                   <Picker.Item label="courier" value="courier" />
//                 </Picker>
//                 {touched.role && errors.role && <Text style={styles.errorText}>{errors.role}</Text>}

//                 {values.role === 'courier' && (
//                   <>
//                     <FormField
//                       label="Plate Number"
//                       icon="car"
//                       placeholder="Plate Number"
//                       placeholderTextColor={darkLight}
//                       onChangeText={handleChange('plateNumber')}
//                       onBlur={handleBlur('plateNumber')}
//                       value={values.plateNumber}
//                       name="plateNumber"
//                       touched={touched}
//                       errors={errors}
//                     />
//                     <FormField
//                       label="Vehicle Name"
//                       icon="car"
//                       placeholder="Vehicle Name"
//                       placeholderTextColor={darkLight}
//                       onChangeText={handleChange('vehicleName')}
//                       onBlur={handleBlur('vehicleName')}
//                       value={values.vehicleName}
//                       name="vehicleName"
//                       touched={touched}
//                       errors={errors}
//                     />
//                     <FormField
//                       label="Vehicle Color"
//                       icon="car"
//                       placeholder="Vehicle Color"
//                       placeholderTextColor={darkLight}
//                       onChangeText={handleChange('vehicleColor')}
//                       onBlur={handleBlur('vehicleColor')}
//                       value={values.vehicleColor}
//                       name="vehicleColor"
//                       touched={touched}
//                       errors={errors}
//                     />
//                   </>
//                 )}

//                 <MsgBox>...</MsgBox>
//                 <StyledButton onPress={handleSubmit} disabled={isLoading}>
//                   {isLoading ? <ActivityIndicator size="small" color={primary} /> : <ButtonText>Submit</ButtonText>}
//                 </StyledButton>
//                 <Line />
//                 <ExtraView>
//                   <ExtraText>Already have an account? </ExtraText>
//                   <TextLink>
//                     <TextLinkContent>
//                       <Link href="/Login">Login</Link>
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

// const FormField = ({ label, icon, name, touched, errors, ...props }) => (
//   <>
//     <MyTextInput label={label} icon={icon} {...props} />
//     {touched[name] && errors[name] && <Text style={styles.errorText}>{errors[name]}</Text>}
//   </>
// );

// const styles = StyleSheet.create({
//   errorText: {
//     color: 'red',
//     fontSize: 12,
//     marginBottom: 10,
//   },
// });

// export default Signup;