import { IonList, IonItemSliding, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar, IonItem, IonItemOptions, IonItemOption, IonIcon, IonLabel } from '@ionic/react';
import { useRef } from 'react';
import { trashBinSharp, trashSharp } from "ionicons/icons";
import './Theme.css';

const Cart: React.FC = () => {
  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

  const deleteItem = () => {
    slidingOptionsRef.current?.closeOpened();
    console.log("Delete...");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="title">
          <IonTitle><b>Cart</b></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding-end">

        {/* There is no item here */}
        <IonCard className="card-empty ion-padding-top ion-text-center">
          <IonCardContent>
            <b><h2>You haven't add any book.</h2></b>
            <br />
            <IonButton href="/tabs/home">
              Find Your Book
            </IonButton>
          </IonCardContent>
        </IonCard>

        {/* There's something to buy */}
        <IonCard className="card-cart">
          <IonItemSliding>
            <IonItem className="card-cart">
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonCol size="5">
                      <IonImg className="image-sec3" src="./assets/Book.jpg" />
                    </IonCol>
                    <IonCol size="7">
                      <h2>Judul Buku</h2>
                      <h6>Informasi buku, seperti ini, seperti itu, seperti apapun hehe.</h6>
                      <h6 className="ion-text-end">Rp 99.999</h6>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonItem>

            {/* Slide Item */}
            <IonItemOptions side="end">
              <IonItemOption color="danger" onClick={deleteItem}>
                &#160;&#160;<IonIcon icon={trashSharp} />&#160;&#160;
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        </IonCard>

        <div className="checkout-button ion-text-center ion-padding-start">
          <IonButton href="/tabs/checkout">
            CHECKOUT
          </IonButton>
        </div>
      </IonContent>
    </IonPage >
  );
};

export default Cart;
