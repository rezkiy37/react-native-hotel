import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export function Hotel({ navigation, title, desc, src, count, rooms, token }) {

    const [isDisabled, setIsDisabled] = useState(false)

    const roomHandler = () => {
        setIsDisabled(true)
        navigation.push('RoomScreen', { rooms, token })
    }

    useEffect(() => {
        setTimeout(() => {
            setIsDisabled(false)
        }, 500)
    }, [isDisabled])

    return (
        <TouchableOpacity
            onPress={roomHandler}
            activeOpacity={.9}
            disabled={isDisabled ? true : false}
        >
            <View style={styles.hotelBlock} >
                <View style={styles.hotelHeader}>
                    <Text style={styles.hotelTitle}>{title}</Text>
                    <Text style={styles.hotelDesc}>{desc}</Text>
                </View>
                <View style={styles.hotelContent}>
                    <Image
                        source={require('../assets/hotels/lux.png')}
                    />
                    <Text style={styles.hotelText}>Rooms: {count}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

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

    hotelText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: 1.3
    },
})
