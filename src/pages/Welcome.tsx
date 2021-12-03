import { IonButton, IonRow, IonCol, IonContent, IonPage, IonLoading } from '@ionic/react';
import './Theme.css';
import React, { useContext, useEffect } from "react";
import { OldBookContext } from '../data/OldBookContext';
import { useHistory } from 'react-router';

const Welcome: React.FC = () => {
  const oldBookCtx = useContext(OldBookContext);
  const {currUserFirestore} = oldBookCtx;
  const {isOnAuthStateChangedCalled} = oldBookCtx;
  const history = useHistory();
  
  // If already signed in, navigate to main page:
  useEffect(() => {    
    if (currUserFirestore !== null && currUserFirestore !== undefined) {
      oldBookCtx.showToast("Welcome back!");
      history.replace("/tabs/home");
    }
  }, [currUserFirestore]);

  return (
    <IonPage id="welcome">
      <IonContent className="background" scrollY={false}>
        <IonLoading 
          isOpen={!isOnAuthStateChangedCalled}
          spinner="crescent"
          keyboardClose={true}
          backdropDismiss={false}
          duration={2000}
          showBackdrop={true}
        />

        <IonCol>
          <IonRow>
            <IonCol className="ion-text-center padding text-welcome">
              <h6>WELCOME TO</h6>
              <b><h1>OldBook</h1></b>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol className="ion-text-center padding">
              <IonButton 
                className="button-welcome" 
                onClick={() => {history.replace("/login");}}
              >
                LOGIN
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow id="welcome-bottom">
            <IonCol className="ion-text-center padding">
              <IonButton 
                className="button-welcome"
                onClick={() => {history.replace("/register");}} 
              >
                REGISTER
              </IonButton>
            </IonCol>
          </IonRow>
        </IonCol>

        <img src="assets/images/Background.png" />
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
