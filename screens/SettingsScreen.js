import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native'
import { AuthContext } from '../components/Context'

export function SettingsScreen() {

    const screenWidth = Math.round(Dimensions.get('window').width)
    const screenHeight = Math.round(Dimensions.get('window').height)

    const { signOut, checkState } = useContext(AuthContext)

    const signOutHandler = () => {
        signOut()
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

            <View style={{ ...styles.bottomBlock, width: screenWidth, height: screenHeight / 3 }}>
                <Button
                    title='SignOut'
                    color='red'
                    onPress={signOutHandler}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ccc',
    },
    text: {
        color: '#fff'
    },
    bottomBlock: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#eee'
    },
})
