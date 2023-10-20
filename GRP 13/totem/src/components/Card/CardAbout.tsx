import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle
} from '@ionic/react'
import './Card.css'
import { TeamType } from '../../types/TeamType'

export interface CardAboutProps {
  team: TeamType[]
}

function CardAbout(props: CardAboutProps) {
  return props.team.map(member => (
    <IonCard className="flex">
      <IonAvatar style={{ marginTop: '0.5rem' }}>
        <img alt="Silhouette of mountains" src={member.img} />
      </IonAvatar>
      <IonCardHeader>
        <IonCardTitle>{member.name}</IonCardTitle>
        <IonCardSubtitle>{member.matricula}</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>{member.description}</IonCardContent>
    </IonCard>
  ))
}
export { CardAbout }
