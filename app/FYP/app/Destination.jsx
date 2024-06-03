import { FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity, Dimensions } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Avatar, Icon } from 'react-native-elements';
import { Colors, parameters } from '../components/global/styles';
import React, { useRef } from 'react'
import { Link } from 'expo-router';
// import { GOOGLE_MAPS_APIKEY } from "../@env";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Destination = () => {
  const textInput1 = useRef(4);
  const textInput2 = useRef(5);
  return (
    <>
      <View style = {styles.view2}>
          <View style = { styles.view1 }>
            <Link href="Request">
          <Icon 
            name = 'arrow-left'
            type = 'material-community'
            color = {Colors.grey1}
            size = {32}
          />
          </Link>
        </View>
          <TouchableOpacity>
            <View style = {{top: 25, alignItems: 'center'}}>
              <View style = {styles.view3}>
                <Avatar 
                  rounded
                  avatarStyle={{}}
                  source={require('../assets/blankProfilePic.jpg')}
                  size = {30}
                />
                <Text style = {{ marginLeft: 5 }}>For Someone</Text>
                <Icon 
                  name = 'chevron-down'
                  type = 'material-community'
                  color = {Colors.grey1}
                  size = {26}
                /> 
              </View>
            </View>
          </TouchableOpacity>
      </View>
      <GooglePlacesAutocomplete 
        nearbyPlacesAPI='GooglePlacesSearch'
        placeholder='Where to........?'
        listViewDisplayed='auto'
        debounce={400}
        currentLocation={true}
        ref={textInput1}
        minLength={2}
        enablePoweredByContainer={false}
        fetchDetails={true}
        autoFocus={true}
        styles={autocomplete}
        query={
          {
            key: 'AIzaSyD6DVLho-QJOqaxGKZ9pDQLYuDkvxlTyuw',
            language: 'en', 
          }
        }
        onPress={(data,details = null) => {
          console.log(details)
        }}
      />
    </>
  )
}

export default Destination

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: parameters.statusBarHeight
    },

    view1: {
        position: "absolute",
        top: 25,
        left: 12,
        backgroundColor: Colors.white,
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2,
        zIndex: 10
    },

    view3: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
        marginBottom: 10,
        backgroundColor: Colors.white,
        zIndex: 10
    },

    view2: {
        alignItems: "center",
        zIndex: 4,
        backgroundColor: Colors.white,
        paddingBottom: 10
    },

    view24: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 15,
        paddingHorizontal: 20
    },

    view25: {
        flexDirection: "row",
        alignItems: "baseline",
    },
    
    FlatList: {
        marginTop: 20,
        zIndex: 17,
        elevation: 8
    }
    
})


const autocomplete = {
    TextInput: {
        backgroundColor: Colors.grey6,
        height: 50,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 15,
        flex: 1,
        borderWidth: 1,
        marginHorizontal: 15,
    },

    container: {
        paddingTop: 20,
        flex: 1,
        backgroundColor: Colors.white,
    },

    textInputContainer:{
        flexDirection: 'row',
    }
}