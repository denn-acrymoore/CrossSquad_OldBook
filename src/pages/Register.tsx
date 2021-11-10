import { IonButton, IonRow, IonCol, IonContent, IonPage, IonCard, IonCardContent, IonLabel, IonInput } from '@ionic/react';
import './Theme.css';

const Register: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen class="background">
        <IonRow className="ion-padding-start ion-padding-end">
          <IonCol className="ion-text-left">
            <h5>OldBook</h5>
          </IonCol>
          <IonCol className="ion-text-right">
            <u><h6><a href="/login">LOGIN</a></h6></u>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol className="ion-text-center padding text-register">
            <b><h1>REGISTER</h1></b>
            <h5>Make your new account</h5>
          </IonCol>
        </IonRow>

        <IonCard className="card-register ion-padding-top ion-padding-bottom">
          <IonCardContent>
            <IonLabel className="text">Email</IonLabel>
            <IonInput type="email" className="input-register"></IonInput>

            <br />

            <IonLabel className="text">Password</IonLabel>
            <IonInput type="password" className="input-register"></IonInput>

            <br />

            <IonLabel className="text">Confirm Password</IonLabel>
            <IonInput type="password" className="input-register"></IonInput>

            <br />

            <IonLabel className="text">Name</IonLabel>
            <IonInput type="text" className="input-register"></IonInput>

            <br />

            <IonLabel className="text">Address</IonLabel>
            <IonInput type="text" className="input-register"></IonInput>

            <br />

            <IonLabel className="text">Phone Number</IonLabel>
            <IonInput type="text" className="input-register"></IonInput>
          </IonCardContent>
        </IonCard>

        <br />

        <IonRow>
          <IonCol className="ion-text-center padding">
            <IonButton className="button-register" href="/tabs">
              REGISTER
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Register;
