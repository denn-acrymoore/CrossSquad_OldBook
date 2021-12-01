import { IonButton, IonRow, IonCol, IonContent, IonPage, IonCard, IonCardContent, IonLabel, IonInput } from '@ionic/react';
import './Theme.css';

import firebaseApp from '../InitializeFirebase';
import { getAuth, createUserWithEmailAndPassword, UserCredential, AuthError, onAuthStateChanged } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useHistory } from 'react-router';
import { useContext, useEffect, useRef } from 'react';
import { OldBookContext } from '../data/OldBookContext';

const Register: React.FC = () => {
  const oldBookCtx = useContext(OldBookContext);
  const {currUser} = oldBookCtx;
  const history = useHistory();
  
  // If already signed in, navigate to main page:
  useEffect(() => {    
    if (currUser != null) {
        history.replace("/tabs");
    }
}, [currUser]);

  const emailInputRef = useRef<HTMLIonInputElement>(null);
  const passInputRef = useRef<HTMLIonInputElement>(null);
  const confirmPassInputRef = useRef<HTMLIonInputElement>(null);
  const nameInputRef = useRef<HTMLIonInputElement>(null);
  const addressInputRef = useRef<HTMLIonInputElement>(null);
  const phoneNumberInputRef = useRef<HTMLIonInputElement>(null);

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  const handleRegister = () =>
  {
    let enteredEmail = emailInputRef.current?.value;
    let enteredPass = passInputRef.current?.value;
    let enteredConfirmPass = confirmPassInputRef.current?.value;
    let enteredName = nameInputRef.current?.value;
    let enteredAddress = addressInputRef.current?.value;
    let enteredPhoneNumber = phoneNumberInputRef.current?.value;

    const spaceRegex = /\s/;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // Check if input is empty:
    if (!enteredEmail || enteredEmail.toString().length === 0) {
      oldBookCtx.showToast("Email input must be filled!");
      return;
    }

    if (!enteredPass || enteredPass.toString().length === 0) {
      oldBookCtx.showToast("Password input must be filled!");
      return;
    }

    if (!enteredConfirmPass || enteredConfirmPass.toString().length === 0) {
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

    // Check if input contains space:
    if (spaceRegex.test(enteredEmail.toString())) {
      oldBookCtx.showToast("Email input cannot contain space!");
      return;
    }

    if (spaceRegex.test(enteredPass.toString())) {
      oldBookCtx.showToast("Password input cannot contain space!");
      return;
    }

    if (spaceRegex.test(enteredConfirmPass.toString())) {
      oldBookCtx.showToast("Confirm password input cannot contain space!");
      return;
    }

    // Check if email valid:
    if (!emailRegex.test(enteredEmail.toString())) {
      oldBookCtx.showToast("Invalid email address!");
      return;
    }

    // Check if enteredPhoneNumber is a number:
    if (Number(enteredPhoneNumber) === NaN) {
      oldBookCtx.showToast("Phone number input must be numeric!");
      return;
    }

    createUserWithEmailAndPassword(auth, enteredEmail.toString(), enteredPass.toString())
      .then((userCredential: UserCredential) => {
        oldBookCtx.showToast("Registration successful!");
        history.replace("/tabs");
      })
      .catch((error: AuthError) =>  {
        if (error.code === "auth/email-already-in-use") {
          console.log("Error: Email already registered!");
          oldBookCtx.showToast("Error: Email already registered!");
        }
        else {
          console.log("Error registering new account: " + error.message);
          oldBookCtx.showToast("Error registering new account: " + error.message);
        }
      })
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
              ref={emailInputRef}
              required={true}
            ></IonInput>

            <IonLabel className="text">Password</IonLabel>
            <IonInput 
              type="password" 
              className="input-register"
              ref={passInputRef}
              required={true}
            ></IonInput>

            <IonLabel className="text">Confirm Password</IonLabel>
            <IonInput 
              type="password" 
              className="input-register"
              ref={confirmPassInputRef} 
              required={true}
            ></IonInput>

            <IonLabel className="text">Name</IonLabel>
            <IonInput 
              type="text" 
              className="input-register"
              ref={nameInputRef}  
              required={true}
            ></IonInput>

            <IonLabel className="text">Address</IonLabel>
            <IonInput 
              type="text" 
              className="input-register"
              ref={addressInputRef}
              required={true}
            ></IonInput>

            <IonLabel className="text">Phone Number</IonLabel>
            <IonInput 
              type="text" 
              className="input-register" 
              id="here"
              ref={phoneNumberInputRef}
              required={true}
            ></IonInput>
          </IonCardContent>
        </IonCard>

        <IonRow>
          <IonCol className="ion-text-center padding">
            <IonButton 
              className="button-register" 
              onClick={handleRegister}
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
