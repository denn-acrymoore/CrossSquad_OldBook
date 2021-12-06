import { IonButton, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { getAuth, signOut } from 'firebase/auth';
import { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { OldBookContext, UserFirebase } from '../data/OldBookContext';
import { ActionSheet } from "@capacitor/action-sheet";
import './Theme.css';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import firebaseApp from '../InitializeFirebase';

const Profile: React.FC = () => {
  const oldBookCtx = useContext(OldBookContext);
  const {currUser} = oldBookCtx;
  const {currUserFirestore} = oldBookCtx;
  const history = useHistory();

  const auth = getAuth(firebaseApp);

  const handleLogout = async () => {
    const result = await ActionSheet.showActions({
      title: "Are you sure you want to logout?",
      options: [
        {
          title: "Yes"
        },
        {
          title: "No"
        }
      ],
    });

    if (result.index === 0) {
      signOut(auth).then(() => {
        oldBookCtx.showToast("Log out successful!");
        // Unsubscribing to listener and setting the functions to null:
        oldBookCtx.unregisterSellDataListener();
        oldBookCtx.unregisterShoppingCartDataListener();
        oldBookCtx.unregisterHomeDataListener();

        oldBookCtx.setUnregisterSellDataListener(() => () => {});
        oldBookCtx.setUnregisterShoppingCartDataListener(() => () => {});
        oldBookCtx.setUnregisterHomeDataListener(() => () => {});
        
        oldBookCtx.setCurrUserFirestore(null);

        history.replace("/welcome");
      }).catch((error) => {
        oldBookCtx.showToast("Error logging out user: " + error.message);
      });
    }
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
          <IonInput type="text" readonly value={currUserFirestore?.name}></IonInput>
        </IonItem>

        <IonItem lines="none" className="info-profile">
          <IonLabel>ADDRESS : </IonLabel>
          <IonInput type="text" readonly value={currUserFirestore?.address}></IonInput>
        </IonItem>

        <IonItem lines="none" className="info-profile">
          <IonLabel>PHONE NUMBER : </IonLabel>
          <IonInput type="number" readonly value={currUserFirestore?.phoneNumber}></IonInput>
        </IonItem>

        <IonItem lines="none" className="info-profile">
          <IonLabel>EMAIL : </IonLabel>
          <IonInput type="email" readonly value={currUserFirestore?.email}></IonInput>
        </IonItem>

        <IonCol className="ion-text-center">
          <IonRow>
            <IonCol>
              <IonButton 
                className="btn1-profile" 
                onClick={() => {history.push("/tabs/editprofile");}}
              >
                EDIT
              </IonButton>
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
