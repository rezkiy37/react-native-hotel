import React, { useState } from 'react'

import { createStackNavigator } from '@react-navigation/stack'

const HomeStack = createStackNavigator()

export function HomeStackScreen({ HomeScreen }) {
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
        </HomeStack.Navigator>
    )
}
