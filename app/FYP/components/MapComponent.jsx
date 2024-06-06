import { Text, StyleSheet, View } from 'react-native'
import { mapStyle } from '../components/global/mapStyle';
import MapView, { PROVIDER_GOOGLE,} from 'react-native-maps';
import React, { Component } from 'react'
import { Colors, parameters } from '../components/global/styles';


const { buttons, grey, grey1, grey2, grey3, grey4, grey5, grey6, grey7, grey10, CardComment, cardbackground, statusbar, heaherText, lightgreen, blue, black, white, darkBlue, pagebackground } = Colors;

export default class MapComponent extends Component {
  render() {
    return (
      <View>
         <MapView 
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              customMapStyle={mapStyle}
              >
                {this.props.userOrigin.latitude != null &&
                  <MapView.Marker coordibate = {this.props.userOrigin} anchor = {{x:0.5,y:0.5}} >
                    <Image 
                      source={require('../assets/location.png')}
                      style={styles.markerOrigin2}
                      resizeMode="cover"
                    />
                  </MapView.Marker>
                }
            </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    map: {
        height:"100%",
         width:"100%"
        },


        
        markerWrapOrigin: {
          //  alignItems: "center",
           // justifyContent: "center",
             width:40,
            height:20,
           // marginTop:0
           },
           markerOrigin: {
              width: 16,
              height: 16,
              borderRadius:8
           },
     
           destination: {
              width:20,
             height:20,
             backgroundColor:Colors.black,
             alignItems:"center",
             justifyContent:"center"
            },
  
            view1: {
              width:7,
             height:7,
             backgroundColor:Colors.white
            },
            markerDestination: {
             width: 16,
             height: 16,
             
            },
            
            markerOrigin2: {
              width: 20,
              height:20,
              borderRadius:10
             },
  
      car:{
          paddingTop:0,
          width: 40,
          height: 20,
         },
  
         view2:{
          position:"absolute",
          top:10,
          right:12,
          backgroundColor:Colors.white,
          height:40,
          width:180,
          borderRadius:20,
          justifyContent:"center",
          alignItems:"center",
          marginTop:2, 
          zIndex: 8
          
        },    
   
  view3:{ flexDirection:"row",
  alignItems:"center",
  //marginRight:15,
  //backgroundColor:"white",
  //paddingHorizontal:2,
  paddingVertical:2,
  //borderRadius:20
  },
  
  view4:{
      position:"absolute",
      top:50,
      left:12,
      backgroundColor:Colors.white,
      height:40,
      width:140,
      borderRadius:20,
      justifyContent:"center",
      alignItems:"center",
      marginTop:2, 
      zIndex: 8
      
    }, 
  
    location: {
      width: 20,
      height: 20,
      borderRadius:9,
      backgroundColor:Colors.black,
      alignItems:"center",
      justifyContent:"center"
      
      }, 
      
  view9:{width:6,
    height:6,
    borderRadius:4,
    backgroundColor:"white"
  }     
})