import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { AuthContext } from '../components/Context'


export function LoginScreen() {

    const { signIn, signUp } = useContext(AuthContext)

    const signInHandler = () => {
        signIn('user', 'qwerty')
    }

    const signUpHandler = () => {
        signUp('user2', 'qwerty2')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>App! Login!</Text>
            <Button
                title='SignIn'
                color='red'
                onPress={signInHandler}
            />
            <Button
                title='SignUp'
                color='blue'
                onPress={signUpHandler}
            />
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
