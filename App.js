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
    activeUserToken: null,
    activeUserBalance: null
  }

  const RETRIEVE_TOKEN = 'RETRIEVE_TOKEN'
  const LOGIN = 'LOGIN'
  const LOGOUT = 'LOGOUT'
  const REGISTER = 'REGISTER'
  const SET_BALANCE = 'SET_BALANCES'

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case RETRIEVE_TOKEN:
        return {
          ...prevState,
          isLoading: false,
          activeUser: action.activeUser,
          activeUserToken: action.activeUserToken,
          activeUserBalance: action.activeUserBalance
        }

      case LOGIN:
        return {
          ...prevState,
          isLoading: false,
          isCorrectUser: true,
          activeUser: action.activeUser,
          activeUserToken: action.activeUserToken,
          activeUserBalance: action.activeUserBalance
        }

      case LOGOUT:
        return {
          ...prevState,
          isLoading: false,
          isCorrectUser: false,
          activeUser: null,
          activeUserToken: null,
          activeUserBalance: null
        }

      case REGISTER:
        return {
          ...prevState,
          isLoading: false,
          isCorrectUser: false,
          activeUser: null,
          activeUserToken: null
        }

      case SET_BALANCE:
        return {
          ...prevState,
          activeUserBalance: action.activeUserBalance
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

              console.log(item)

              if (item['username'] == username && item['password'] == password) {
                i = keys.length + 1

                dispatch({ type: LOGIN, activeUser: item['username'], activeUserToken: item['token'], activeUserBalance: item['count'] })
                console.log(loginState)

                let userData = { username, activeUserToken: item['token'], activeUserBalance: item['count'] }
                userData = JSON.stringify(userData)

                console.log(userData)

                AsyncStorage.setItem('activeUser', userData)
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

      let keys = []
      let newUser

      try {
        keys = await AsyncStorage.getAllKeys()
        newUser = { username, password, token: `user${keys.length + 1}` }

        await console.log(newUser)

        await AsyncStorage.setItem(`user${keys.length + 1}`, JSON.stringify(newUser))
        await console.log('User Pair Data was saved!')
      } catch (e) {
        console.log(e)
      }
    },

    createBalance: async (token, count) => {
      let balance = { count }
      let balanceToState = balance.count
      balance = JSON.stringify(balance)
      try {
        await AsyncStorage.mergeItem(token, balance)
        await dispatch({ type: SET_BALANCE, activeUserBalance: balanceToState })
      } catch (e) {
        console.log(e)
      }
    },

    addFunds: async (token, count) => {
      let balance = { count }
      let balanceToState = balance.count
      balance = JSON.stringify(balance)
      try {
        await AsyncStorage.mergeItem(token, balance)
        await dispatch({ type: SET_BALANCE, activeUserBalance: balanceToState })
      } catch (e) {
        console.log(e)
      }
    },

    getActiveUser: () => {
      return loginState.activeUser
    },

    getToken: () => {
      return loginState.activeUserToken
    },

    getBalance: () => {
      return loginState.activeUserBalance
    },


    checkState: () => {
      console.log(loginState)
    },

  }), [loginState])

  useEffect(() => {
    console.log(loginState.activeUserBalance)
    setTimeout(async () => {
      let keys = []
      let activeUser

      try {
        keys = await AsyncStorage.getAllKeys()

        activeUser = await AsyncStorage.getItem('activeUser')
        activeUser = await JSON.parse(activeUser)

        await console.log(activeUser)

        if (activeUser !== null) {
          dispatch({
            type: RETRIEVE_TOKEN,
            activeUser: activeUser['username'],
            activeUserToken: activeUser['activeUserToken'],
            activeUserBalance: activeUser['activeUserBalance']
          })
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
