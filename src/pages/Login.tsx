import { IonButton, IonRow, IonCol, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonLabel, IonInput } from '@ionic/react';
import './Theme.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { OldBookContext } from '../data/OldBookContext';

import firebaseApp from '../InitializeFirebase';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, User } from "firebase/auth";
import { useHistory } from 'react-router';

/*Login Page*/
const Login: React.FC = () => {
  const oldBookCtx = useContext(OldBookContext);
  const {currUser} = oldBookCtx;
  const history = useHistory();

  const auth = getAuth(firebaseApp);
  
  const [handleLoginActivated, setHandleLoginActivated] = useState<boolean>(false);
  
  // If already signed in, navigate to main page:
  useEffect(() => {    
    if (currUser != null && !handleLoginActivated) {
      oldBookCtx.showToast("Welcome back!");
      history.replace("/tabs/home");
    }
  }, [currUser]);

  const emailInputRef = useRef<HTMLIonInputElement>(null);
  const passInputRef = useRef<HTMLIonInputElement>(null);
  

  const handleLogin = () => {
    const enteredEmail = emailInputRef.current?.value;
    const enteredPass = passInputRef.current?.value;

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

    // Check if input contains spaces:
    if (spaceRegex.test(enteredEmail.toString())) {
      oldBookCtx.showToast("Email input cannot contain space!");
      return;
    }

    if (spaceRegex.test(enteredPass.toString())) {
      oldBookCtx.showToast("Password input cannot contain space!");
      return;
    }

    // Check if email valid:
    if (!emailRegex.test(enteredEmail.toString())) {
      oldBookCtx.showToast("Invalid email address!");
      return;
    }

    setHandleLoginActivated(true);
    signInWithEmailAndPassword(auth, enteredEmail.toString(), enteredPass.toString())
      .then((userCredential) => {
        oldBookCtx.showToast("Login successful!");
        history.replace("/tabs/home");
      })
      .catch((error) => {
        setHandleLoginActivated(false);
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
            <IonButton 
              className="button-login" 
              type='submit' 
              onClick={handleLogin}
            >
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
