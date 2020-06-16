import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native'
import { AuthContext } from '../components/Context'


export function SignUpScreen() {

    const [data, setData] = useState({
        username: '',
        password: '',
        isValidUsername: false,
        isValidPassword: false
    })

    const { signUp } = useContext(AuthContext)

    const signUpHandler = () => {
        if (data.isValidUsername && data.isValidPassword) {
            console.log(data.username, data.password)

            signUp(data.username, data.password)
        } else {
            Alert.alert('Irregular data')
        }

    }

    const usernameInputHandler = value => {
        console.log(data.username)

        if (value.trim().length >= 4) {
            setData({
                ...data,
                username: value,
                isValidUsername: true
            })
        } else {
            setData({
                ...data,
                username: value,
                isValidUsername: false
            })
        }
    }

    const passwordInputHandler = value => {
        console.log(data.password)

        if (value.trim().length >= 4) {
            setData({
                ...data,
                password: value,
                isValidPassword: true
            })
        } else {
            setData({
                ...data,
                password: value,
                isValidPassword: false
            })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>App! SignUp!</Text>

            <TextInput
                style={styles.input}
                placeholder='username'
                onChangeText={usernameInputHandler}
            />
            {data.isValidUsername ? null : (
                <Text style={styles.errorText}>Is not valid</Text>
            )}

            <TextInput
                style={styles.input}
                placeholder='password'
                onChangeText={passwordInputHandler}
            />
            {data.isValidPassword ? null : (
                <Text style={styles.errorText}>Is not valid</Text>
            )}

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
    },
    errorText: {
        color: 'red',
    },
    input: {
        width: 100,
        marginVertical: 15,
        color: '#000',
        backgroundColor: '#fff'
    }
})
