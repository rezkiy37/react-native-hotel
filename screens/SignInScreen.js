import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import { AuthContext } from '../components/Context'


export function SignInScreen({ navigation }) {

    const [data, setData] = useState({
        username: '',
        password: '',
        isValidUsername: true,
        isValidPassword: true
    })

    const { signIn } = useContext(AuthContext)

    const signInHandler = () => {
        signIn(data.username, data.password)
    }

    const signUpHandler = () => {
        navigation.navigate('SignUpScreen')
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
                username: value,
                isValidPassword: false
            })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>App! Login!</Text>

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
                secureTextEntry={false}
                onChangeText={passwordInputHandler}
            />
            {data.isValidPassword ? null : (
                <Text style={styles.errorText}>Is not valid</Text>
            )}

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
