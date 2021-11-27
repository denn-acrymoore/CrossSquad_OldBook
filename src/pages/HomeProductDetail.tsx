import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Theme.css';

const HomeProductDetail: React.FC = () => {
  return (
    <IonPage id="home-detail">
      <IonHeader>
        <IonToolbar className="title">
          <IonTitle className="ion-text-center">OldBook</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding-start ion-padding-end">
        <IonCol className="image-detail">
          <IonImg src="./assets/Book.jpg" className="image-detail" />
        </IonCol>

        <IonRow id="product-detail">
        <IonCol >
          <h2>Book's Name</h2>
          <h5>Hai apa kabar? Iya aku baik-baik saja, hehe. Babai.</h5>
          <h6 className="ion-text-end">Rp 99.999</h6>
        </IonCol>
        </IonRow>

        <IonRow className="ion-text-center">
          <IonCol>
            <IonButton className="button-addToCart" href="/tabs/home">
              Add to Cart
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default HomeProductDetail;
