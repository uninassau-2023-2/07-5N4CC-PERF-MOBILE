import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent
} from '@ionic/react'
import { TicketType } from '../../types/TicketType'
import { SERCICE } from '../../constants/status'

interface CardProps {
  tickets: TicketType[]
}

const Card = (props: CardProps) => {
  const lastTickets = props.tickets
    .filter(ticket => ticket.status === SERCICE)
    .sort((a, b) => b.updateAt.getTime() - a.updateAt.getTime())
    .slice(0, 5)

  function decodeType(type: 'SP' | 'SG' | 'SE') {
    if (type === 'SE') {
      return 'Retirada de Exames'
    }

    if (type === 'SG') {
      return 'Geral'
    }

    if (type === 'SP') {
      return 'Priotitária'
    }
  }

  function decodeColor(type: 'SP' | 'SG' | 'SE') {
    if (type === 'SE') {
      return 'warning'
    }

    if (type === 'SG') {
      return 'primary'
    }

    if (type === 'SP') {
      return 'danger'
    }
  }

  return lastTickets.map((ticket, index) => (
    <IonCard key={index} color={decodeColor(ticket.type)}>
      <IonCardHeader>
        <IonCardTitle>{ticket.name}</IonCardTitle>
        <IonCardSubtitle>
          {`${ticket.ticket} - ${decodeType(ticket.type)}`}
        </IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>Atendimento no Ginche {index + 1}</IonCardContent>
    </IonCard>
  ))
}

export { Card }
