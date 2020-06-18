import React, { useState } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'


const Tab = createMaterialBottomTabNavigator()

export const TabScreen = ({ HomeStackScreen, ProfileStackScreen, SettingsStackScreen }) => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
        // tabBarOptions={{
        //     activeTintColor: 'tomato',
        //     inactiveTintColor: 'gray',
        //     activeBackgroundColor: 'red'
        // }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: () => (
                        <Ionicons name="ios-home" color='white' size={22} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileStackScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: () => (
                        <Ionicons name="md-person" color='white' size={22} />
                    ),
                }}
            />

            <Tab.Screen
                name="Settings"
                component={SettingsStackScreen}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: () => (
                        <Ionicons name="md-settings" color='white' size={22} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}