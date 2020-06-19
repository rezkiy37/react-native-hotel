import React, { useState } from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'


const Tab = createMaterialBottomTabNavigator()

export const TabScreen = ({ HomeStackScreen, ProfileStackScreen, SettingsStackScreen }) => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#000"
            inactiveColor="#eee"

            barStyle={{
                backgroundColor: '#ccc',
            }}

        // tabBarOptions={{
        //     activeTintColor: 'tomato',
        //     inactiveTintColor: 'gray',
        //     : 'red'
        // }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStackScreen}
                options={{
                    //tabBarBadge: 15,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused, color, fontSize }) => (
                        <Ionicons
                            name="ios-home"
                            style={{ color, fontSize: 20 }}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileStackScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused, color, fontSize }) => (
                        <Ionicons name="md-person"
                            style={{ color, fontSize: 20 }}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Settings"
                component={SettingsStackScreen}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ focused, color, fontSize }) => (
                        <Ionicons
                            name="md-settings"
                            style={{ color, fontSize: 20 }}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}