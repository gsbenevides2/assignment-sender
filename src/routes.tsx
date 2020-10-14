// eslint-disable-next-line no-use-before-define
import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Assignment from './pages/Assignment'
import Assignments from './pages/Assignments'
import Login from './pages/Login'

const Routes: React.FC = () => {
  const Stack = createStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          options={{
            headerShown: false
          }}
          component={Login}
        />
        <Stack.Screen
          name="assignments"
          options={{ title: 'Carregando' }}
          component={Assignments}
        />
        <Stack.Screen
          name="assignment"
          options={{ title: 'Nome da Tarefa' }}
          component={Assignment}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
