// eslint-disable-next-line no-use-before-define
import React, { useCallback, useState, useEffect } from 'react'
import { View } from 'react-native'
import {
  Button,
  Title,
  Subheading,
  ActivityIndicator
} from 'react-native-paper'

import { useNavigation, CommonActions } from '@react-navigation/native'
import * as GoogleLogin from 'expo-google-app-auth'

import { getContext } from '../../context'
import {
  setAuthenticationData,
  getAuthenticationData
} from '../../contextFunctions'
import styles from './styles'

const Login: React.FC = () => {
  const [logging, setLogging] = useState(true)
  const context = getContext()
  const navigation = useNavigation()

  function sendToAssignmentsScreen() {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: 'assignments' }]
      })
    )
  }
  const loginHandle = useCallback(async () => {
    setLogging(true)
    const result = await GoogleLogin.logInAsync({
      androidClientId:
        '275309435614-ajrrs659q45tjnrc08hufrmf92kei25n.apps.googleusercontent.com',
      scopes: [
        'openid',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/classroom.courses.readonly',
        'https://www.googleapis.com/auth/classroom.student-submissions.me.readonly'
      ]
    })
    if (result.type === 'success') {
      const { accessToken, refreshToken } = result
      const name = result.user.givenName as string
      context.setState?.(
        await setAuthenticationData(
          name,
          accessToken as string,
          refreshToken as string
        )
      )
      sendToAssignmentsScreen()
    } else if ((result.type = 'cancel')) {
      setLogging(false)
    } else {
      setLogging(false)
    }
  }, [])

  useEffect(() => {
    async function loadData() {
      const authenticationData = await getAuthenticationData()
      if (authenticationData.authentication) {
        context.setState?.(authenticationData)
        sendToAssignmentsScreen()
      } else {
        setLogging(false)
      }
    }
    loadData()
  }, [])
  if (logging) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={50} />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Title>Olá seja bem-vindo</Title>
        <Subheading>Faça login no Google para continuar</Subheading>
        <Button
          onPress={loginHandle}
          style={styles.loginButton}
          mode="contained"
        >
          Entrar
        </Button>
      </View>
    )
  }
}

export default Login
