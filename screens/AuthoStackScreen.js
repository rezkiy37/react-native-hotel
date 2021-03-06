import React, { useState } from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { SignInScreen } from './SignInScreen'
import { SignUpScreen } from './SignUpScreen'

const AuthoStack = createStackNavigator()

export function AuthoStackScreen() {
    return (
        <AuthoStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#ccc'
            },
            headerTintColor: '#000',
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerTitleAlign: "center"
        }}>
            <AuthoStack.Screen name="SignInScreen" component={SignInScreen} options={{
                title: 'SignIn'
            }} />
            <AuthoStack.Screen name="SignUpScreen" component={SignUpScreen} options={{
                title: 'SignUp'
            }} />
        </AuthoStack.Navigator>
    )
}
