import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, Button } from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';
import { Line } from '../components/styles';
import { Colors, parameters } from '../components/global/styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Selection = () => {
  const [selectedRide, setSelectedRide] = useState('');

  const handleRideSelection = (ride) => {
    setSelectedRide(ride);
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.home}>
          <Text style={styles.text1}>Welcome to aGIZA</Text>
          <View style={styles.view1}>
            <View style={styles.view8}>
              <Text style={styles.text2}>Please choose the ride you want</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.option} onPress={() => handleRideSelection('Motorcycle')}>
          <Image source={require('./../assets/pikipiki.jpeg')} style={styles.image} />
          <Text style={styles.optionText}>Click to choose Motorcycle</Text>
          {selectedRide === 'Motorcycle' && <Link href={`/Comfirm?ride=${selectedRide}`}>Confirm</Link>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => handleRideSelection('Small Van')}>
          <Image source={require('./../assets/kirikuu.jpeg')} style={styles.image} />
          <Text style={styles.optionText}>Click to choose Small Van</Text>
          {selectedRide === 'Small Van' && <Link href={`/Comfirm?ride=${selectedRide}`}>Confirm</Link>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => handleRideSelection('Big Van')}>
          <Image source={require('./../assets/fuso.jpeg')} style={styles.image} />
          <Text style={styles.optionText}>Click to choose Big Van</Text>
          {selectedRide === 'Big Van' && <Link href={`/Comfirm?ride=${selectedRide}`}>Confirm</Link>}
        </TouchableOpacity>
      </ScrollView>
      <StatusBar
        style="dark"
        backgroundColor="#2058c0"
        translucent={true}
      />
    </View>
  );
};

export default Selection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingBottom: 30,
    paddingTop: parameters.statusBarHeight,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'blue',
  },
  header: {
    backgroundColor: Colors.blue,
    height: parameters.headerHeight,
    alignItems: "flex-start",
  },
  image: {
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  home: {
    backgroundColor: Colors.blue,
    paddingLeft: 20,
  },
  text1: {
    color: Colors.white,
    fontSize: 21,
    paddingBottom: 20,
    alignContent: "center",
    textAlign: "center",
    paddingTop: 20,
  },
  text2: {
    color: Colors.white,
    fontSize: 16,
    paddingBottom: 10,
    textAlign: "center",
  },
  view1: {
    flexDirection: "row",
    flex: 1,
    paddingTop: 30,
  },
  option: {
    margin: 10,
    padding: 10,
    backgroundColor: Colors.grey6,
    borderRadius: 10,
  },
  view8: {
    flex:4,
    marginTop:-50,
    alignContent: 'center',
    justifyContent: 'center'
  } ,
});