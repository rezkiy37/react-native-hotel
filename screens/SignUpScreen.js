import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native'
import { AuthContext } from '../components/Context'
import { screenWidth, screenHeight } from '../components/ScreenSize'



export function SignUpScreen({ navigation }) {

    const width = screenWidth()
    const height = screenHeight()

    const [username, setUsername] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [secondPassword, setSecondPassword] = useState('')
    const [isCorrectUsername, setIsCorrectUsername] = useState(true)
    const [isCorrectUserName, setIsCorrectUserName] = useState(true)
    const [isCorrectPassword, setIsCorrectPassword] = useState(true)
    const [isCorrectBothPasswords, setIsCorrectBothPasswords] = useState(true)

    const { signUp } = useContext(AuthContext)

    const usernameInputHandler = value => {
        value = value.trim().toLowerCase()
        setUsername(value)
    }

    const userNameInputHandler = value => {
        setUserName(value)
    }

    const passwordInputHandler = value => {
        value = value.trim()
        setPassword(value)
    }

    const secondPasswordInputHandler = value => {
        value = value.trim()
        setSecondPassword(value)
    }

    const signUpHandler = () => {
        if (isCorrectUsername && isCorrectUserName && isCorrectBothPasswords && username.length > 0 && password.length > 0) {
            signUp(userName, username, password)

            navigation.navigate('SignInScreen')
        } else {
            Alert.alert('Irregular data')
        }
    }

    useEffect(() => {

        if (username.length >= 4) {
            setIsCorrectUsername(true)
        } else {
            setIsCorrectUsername(false)
        }

        if (userName.length >= 3) {
            setIsCorrectUserName(true)
        } else {
            setIsCorrectUserName(false)
        }

        if (password.length >= 4) {
            setIsCorrectPassword(true)
        } else {
            setIsCorrectPassword(false)
        }

        if (password == secondPassword) {
            setIsCorrectBothPasswords(true)
        } else {
            setIsCorrectBothPasswords(false)
        }

    }, [username, userName, password, secondPassword])

    return (
        <View style={styles.container}>

            <View style={{ ...styles.topBlock, width, height: height / 1.9 }}>

                <TextInput
                    style={styles.input}
                    placeholder='real name'
                    onChangeText={userNameInputHandler}
                    value={userName}
                />
                <Text style={isCorrectUserName ? styles.notErrorText : styles.errorText}>At least 3 characters</Text>

                <TextInput
                    style={styles.input}
                    placeholder='username'
                    onChangeText={usernameInputHandler}
                    value={username}
                />
                <Text style={isCorrectUsername ? styles.notErrorText : styles.errorText}>At least 4 characters</Text>

                <TextInput
                    style={styles.input}
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={passwordInputHandler}
                    value={password}
                />
                <Text style={isCorrectPassword ? styles.notErrorText : styles.errorText}>At least 4 characters</Text>

                <TextInput
                    style={styles.input}
                    placeholder='second password'
                    secureTextEntry={true}
                    onChangeText={secondPasswordInputHandler}
                    value={secondPassword}
                />

                {isCorrectBothPasswords ? (
                    <Text style={styles.notErrorText}>Passwords are confirmed</Text>
                ) : (
                        <Text style={styles.errorText}>Passwords are different</Text>
                    )}

            </View>

            <View style={{ ...styles.bottomBlock, width, height: height / 4 }}>
                <Button
                    title='SignUp'
                    color='blue'
                    onPress={signUpHandler}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ccc',
    },

    topBlock: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#ccc'
    },

    bottomBlock: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#eee'
    },

    input: {
        width: '100%',
        marginVertical: 10,
        padding: 5,
        borderRadius: 10,
        color: '#000',
        backgroundColor: '#eee'
    },

    errorText: {
        marginVertical: 5,
        marginLeft: 5,
        color: 'red'
    },

    notErrorText: {
        marginVertical: 5,
        marginLeft: 5,
        color: '#000'
    },
})
