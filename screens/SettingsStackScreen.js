import React, { useState } from 'react'

import { createStackNavigator } from '@react-navigation/stack'

const SettingsStack = createStackNavigator()

export function SettingsStackScreen({ SettingsScreen }) {
    return (
        <SettingsStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#ccc'
            },
            headerTintColor: '#eee',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}>
            <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} options={{
                title: 'Settings'
            }} />
        </SettingsStack.Navigator>
    )
}
