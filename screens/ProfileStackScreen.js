import React, { useState } from 'react'

import { createStackNavigator } from '@react-navigation/stack'

const ProfileStack = createStackNavigator()

export function ProfileStackScreen({ ProfileScreen }) {
    return (
        <ProfileStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#ccc'
            },
            headerTintColor: '#eee',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}>
            <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} options={{
                title: 'Profile'
            }} />
        </ProfileStack.Navigator>
    )
}
