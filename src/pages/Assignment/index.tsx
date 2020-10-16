import React from 'react'
import { View, Image } from 'react-native'
import { Text, Title, Subheading, Button, FAB } from 'react-native-paper'

import styles from './styles'

const Assignment: React.FC = () => {
  return (
    <View style={styles.container}>
      <Title>Nome da Tarefa</Title>
      <Subheading>Nome da Turma</Subheading>
      <Text>Data de Entrega</Text>

      <Button style={styles.button}>Abrir no Classroom</Button>
      <Button style={styles.button}>Abrir pasta no Drive</Button>
      <View>
        <Subheading>Fotos:</Subheading>
        <ListFileItem />
        <Button style={styles.button} mode="contained">
          Enviar fotos
        </Button>
      </View>
      <FAB icon="camera" style={styles.fab} />
    </View>
  )
}

interface ListFileItemProps {
  name: string
  size: number
  uri: string
  progress: string
}
const ListFileItem = () => {
  return (
    <View style={styles.photoContainer}>
      <Image
        style={styles.photo}
        source={{ uri: 'https://picsum.photos/200' }}
      />
      <View style={styles.photoSeccondContainer}>
        <Subheading>Nome da Imagem</Subheading>
        <Text>Tamanho:</Text>
        <Text>Progresso:</Text>
      </View>
    </View>
  )
}

export default Assignment
