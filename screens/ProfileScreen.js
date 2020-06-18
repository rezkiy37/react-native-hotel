import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { AuthContext } from '../components/Context'


export function ProfileScreen() {

    const { signOut, getActiveUser } = useContext(AuthContext)

    const signOutHandler = () => {
        signOut()
    }

    const setActiveUser = () => {
        let user = getActiveUser()
        return user
    }

    const createBalansHandler = () => {
        let user = getActiveUser()
        console.log(user)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>App! Profile!</Text>
            <Text style={styles.text}>{setActiveUser()}</Text>
            <Button
                title='SignOut'
                onPress={signOutHandler}
            />
            <Button
                title='Create balans'
                onPress={createBalansHandler}
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
