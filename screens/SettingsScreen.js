import React, { useContext } from 'react'
import { StyleSheet, View, Button, AsyncStorage } from 'react-native'
import { AuthContext } from '../components/Context'

import { screenWidth, screenHeight } from '../components/ScreenSize'


export function SettingsScreen() {

    const width = screenWidth()
    const height = screenHeight()

    const { signOut } = useContext(AuthContext)

    const signOutHandler = () => {
        signOut()
    }

    // const deleteHotels = async () => {
    //     try {
    //         await AsyncStorage.clear()
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    // const createHotels = async () => {
    //     let hotel = {
    //         id: 1, token: 'hotel1', title: 'Hotel', desc: 'Middle', rooms: [
    //             { order: 1, price: 15, available: true },
    //             { order: 2, price: 15, available: true },
    //             { order: 3, price: 20, available: false },
    //             { order: 4, price: 20, available: false },
    //             { order: 5, price: 25, available: false },
    //         ]
    //     }

    //     hotel = JSON.stringify(hotel)
    //     try {
    //         hotel = await AsyncStorage.setItem(`hotel1`, hotel)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    // const checkHotels = async () => {
    //     let hotel
    //     try {
    //         hotel = await AsyncStorage.getItem(`hotel2`)
    //         hotel = await JSON.parse(hotel)
    //         await console.log(hotel)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    return (
        <View style={styles.container}>
            {/* <Button
                title='delete hotels'
                onPress={deleteHotels}
            />

            <Button
                title='create hotels'
                onPress={createHotels}
            />

            <Button
                title='check hotels'
                onPress={checkHotels}
            /> */}
            <View style={{ ...styles.bottomBlock, width, height: height / 4 }}>
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
        justifyContent: 'flex-end',
        backgroundColor: '#ccc',
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
