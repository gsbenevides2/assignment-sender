import React, { useEffect, useCallback } from 'react'
import { View, Text } from 'react-native'
import { List, Title } from 'react-native-paper'

import { useNavigation } from '@react-navigation/native'

import styles from './styles'

const Assignments: React.FC = () => {
  const navigation = useNavigation()

  const handleAssignmentItem = useCallback(() => {
    navigation.navigate('assignment')
  }, [])
  useEffect(() => {
    function loadHeaderBar() {
      navigation.setOptions({ title: 'Olá Nome do Usuario' })
    }
    loadHeaderBar()
  }, [])
  return (
    <View>
      <List.Item
        title="Nome da tarefa"
        description="Nome da Turma"
        left={props => <List.Icon {...props} icon="clipboard-text" />}
        onPress={handleAssignmentItem}
      />
    </View>
  )
}

export default Assignments
