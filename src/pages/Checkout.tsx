import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonItem, IonLabel, IonList, IonLoading, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { OldBookContext } from '../data/OldBookContext';
import firebaseApp from '../InitializeFirebase';
import { deleteDoc, doc, FirestoreError, getFirestore } from 'firebase/firestore';
import './Theme.css';
import { deleteObject, getStorage, ref, StorageError } from 'firebase/storage';

const Checkout: React.FC = () => {
  const oldBookCtx = useContext(OldBookContext);
  const {currUserFirestore} = oldBookCtx;
  const history = useHistory();

  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    let currPrice = 7000;
    oldBookCtx.currShoppingCart!.forEach((book) => {
      currPrice = currPrice + book.bookPrice;
    });

    setTotalPrice(currPrice);
  }, [oldBookCtx.currShoppingCart])

  const handleCheckout = async () => {
    setIsLoadingOpen(true);

    // Clone the current shopping cart to prevent conflict if oldBookCtx.currShoppingCart
    // is changed by Firestore listener:
    const booksInShoppingCart = oldBookCtx.currShoppingCart!.map(book => book);
    for (const book of booksInShoppingCart){
      const deleteImgRef = ref(storage, book.bookStorageRef);
      const selectedBookId = book.bookId;

      // Delete book picture from Firebase Storage:
      try {
        await deleteObject(deleteImgRef);
        await deleteDoc(doc(db, "books", selectedBookId));

      } catch(error: any) {
        oldBookCtx.showToast("Error deleting book: " + error.message);
      }
    };

    setIsLoadingOpen(false);
    oldBookCtx.showToast("Checkout successful!");
    history.length > 0 ? history.goBack() : history.replace("/tabs/cart");
  };

  return (
    <IonPage id="cart">
      <IonHeader>
        <IonToolbar className="title">
          <IonTitle>Checkout</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonLoading 
          isOpen={isLoadingOpen}
          spinner="crescent"
          keyboardClose={true}
          backdropDismiss={false}
          duration={0}
          showBackdrop={true}
        />

        <IonList className="list-checkout">
          <IonItem>
            <IonLabel>INFORMATION</IonLabel>
          </IonItem>

          <IonCardHeader className="card-checkout">
            <h4>{currUserFirestore?.name}</h4>
            <h5>{currUserFirestore?.address}</h5>
            <h6>{currUserFirestore?.phoneNumber}</h6>
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

          {oldBookCtx.currShoppingCart!.map((book) => (
            <IonItem>
              <IonCard className="card-list-item ion-padding-end">
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol size="5">
                        <IonImg className="image-item" src={book.bookDownloadUrl} />
                      </IonCol>
                      <IonCol size="6" id="items-desc">
                        <h2>{book.bookName}</h2>
                        <h3>{"Rp " + Intl.NumberFormat('de-DE').format(book.bookPrice)}</h3>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonItem>
          ))}

          <IonItem lines="none" id="total-price">
            <IonCol>
              <IonLabel>TOTAL PRICE</IonLabel>
            </IonCol>
            <IonCol className="ion-text-end">
              <a>{"Rp " + Intl.NumberFormat('de-DE').format(totalPrice)}</a>
            </IonCol>
          </IonItem>

          <IonItem lines="none">
            <IonCol className="ion-text-end">
              <IonButton 
                className="checkout-button ion-padding-start"
                onClick={handleCheckout}
              >
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
