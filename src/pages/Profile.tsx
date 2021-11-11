import { IonButton, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Theme.css';

const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="title">
          <IonTitle><b>Profile</b></IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding-start ion-padding-end">
        <br />

        <IonItem lines="none" className="info-profile">
          <IonLabel color="white">NAME: </IonLabel>
          <IonInput type="text" disabled value="Nama saya"></IonInput>
        </IonItem>

        <br />

        <IonItem lines="none" className="info-profile">
          <IonLabel>ADDRESS: </IonLabel>
          <IonInput type="text" disabled value="Bumi"></IonInput>
        </IonItem>

        <br />

        <IonItem lines="none" className="info-profile">
          <IonLabel>PHONE NUMBER: </IonLabel>
          <IonInput type="number" disabled value="12345678"></IonInput>
        </IonItem>

        <br />

        <IonItem lines="none" className="info-profile">
          <IonLabel>EMAIL: </IonLabel>
          <IonInput type="email" disabled value="saya@student.umn.ac.id"></IonInput>
        </IonItem>

        <br /><br />

        <IonCol className="ion-text-center">
          <IonRow>
            <IonCol>
              <IonButton className="btn1-profile" href="/tabs/editprofile">EDIT</IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton className="btn2-profile" href="/welcome">LOG OUT</IonButton>
            </IonCol>
          </IonRow>
        </IonCol>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
