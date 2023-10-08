import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonModal,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import './Tab1.css'
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces'
import { useRef, useState } from 'react'
import { Card } from '../components/Card/Card'
import { useAppContext } from '../hooks/useContext'
import { SERCICE, WATING } from '../constants/status'
import { v4 as uuid } from 'uuid'

const Tab1: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null)
  const [name, setName] = useState<string | null | undefined>('')
  const [type, setType] = useState()
  const { tickets, setTickets } = useAppContext()

  const handleTypeChange = (e: any) => {
    setType(e.detail.value)
  }

  function formatterTicket(type: 'SP' | 'SG' | 'SE') {
    const date = new Date()
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString().slice(-2)
    const sequence = (tickets.filter(issue => issue.type === type).length + 1)
      .toString()
      .padStart(2, '0')

    return `${year}${month}${day}-${type}${sequence}`
  }

  function confirm() {
    if (name && type) {
      modal.current?.dismiss({ name, type }, 'confirm')
      setName('')
      setType(undefined)
    }
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
      setTickets([
        ...tickets,
        {
          ID: uuid(),
          name: ev.detail.data.name,
          type: ev.detail.data.type,
          ticket: formatterTicket(ev.detail.data.type),
          status: WATING,
          createdAt: new Date(),
          updateAt: new Date()
        }
      ])
    }
  }

  function handleOnClickCallTicket() {
    const firistWating = tickets.find(ticket => ticket.status === WATING)

    const updateTickets = tickets.map(ticket =>
      ticket.ID === firistWating?.ID
        ? { ...ticket, status: SERCICE, updateAt: new Date() }
        : ticket
    )

    setTickets(updateTickets)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-header">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <IonTitle className="ion-title">Tickets</IonTitle>
            <IonButton id="open-modal" expand="block" color={'tertiary'}>
              Emitir Ticket
            </IonButton>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Senhas</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="ion-button-service">
          <IonButton
            id="open-modal"
            expand="block"
            color={'tertiary'}
            onClick={handleOnClickCallTicket}
          >
            Chamar Ticket
          </IonButton>
        </div>

        <div className="margin-top">
          <Card tickets={tickets} />
        </div>
      </IonContent>

      <IonModal
        ref={modal}
        trigger="open-modal"
        onWillDismiss={ev => onWillDismiss(ev)}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => modal.current?.dismiss()}>
                Cancelar
              </IonButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton strong={true} onClick={() => confirm()}>
                Emitir
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonInput
              value={name}
              onIonInput={e => setName(e.detail.value)}
              type="text"
              placeholder="Seu Nome"
              color={'tertiary'}
            />
          </IonItem>
          <IonText color="tertiary" style={{ textAlign: 'center' }}>
            <h3>Tipos de Ticket</h3>
          </IonText>
          <IonRadioGroup
            value={type}
            onIonChange={handleTypeChange}
            className="ion-radio-group"
          >
            <IonRadio value="SP" aria-label="Custom checkbox">
              Prioridade
            </IonRadio>
            <IonRadio value="SG" aria-label="Custom checkbox that is checked">
              Geral
            </IonRadio>
            <IonRadio value="SE" aria-label="Custom checkbox that is checked">
              Retirada de Exames
            </IonRadio>
          </IonRadioGroup>
        </IonContent>
      </IonModal>
    </IonPage>
  )
}

export default Tab1
