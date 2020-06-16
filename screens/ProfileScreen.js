import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { AuthContext } from '../components/Context'


export function ProfileScreen() {

    const { signOut } = useContext(AuthContext)

    const signOutHandler = () => {
        signOut()
    }


    return (
        <View style={styles.container}>
            <Text style={styles.text}>App! Profile!</Text>
            <Button
                title='SignOut'
                onPress={signOutHandler}
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
