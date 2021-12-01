import { IonButton, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { getAuth, signOut } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { OldBookContext } from '../data/OldBookContext';
import './Theme.css';

const Profile: React.FC = () => {
  const oldBookCtx = useContext(OldBookContext);
  const {currUser} = oldBookCtx;
  const history = useHistory();

  const auth = getAuth();
  
  // If user not signed in, navigate to welcome page:
  useEffect(() => {    
    if (currUser === null) {
        history.replace("/");
    }
  }, [currUser]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      oldBookCtx.showToast("Sign out successful!");
    }).catch((error) => {
      oldBookCtx.showToast("Error logging out user: " + error.message);
    });
  }

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
              <IonButton 
                className="btn2-profile" 
                onClick={handleLogout}
              >
                LOG OUT
              </IonButton>
            </IonCol>
          </IonRow>
        </IonCol>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
