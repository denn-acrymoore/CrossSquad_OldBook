import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonGrid, IonHeader, IonIcon, IonImg, IonPage, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import './Theme.css';

const Home: React.FC = () => {
  // Search bar
  const [searchText, setSearchText] = useState('');
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="title">
          <IonTitle className="ion-text-center">OldBook</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <br />
        <IonSearchbar className="searchbar-home" value={searchText} onIonChange={e => setSearchText(e.detail.value!)} animated></IonSearchbar>

        {/* Section 1 */}
        <IonCol className="section1">
          <IonCardHeader className="card-home">
            <IonCardTitle>
              <h3>You will love this book!</h3>
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent className="wrapper card-home">
            <IonButton href="/tabs/productDetail">
              <IonImg src="./assets/Book.jpg" />
              <IonFab vertical="bottom" horizontal="start">
                <h1><b>Book</b></h1>
              </IonFab>
            </IonButton>

            <IonButton>
              <IonImg src="./assets/Book.jpg" />
              <IonFab vertical="bottom" horizontal="start">
                <h1><b>Book</b></h1>
              </IonFab>
            </IonButton>

            <IonButton>
              <IonImg src="./assets/Book.jpg" />
              <IonFab vertical="bottom" horizontal="start">
                <h1><b>Book</b></h1>
              </IonFab>
            </IonButton>
          </IonCardContent>
        </IonCol>

        {/* Section 2 */}
        <IonGrid className="ion-padding-start ion-padding-end">
          <h3>Other Books</h3>
          <IonRow>
            <IonCol size="6">
              <IonButton fill="clear" className="image-sec2" href="/tabs/productdetail">
                <IonImg src="./assets/Book.jpg" />
              </IonButton>
            </IonCol>

            <IonCol size="6">
              <IonButton fill="clear" className="image-sec2" href="/tabs/productdetail">
                <IonImg className="image-sec2" src="./assets/Book2.jpg" />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Home - Search -> Hidden: Off kalau pencet search bar*/}
        {/* <IonButton fill="clear" className="button-sec3 ion-padding-start ion-padding-end" href="/tabs/productdetail">
        </IonButton> */}

        <IonCard className="card-sec3">
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="5">
                  <IonImg className="image-sec3" src="./assets/Book.jpg" />
                </IonCol>
                <IonCol size="7">
                  <h3>Judul Buku</h3>
                  <h5>Informasi buku, seperti ini, seperti itu, seperti apapun hehe.</h5>
                  <h6 className="ion-text-end">Rp 99.999</h6>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Home;
