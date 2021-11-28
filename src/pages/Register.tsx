import { IonButton, IonRow, IonCol, IonContent, IonPage, IonCard, IonCardContent, IonLabel, IonInput } from '@ionic/react';
import './Theme.css';

import firebaseApp from '../InitializeFirebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useHistory } from 'react-router';
import { useContext, useRef } from 'react';
import { OldBookContext } from '../data/OldBookContext';

const Register: React.FC = () => {
  const history = useHistory();

  const emailInputRef = useRef<HTMLIonInputElement>(null);
  const passInputRef = useRef<HTMLIonInputElement>(null);
  const confirmPassInputRef = useRef<HTMLIonInputElement>(null);
  const nameInputRef = useRef<HTMLIonInputElement>(null);
  const addressInputRef = useRef<HTMLIonInputElement>(null);
  const phoneNumberInputRef = useRef<HTMLIonInputElement>(null);

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const user = auth.currentUser;

  // Check if user already signed-in:
  if (user) {
    // User is signed in
    history.replace("/tabs/home");
  }

  const oldBookCtx = useContext(OldBookContext);

  const handleRegister = async () =>
  {
    let enteredEmail = emailInputRef.current?.value;
    let enteredPass = passInputRef.current?.value;
    let enteredConfirmPass = confirmPassInputRef.current?.value;
    let enteredName = nameInputRef.current?.value;
    let enteredAddress = addressInputRef.current?.value;
    let enteredPhoneNumber = phoneNumberInputRef.current?.value;

    // Check if input is empty:
    if (!enteredEmail || enteredEmail.toString().trim().length === 0) {
      oldBookCtx.showToast("Email input must be filled!");
      return;
    }

    if (!enteredPass || enteredPass.toString().trim().length === 0) {
      oldBookCtx.showToast("Password input must be filled!");
      return;
    }

    if (!enteredConfirmPass || enteredConfirmPass.toString().trim().length === 0) {
      oldBookCtx.showToast("Confirm password input must be filled!");
      return;
    }

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

    // Trim regular input:


    // Check if enteredPhoneNumber is a number:
    if (Number(enteredPhoneNumber) === NaN) {
      oldBookCtx.showToast("Phone number input must be numeric!");
      return;
    }
  }

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
            <IonInput 
              type="email" 
              className="input-register"
              ref={ emailInputRef }
              required={true}
            ></IonInput>

            <IonLabel className="text">Password</IonLabel>
            <IonInput 
              type="password" 
              className="input-register"
              ref={ passInputRef }
              required={true}
            ></IonInput>

            <IonLabel className="text">Confirm Password</IonLabel>
            <IonInput 
              type="password" 
              className="input-register"
              ref={ confirmPassInputRef } 
              required={true}
            ></IonInput>

            <IonLabel className="text">Name</IonLabel>
            <IonInput 
              type="text" 
              className="input-register"
              ref={ nameInputRef }  
              required={true}
            ></IonInput>

            <IonLabel className="text">Address</IonLabel>
            <IonInput 
              type="text" 
              className="input-register"
              ref={ addressInputRef }
              required={true}
            ></IonInput>

            <IonLabel className="text">Phone Number</IonLabel>
            <IonInput 
              type="text" 
              className="input-register" 
              id="here"
              ref={ phoneNumberInputRef }
              required={true}
            ></IonInput>
          </IonCardContent>
        </IonCard>

        <IonRow>
          <IonCol className="ion-text-center padding">
            <IonButton 
              className="button-register" 
              onClick={ handleRegister }
              type='submit'
            >
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
