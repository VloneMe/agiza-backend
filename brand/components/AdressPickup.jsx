import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const AdressPickup = ({
    placeholderText
}) => {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete 
        placeholder={placeholderText}
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
        query={{
          key: 'AIzaSyD6DVLho-QJOqaxGKZ9pDQLYuDkvxlTyuw',
          language: 'en',
        }}
        styles={{
            textInputContainer: styles.containerStyle,
            textIput: styles.textInputStyle,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerStyle: {
    backgroundColor: 'white',
  },
    textInputStyle: {
        height: 48,
        color: 'black',
        fontSize: 16,
        backgroundColor: "#f3f3f3"
    },
});

export default AdressPickup;
