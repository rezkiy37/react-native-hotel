import React from 'react'
import { HomeScreen } from './HomeScreen'

import { createStackNavigator } from '@react-navigation/stack'
import { HotelScreen } from './HotelsScreen'
import { RoomScreen } from './RoomsScreen'

const HomeStack = createStackNavigator()

export function HomeStackScreen() {
    return (
        <HomeStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#ccc'
            },
            headerTintColor: '#000',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerTitleAlign: "center"
        }}>
            <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{
                title: 'Home'
            }} />
            <HomeStack.Screen name="HotelScreen" component={HotelScreen} options={{
                title: 'Hotels'
            }} />
            <HomeStack.Screen name="RoomScreen" component={RoomScreen} options={{
                title: 'Rooms'
            }} />
        </HomeStack.Navigator>
    )
}
