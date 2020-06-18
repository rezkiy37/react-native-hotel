import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import { AuthContext } from '../components/Context'


const Room = ({ order, price, available }) => {
    return (
        <View style={styles.roomContainer}>
            <Text style={styles.text}>{order}</Text>
            <Text style={styles.text}>{price}</Text>
            <Text style={styles.text}>{available ? 'true' : 'false'}</Text>
        </View>
    )
}


export function RoomScreen({ navigation, route }) {

    const supportHandler = () => {
        console.log('support')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>App! Room!</Text>

            <Button
                title='Support'
                onPress={supportHandler}
            />

            <ScrollView>
                {route.params.rooms.map(room => <Room key={room.order} order={room.order} price={room.price} available={room.available} />)}
            </ScrollView>
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
    },
    roomContainer: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#eee'
    }
})
