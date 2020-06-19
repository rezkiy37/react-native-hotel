import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import { AuthContext } from '../components/Context'


export function SignInScreen({ navigation }) {

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    const { signIn, checkState } = useContext(AuthContext)

    const signInHandler = () => {
        signIn(username, password)
    }

    const signUpHandler = () => {
        navigation.navigate('SignUpScreen')
    }

    const usernameInputHandler = value => {
        setUsername(value)
    }

    const passwordInputHandler = value => {
        setPassword(value)
    }

    const checkHandler = () => {
        checkState()
    }


    return (
        <View style={styles.container}>
            <Button
                title='Check'
                onPress={checkHandler}
            />
            <Text style={styles.text} >App! Login!</Text>

            <TextInput
                style={styles.input}
                placeholder='username'
                onChangeText={value => usernameInputHandler(value)}
                value={username}
            />

            <TextInput
                style={styles.input}
                placeholder='password'
                secureTextEntry={false}
                onChangeText={value => passwordInputHandler(value)}
                value={password}
            />

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
