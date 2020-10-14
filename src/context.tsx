// eslint-disable-next-line no-use-before-define
import React, { createContext, useContext } from 'react'

interface ContextState {
  authentication?: {
    name: string
    accessToken: string
    refreshToken: string
  }
}
interface ContextData {
  state: ContextState
  setState?: React.Dispatch<React.SetStateAction<ContextState>>
}

const initialContextState: ContextState = {
  authentication: undefined
}

const Context = createContext<ContextData>({
  state: initialContextState
})

export const ContextProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<ContextState>(initialContextState)
  return (
    <Context.Provider value={{ state, setState }}>{children}</Context.Provider>
  )
}

export function getContext(): ContextData {
  return useContext(Context)
}
