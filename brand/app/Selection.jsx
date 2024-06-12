import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { Link } from 'expo-router';
import { Line } from '../components/styles';
import { Colors, parameters } from '../components/global/styles';
const SCREEN_WIDTH = Dimensions.get('window').width;

const Selection = () => {
  return (
    <View>
      <ScrollView>
        <View style = {styles.home}>
            <Text style={styles.text1}>Welcome to aGIZA</Text>
            <View style={styles.view1}>
              <View style={styles.view8}>
                <Text style={styles.text2}>Please choose the ride you want</Text>
              </View>
            </View>
        </View>
      <TouchableOpacity style={styles.option}>
        <Image source={require('./../assets/pikipiki.jpeg')} style={styles.image} />
        <Text style={styles.optionText}>Click to choose Motorcycle</Text>
      </TouchableOpacity>
      <Line />

      <TouchableOpacity style={styles.option}>
        <Image source={require('./../assets/kirikuu.jpeg')} style={styles.image} />
        <Text style={styles.optionText}>Click to choose Small Van</Text>
      </TouchableOpacity>
      <Line />

      <TouchableOpacity style={styles.option}>
        <Link href = "Comfirm">
        <Image source={require('./../assets/fuso.jpeg')} style={styles.image} />
        <Text style={styles.optionText}>Click to choose Big Van</Text>
        </Link>
      </TouchableOpacity>
      </ScrollView>
      <StatusBar 
          style = "dark"
          backgroundColor = "#2058c0"
          translucent = {true}
      />
    </View>
    
  )
}

export default Selection

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.white,
        paddingBottom:30,
        paddingTop:parameters.statusBarHeight
    },
    optionText: {
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'center',
          color: 'blue'
        },
    header:{
      backgroundColor:Colors.blue,
      height:parameters.headerHeight,
      alignItems:"flex-start"
    },
    image:{
      alignContent: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 10,
    },
    
    image1:{
     
      height:100,
      width:100,
    
    },
    
    image2:{height:60,width:60,
            borderRadius:30,
          },
    
    home:{
     backgroundColor:Colors.blue,
     paddingLeft:20,
    },
    
    text1:{
     color:Colors.white,
     fontSize:21,
     paddingBottom:20,
     alignContent:"center",
     textAlign:"center",
     paddingTop:20
    },
    
    text2:{
     color:Colors.white,
     fontSize:16,
      paddingBottom:10,
      textAlign:"center"
    },
    
    view1:{
     flexDirection:"row",
     flex:1,
     paddingTop:30
    },
    
    button1:{
      height:40,
      width:150,
      backgroundColor:Colors.black,
      borderRadius:20,
      alignItems:"center",
      justifyContent:"center",
      marginTop:20
    },
    
    button1Text:{
     color:Colors.white,
     fontSize:17,
     marginTop:-2
    
    },
    card:{
     alignItems:"center",
     margin:SCREEN_WIDTH/22
    
    },
    
    view2:{marginBottom:5,
          borderRadius:15,
          backgroundColor:Colors.grey6
        },
    
        title:{
          color:Colors.black,
          fontSize:16
        },
    view3:{flexDirection:"row",
             marginTop :5,
             height:50,
             backgroundColor:Colors.grey6,
             alignItems:"center",
             justifyContent:"space-between",
            marginHorizontal:15
            
             },
    text3:{marginLeft:15,
            fontSize:20,
            color:Colors.black
      },
    
    view4:{ flexDirection:"row",
            alignItems:"center",
            marginRight:15,
            backgroundColor:"white",
            paddingHorizontal:10,
            paddingVertical:2,
            borderRadius:20
            },
    
    view5:{ flexDirection:"row",
    alignItems:"center",
    backgroundColor:"white",
    paddingVertical:25,
    justifyContent:"space-between",
    marginHorizontal:15,
    borderBottomColor:Colors.grey4,
    borderBottomWidth:1,
    flex:1
    },
    
    view6:{
    
    
    alignItems:"center",
    flex:5,
    flexDirection:"row"
    },
    view7:{
    backgroundColor:Colors.grey6,
    height:40,
    width:40,
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center",
    marginRight:20
    
    },
    
    map:{
       
    height: 150,
     marginVertical: 0,
     width:SCREEN_WIDTH*0.92
    },
    
    text4:{ fontSize:20,
          color:Colors.black,
          marginLeft:20,
          marginBottom:20
        },
    
    icon1:  {marginLeft:10,
           marginTop:5
          },

    view8: {flex:4,
          marginTop:-25
        } ,
    carsAround: {
    width: 28,
    height: 14,
    
    }, 
    
    location: {
      width: 16,
      height: 16,
      borderRadius:8,
      backgroundColor:Colors.blue,
      alignItems:"center",
      justifyContent:"center"
      
      }, 
      
    view9:{width:4,
    height:4,
    borderRadius:2,
    backgroundColor:"white"
    }


})