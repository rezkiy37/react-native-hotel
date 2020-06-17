import 'react-native-gesture-handler'
import React, { useEffect, useMemo, useReducer, useState } from 'react'

import { AuthContext } from './components/Context'
import { StyleSheet, AsyncStorage, Alert } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import { TabScreen } from './Navigation/TabScreen'
import { Loading } from './screens/Loading'
import { AuthoStackScreen } from './screens/AuthoStackScreen'
import { HomeStackScreen } from './screens/HomeStackScreen'
import { ProfileStackScreen } from './screens/ProfileStackScreen'
import { SettingsStackScreen } from './screens/SettingsStackScreen'




//App component
export default function App() {

  const [activeUser, setActiveUser] = useState(null)
  const [isCorrectUser, setIsCorrectUser] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const authContext = useMemo(() => ({
    signIn: async (username, password) => {
      let keys = []
      let items = []

      try {
        keys = await AsyncStorage.getAllKeys()

        for (let i = 0; i < keys.length; i++) {
          let item = await AsyncStorage.getItem(keys[i])
          item = await JSON.parse(item)

          await items.push(item)
          items = await items.filter(item => item['username'] == username && item['password'] == password)

          if (items.length !== 0) {
            await setActiveUser(username)
            await AsyncStorage.setItem('activeUser', username)
          }
        }

        if (!activeUser) {
          await setIsCorrectUser(false)

          if (!isCorrectUser) {
            await Alert.alert('error')
          }
        }
      } catch (e) {
        console.log(e)
      }
    },

    signOut: async () => {
      try {
        await setActiveUser(null)
        await AsyncStorage.removeItem('activeUser')
      } catch (e) {
        console.log(e)
      }
    },

    signUp: async (username, password) => {

      let newUser = { username: username, password: password }
      let keys = []

      console.log(newUser)

      try {
        keys = await AsyncStorage.getAllKeys()
        await AsyncStorage.setItem(`user${keys.length + 1}`, JSON.stringify(newUser))
        await console.log('User Pair Data was saved!')
      } catch (e) {
        console.log(e)
      }
    },

    getActiveUser: () => {
      return activeUser
    },

  }), [])

  useEffect(() => {
    setTimeout(async () => {

      let keys = []

      try {
        keys = await AsyncStorage.getAllKeys()
        await console.log('keys ' + keys.length)

        let activeUser = await AsyncStorage.getItem('activeUser')

        if (activeUser !== null) {
          setActiveUser(activeUser)
        } else {
          setActiveUser(null)
        }

        await setIsLoading(false)
      } catch (e) {
        console.log(e)
      }
    }, 1000);
  }, [])

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {isLoading ? (
          <Loading />
        ) : activeUser ? (
          <TabScreen
            HomeStackScreen={() => <HomeStackScreen />}
            ProfileStackScreen={() => <ProfileStackScreen />}
            SettingsStackScreen={() => <SettingsStackScreen />}
          />
        ) : <AuthoStackScreen />
        }
      </NavigationContainer>
    </AuthContext.Provider>
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

