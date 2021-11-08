import { IonButton, IonGrid, IonRow, IonCol, IonFab, IonContent, IonImg, IonPage } from '@ionic/react';
import './Theme.css';

const Welcome: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen className="background">

        <br /><br /><br />

        <IonCol>
          <IonRow>
            <IonCol className="ion-text-center padding text-welcome">
              <h6>WELCOME TO</h6>
              <b><h1>OldBook</h1></b>
            </IonCol>
          </IonRow>

          <br /><br /><br /><br />

          <IonRow>
            <IonCol className="ion-text-center padding">
              <IonButton className="button-welcome" href="/login">
                LOGIN
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center padding">
              <IonButton className="button-welcome" href="/register">
                REGISTER
              </IonButton>
            </IonCol>
          </IonRow>
        </IonCol>


      </IonContent>
    </IonPage>
  );
};

export default Welcome;
