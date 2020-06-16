import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>App! Main!</Text>
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
