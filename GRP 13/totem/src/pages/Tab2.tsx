import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import './Tab2.css'
import { CardTable } from '../components/Card/CardTable'
import { useAppContext } from '../hooks/useContext'
import { SERCICE, WATING } from '../constants/status'

const Tab2: React.FC = () => {
  const { tickets } = useAppContext()

  function countTicketsIssued() {
    const countTicketsIssueSE = tickets.filter(
      ticket => ticket.type === 'SE'
    ).length
    const countTicketsIssueSP = tickets.filter(
      ticket => ticket.type === 'SP'
    ).length
    const countTicketsIssueSG = tickets.filter(
      ticket => ticket.type === 'SG'
    ).length

    return {
      countTicketsIssueSE,
      countTicketsIssueSP,
      countTicketsIssueSG
    }
  }

  function countTicketAttendance() {
    const countTicketsAttendanceSE = tickets.filter(
      ticket => ticket.type === 'SE' && ticket.status === SERCICE
    ).length
    const countTicketsAttendanceSP = tickets.filter(
      ticket => ticket.type === 'SP' && ticket.status === SERCICE
    ).length
    const countTicketsAttendanceSG = tickets.filter(
      ticket => ticket.type === 'SG' && ticket.status === SERCICE
    ).length

    return {
      countTicketsAttendanceSE,
      countTicketsAttendanceSP,
      countTicketsAttendanceSG
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Relatórios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Relatórios</IonTitle>
          </IonToolbar>
        </IonHeader>
        <CardTable
          title="Quantidade de Senhas Emitidas"
          countTicketsSE={countTicketsIssued().countTicketsIssueSE}
          countTicketsSP={countTicketsIssued().countTicketsIssueSP}
          countTicketsSG={countTicketsIssued().countTicketsIssueSG}
        />
        <CardTable
          title="Quantidade de Senhas Atendidadas"
          countTicketsSE={countTicketAttendance().countTicketsAttendanceSE}
          countTicketsSP={countTicketAttendance().countTicketsAttendanceSP}
          countTicketsSG={countTicketAttendance().countTicketsAttendanceSG}
        />
      </IonContent>
    </IonPage>
  )
}

export default Tab2
