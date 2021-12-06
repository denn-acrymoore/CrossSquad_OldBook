import { IonList, IonItemSliding, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar, IonItem, IonItemOptions, IonItemOption, IonIcon, IonLabel, IonLoading } from '@ionic/react';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { trashBinSharp, trashSharp } from "ionicons/icons";
import './Theme.css';
import firebaseApp from '../InitializeFirebase';
import { collection, doc, FirestoreError, getDoc, getFirestore, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { Book, OldBookContext } from '../data/OldBookContext';
import { useHistory } from 'react-router';
import { ActionSheet } from '@capacitor/action-sheet';

const Cart: React.FC = () => {
  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

  const oldBookCtx = useContext(OldBookContext);
  const {currUser} = oldBookCtx;
  const history = useHistory();

  const db = getFirestore(firebaseApp);

  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);

  const getShoppingCartData = useCallback(async () => {
    // oldBookCtx.showToast("Shopping Cart Page listener callback is called!");
    if (currUser !== null) {
      // oldBookCtx.showToast("Initializing Shopping Cart Page listener!");

      // Listen to multiple documents in a collection:
      const q = query(collection(db, "books"), where("bookShoppingCart", "array-contains", currUser!.uid));
      const unsubscribe = await onSnapshot(q, { includeMetadataChanges: true }
      , (querySnapshot) => {
        // Check if data is already sent to the server:
        const source = querySnapshot.metadata.hasPendingWrites ? "Local" : "Server";
        if (source === "Local") {
          return;
        }
  
        // oldBookCtx.showToast("Fetching books data for Shopping Cart Page!");
        const bookList: Array<Book> = [];
  
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const bookData: Book = {
            bookId: data.bookId,
            bookOwnerUid: data.bookOwnerUid,
            bookName: data.bookName,
            bookDescription: data.bookDescription,
            bookPrice: data.bookPrice,
            bookStorageRef: data.bookStorageRef,
            bookDownloadUrl: data.bookDownloadUrl,
            bookShoppingCart: data.bookShoppingCart,
          };
  
          bookList.push(bookData);
        });
  
        oldBookCtx.setCurrShoppingCart(bookList);
      });
  
      oldBookCtx.setUnregisterShoppingCartDataListener(() => () => {
        unsubscribe();
        // oldBookCtx.showToast("Unsubscribed Shopping Cart Data Listener!");
      });
    }
  }, [currUser]); 

  useEffect(() => {
    getShoppingCartData();
  }, [getShoppingCartData])

  const deleteItem = async (arrayIdx: number) => {
    slidingOptionsRef.current?.closeOpened();
    
    const result = await ActionSheet.showActions({
      title: "Are you sure you want to remove this book from shopping cart?: " + oldBookCtx.currShoppingCart![arrayIdx].bookName,
      options: [
        {
          title: "Yes"
        },
        {
          title: "No"
        }
      ],
    });

    if (result.index === 0) {
      setIsLoadingOpen(true);
      const selectedBook: Book = oldBookCtx.currShoppingCart![arrayIdx];
      const updatedBookShoppingCart = selectedBook.bookShoppingCart.filter(book => book !== currUser!.uid);

      const docRef = doc(db, "books", selectedBook.bookId);

      updateDoc(docRef, {
        "bookShoppingCart": updatedBookShoppingCart,
      })
      .then(() => {
        setIsLoadingOpen(false);
        oldBookCtx.showToast("Book removed from shopping cart!");
      })
      .catch((error: FirestoreError) => {
        setIsLoadingOpen(false);
        oldBookCtx.showToast("Error removing book from shopping cart: " + error.message);
      });
    }
  }

  return (
    <IonPage id="cart">
      <IonHeader>
        <IonToolbar className="title">
          <IonTitle>Cart</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding-end">
        <IonLoading 
          isOpen={isLoadingOpen}
          spinner="crescent"
          keyboardClose={true}
          backdropDismiss={false}
          duration={0}
          showBackdrop={true}
        />

        {/* There is no item here */}
        {oldBookCtx.currShoppingCart!.length === 0 && 
          <IonCard className="card-empty ion-padding-top ion-text-center">
            <IonCardContent>
              <h2>You haven't add any book.</h2>
              <IonButton 
                onClick={() => {history.push("/tabs/home");}}
              >
                Find Your Book
              </IonButton>
            </IonCardContent>
          </IonCard>
        }

        {/* There's something to buy */}
        {oldBookCtx.currShoppingCart!.map((book, arrayIdx) => (
          <IonCard className="card-cart">
            <IonItemSliding key={arrayIdx} ref={slidingOptionsRef}>
              <IonItem className="card-cart">
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol size="5">
                        <IonImg 
                          className="image-sec3" 
                          src={book.bookDownloadUrl} 
                        />
                      </IonCol>
                      <IonCol size="7">
                        <h2>{book.bookName}</h2>
                        <h5>{book.bookDescription}</h5>
                        <h6 className="ion-text-end">{"Rp " + Intl.NumberFormat('de-DE').format(book.bookPrice)}</h6>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonItem>

              {/* Slide Item */}
              <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={deleteItem.bind(null, arrayIdx)}>
                  &#160;&#160;<IonIcon icon={trashSharp} />&#160;&#160;
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          </IonCard>
        ))}

        {oldBookCtx.currShoppingCart!.length > 0 && 
          <div className="checkout-button ion-text-center ion-padding-start">
            <IonButton 
              onClick={() => {history.push("/tabs/checkout")}}
            >
              CHECKOUT
            </IonButton>
          </div>
        }
      </IonContent>
    </IonPage >
  );
};

export default Cart;
