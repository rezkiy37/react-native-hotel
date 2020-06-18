import React, { useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

export function HomeScreen({ navigation }) {

    let hotels = [
        {
            id: 1, name: 'Motel', desc: 'Poor', rooms: [
                { order: 1, price: 10, available: true },
                { order: 2, price: 10, available: true },
                { order: 3, price: 10, available: false },
            ]
        },
        {
            id: 2, name: 'Hostel', desc: 'Middle', rooms: [
                { order: 1, price: 15, available: true },
                { order: 2, price: 15, available: false },
                { order: 3, price: 15, available: false },
            ]
        },
        {
            id: 3, name: 'Lux', desc: 'Expensive', rooms: [
                { order: 1, price: 20, available: false },
                { order: 2, price: 20, available: true },
                { order: 3, price: 20, available: false },
            ]
        },
    ]

    const hotelHandler = () => {
        navigation.push('HotelScreen', { hotels })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>App! Main!</Text>
            <Button
                title='Hotel'
                onPress={hotelHandler}
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
