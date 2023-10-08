import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle
} from '@ionic/react'

interface CardTableProps {
  title: string
  countTicketsSE: number
  countTicketsSG: number
  countTicketsSP: number
}

const CardTable = (props: CardTableProps) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle className="ion-text-center">{props.title}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: '25%' }}>SP</th>
              <th style={{ width: '25' }}>SG</th>
              <th style={{ width: '25' }}>SE</th>
              <th style={{ width: '25' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="ion-text-center">{props.countTicketsSP}</td>
              <td className="ion-text-center">{props.countTicketsSG}</td>
              <td className="ion-text-center">{props.countTicketsSE}</td>
              <td className="ion-text-center">
                {props.countTicketsSE +
                  props.countTicketsSG +
                  props.countTicketsSP}
              </td>
            </tr>
          </tbody>
        </table>
      </IonCardContent>
    </IonCard>
  )
}

export { CardTable }
