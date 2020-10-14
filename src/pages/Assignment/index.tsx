import React from 'react'
import { View, Image } from 'react-native'
import {
  Text,
  Title,
  Subheading,
  Paragraph,
  Button,
  FAB
} from 'react-native-paper'

import styles from './styles'

const Assignment: React.FC = () => {
  return (
    <View style={styles.container}>
      <Title>Nome da Tarefa</Title>
      <Subheading>Nome da Turma</Subheading>
      <Text>Data de Entrega</Text>

      <Button style={styles.button} mode="contained">
        Abrir no Classroom
      </Button>
      <Button style={styles.button} mode="contained">
        Abrir pasta no Drive
      </Button>

      <View>
        <ListItem />
      </View>
      <FAB icon="camera" style={styles.fab} />
    </View>
  )
}

const ListItem = () => {
  return (
    <View style={styles.photoContainer}>
      <Image
        style={styles.photo}
        source={{ uri: 'https://picsum.photos/200' }}
      />
      <View style={styles.photoSeccondContainer}>
        <Subheading>Nome da Imagem</Subheading>
        <Text>Tamanho</Text>
        <View style={styles.photoActionsArea}>
          <Button icon="pencil" />
          <Button icon="cursor-text" />
        </View>
      </View>
    </View>
  )
}

export default Assignment
