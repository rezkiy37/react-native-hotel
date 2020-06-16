import 'react-native-gesture-handler'
import React, { useEffect, useMemo, useReducer } from 'react'

import { AuthContext } from './components/Context'
import { StyleSheet, AsyncStorage } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import { TabScreen } from './Navigation/TabScreen'
import { Loading } from './screens/Loading'
import { LoginStackScreen } from './screens/LoginStackScreen'
import { HomeStackScreen } from './screens/HomeStackScreen'
import { ProfileStackScreen } from './screens/ProfileStackScreen'
import { SettingsStackScreen } from './screens/SettingsStackScreen'




//App component
export default function App() {

  const initialLoginState = {
    isLoading: true,
    userName: null,
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
          userToken: action.token
        }

      case LOGIN:
        return {
          ...prevState,
          isLoading: false,
          userName: action.id,
          userToken: action.token,
        }

      case LOGOUT:
        return {
          ...prevState,
          isLoading: false,
          userName: null,
          userToken: null,
        }

      case REGISTER:
        return {
          ...prevState,
          isLoading: false,
          userName: action.id,
          userToken: action.token,
        }
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)

  const authContext = useMemo(() => ({
    signIn: async (userName, password) => {
      let userToken
      userToken = null

      if (userName == 'user' && password == 'qwerty') {
        try {
          console.log('Log!')

          userToken = 'exampleToken'
          await AsyncStorage.setItem('userToken', userToken)
        } catch (e) {
          console.log(e)
        }
      } else {
        console.log('Error')
      }

      dispatch({ type: LOGIN, token: userToken })
    },

    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken')
      } catch (e) {
        console.log(e)
      }
      dispatch({ type: LOGOUT })
    },

    signUp: (userName, password) => {
      console.log(userName, password)
      dispatch({ type: REGISTER, isLoading: false, id: userName, token: password })
    },
  }), [])

  useEffect(() => {
    setTimeout(async () => {
      let userToken
      userToken = null
      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch (e) {
        console.log(e)
      }
      dispatch({ type: RETRIEVE_TOKEN, token: userToken })
    }, 1000);
  }, [])


  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.isLoading ? (
          <Loading />
        ) : loginState.userToken ? (
          <TabScreen
            HomeStackScreen={() => <HomeStackScreen />}
            ProfileStackScreen={() => <ProfileStackScreen />}
            SettingsStackScreen={() => <SettingsStackScreen />}
          />
        ) : <LoginStackScreen />
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

