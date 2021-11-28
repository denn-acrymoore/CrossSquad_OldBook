import { IonList, IonItemSliding, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar, IonItem, IonItemOptions, IonItemOption, IonIcon, IonLabel, IonFab, IonFabButton } from '@ionic/react';
import { useRef } from 'react';
import { addSharp, pulseSharp, trashBinSharp, trashSharp } from "ionicons/icons";
import './Theme.css';

const Sell: React.FC = () => {
  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

  const deleteItem = () => {
    slidingOptionsRef.current?.closeOpened();
    console.log("Delete...");
  }

  return (
    <IonPage id="sell">
      <IonHeader>
        <IonToolbar className="title">
          <IonTitle>Sell</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding-end">
        {/* There is no item here */}
        {/* <IonCard className="card-empty ion-padding-top ion-text-center">
          <IonCardContent>
            <h2>You haven't sell any book.</h2>
            <IonButton href="/tabs/inputsell">
              Upload Your Book
            </IonButton>
          </IonCardContent>
        </IonCard> */}

        {/* There's something to sell */}
        <IonCard className="card-sell">
          <IonItemSliding>
            <IonItem className="card-sell">
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonCol size="5">
                      <IonImg className="image-sec3" src="./assets/buku8.jpg" />
                    </IonCol>
                    <IonCol size="7">
                      <h2>Saham Anda Lebih Mahal !!! Santo Vibby</h2>
                      <h5>Buku ini akan melengkapi pengetahuan dan keterampilan yang membantu Anda untuk tetap tenang dan mengerti bertransaksi di pasar modal.</h5>
                      <h6 className="ion-text-end">Rp 130.000</h6>
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

        <IonFab vertical="bottom" horizontal="end" slot="fixed" >
          <IonFabButton className="fab-button" href="/tabs/inputsell">
            <IonIcon icon={addSharp}></IonIcon>
          </IonFabButton>
        </IonFab>

      </IonContent>
    </IonPage >
  );
};

export default Sell;
