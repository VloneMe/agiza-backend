import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
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
    StyledButton,
    Colors,
} from '../components/styles';
import { Octicons, Ionicons } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const { brand, darkLight } = Colors;

const Details = () => {
    const [hidePassword, setHidePassword] = useState(true);
    const navigation = useNavigation();

    return (
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageTitle>aGIZA</PageTitle>
                    <SubTitle>Parcel Details</SubTitle>
                    <Formik
                        initialValues={{ pickuplocation: '', fullName: '', deliverylocation: '', PhoneNumber: '', Detail: '', Inside: '' }}
                        onSubmit={(values) => {
                            console.log(values);
                            navigation.navigate('ClientMap', { ...values });
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <StyledFormArea>
                                <MyTextInput
                                    label="Pickup Location Area"
                                    icon="location"
                                    placeholder="Bunju"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('pickuplocation')}
                                    onBlur={handleBlur('pickuplocation')}
                                    value={values.pickuplocation}
                                />
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
                                    label="Delivery Location"
                                    icon="location"
                                    placeholder="Kijitonyama"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('deliverylocation')}
                                    onBlur={handleBlur('deliverylocation')}
                                    value={values.deliverylocation}
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
                                    label="Description of the Parcel"
                                    icon="mail"
                                    placeholder="Small Box or Envelope or Bag or Others"
                                    style={styles.textArea}
                                    multiline={true}
                                    numberOfLines={2}
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('Detail')}
                                    onBlur={handleBlur('Detail')}
                                    value={values.Detail}
                                />
                                <MyTextInput
                                    label="What is inside the Parcel"
                                    icon="info"
                                    placeholder="Describe anything inside the parcel"
                                    style={styles.textArea}
                                    multiline={true}
                                    numberOfLines={4}
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('Inside')}
                                    onBlur={handleBlur('Inside')}
                                    value={values.Inside}
                                />
                                <MsgBox>.....</MsgBox>
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Next</ButtonText>
                                </StyledButton>
                            </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
};

const styles = StyleSheet.create({
    textArea: {
        height: 150,
        justifyContent: 'flex-start',
        textAlignVertical: 'top',
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
});

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
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    );
};

export default Details;





// import { StatusBar } from 'expo-status-bar';
// import { View, Text, Touchable, StyleSheet } from 'react-native';
// import React, { useState } from 'react';
// import { Link } from 'expo-router';
// import { Formik } from 'formik';
// import {
//     StyledContainer,
//     InnerContainer,
//     PageLogo,
//     PageTitle,
//     SubTitle,
//     StyledFormArea,
//     StyledTextInput,
//     StyledInputLabel,
//     LeftIcon,
//     RightIcon,
//     ButtonText,
//     MsgBox,
//     Line,
//     ExtraView,
//     ExtraText,
//     TextLink,
//     TextLinkContent,
//     StyledButton,
//     Colors,
//     } from '../components/styles';
// import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';
// const { brand, darkLight, primary } = Colors;
// import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// const Details = () => {
//     const [hidePassword, setHidePassword] = useState(true);
//     const [text, setText] = useState('');
    

//   return (
//     <KeyboardAvoidingWrapper>
//         <StyledContainer>
//             <StatusBar style="dark" />
//             <InnerContainer>
//                 <PageTitle>aGIZA</PageTitle>
//                 <SubTitle>Parcel Details </SubTitle>
//                 <Formik 
//                     initialValues={{ pickuplocation: '', fullName: '', deliverylocationres: '', PhoneNumber: '', Details: '', Inside: ''}}
//                     onSubmit={(values) => {
//                         console.log(values);
//                     }}
//                 >
//                     {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
//                         <MyTextInput 
//                             label="Pickup Location Area"
//                             icon="location"
//                             placeholder="Bunju"
//                             placeholderTextColor={darkLight}
//                             onChangeText={handleChange('pickuplocation')}
//                             onBlur={handleBlur('pickuplocation')}
//                             value={values.pickuplocation}
//                             keyboardType="pickuplocation"
//                         />
//                         <MyTextInput 
//                             label="Full Name of Receiver of the Parcel"
//                             icon="person"
//                             placeholder="Mokaka Mogasa"
//                             placeholderTextColor={darkLight}
//                             onChangeText={handleChange('fullName')}
//                             onBlur={handleBlur('fullName')}
//                             value={values.fullName}
//                         />
//                         <MyTextInput 
//                             label="Delivery Location"
//                             icon="location"
//                             placeholder="Kijitonyama"
//                             placeholderTextColor={darkLight}
//                             onChangeText={handleChange('deliverylocation')}
//                             onBlur={handleBlur('deliverylocation')}
//                             value={values.deliverylocation}
//                             keyboardType="deliverylocation"
//                         />
//                         <MyTextInput 
//                             label="Phone Number"
//                             icon="plus"
//                             placeholder="+255 657707046"
//                             placeholderTextColor={darkLight}
//                             onChangeText={handleChange('PhoneNumber')}
//                             onBlur={handleBlur('PhoneNumber')}
//                             value={values.PhoneNumber}
//                         />
//                         <MyTextInput 
//                             label="Decription of the Parcel"
//                             icon="mail"
//                             placeholder="Small Box or Envelope or Bag or Others"
//                             style={styles.textArea}
//                             multiline={true}
//                             numberOfLines={2}
//                             placeholderTextColor={darkLight}
//                             onChangeText={handleChange('Detail')}
//                             onBlur={handleBlur('Detail')}
//                             value={values.Detail}
//                         />
//                         <MyTextInput 
//                             label="What is inside the Parcel"
//                             icon="info"
//                             placeholder="Describe anythig inside the parcel"
//                             style={styles.textArea}
//                             multiline={true}
//                             numberOfLines={4}
//                             placeholderTextColor={darkLight}
//                             onChangeText={handleChange('Inside')}
//                             onBlur={handleBlur('Inside')}
//                             value={values.Inside}
//                         />
//                         <MsgBox>.....</MsgBox>
//                         <MsgBox>....</MsgBox>
//                         <MsgBox>..</MsgBox>
//                         <MsgBox>.</MsgBox>
//                         <StyledButton onPress={handleSubmit}>
//                             <Link href='ClientMap'><ButtonText>Next</ButtonText></Link>
//                         </StyledButton>
//                     </StyledFormArea>)}

//                 </Formik>
//             </InnerContainer>
//         </StyledContainer>
//     </KeyboardAvoidingWrapper>
//   )
// }

// const styles = StyleSheet.create({
//     textArea: {
//       height: 150,
//       justifyContent: 'flex-start',
//       textAlignVertical: 'top', 
//       borderColor: 'gray',
//       borderWidth: 1,
//       padding: 10,
//       borderRadius: 5, 
//     }
// });

// const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
//     return (
//         <View>
//             <LeftIcon>
//                 <Octicons name={icon} size={30} color={brand} />
//             </LeftIcon>
//             <StyledInputLabel>{label}</StyledInputLabel>
//             <StyledTextInput {...props} />
//             {isPassword && (
//                 <RightIcon onPress={() => setHidePassword(!hidePassword)}>
//                     <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
//                 </RightIcon>
//             )}
//         </View>
//     )
// }

// export default Details;