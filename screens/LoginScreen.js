import React, { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'


export function LoginScreen({ setLogin }) {
    const loginHandler = () => {
        setLogin('nobf')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>App! Login!</Text>
            <Button title='LogIn' color='red' onPress={loginHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff'
    }
})
