import React, { createContext } from 'react'
import { TicketType } from '../types/TicketType'

type AppContextType = {
  tickets: TicketType[]
  setTickets: React.Dispatch<React.SetStateAction<TicketType[]>>
}

interface InitialValues {
  tickets: TicketType[]
  setTickets: () => void
}

const initialValues: InitialValues = {
  tickets: [],
  setTickets: () => {}
}

export const AppContext = createContext<AppContextType>(initialValues)
