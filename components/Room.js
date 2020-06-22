import React from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'

export function Room({ token, order, price, available, rentHandler, freeHandler }) {

    const btnRentHandler = () => {
        rentHandler(token, order - 1, price)
    }

    const btnFreeHandler = () => {
        freeHandler(token, order - 1)
    }


    return (
        <View style={styles.roomBlock}>
            <View style={styles.roomHeader}>
                <Text style={styles.roomTitle}>Order: {order}</Text>
            </View>

            <View style={styles.roomContent}>
                <Image
                    source={require('../assets/rooms/room.png')}
                />

                {available ? (
                    <Text style={styles.roomText}>Price: {price}</Text>
                ) : (
                        <Text style={styles.roomText}>Room is not free</Text>
                    )}

            </View>

            <View style={styles.btnBlock}>
                {available ? (
                    <Button
                        onPress={btnRentHandler}
                        title='Rent'
                        color='green'
                    />
                ) : (
                        <Button
                            onPress={btnFreeHandler}
                            title='Busy'
                            color='red'
                        />
                    )}
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    roomBlock: {
        width: '100%',
        height: 150,
        marginVertical: 10,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#565656'
    },

    roomHeader: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    roomTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 1.3
    },

    roomDesc: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
        letterSpacing: 1.3,
        opacity: .8,
    },

    roomContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    roomText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: 1.3
    },

    btnBlock: {
        width: '100%',
        marginTop: 2,
        backgroundColor: 'red'
    }
})