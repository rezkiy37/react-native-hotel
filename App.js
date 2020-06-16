import 'react-native-gesture-handler'
import React, { useEffect, useMemo, useReducer, useState } from 'react'

import { AuthContext } from './components/Context'
import { StyleSheet, AsyncStorage } from 'react-native'
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

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userPassword: null,
    userToken: null
  }

  const RETRIEVE_TOKEN = 'RETRIEVE_TOKEN'
  const LOGIN = 'LOGIN'
  const LOGOUT = 'LOGOUT'
  const REGISTER = 'REGISTER'

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case RETRIEVE_TOKEN:
        return {
          ...prevState,
          isLoading: false,
          userName: action.username
        }

      case LOGIN:
        return {
          ...prevState,
          isLoading: false,
          userName: action.username,
          userPassword: action.password,
        }

      case LOGOUT:
        return {
          ...prevState,
          isLoading: false,
          userName: null,
          userPassword: null,
          userToken: null,
        }

      case REGISTER:
        return {
          ...prevState,
          isLoading: false,
          userName: action.username,
          userPassword: action.password,
          //userToken: action.token,
        }
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)

  const authContext = useMemo(() => ({
    signIn: async (username, password) => {
      console.log(username)
      console.log(password)
      let keys = []

      try {
        keys = await AsyncStorage.getAllKeys()

        for (let i = 0; i < keys.length; i++) {
          let item = await AsyncStorage.getItem(keys[i])
          item = await JSON.parse(item)
          await console.log(item['username'])
          await console.log(item['password'])

          if (item['username'] == username && item['password'] == password) {
            console.log('SignIn')
            console.log(item['username'])
            console.log(item['password'])

            setActiveUser(username)
            AsyncStorage.setItem('activeUser', username)
          } else {
            console.log('Not correct!')
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
      dispatch({ type: LOGOUT })
    },

    signUp: async (username, password) => {

      let newUser = { username: username, password: password }
      let keys = []

      console.log(newUser)

      try {
        keys = await AsyncStorage.getAllKeys()
        await AsyncStorage.setItem(`user${keys.length + 1}`, JSON.stringify(newUser))
        await console.log('User Pair Data was saved!')

        //await setActiveUser(username)

        console.log(JSON.stringify(newUser))
      } catch (e) {
        console.log(e)
      }

      dispatch({ type: REGISTER, isLoading: false, username, password })
    },
    getActiveUser: () => {
      return activeUser
    }
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
          dispatch({ type: RETRIEVE_TOKEN, username: activeUser })
        } else {
          setActiveUser(null)
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
        ) : activeUser ? (
          <TabScreen
            HomeStackScreen={() => <HomeStackScreen />}
            ProfileStackScreen={() => <ProfileStackScreen activeUser={activeUser} />}
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

