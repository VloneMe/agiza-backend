import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'

const CustomButton = ({
    onPress =()=>{},
    btnStyle={},
    btnTxt
}) => {
  return (
    <TouchableOpacity onPres={onPress} style={{ ...styles.btnStyle, ...btnStyle }} >
        <Text>{btnTxt}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btnStyle: {
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
        marginTop: 16,
        paddingHorizontal: 16
    },
});