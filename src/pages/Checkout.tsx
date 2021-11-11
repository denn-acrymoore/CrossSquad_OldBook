import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonItem, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Theme.css';

const Checkout: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="title">
          <IonTitle><b>Checkout</b></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <h3 className="ion-padding-start ion-padding-end">INFORMATION</h3>

        <IonCardHeader className="card-checkout">
          <IonCardTitle>
            <h5>USER'S NAME</h5>
            <h6>User's Address</h6>
            <br />
            <h6>08XX-XXXX-XXXX</h6>
          </IonCardTitle>
        </IonCardHeader>

        <IonList className="list-checkout">
          <IonItem>
            <p>COURIER</p>
          </IonItem>
          <IonItem>
            <IonCol><p color="gray">JNE - REG</p></IonCol>
            <IonCol className="ion-text-end"><p className="numeric-checkout">Rp 7.000</p></IonCol>
          </IonItem>
          <IonItem>
            <p>ITEMS</p>
          </IonItem>

          <IonItem>
            <IonCard className="card-list-item ion-padding-end">
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonCol size="5">
                      <IonImg className="image-item" src="./assets/Book.jpg" />
                    </IonCol>
                    <IonCol size="7">
                      <h3>Judul Buku</h3>
                      <h3>Rp 99.999</h3>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          </IonItem>

          <IonItem lines="none">
            <IonCol>
              <p>TOTAL PRICE</p>
            </IonCol>
            <IonCol className="ion-text-end">
              <p>Rp 106.999</p>
            </IonCol>
          </IonItem>

          <IonItem lines="none">
            <IonCol className="ion-text-end">
              <IonButton className="checkout-button  ion-padding-start" href="/tabs/home">
                CHECKOUT
              </IonButton>
            </IonCol>
          </IonItem>
        </IonList>



      </IonContent>
    </IonPage>
  );
};

export default Checkout;
