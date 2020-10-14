// eslint-disable-next-line no-use-before-define
import React from 'react'

import { ContextProvider } from './src/context'
import Routes from './src/routes'

const App: React.FC = () => {
  return (
    <ContextProvider>
      <Routes />
    </ContextProvider>
  )
}

export default App
