import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native'

import { screenWidth, screenHeight } from '../components/ScreenSize'

export function HomeScreen({ navigation }) {

    const width = screenWidth()
    const height = screenHeight()

    const [hotels, setHotels] = useState([])

    let hotelsCount
    let roomsCount = 0
    if (!hotels) {
        hotelsCount = hotels.length
        for (let i = 0; i < hotels.length; i++) {
            roomsCount += hotels[i].rooms.length
        }
    } else {
        hotelsCount = 0
    }


    const hotelHandler = () => {
        navigation.push('HotelScreen', { hotels })
    }

    useEffect(() => {
        setTimeout(async () => {
            let keys = []
            let hotel
            let hotelsArray = []
            try {
                keys = await AsyncStorage.getAllKeys()

                if (keys.length > 0) {

                    for (let i = 1; i <= 5; i++) {
                        hotel = await AsyncStorage.getItem(`hotel${i}`)
                        hotel = await JSON.parse(hotel)

                        hotelsArray.push(hotel)
                    }
                    setHotels(hotelsArray)
                } else {
                    setHotels(null)
                }

                await console.log(hotels)
            } catch (e) {
                console.log(e)
            }
        }, 1000)
    }, [])

    return (
        <View style={styles.container}>

            <View style={{ ...styles.topBlock, width, height: height / 2 }}>
                <Image
                    style={styles.hotelImg}
                    source={require('../assets/hotel-intro.jpg')}
                />

                <View style={styles.topBlockContent}>
                    <View style={styles.contentRow} >
                        <Text style={styles.contentText}>Hotels:</Text>
                        <Text style={styles.contentText}>{hotelsCount}</Text>
                    </View>

                    <View style={styles.contentRow}>
                        <Text style={styles.contentText}>Rooms:</Text>
                        <Text style={styles.contentText}>{roomsCount}</Text>
                    </View>
                </View>
            </View>

            <View style={{ ...styles.bottomBlock, width, height: height / 4 }}>
                {hotelsCount ? (
                    <Button
                        title='Get hotel'
                        color='green'
                        onPress={hotelHandler}
                    />
                ) : (
                        <Button
                            title='There is not any hotel'
                            color='green'
                            disabled
                        />
                    )}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ccc',
    },

    topBlock: {
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ccc'
    },

    hotelImg: {
        width: '100%',
        height: 270,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    topBlockContent: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    contentRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    contentText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
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


