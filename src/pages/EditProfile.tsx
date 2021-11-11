import { IonButton, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Theme.css';

const EditProfile: React.FC = () => {
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
          <IonInput type="text" value="Nama saya"></IonInput>
        </IonItem>

        <br />

        <IonItem lines="none" className="info-profile">
          <IonLabel>ADDRESS: </IonLabel>
          <IonInput type="text" value="Bumi"></IonInput>
        </IonItem>

        <br />

        <IonItem lines="none" className="info-profile">
          <IonLabel>PHONE NUMBER: </IonLabel>
          <IonInput type="number" value="12345678"></IonInput>
        </IonItem>

        <br />

        <IonItem lines="none" className="info-profile">
          <IonLabel>EMAIL: </IonLabel>
          <IonInput type="email" value="saya@student.umn.ac.id"></IonInput>
        </IonItem>

        <br /><br />

        <IonCol className="ion-text-center">
          <IonRow>
            <IonCol>
              <IonButton className="btn1-profile" href="/tabs/profile">SAVE</IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton className="btn2-profile" href="/tabs/profile">CANCEL</IonButton>
            </IonCol>
          </IonRow>
        </IonCol>
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
