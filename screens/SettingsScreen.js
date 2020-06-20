import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, Button, Dimensions, AsyncStorage } from 'react-native'
import { AuthContext } from '../components/Context'

export function SettingsScreen() {

    const screenWidth = Math.round(Dimensions.get('window').width)
    const screenHeight = Math.round(Dimensions.get('window').height)

    const { signOut, checkState, checkActiveUser, checkUserByToken, getToken } = useContext(AuthContext)

    const signOutHandler = () => {
        signOut()
    }

    const checkHandler = () => {
        //checkState()

        checkActiveUser()

        let token = getToken()
        console.log(token)
        checkUserByToken(token)
    }

    const createHotelsHandler = async () => {
        let hotel = {
            id: 4, title: 'President', desc: 'Super expensive', src: '../assets/hotels/***.png',
            rooms: [
                { order: 1, price: 45, available: false },
                { order: 2, price: 50, available: true },
                { order: 3, price: 55, available: false },
                { order: 4, price: 60, available: false },
                { order: 5, price: 75, available: false },
            ]
        }

        let src = { src: '../assets/hotels/president.png' }

        let hotelToSet = JSON.stringify(hotel)
        let srcToSet = JSON.stringify(src)
        try {
            //await AsyncStorage.setItem('hotel5', hotelToSet)

            await AsyncStorage.mergeItem('hotel5', srcToSet)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <Button
                title='Check'
                onPress={checkHandler}
            />

            <Button
                title='Create Hotels'
                onPress={createHotelsHandler}
            />

            <View style={{ ...styles.bottomBlock, width: screenWidth, height: screenHeight / 4 }}>
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
