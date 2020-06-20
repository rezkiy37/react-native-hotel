import React, { useContext } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { AuthContext } from '../components/Context'

import { screenWidth, screenHeight } from '../components/ScreenSize'

export function SettingsScreen() {

    const width = screenWidth()
    const height = screenHeight()

    const { signOut } = useContext(AuthContext)

    const signOutHandler = () => {
        signOut()
    }

    return (
        <View style={styles.container}>
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
