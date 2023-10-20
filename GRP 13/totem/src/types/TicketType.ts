type TicketType = {
  ID: string
  name: string
  ticket: string
  type: 'SP' | 'SG' | 'SE'
  status: string
  createdAt: Date
  updateAt: Date
}

export type {
  TicketType
}