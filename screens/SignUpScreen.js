import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native'
import { AuthContext } from '../components/Context'


export function SignUpScreen({ navigation }) {

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [isValid, setIsValid] = useState({
        isValidUsername: false,
        isValidPassword: false,
    })

    const { signUp } = useContext(AuthContext)

    const usernameInputHandler = value => {
        setUsername(value)
        if (value.trim().length >= 4) {
            setUsername(value)

            setIsValid({
                ...isValid,
                isValidUsername: true
            })
        } else {
            setUsername(value)

            setIsValid({
                ...isValid,
                isValidUsername: false
            })
        }
    }

    const passwordInputHandler = value => {
        if (value.trim().length >= 4) {
            setPassword(value)

            setIsValid({
                ...isValid,
                isValidPassword: true
            })
        } else {
            setPassword(value)

            setIsValid({
                ...isValid,
                isValidPassword: false
            })
        }
    }

    const signUpHandler = () => {
        if (isValid.isValidUsername && isValid.isValidPassword) {
            signUp(username, password)

            navigation.navigate('SignInScreen')
        } else {
            Alert.alert('Irregular data')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>App! SignUp!</Text>

            <TextInput
                style={styles.input}
                placeholder='username'
                onChangeText={usernameInputHandler}
                value={username}
            />
            {isValid.isValidUsername ? null : (
                <Text style={styles.errorText}>Is not valid</Text>
            )}

            <TextInput
                style={styles.input}
                placeholder='password'
                onChangeText={passwordInputHandler}
                value={password}
            />
            {isValid.isValidPassword ? null : (
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
