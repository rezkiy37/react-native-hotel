import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Alert, Dimensions } from 'react-native'
import { AuthContext } from '../components/Context'


export function SignUpScreen({ navigation }) {

    const screenWidth = Math.round(Dimensions.get('window').width)
    const screenHeight = Math.round(Dimensions.get('window').height)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isCorrectUsername, setIsCorrectUsername] = useState(true)
    const [isCorrectPassword, setIsCorrectPassword] = useState(true)

    const { signUp } = useContext(AuthContext)

    const usernameInputHandler = value => {
        setUsername(value)
        if (username.trim().length >= 4) {
            setIsCorrectUsername(true)
        } else {
            setIsCorrectUsername(false)
        }
    }

    const passwordInputHandler = value => {
        setPassword(value)
        if (password.trim().length >= 4) {
            setIsCorrectPassword(true)
        } else {
            setIsCorrectPassword(false)
        }
    }

    const signUpHandler = () => {
        if (isCorrectUsername && isCorrectPassword && username.length > 0 && password.length > 0) {
            signUp(username, password)

            navigation.navigate('SignInScreen')
        } else {
            Alert.alert('Irregular data')
        }
    }

    return (
        <View style={styles.container}>

            <View style={{ ...styles.topBlock, width: screenWidth, height: screenHeight / 2 }}>
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
                    onChangeText={passwordInputHandler}
                    value={password}
                />
                <Text style={isCorrectPassword ? styles.notErrorText : styles.errorText}>At least 4 characters</Text>
            </View>

            <View style={{ ...styles.bottomBlock, width: screenWidth, height: screenHeight / 3 }}>
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
    text: {
        color: '#fff'
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
