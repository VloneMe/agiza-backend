import { View, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import AddressPickup from './../components/AdressPickup';
import CustomButton from '../components/CustomButton';

const Destination = () => {
  const router = useRouter();

  const handlePress = () => {
    console.log('Navigating to /ClientMap');
    router.push('/ClientMap');
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: 'white', flex: 1, padding: 24 }}
      >
        <AddressPickup 
          placeholderText="Enter Pickup location"
        />
        <AddressPickup 
          placeholderText="Enter Destination location"
        />
        <CustomButton 
          btnTxt="Confirm Destination"
          onPress={handlePress}
          btnStyle={{ marginTop: 24 }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Destination;
