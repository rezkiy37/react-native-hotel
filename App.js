import 'react-native-gesture-handler'
import React, { useEffect, useMemo, useReducer, } from 'react'

import { AuthContext } from './components/Context'
import { AsyncStorage, Alert } from 'react-native'
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
    activeUserName: null,
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
          activeUserName: action.activeUserName,
          activeUserToken: action.activeUserToken,
          activeUserBalance: action.activeUserBalance
        }

      case LOGIN:
        return {
          ...prevState,
          isLoading: false,
          isCorrectUser: true,
          activeUser: action.activeUser,
          activeUserName: action.activeUserName,
          activeUserToken: action.activeUserToken,
          activeUserBalance: action.activeUserBalance
        }

      case LOGOUT:
        return {
          ...prevState,
          isLoading: false,
          isCorrectUser: false,
          activeUser: null,
          activeUserName: null,
          activeUserToken: null,
          activeUserBalance: null
        }

      case REGISTER:
        return {
          ...prevState,
          isLoading: false,
          isCorrectUser: false,
          activeUser: null,
          activeUserName: null,
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

          if (keys.length > 0) {
            for (let i = 1; i <= keys.length; i++) {
              item = await AsyncStorage.getItem(`user${i}`)
              if (item) {
                let found = false

                item = JSON.parse(item)

                if (item['username'] == username && item['password'] == password) {
                  found = true
                  i = keys.length + 1

                  dispatch({
                    type: LOGIN,
                    activeUser: item['username'],
                    activeUserName: item['userName'],
                    activeUserToken: item['token'],
                    activeUserBalance: item['balance']
                  })

                  let userData = {
                    username,
                    activeUserName: item['userName'],
                    activeUserToken: item['token'],
                    activeUserBalance: item['balance']
                  }

                  userData = JSON.stringify(userData)

                  AsyncStorage.setItem('activeUser', userData)
                } else if (!found && i == keys.length) {
                  alert('Not suitable!')
                }
              }
            }
          } else {
            console.log('There is not any user!')
            alert('There is not any user!')
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

    signUp: async (userName, username, password) => {

      let keys = []
      let newUser

      if (userName && username && password) {
        try {
          keys = await AsyncStorage.getAllKeys()
          newUser = {
            userName,
            username,
            password,
            token: `user${keys.length + 1}`
          }

          await console.log(newUser)

          await AsyncStorage.setItem(`user${keys.length + 1}`, JSON.stringify(newUser))
          await console.log('User Pair Data was saved!')
        } catch (e) {
          console.log(e)
        }
      } else {
        alert('Enter all fields!')
      }
    },

    createBalance: async (token, balance) => {
      let balanceObj = { balance }
      let balanceObjActiveUser = { activeUserBalance: balance }
      let balanceToMerge = JSON.stringify(balanceObj)
      let balanceToMergeACtiveUser = JSON.stringify(balanceObjActiveUser)
      try {
        await AsyncStorage.mergeItem(token, balanceToMerge)
        await AsyncStorage.mergeItem('activeUser', balanceToMergeACtiveUser)
        await dispatch({ type: SET_BALANCE, activeUserBalance: balanceObj.balance })
      } catch (e) {
        console.log(e)
      }
    },

    addFunds: async (token, balance) => {
      let balanceObj = { balance }
      let balanceObjActiveUser = { activeUserBalance: balance }
      let balanceToMerge = JSON.stringify(balanceObj)
      let balanceToMergeACtiveUser = JSON.stringify(balanceObjActiveUser)
      try {
        await AsyncStorage.mergeItem(token, balanceToMerge)
        await AsyncStorage.mergeItem('activeUser', balanceToMergeACtiveUser)
        await dispatch({ type: SET_BALANCE, activeUserBalance: balanceObj.balance })
      } catch (e) {
        console.log(e)
      }
    },

    rentRoom: async (token, balance) => {
      let balanceObj = { balance }
      let balanceObjActiveUser = { activeUserBalance: balance }
      let balanceToMerge = JSON.stringify(balanceObj)
      let balanceToMergeACtiveUser = JSON.stringify(balanceObjActiveUser)
      try {
        await AsyncStorage.mergeItem(token, balanceToMerge)
        await AsyncStorage.mergeItem('activeUser', balanceToMergeACtiveUser)
        await dispatch({ type: SET_BALANCE, activeUserBalance: balanceObj.balance })
      } catch (e) {
        console.log(e)
      }
    },

    getActiveUser: () => {
      return loginState.activeUser
    },

    getActiveUserName: () => {
      return loginState.activeUserName
    },

    getToken: () => {
      return loginState.activeUserToken
    },

    getBalance: () => {
      return loginState.activeUserBalance
    },

  }), [loginState])

  useEffect(() => {
    setTimeout(async () => {
      let keys = []
      let activeUser

      try {
        keys = await AsyncStorage.getAllKeys()

        activeUser = await AsyncStorage.getItem('activeUser')
        activeUser = await JSON.parse(activeUser)

        console.log(activeUser)

        if (activeUser !== null) {
          dispatch({
            type: RETRIEVE_TOKEN,
            activeUser: activeUser['username'],
            activeUserName: activeUser['activeUserName'],
            activeUserToken: activeUser['activeUserToken'],
            activeUserBalance: activeUser['activeUserBalance']
          })
        } else {
          dispatch({ type: RETRIEVE_TOKEN })
        }
      } catch (e) {
        console.log(e)
      }
    }, 1000)
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
