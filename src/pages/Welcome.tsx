import { IonButton, IonRow, IonCol, IonContent, IonPage } from '@ionic/react';
import './Theme.css';
import React, { useContext, useEffect } from "react";
import { OldBookContext } from '../data/OldBookContext';
import { useHistory } from 'react-router';

const Welcome: React.FC = () => {
  const oldBookCtx = useContext(OldBookContext);
  const {currUser} = oldBookCtx;
  const history = useHistory();
  
  // If already signed in, navigate to main page:
  useEffect(() => {    
    if (currUser != null) {
      oldBookCtx.showToast("Welcome back!");
      history.replace("/tabs/home");
    }
  }, [currUser]);

  return (
    <IonPage id="welcome">
      <IonContent className="background" scrollY={false}>
        <IonCol>
          <IonRow>
            <IonCol className="ion-text-center padding text-welcome">
              <h6>WELCOME TO</h6>
              <b><h1>OldBook</h1></b>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol className="ion-text-center padding">
              <IonButton className="button-welcome" href="/login">
                LOGIN
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow id="welcome-bottom">
            <IonCol className="ion-text-center padding">
              <IonButton className="button-welcome" href="/register">
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
