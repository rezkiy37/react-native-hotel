import React, { useState } from 'react'
import { HomeScreen } from './HomeScreen'

import { createStackNavigator } from '@react-navigation/stack'
import { HotelScreen } from './HotelScreen'
import { RoomScreen } from './RoomScreen'

const HomeStack = createStackNavigator()

export function HomeStackScreen() {
    return (
        <HomeStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#ccc'
            },
            headerTintColor: '#eee',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}>
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{
                title: 'Home'
            }} />
            <HomeStack.Screen name="HotelScreen" component={HotelScreen} options={{
                title: 'Hotel'
            }} />
            <HomeStack.Screen name="RoomScreen" component={RoomScreen} options={{
                title: 'Room'
            }} />
        </HomeStack.Navigator>
    )
}
