import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const Destination = () => {
  return (
    <View>
        <View style = { styles.view1 }>
        <Icon 
          name = 'arrow-left'
          type = 'material-community'
          color = {Colors.grey1}
          size = {32}
        />
      </View>
        <TouchableOpacity>
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
        </TouchableOpacity>
      <Text>Destination</Text>
    </View>
  )
}

export default Destination

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    
    flatlist: {
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