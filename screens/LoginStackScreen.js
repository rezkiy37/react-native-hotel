import React, { useState } from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen } from './LoginScreen'

const LoginStack = createStackNavigator()

export function LoginStackScreen() {
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
