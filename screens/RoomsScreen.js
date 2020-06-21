import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, ScrollView, AsyncStorage } from 'react-native'
import { AuthContext } from '../components/Context'
import { Room } from '../components/Room'
import { Loading } from './Loading'



export function RoomScreen({ navigation, route }) {

    const { getToken, getBalance, rentRoom } = useContext(AuthContext)

    const [rooms, setRooms] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const rentHandler = async (hotelToken, roomID, price) => {

        let userToken = getToken()
        let userBalance = getBalance()
        let newBalance = userBalance - price

        if (userBalance == undefined) {
            alert('Create balance!')
        } else if (newBalance >= 0) {
            let roomsToMerge = [...rooms]
            roomsToMerge[roomID].available = false

            roomsToMerge = { rooms: roomsToMerge }

            setRooms(roomsToMerge)

            roomsToMerge = JSON.stringify(roomsToMerge)

            rentRoom(userToken, newBalance)
            try {
                await AsyncStorage.mergeItem(hotelToken, roomsToMerge)
            } catch (e) {
                console.log(e)
            }
        } else {
            alert('Less balance!')
        }
    }

    const freeHandler = async (token, roomID) => {
        let roomsToMerge = [...rooms]
        roomsToMerge[roomID].available = true

        setRooms(roomsToMerge)

        roomsToMerge = { rooms: roomsToMerge }
        roomsToMerge = JSON.stringify(roomsToMerge)
        try {
            await AsyncStorage.mergeItem(token, roomsToMerge)
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 300)
    }, [isLoading])

    useEffect(() => {
        setRooms(route.params.rooms)
        return () => {
            setRooms(null)
        }
    }, [rooms])


    if (isLoading) {
        return <Loading />
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.roomsContainer} >
                {route.params.rooms.map(room => (
                    <Room
                        key={room.order}
                        order={room.order}
                        price={room.price}
                        available={room.available}
                        token={route.params.token}
                        rentHandler={rentHandler}
                        freeHandler={freeHandler}
                    />))}
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

    roomsContainer: {
        width: '100%',
        paddingHorizontal: 15,
    },
})
