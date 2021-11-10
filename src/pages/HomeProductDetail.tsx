import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Theme.css';

const HomeProductDetail: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="title">
          <IonTitle className="ion-text-center">OldBook</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding-start ion-padding-end ">

        <IonCol className="image-detail">
          <IonImg src="./assets/Book.jpg" className="image-detail" />
        </IonCol>

        <IonCol>
          <h2>Book's Name</h2>
          <h5>Hai apa kabar? Iya aku baik-baik saja, hehe. Babai.</h5>
          <h6 className="ion-text-end">Rp 99.999</h6>
        </IonCol>

        <IonCol className="ion-text-center">
          <IonButton className="button-addToCart" href="/tabs/home">
            Add to Cart
          </IonButton>
        </IonCol>

      </IonContent>
    </IonPage>
  );
};

export default HomeProductDetail;
