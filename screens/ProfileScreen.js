import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import { AuthContext } from '../components/Context'


export function ProfileScreen() {

    const [isBalance, setIsBalance] = useState(null)
    const [isUser, setIsUser] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const [isCorrectValue, setIsCorrectValue] = useState(false)

    const { signOut, getActiveUser, getBalance, getToken, createBalance, addFunds, checkState } = useContext(AuthContext)

    const signOutHandler = () => {
        signOut()
        setIsUser(null)
    }

    const setUser = () => {
        let user = getActiveUser()
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

    const checkHandler = () => {
        checkState()
        //console.log(inputValue)
    }

    useEffect(() => {
        setUser()
        setBalance()
        console.log(inputValue)
    }, [])

    return (
        <View style={styles.container}>
            <Button
                title='Check'
                onPress={checkHandler}
            />
            <Text style={styles.text}>App! Profile!</Text>

            {isUser ? (
                <Text style={styles.text}>{isUser}</Text>
            ) : (
                    <Text style={styles.text}>Is not user</Text>
                )}

            {isBalance ? (
                <Text style={styles.text}>{isBalance}</Text>
            ) : (
                    <Text style={styles.text}>Create balance</Text>
                )}

            <Button
                title='SignOut'
                onPress={signOutHandler}
            />

            {isBalance ? (
                <View>
                    <TextInput
                        style={styles.input}
                        value={inputValue}
                        onChangeText={value => inputHandler(value)}
                        keyboardType='numeric'
                    />
                    {isCorrectValue ? null : (
                        <Text style={styles.errorText}>The value must be integer</Text>
                    )}
                    <Button
                        title='Add funds'
                        onPress={addFundsHandler}
                    />
                </View>
            ) : (
                    <View>
                        <TextInput
                            style={styles.input}
                            value={inputValue}
                            onChangeText={value => inputHandler(value)}
                            keyboardType='numeric'
                        />
                        {isCorrectValue ? null : (
                            <Text style={styles.errorText}>The value must be integer</Text>
                        )}
                        <Button
                            title='Create balans'
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
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff'
    },
    input: {
        width: 100,
        color: '#000',
        backgroundColor: '#ccc'
    },
    errorText: {
        color: 'red'
    }
})
