import { IonButton, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonLoading, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { doc, DocumentSnapshot, FirestoreError, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { Book, OldBookContext } from '../data/OldBookContext';
import firebaseApp from '../InitializeFirebase';
import './Theme.css';

const HomeProductDetail: React.FC = () => {
  const oldBookCtx = useContext(OldBookContext);
  const history = useHistory();
  const {selectedBookForShoppingCart} = oldBookCtx;
  const {currUser} = oldBookCtx;
  const db = getFirestore(firebaseApp);

  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);

  const addToCart = () => {
    setIsLoadingOpen(true);

    const docRef = doc(db, "books", selectedBookForShoppingCart!.bookId);
    
    getDoc(docRef)
    .then((docSnap: DocumentSnapshot) => {
      const docSnapData = docSnap.data();
      const bookData: Book = {
        bookId: docSnapData!.bookId,
        bookOwnerUid: docSnapData!.bookOwnerUid,
        bookName: docSnapData!.bookName,
        bookDescription: docSnapData!.bookDescription,
        bookPrice: docSnapData!.bookPrice,
        bookStorageRef: docSnapData!.bookStorageRef,
        bookDownloadUrl: docSnapData!.bookDownloadUrl,
        bookShoppingCart: docSnapData!.bookShoppingCart,
      };

      let updatedBookShoppingCart = [...bookData.bookShoppingCart];
      updatedBookShoppingCart.push(currUser!.uid);

      updateDoc(docRef, {
        "bookShoppingCart": updatedBookShoppingCart,
      })
      .then(() => {
        oldBookCtx.showToast("Book added to shopping cart!");
        setIsLoadingOpen(false);
        history.length > 0 ? history.goBack() : history.replace("/tabs/home");
      })
      .catch((error: FirestoreError) => {
        setIsLoadingOpen(false);
        oldBookCtx.showToast("Error adding book to shopping cart: " + error.message);
      });
    })
    .catch((error: FirestoreError) => {
      setIsLoadingOpen(false);
      oldBookCtx.showToast("Error adding book to shopping cart: " + error.message);
    });
  }

  return (
    <IonPage id="home-detail">
      <IonHeader>
        <IonToolbar className="title">
          <IonTitle className="ion-text-center">OldBook</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding-start ion-padding-end">
        <IonLoading 
          isOpen={isLoadingOpen}
          spinner="crescent"
          keyboardClose={true}
          backdropDismiss={false}
          duration={0}
          showBackdrop={true}
        />

        <IonCol className="image-detail">
          <IonImg src={selectedBookForShoppingCart!.bookDownloadUrl} className="image-detail" />
        </IonCol>

        <IonRow id="product-detail">
          <IonCol >
            <h2>{selectedBookForShoppingCart!.bookName}</h2>
            <h5>{selectedBookForShoppingCart!.bookDescription}</h5>
            <h6 className="ion-text-end">{"Rp " + Intl.NumberFormat('de-DE').format(selectedBookForShoppingCart!.bookPrice)}</h6>
          </IonCol>
        </IonRow>

        <IonRow className="ion-text-center">
          <IonCol>
            <IonButton 
              className="button-addToCart" 
              onClick={addToCart}
            >
              Add to Cart
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default HomeProductDetail;
