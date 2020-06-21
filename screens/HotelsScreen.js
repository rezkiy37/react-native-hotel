import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Hotel } from '../components/Hotel'
import { Loading } from './Loading'


export function HotelScreen({ navigation, route }) {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 300)
    }, [isLoading])

    if (isLoading) {
        return <Loading />
    }

    return (
        <View style={styles.container}>

            <ScrollView style={styles.hotelsContainer}>
                {route.params.hotels.map(hotel => <Hotel key={hotel.id} title={hotel.title} desc={hotel.desc} src={hotel.src} count={hotel.rooms.length} rooms={hotel.rooms} token={hotel.token} navigation={navigation} />)}
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
})
