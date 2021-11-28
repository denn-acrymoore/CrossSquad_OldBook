import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Theme.css';

const Checkout: React.FC = () => {
  return (
    <IonPage id="cart">
      <IonHeader>
        <IonToolbar className="title">
          <IonTitle>Checkout</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
      <IonList className="list-checkout">
        <IonItem>
          <IonLabel>INFORMATION</IonLabel>
        </IonItem>

        <IonCardHeader className="card-checkout">
            <h4>USER'S NAME</h4>
            <h5>User's Address</h5>
            <h6>08XX-XXXX-XXXX</h6>
        </IonCardHeader>

        <IonItem>
          <IonLabel>COURIER</IonLabel>
        </IonItem>
        <IonItem>
          <IonCol><a id="courier-type">JNE - REG</a></IonCol>
          <IonCol className="ion-text-end"><a id="courier-price">Rp 7.000</a></IonCol>
        </IonItem>

        <IonItem>
          <IonLabel>ITEMS</IonLabel>
        </IonItem>
        <IonItem>
          <IonCard className="card-list-item ion-padding-end">
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol size="5">
                    <IonImg className="image-item" src="./assets/Book.jpg" />
                  </IonCol>
                  <IonCol size="6" id="items-desc">
                    <h2>Judul Buku</h2>
                    <h3>Rp 99.999</h3>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        </IonItem>

        <IonItem lines="none" id="total-price">
          <IonCol>
            <IonLabel>TOTAL PRICE</IonLabel>
          </IonCol>
          <IonCol className="ion-text-end">
            <a>Rp 106.999</a>
          </IonCol>
        </IonItem>

        <IonItem lines="none">
          <IonCol className="ion-text-end">
            <IonButton className="checkout-button ion-padding-start" href="/tabs/home">
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
