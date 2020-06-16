import React, { useState } from 'react'

import { createStackNavigator } from '@react-navigation/stack'

const LoginStack = createStackNavigator()

export function LoginStackScreen({ LoginScreen }) {
    return (
        <LoginStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#ccc'
            },
            headerTintColor: '#eee',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}>
            <LoginStack.Screen name="LoginScreen" component={LoginScreen} options={{
                title: 'Login'
            }} />
        </LoginStack.Navigator>
    )
}
