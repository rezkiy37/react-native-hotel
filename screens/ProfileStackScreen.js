import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { ProfileScreen } from './ProfileScreen'

const ProfileStack = createStackNavigator()

export function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#ccc'
            },
            headerTintColor: '#000',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerTitleAlign: "center"
        }}>
            <ProfileStack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
                options={{
                    title: 'Profile'
                }}
            />
        </ProfileStack.Navigator>
    )
}
