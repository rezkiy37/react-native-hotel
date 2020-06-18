import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import { AuthContext } from '../components/Context'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Hotel = ({ navigation, name, desc, count, rooms }) => {


    const roomHandler = () => {
        navigation.push('RoomScreen', { rooms })
    }

    return (
        <TouchableOpacity onPress={roomHandler}>
            <View
                style={styles.hotelContainer}
            >
                <Text style={styles.text}>{name}</Text>
                <Text style={styles.text}>{desc}</Text>
                <Text style={styles.text}>{count}</Text>
            </View>
        </TouchableOpacity>
    )
}


export function HotelScreen({ navigation, route }) {


    const supportHandler = () => {
        console.log('support')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>App! Hotel!</Text>

            <Button
                title='Support'
                onPress={supportHandler}
            />

            <ScrollView>
                {route.params.hotels.map(hotel => <Hotel key={hotel.id} name={hotel.name} desc={hotel.desc} count={hotel.rooms.length} rooms={hotel.rooms} navigation={navigation} />)}
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
    hotelContainer: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#ccc'
    }
})
