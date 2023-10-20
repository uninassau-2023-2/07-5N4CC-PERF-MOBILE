import { ReactNode, useState } from 'react'
import { AppContext } from './AppContext'
import { TicketType } from '../types/TicketType'

interface AppProvider {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProvider) => {
  const [tickets, setTickets] = useState<TicketType[]>([])

  return (
    <AppContext.Provider value={{ tickets, setTickets }}>
      {children}
    </AppContext.Provider>
  )
}
