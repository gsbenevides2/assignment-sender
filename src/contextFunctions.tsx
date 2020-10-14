import AsyncStorage from '@react-native-community/async-storage'

// AsyncStorage.clear()

export async function setAuthenticationData(
  name: string,
  accessToken: string,
  refreshToken: string
): Promise<{
  authentication: {
    name: string
    accessToken: string
    refreshToken: string
  }
}> {
  const authentication = {
    name,
    accessToken,
    refreshToken
  }
  await AsyncStorage.setItem('authentication', JSON.stringify(authentication))
  return {
    authentication
  }
}

export async function getAuthenticationData(): Promise<{
  authentication?: {
    name: string
    accessToken: string
    refreshToken: string
  }
}> {
  const authenticationData = await AsyncStorage.getItem('authentication')

  return {
    authentication: authenticationData
      ? JSON.parse(authenticationData)
      : undefined
  }
}
