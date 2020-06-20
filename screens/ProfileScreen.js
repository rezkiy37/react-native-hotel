import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Button, TextInput, Image, Dimensions } from 'react-native'
import { AuthContext } from '../components/Context'

import { screenWidth, screenHeight } from '../components/ScreenSize'


export function ProfileScreen() {

    const width = screenWidth()
    const height = screenHeight()

    const [isBalance, setIsBalance] = useState(null)
    const [isUser, setIsUser] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const [isCorrectValue, setIsCorrectValue] = useState(true)

    const { getActiveUserName, getBalance, getToken, createBalance, addFunds } = useContext(AuthContext)

    const setUser = () => {
        let user = getActiveUserName()
        setIsUser(user)
    }

    const setBalance = () => {
        let balance = getBalance()
        setIsBalance(balance)
    }

    const createBalanceHandler = () => {
        if (isCorrectValue && inputValue.length > 0) {
            let token = getToken()
            createBalance(token, inputValue)
        } else {
            alert('Uncorrect!')
        }
    }

    const addFundsHandler = () => {
        let prevBalance = getBalance()
        let newBalance = +inputValue + +prevBalance
        if (isCorrectValue && inputValue.length > 0) {
            let token = getToken()
            addFunds(token, newBalance)
        } else {
            alert('Uncorrect!')
        }
    }

    const inputHandler = value => {
        let certainValue = +value
        setInputValue(value)

        if (Number.isInteger(certainValue)) {
            setIsCorrectValue(true)
        } else {
            setIsCorrectValue(false)
        }
    }

    useEffect(() => {
        setUser()
        setBalance()
    }, [])

    return (
        <View style={styles.container}>

            <View style={{ ...styles.topBlock, width, height: height / 5 }} >
                {isUser ? (
                    <View style={styles.userBlock}>
                        <Image
                            style={styles.userImg}
                            source={require('../assets/user.png')}
                        />
                        <Text style={styles.userText}>{isUser}</Text>
                    </View>
                ) : (
                        <Text style={styles.userText}>Is not user</Text>
                    )}

                {isBalance ? (
                    <View style={styles.balanceBlock}>
                        <Text style={{ ...styles.balanceText, marginRight: 15 }}>Balance:</Text>
                        <Text style={styles.balanceText}>{isBalance}</Text>
                    </View>
                ) : (
                        <View style={styles.balanceBlock}>
                            <Text style={styles.balanceText}>Create balance</Text>
                        </View>
                    )}
            </View>


            {isBalance ? (
                <View style={{ ...styles.bottomBlock, width, height: height / 3 }}>
                    <TextInput
                        style={{ ...styles.input }}
                        value={inputValue}
                        onChangeText={value => inputHandler(value)}
                        keyboardType='numeric'
                        placeholder='Enter amount'
                        placeholderTextColor='gray'
                    />
                    <Text style={isCorrectValue ? styles.notErrorText : styles.errorText}>The value must be integer</Text>
                    <Button
                        title='Add funds'
                        color='green'
                        onPress={addFundsHandler}
                    />
                </View>
            ) : (
                    <View style={{ ...styles.bottomBlock, width, height: height / 3 }}>
                        <TextInput
                            style={{ ...styles.input }}
                            value={inputValue}
                            onChangeText={value => inputHandler(value)}
                            keyboardType='numeric'
                            placeholder='Enter amount'
                            placeholderTextColor='gray'
                        />
                        <Text style={isCorrectValue ? styles.notErrorText : styles.errorText}>The value must be integer</Text>
                        <Button
                            title='Create balans'
                            color='green'
                            onPress={createBalanceHandler}
                        />
                    </View>
                )}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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

    userBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    userImg: {
        width: 40,
        height: 40,
        marginRight: 15,
        borderRadius: 15
    },

    userText: {
        color: '#eee',
        fontSize: 22,
        fontWeight: 'bold'
    },

    balanceBlock: {
        flexDirection: 'row'
    },

    balanceText: {
        color: '#eee',
        fontSize: 22,
        fontWeight: 'bold'
    },

    input: {
        padding: 5,
        borderRadius: 10,
        color: '#000',
        backgroundColor: '#ccc'
    },

    errorText: {
        marginVertical: 15,
        color: 'red'
    },

    notErrorText: {
        marginVertical: 15,
        color: '#ccc'
    },
})
