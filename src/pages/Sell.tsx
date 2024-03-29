import { IonList, IonItemSliding, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar, IonItem, IonItemOptions, IonItemOption, IonIcon, IonLabel, IonFab, IonFabButton, IonLoading } from '@ionic/react';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { addSharp, book, pulseSharp, trashBinSharp, trashSharp } from "ionicons/icons";
import './Theme.css';
import firebaseApp from '../InitializeFirebase';
import { collection, deleteDoc, doc, FirestoreError, getDocs, getFirestore, query, where , onSnapshot } from 'firebase/firestore';
import { deleteObject, getStorage, ref, StorageError } from "firebase/storage";
import { Book, OldBookContext } from '../data/OldBookContext';
import { ActionSheet } from '@capacitor/action-sheet';
import { useHistory } from 'react-router';

const Sell: React.FC = () => {
  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);

  const oldBookCtx = useContext(OldBookContext)
  const {currUser} = oldBookCtx;
  const history = useHistory();

  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  const [books, setBooks] = useState<Array<Book>>([]);
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);

  const getBooksData = useCallback(async () => {
    // oldBookCtx.showToast("Sell Page listener callback is called!");
    if (currUser !== null) {
      // oldBookCtx.showToast("Initializing Sell Page listener!");

      // Listen to multiple documents in a collection:
      const unsubscribe = await onSnapshot(query(collection(db, "books"), where("bookOwnerUid", "==", currUser!.uid))
      , { includeMetadataChanges: true }
      , (querySnapshot) => {
        // Check if data is already sent to the server:
        const source = querySnapshot.metadata.hasPendingWrites ? "Local" : "Server";
        if (source === "Local") {
          return;
        }
  
        // oldBookCtx.showToast("Fetching books data for Sell Page!");
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
  
        setBooks(bookList);
      });
  
      oldBookCtx.setUnregisterSellDataListener(() => () => {
        unsubscribe();
        // oldBookCtx.showToast("Unsubscribed Sell Data Listener!");
      });
    }
  }, [currUser]);

  // Call getBooksData() once:
  useEffect(() => {
    getBooksData();
  }, [getBooksData]);

  const deleteItem = async (arrayIdx: number) => {
    slidingOptionsRef.current?.closeOpened();
    
    const result = await ActionSheet.showActions({
      title: "Are you sure you want to delete this book?: " + books[arrayIdx].bookName,
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
      const deleteImgRef = ref(storage, books[arrayIdx].bookStorageRef);
      const selectedBookId = books[arrayIdx].bookId;
      
      // Delete book picture from Firebase Storage:
      deleteObject(deleteImgRef).then(() => {
        // Delete book data from Firebase Firestore:
        deleteDoc(doc(db, "books", selectedBookId))
          .then(() => {
            setIsLoadingOpen(false);
            oldBookCtx.showToast("Book delete successful!");
          })
          .catch((error: FirestoreError) => {
            setIsLoadingOpen(false);
            oldBookCtx.showToast("Error deleting book: " + error.message);
          })
      }).catch((error: StorageError) => {
        setIsLoadingOpen(false);
        oldBookCtx.showToast("Error deleting book: " + error.message);
      });
    }
  }

  return (
    <IonPage id="sell">
      <IonHeader>
        <IonToolbar className="title">
          <IonTitle>Sell</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding-end">
        <IonLoading 
          isOpen={isLoadingOpen}
          spinner="crescent"
          keyboardClose={true}
          backdropDismiss={false}
          duration={0}
          showBackdrop={true}
        />

        {/* There is no item here */}
        {books.length === 0 && 
          <IonCard className="card-empty ion-padding-top ion-text-center">
            <IonCardContent>
              <h2>You haven't sell any book.</h2>
              <IonButton 
                onClick={() => {history.push("/tabs/inputsell");}}
              >
                Upload Your Book
              </IonButton>
            </IonCardContent>
          </IonCard>
        }

        {/* There's something to sell */}
        {books.map((book, arrayIdx) => (
          <IonCard className="card-sell">
            <IonItemSliding key={arrayIdx} ref={slidingOptionsRef}>
              <IonItem className="card-sell">
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
                        <h6 className="ion-text-end">
                          {"Rp " + Intl.NumberFormat('de-DE').format(book.bookPrice)}
                        </h6>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonItem>

              {/* Slide Item */}
              <IonItemOptions side="end">
                <IonItemOption 
                  color="danger" 
                  onClick={deleteItem.bind(null, arrayIdx)}
                >
                  &#160;&#160;<IonIcon icon={trashSharp} />&#160;&#160;
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          </IonCard>
        ))}

        <IonFab vertical="bottom" horizontal="end" slot="fixed" >
          <IonFabButton 
            className="fab-button" 
            onClick={() => {history.push("/tabs/inputsell");}}
          >
            <IonIcon icon={addSharp}></IonIcon>
          </IonFabButton>
        </IonFab>

      </IonContent>
    </IonPage >
  );
};

export default Sell;
