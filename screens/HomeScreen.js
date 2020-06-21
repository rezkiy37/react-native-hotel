import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native'

import { screenWidth, screenHeight } from '../components/ScreenSize'
import { initialHotels } from '../model/hotel'


export function HomeScreen({ navigation }) {

    const width = screenWidth()
    const height = screenHeight()

    const [hotels, setHotels] = useState([])
    const [hotelsCount, setHotelsCount] = useState(0)
    const [roomsCount, setRoomsCount] = useState(0)
    const [isDisabled, setIsDisabled] = useState(false)

    const hotelHandler = () => {
        setIsDisabled(true)
        navigation.push('HotelScreen', { hotels })
    }

    useEffect(() => {
        setTimeout(() => {
            setIsDisabled(false)
        }, 500)
    }, [isDisabled])

    useEffect(() => {
        const fetchHotels = async () => {
            setHotelsCount(0)
            setRoomsCount(0)
            try {
                const keys = await AsyncStorage.getAllKeys()

                if (keys.length > 0) {
                    let hotel
                    let hotelArray = []
                    let roomsCountEffect = 0

                    for (let i = 1; i < keys.length; i++) {
                        hotel = await AsyncStorage.getItem(`hotel${i}`)

                        if (hotel) {
                            hotel = JSON.parse(hotel)
                            hotelArray.push(hotel)
                        } else {
                            i = keys.length
                            console.log('Stop fetching')
                        }
                    }

                    setHotelsCount(hotelArray.length)

                    for (let i = 0; i < hotelArray.length; i++) {
                        roomsCountEffect += hotelArray[i].rooms.length
                    }

                    setRoomsCount(roomsCountEffect)
                    setHotels(hotelArray)

                } else {
                    console.error('There is not any data. Error!')
                }
            } catch (e) {
                console.log(e)
            }
        }

        const defineHotels = async () => {
            setHotelsCount(0)
            setRoomsCount(0)

            try {
                const keys = await AsyncStorage.getAllKeys()

                if (keys.length > 0) {
                    let hotel

                    for (let i = 1; i <= 1; i++) {
                        hotel = await AsyncStorage.getItem(`hotel${i}`)

                        if (hotel) {
                            fetchHotels()
                        } else {
                            console.log('There is not any hotel!')

                            for (let h = 1; h <= initialHotels.length; h++) {
                                let hotel = JSON.stringify(initialHotels[h - 1])

                                await AsyncStorage.setItem(`hotel${h}`, hotel)
                            }
                        }
                    }
                } else {
                    console.error('There is not any data. Error!')
                }
            } catch (e) {
                console.log(e)
            }
        }

        defineHotels()
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
                        disabled={isDisabled ? true : false}
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


