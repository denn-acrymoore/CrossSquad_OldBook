import { IonButton, IonRow, IonCol, IonContent, IonPage, IonCard, IonCardContent, IonLabel, IonInput } from '@ionic/react';
import './Theme.css';

import firebaseApp from '../InitializeFirebase';
import { getAuth, createUserWithEmailAndPassword, UserCredential, AuthError, deleteUser } from "firebase/auth";
import { doc, FirestoreError, getFirestore, setDoc } from "firebase/firestore";
import { useHistory } from 'react-router';
import { useContext, useEffect, useRef, useState } from 'react';
import { OldBookContext } from '../data/OldBookContext';

const Register: React.FC = () => {
  const oldBookCtx = useContext(OldBookContext);
  const {currUser} = oldBookCtx;
  const history = useHistory();
  
  const [handleRegisterActivated, setHandleRegisterActivated] = useState<boolean>(false);

  // If already signed in, navigate to main page:
  useEffect(() => {    
    if (currUser != null && !handleRegisterActivated) {
      oldBookCtx.showToast("Welcome back!");
      history.replace("/tabs/home");
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
    const numberRegex = /^\d{12}$/

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
    
    if (spaceRegex.test(enteredPhoneNumber.toString())) {
      oldBookCtx.showToast("Phone number cannot contain space!");
      return;
    }

    // Check if email valid:
    if (!emailRegex.test(enteredEmail.toString())) {
      oldBookCtx.showToast("Invalid email address!");
      return;
    }

    // Check if password length is at least 8 characters:
    if (enteredPass.toString().length < 8) {
      oldBookCtx.showToast("Minimum password input length = 8 characters!");
      return;
    }

    if (enteredConfirmPass.toString().length < 8) {
      oldBookCtx.showToast("Minimum confirm password input length = 8 characters!");
      return;
    }

    // Check if password is the same as confirm password:
    if (enteredPass.toString() !== enteredConfirmPass.toString()) {
      oldBookCtx.showToast("Password and confirm password must be same!");
      return;
    }

    // Check if enteredPhoneNumber is a number:
    if (!numberRegex.test(enteredPhoneNumber.toString().trim())) {
      oldBookCtx.showToast("Phone number input must be an 12 digit number!");
      return;
    }

    setHandleRegisterActivated(true);
    createUserWithEmailAndPassword(auth, enteredEmail.toString(), enteredPass.toString())
      .then((userCredential: UserCredential) => {
        const data = {
          "email": enteredEmail!.toString(),
          "name": enteredName!.toString(),
          "address": enteredAddress!.toString(),
          "phoneNumber": enteredPhoneNumber!.toString(),
        };
        
        setDoc(doc(db, "users", userCredential.user.uid), data)
          .then(() => {
            oldBookCtx.showToast("Registration successful!");
            history.replace("/tabs/home");
          })
          .catch((error: FirestoreError) => {
            deleteUser(userCredential.user);

            console.log("Error registering new account: " + error.message);
            oldBookCtx.showToast("Error registering new account: " + error.message);
          });
      })
      .catch((error: AuthError) =>  {
        setHandleRegisterActivated(false);
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
