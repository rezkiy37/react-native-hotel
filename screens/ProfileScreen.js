import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>App! Profile!</Text>
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
