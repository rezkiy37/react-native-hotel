import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, ScrollView, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Hotel = ({ navigation, title, desc, src, count, rooms }) => {

    const roomHandler = () => {
        navigation.push('RoomScreen', { rooms })
    }

    return (
        <TouchableOpacity onPress={roomHandler} activeOpacity={.9}>
            <View style={styles.hotelBlock} >
                <View style={styles.hotelHeader}>
                    <Text style={styles.hotelTitle}>{title}</Text>
                    <Text style={styles.hotelDesc}>{desc}</Text>
                </View>
                <View style={styles.hotelContent}>
                    <Image
                        style={styles.hotelImg}
                        source={require('../assets/hotels/lux.png')}
                    />
                    <Text style={styles.hotelText}>Rooms: {count}</Text>
                </View>
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

            {/* <Button
                title='Support'
                onPress={supportHandler}
            /> */}

            <ScrollView style={styles.hotelsContainer}>
                {route.params.hotels.map(hotel => <Hotel key={hotel.id} title={hotel.title} desc={hotel.desc} src={hotel.src} count={hotel.rooms.length} rooms={hotel.rooms} navigation={navigation} />)}
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
    },

    hotelsContainer: {
        width: '100%',
        paddingHorizontal: 15,
    },

    hotelBlock: {
        width: '100%',
        height: 150,
        marginVertical: 10,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#565656'
    },

    hotelHeader: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    hotelTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1.3
    },

    hotelDesc: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
        letterSpacing: 1.3,
        opacity: .8,
    },

    hotelContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    hotelImg: {

    },

    hotelText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: 1.3
    },
})
