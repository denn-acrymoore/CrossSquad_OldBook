import { IonButton, IonRow, IonCol, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonLabel, IonInput } from '@ionic/react';
import './Theme.css';

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen class="background">
        <IonRow className="ion-padding-start ion-padding-end">
          <IonCol className="ion-text-left">
            <p>OldBook</p>
          </IonCol>
          <IonCol className="ion-text-right">
            <u><h6><a href="/register">REGISTER</a></h6></u>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol className="ion-text-center padding text-login">
            <b><h1>LOGIN</h1></b>
          </IonCol>
        </IonRow>

        <IonCard className="card-login ion-padding-top ion-padding-bottom">
          <IonCardContent>
            <IonLabel className="text">Email</IonLabel>
            <IonInput type="email" className="input-login"></IonInput>

            <br />

            <IonLabel className="text">Password</IonLabel>
            <IonInput type="password" className="input-login"></IonInput>
          </IonCardContent>
        </IonCard>

        <br />

        <IonRow>
          <IonCol className="ion-text-center padding">
            <IonButton className="button-login" href="/tabs">
              LOGIN
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Login;
