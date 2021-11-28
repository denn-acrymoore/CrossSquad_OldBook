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
          <IonImg src="assets/Buku7.jpg" className="image-detail" />
        </IonCol>

        <IonRow id="product-detail">
          <IonCol >
            <h2>Buku Matematika Sukino Kelas 10</h2>
            <h5>Buku Matematika peminatan kelas 10 dengan kondisi yang masih bagus dan layak pakai.</h5>
            <h6 className="ion-text-end">Rp 49.000</h6>
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
