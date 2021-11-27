import { IonButton, IonRow, IonCol, IonContent, IonPage, IonCard, IonCardContent, IonLabel, IonInput } from '@ionic/react';
import './Theme.css';

const Register: React.FC = () => {
  return (
    <IonPage>
      <IonContent class="background">
        <IonRow className="nav1">
          <IonCol className="ion-text-left left-logo">
            <a>OldBook</a>
          </IonCol>
          <IonCol className="ion-text-right btn-to">
            <u><a href="/login">LOGIN</a></u>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol className="ion-text-center text-register">
            <b><h1>REGISTER</h1></b>
            <h5>Make your new account</h5>
          </IonCol>
        </IonRow>

        <IonCard className="card-register">
          <IonCardContent>
            <IonLabel className="text">Email</IonLabel>
            <IonInput type="email" className="input-register"></IonInput>

            <IonLabel className="text">Password</IonLabel>
            <IonInput type="password" className="input-register"></IonInput>

            <IonLabel className="text">Confirm Password</IonLabel>
            <IonInput type="password" className="input-register"></IonInput>

            <IonLabel className="text">Name</IonLabel>
            <IonInput type="text" className="input-register"></IonInput>

            <IonLabel className="text">Address</IonLabel>
            <IonInput type="text" className="input-register"></IonInput>

            <IonLabel className="text">Phone Number</IonLabel>
            <IonInput type="text" className="input-register" id="here"></IonInput>
          </IonCardContent>
        </IonCard>

        <IonRow>
          <IonCol className="ion-text-center padding">
            <IonButton className="button-register" href="/tabs">
              SIGN UP
            </IonButton>
          </IonCol>
        </IonRow>

        <img src="assets/images/Background.png" />
      </IonContent>
    </IonPage>
  );
};

export default Register;
