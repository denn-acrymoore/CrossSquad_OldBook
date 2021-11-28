import { IonButton, IonRow, IonCol, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonLabel, IonInput } from '@ionic/react';
import './Theme.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { OldBookContext } from '../data/OldBookContext';

import firebaseApp from '../InitializeFirebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from 'react-router';

/*Login Page*/
const Login: React.FC = () => {
  const history = useHistory();

  const emailInputRef = useRef<HTMLIonInputElement>(null);
  const passInputRef = useRef<HTMLIonInputElement>(null);
  
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;

  // Check if user already signed-in:
  if (user) {
    // User is signed in
    history.replace("/tabs/home");
  }


  const oldBookCtx = useContext(OldBookContext);

  const handleLogin = async () => {
    const enteredEmail = emailInputRef.current?.value;
    const enteredPass = passInputRef.current?.value;

    const regex = /\s/;

    if (!enteredEmail || enteredEmail.toString().length === 0) {
      oldBookCtx.showToast("Email input must be filled!");
      return;
    }

    if (!enteredPass || enteredPass.toString().length === 0) {
      oldBookCtx.showToast("Password input must be filled!");
      return;
    }

    if (regex.test(enteredEmail.toString())) {
      oldBookCtx.showToast("Email input cannot contain space");
      return;
    }

    if (regex.test(enteredPass.toString())) {
      oldBookCtx.showToast("Password input cannot contain space");
      return;
    }

    signInWithEmailAndPassword(auth, enteredEmail.toString(), enteredPass.toString())
      .then((userCredential) => {
        history.replace("/tabs/home");
      })
      .catch((error) => {
        oldBookCtx.showToast("Incorrect email or password");
      });
  };

  return (
    <IonPage id="login">
      <IonContent class="background" scrollY={false}>
        <IonRow className="nav1">
          <IonCol className="ion-text-left left-logo">
            <a>OldBook</a>
          </IonCol>
          <IonCol className="ion-text-right btn-to">
            <u><a href="/register">REGISTER</a></u>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol className="ion-text-center text-login">
            <b><h1>LOGIN</h1></b>
            <h5>Please login to proceed</h5>
          </IonCol>
        </IonRow>

        <IonCard className="card-login">
          <IonCardContent>
            <IonLabel className="text">Email</IonLabel>
            <IonInput 
              type="email" 
              className="input-login" 
              id="here"
              required={true}
              ref={emailInputRef}
            ></IonInput>

            <IonLabel className="text">Password</IonLabel>
            <IonInput 
              type="password" 
              className="input-login"
              required={true}
              ref={passInputRef}
            ></IonInput>
          </IonCardContent>
        </IonCard>

        <IonRow>
          <IonCol className="ion-text-center">
            <IonButton className="button-login" type='submit' onClick={handleLogin}>
              SIGN IN
            </IonButton>
          </IonCol>
        </IonRow>

        <img src="assets/images/Background.png" />
      </IonContent>
    </IonPage>
  );
};

export default Login;
