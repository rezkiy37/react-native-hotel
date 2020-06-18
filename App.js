import 'react-native-gesture-handler'
import React, { useEffect, useMemo, useReducer, useState, useContext } from 'react'

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

  const initialLoginState = {
    isLoading: true,
    isCorrectUser: false,
    activeUser: null,
  }

  const RETRIEVE_TOKEN = 'RETRIEVE_TOKEN'
  const LOGIN = 'LOGIN'
  const LOGOUT = 'LOGOUT'
  const REGISTER = 'REGISTER'
  const CHANGE = 'CHANGE'

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case RETRIEVE_TOKEN:
        return {
          ...prevState,
          isLoading: false,
          activeUser: action.activeUser
        }

      case LOGIN:
        return {
          ...prevState,
          isLoading: false,
          isCorrectUser: true,
          activeUser: action.activeUser,
        }

      case LOGOUT:
        return {
          ...prevState,
          isLoading: false,
          isCorrectUser: false,
          activeUser: null,
        }

      case REGISTER:
        return {
          ...prevState,
          isLoading: false,
          activeUser: null,
          isCorrectUser: false,
        }

      case CHANGE:
        return {
          ...prevState,
          isCorrectUser: action.isCorrectUser,
        }
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)

  const authContext = useMemo(() => ({
    signIn: async (username, password) => {
      let keys = []
      let item

      if (username && password) {
        try {
          keys = await AsyncStorage.getAllKeys()

          for (let i = 1; i <= keys.length; i++) {
            item = await AsyncStorage.getItem(`user${i}`)

            if (item) {
              item = JSON.parse(item)

              if (item['username'] == username && item['password'] == password) {
                i = keys.length + 1

                dispatch({ type: LOGIN, activeUser: item['username'] })

                AsyncStorage.setItem('activeUser', username)
              }
            }
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        alert('Enter data!')
      }
    },

    signOut: async () => {
      try {
        await AsyncStorage.removeItem('activeUser')
        await dispatch({ type: LOGOUT })
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
      return loginState.activeUser
    },
  }), [loginState])

  useEffect(() => {
    setTimeout(async () => {
      let keys = []

      try {
        keys = await AsyncStorage.getAllKeys()
        await console.log('keys ' + keys.length)

        let activeUser = await AsyncStorage.getItem('activeUser')

        if (activeUser !== null) {
          dispatch({ type: RETRIEVE_TOKEN, activeUser })
        } else {
          dispatch({ type: RETRIEVE_TOKEN })
        }
      } catch (e) {
        console.log(e)
      }
    }, 1000);
  }, [])

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.isLoading ? (
          <Loading />
        ) : loginState.activeUser ? (
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
