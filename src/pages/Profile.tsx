import { IonButton, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Theme.css';

const Profile: React.FC = () => {
  return (
    <IonPage id="profile">
      <IonHeader>
        <IonToolbar className="title">
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding-start ion-padding-end ion-padding-top">
        <IonItem lines="none" className="info-profile">
          <IonLabel>NAME : </IonLabel>
          <IonInput type="text" readonly value="Cantika"></IonInput>
        </IonItem>

        <IonItem lines="none" className="info-profile">
          <IonLabel>ADDRESS : </IonLabel>
          <IonInput type="text" readonly value="Jl. Kemayoran No. 127"></IonInput>
        </IonItem>

        <IonItem lines="none" className="info-profile">
          <IonLabel>PHONE NUMBER : </IonLabel>
          <IonInput type="number" readonly value="081247191991"></IonInput>
        </IonItem>

        <IonItem lines="none" className="info-profile">
          <IonLabel>EMAIL : </IonLabel>
          <IonInput type="email" readonly value="cantika@gmail.com"></IonInput>
        </IonItem>

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
