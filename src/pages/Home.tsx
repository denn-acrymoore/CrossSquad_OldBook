import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonGrid, IonHeader, IonIcon, IonImg, IonPage, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import './Theme.css';

const Home: React.FC = () => {
  // Search bar
  const [searchText, setSearchText] = useState('');
  return (
    <IonPage id="home">
      <IonHeader>
        <IonToolbar className="title">
          <IonTitle className="ion-text-center">OldBook</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar className="searchbar-home" value={searchText} onIonChange={e => setSearchText(e.detail.value!)} animated></IonSearchbar>

        {/* Section 1 */}
        <IonCol className="section1">
          <IonCardHeader className="card-home">
            <IonCardTitle>
              <h3>You will love this books !</h3>
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent className="wrapper card-home">
            <IonButton href="/tabs/productDetail">
              <IonImg src="./assets/buku1.jpg" />
            </IonButton>

            <IonButton>
              <IonImg src="./assets/buku2.jpg" />
            </IonButton>

            <IonButton>
              <IonImg src="./assets/buku3.jpg" />
              {/* <IonFab vertical="bottom" horizontal="start">
                <h1><b>Book</b></h1>
              </IonFab> */}
            </IonButton>
          </IonCardContent>
        </IonCol>

        {/* Section 2 */}
        <IonGrid className="ion-padding-start ion-padding-end section2">
          <h1>Other Books</h1>
          <IonRow>
            <IonCol size="6" className="ion-text-center">
              <IonCard>
                <IonButton fill="clear" className="image-sec2" href="/tabs/productdetail">
                  <IonImg src="./assets/buku4.jpg" />
                </IonButton>
                <h4>Rich and Poor Dad</h4>
              </IonCard>
            </IonCol>

            <IonCol size="6" className="ion-text-center">
              <IonCard>
                <IonButton fill="clear" className="image-sec2" href="/tabs/productdetail">
                  <IonImg className="image-sec2" src="./assets/buku5.jpg" />
                </IonButton>
                <h4>Geografi kelas 11</h4>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="6" className="ion-text-center">
              <IonCard>
                <IonButton fill="clear" className="image-sec2" href="/tabs/productdetail">
                  <IonImg src="./assets/buku6.jpg" />
                </IonButton>
                <h4>Buku Bahasa Indonesia Kelas 8</h4>
              </IonCard>
            </IonCol>

            <IonCol size="6" className="ion-text-center">
              <IonCard>
                <IonButton fill="clear" className="image-sec2" href="/tabs/productdetail">
                  <IonImg className="image-sec2" src="./assets/buku7.jpg" />
                </IonButton>
                <h4>Miss Irresistible Stylist</h4>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Home - Search -> Hidden: Off kalau pencet search bar*/}

        {/* <IonCard className="card-sec3 ion-padding-end" href="/tabs/productdetail">
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="5">
                  <IonImg className="image-sec3" src="./assets/Book.jpg" />
                </IonCol>
                <IonCol size="7">
                  <h2>Judul Buku</h2>
                  <h5>Informasi buku, seperti ini, seperti itu, seperti apapun hehe.</h5>
                  <h6 className="ion-text-end">Rp 99.999</h6>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard> */}

      </IonContent>
    </IonPage>
  );
};

export default Home;
