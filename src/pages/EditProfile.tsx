import { IonButton, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonLoading, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import firebaseApp from '../InitializeFirebase';
import { doc, FirestoreError, getFirestore, updateDoc } from 'firebase/firestore';
import { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { OldBookContext } from '../data/OldBookContext';
import './Theme.css';

const EditProfile: React.FC = () => {
  const oldBookCtx = useContext(OldBookContext);
  const {currUser} = oldBookCtx;
  const {currUserFirestore} = oldBookCtx;
  const history = useHistory();

  const db = getFirestore(firebaseApp);

  const nameInputRef = useRef<HTMLIonInputElement>(null);
  const addressInputRef = useRef<HTMLIonInputElement>(null);
  const phoneNumberInputRef = useRef<HTMLIonInputElement>(null);

  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);

  const spaceRegex = /\s/;
  const numberRegex = /^\d{12}$/

  const handleUpdateUserData = () => {
    let enteredName = nameInputRef.current?.value;
    let enteredAddress = addressInputRef.current?.value;
    let enteredPhoneNumber = phoneNumberInputRef.current?.value;

    // Check if input is empty:
    if (!enteredName || enteredName.toString().trim().length === 0) {
      oldBookCtx.showToast("Name input must be filled!");
      return;
    }
    if (!enteredAddress || enteredAddress.toString().trim().length === 0) {
      oldBookCtx.showToast("Address input must be filled!");
      return;
    }

    if (!enteredPhoneNumber || enteredPhoneNumber.toString().trim().length === 0) {
      oldBookCtx.showToast("Phone number input must be filled!");
      return;
    }

    // Check if input contains space:
    if (spaceRegex.test(enteredPhoneNumber.toString())) {
      oldBookCtx.showToast("Phone number cannot contain space!");
      return;
    }

    // Check if enteredPhoneNumber is a number:
    if (!numberRegex.test(enteredPhoneNumber.toString())) {
      oldBookCtx.showToast("Phone number input must be an 12 digit number!");
      return;
    }

    setIsLoadingOpen(true);
    updateDoc(doc(db, "users", currUser!.uid), {
      "name": enteredName.toString().trim(),
      "address": enteredAddress.toString().trim(),
      "phoneNumber": enteredPhoneNumber.toString().trim(),
    })
    .then(() => {
      setIsLoadingOpen(false);
      oldBookCtx.showToast("User data update successful!");
      history.length > 0 ? history.goBack() : history.replace("/tabs/profile");
    })
    .catch((error: FirestoreError) => {
      setIsLoadingOpen(false);
      oldBookCtx.showToast("Error updating user data: " + error.message);
    });
  }

  const handleCancel = () => {
    history.length > 0 ? history.goBack() : history.replace("/tabs/profile");
  }

  return (
    <IonPage id="profile">
      <IonHeader>
        <IonToolbar className="title">
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding-start ion-padding-end ion-padding-top">
        <IonLoading 
          isOpen={isLoadingOpen}
          spinner="crescent"
          keyboardClose={true}
          backdropDismiss={false}
          duration={0}
          showBackdrop={true}
        />

        <IonItem lines="none" className="info-profile">
          <IonLabel>NAME : </IonLabel>
          <IonInput 
            type="text" 
            value={currUserFirestore?.name}
            ref={nameInputRef}
            required={true}
          ></IonInput>
        </IonItem>

        <IonItem lines="none" className="info-profile">
          <IonLabel>ADDRESS : </IonLabel>
          <IonInput 
            type="text" 
            value={currUserFirestore?.address}
            ref={addressInputRef}
            required={true}  
          ></IonInput>
        </IonItem>

        <IonItem lines="none" className="info-profile">
          <IonLabel>PHONE NUMBER : </IonLabel>
          <IonInput 
            type="number" 
            value={currUserFirestore?.phoneNumber}
            ref={phoneNumberInputRef}
            required={true}
          ></IonInput>
        </IonItem>

        <IonItem lines="none" className="info-profile">
          <IonLabel>EMAIL : </IonLabel>
          <IonInput 
            type="email" 
            disabled 
            value={currUserFirestore?.email}></IonInput>
        </IonItem>

        <IonCol className="ion-text-center">
          <IonRow>
            <IonCol>
              <IonButton 
                className="btn1-profile"
                onClick={handleUpdateUserData}
              >
                SAVE
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton 
                className="btn2-profile" 
                onClick={handleCancel}
              >
                CANCEL
              </IonButton>
            </IonCol>
          </IonRow>
        </IonCol>
      </IonContent>
    </IonPage>
  );
};

export default EditProfile;
