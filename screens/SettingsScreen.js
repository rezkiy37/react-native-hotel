import React, { useContext } from 'react'
import { StyleSheet, View, Button, AsyncStorage } from 'react-native'
import { AuthContext } from '../components/Context'

import { screenWidth, screenHeight } from '../components/ScreenSize'
import { hotels } from '../model/hotel'

export function SettingsScreen() {

    const width = screenWidth()
    const height = screenHeight()

    const { signOut } = useContext(AuthContext)

    const signOutHandler = () => {
        signOut()
    }

    const deleteHotels = async () => {
        for (let i = 1; i <= 5; i++) {
            AsyncStorage.removeItem(`hotel${i}`)
        }
    }

    const createHotels = () => {
        console.log(hotels)
    }

    return (
        <View style={styles.container}>
            <Button
                title='delete hotels'
                onPress={deleteHotels}
            />

            <Button
                title='create hotels'
                onPress={createHotels}
            />
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
