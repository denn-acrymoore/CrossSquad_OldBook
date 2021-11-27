import { IonButton, IonRow, IonCol, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonLabel, IonInput } from '@ionic/react';
import './Theme.css';

const Login: React.FC = () => {
  return (
    <IonPage id="login">
      <IonContent class="background" scrollY={false}>
        <IonRow className="nav1">
          <IonCol className="ion-text-left left-logo">
            <a>OldBook</a>
          </IonCol>
          <IonCol className="ion-text-right btn-to">
            <u><a href="/register">REGISTER</a></u>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol className="ion-text-center text-login">
            <b><h1>LOGIN</h1></b>
            <h5>Please login to proceed</h5>
          </IonCol>
        </IonRow>

        <IonCard className="card-login">
          <IonCardContent>
            <IonLabel className="text">Email</IonLabel>
            <IonInput type="email" className="input-login" id="here"></IonInput>

            <IonLabel className="text">Password</IonLabel>
            <IonInput type="password" className="input-login"></IonInput>
          </IonCardContent>
        </IonCard>

        <IonRow>
          <IonCol className="ion-text-center">
            <IonButton className="button-login" href="/tabs">
              SIGN IN
            </IonButton>
          </IonCol>
        </IonRow>

        <img src="assets/images/Background.png" />
      </IonContent>
    </IonPage>
  );
};

export default Login;
