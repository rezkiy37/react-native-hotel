import 'react-native-gesture-handler'
import React, { useState } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, AsyncStorage, View, Text } from 'react-native'

import { TabScreen } from './Navigation/TabScreen'
import { HomeStackScreen } from './screens/HomeStackScreen'
import { HomeScreen } from './screens/HomeScreen'
import { ProfileStackScreen } from './screens/ProfileStackScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { SettingsScreen } from './screens/SettingsScreen'
import { SettingsStackScreen } from './screens/SettingsStackScreen'
import { LoginStackScreen } from './screens/LoginStackScreen'
import { LoginScreen } from './screens/LoginScreen'


function Loading() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  )
}

//App component
export default function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const setToken = async value => {
    await setLogin(value)
    await AsyncStorage.setItem('username', value)
  }

  const getToken = async () => {
    let keys = []
    //AsyncStorage.clear()
    keys = await AsyncStorage.getAllKeys()
    await console.log(keys)
  }

  return (
    <NavigationContainer>
      {isLoading ? (
        <Loading />
      ) : user ? (
        <LoginStackScreen LoginScreen={() => <LoginScreen />} />
      ) : <TabScreen
            HomeStackScreen={() => <HomeStackScreen HomeScreen={() => <HomeScreen />} />}
            ProfileStackScreen={() => <ProfileStackScreen ProfileScreen={() => <ProfileScreen />} />}
            SettingsStackScreen={() => <SettingsStackScreen SettingsScreen={() => <SettingsScreen />} />}
          />}
    </NavigationContainer>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff'
  }
})

