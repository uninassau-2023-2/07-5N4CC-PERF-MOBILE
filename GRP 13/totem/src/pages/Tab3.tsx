import {
  IonAlert,
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import './Tab3.css'

import Emanuel from '../assets/imgs/Emanuel.jpeg'
import Vini from '../assets/imgs/Vini.jpeg'
import Gui from '../assets/imgs/Gui.jpeg'
import Roberto from '../assets/imgs/Roberto.jpeg'
import Kawa from '../assets/imgs/Kawa.jpeg'
import Iza from '../assets/imgs/Iza.jpeg'
import Logo from '../assets/imgs/logo.png'

import { CardAbout } from '../components/Card/CardAbout'
import { TeamType } from '../types/TeamType'

const Tab3: React.FC = () => {
  const team: TeamType[] = [
    {
      name: 'José Emanuel SS Albuquerque',
      description: 'Estudante 4° Eng.Computação',
      matricula: '01518694',
      img: Emanuel
    },
    {
      name: 'Izabella ',
      description: 'Estudante 4° Eng.Computação',
      matricula: '01518694',
      img: Iza
    },
    {
      name: 'Vinícius Bezerra Cabral',
      description: 'Estudante 4° Eng.Computação',
      matricula: '01570940',
      img: Vini
    },
    {
      name: 'Roberto Gabriel Miranda',
      description: 'Estudante 4° Eng.Computação',
      matricula: '01535191',
      img: Roberto
    },
    {
      name: 'Kawã Vinicius Viana',
      description: 'Estudante 4° Eng.Computação',
      matricula: '01536599',
      img: Kawa
    },
    {
      name: 'Guilherme Moraes',
      description: 'Estudante 4° Eng.Computação',
      matricula: '01524207',
      img: Gui
    }
  ]

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sobre</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Sobre</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="center title-content">
          <IonAvatar className="avatar">
            <img src={Logo} alt="" />
          </IonAvatar>
          <IonTitle>UniAtende</IonTitle>
        </div>
        <CardAbout team={team} />
      </IonContent>
    </IonPage>
  )
}

export default Tab3
