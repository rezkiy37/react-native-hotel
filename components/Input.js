import React from 'react'
import { TextInput, StyleSheet } from 'react-native'



export const Input = ({ value, usernameInputHandler }) => {
    return (
        <TextInput
            style={{ ...styles.input }}
            value={value}
            onChangeText={value => usernameInputHandler(value)}
            keyboardType='numeric'
            placeholder='Enter amount'
            placeholderTextColor='gray'
        />
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 5,
        borderRadius: 10,
        color: '#000',
        backgroundColor: '#eee'
    },
})
