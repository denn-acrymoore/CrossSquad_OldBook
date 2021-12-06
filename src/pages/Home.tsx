import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFab, IonGrid, IonHeader, IonIcon, IonImg, IonPage, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Book, OldBookContext } from '../data/OldBookContext';
import firebaseApp from '../InitializeFirebase';
import { collection, getFirestore, onSnapshot, query, QuerySnapshot, where } from 'firebase/firestore';
import './Theme.css';

const Home: React.FC = () => {
  // Search bar text:
  const [searchText, setSearchText] = useState('');

  // Books that don't belong to the user or already in the user's shopping cart:
  const [books, setBooks] = useState<Array<Book>>([]);
  const [booksFirstThree, setBooksFirstThree] = useState<Array<Book>>([]);
  const [booksAfterFirstThree, setBooksAfterFirstThree] = useState<Array<Book>>([]);

  const oldBookCtx = useContext(OldBookContext);
  const { currUser } = oldBookCtx;
  const history = useHistory();

  const db = getFirestore(firebaseApp);

  const getBooksData = useCallback(() => {
    const unsubscribe = onSnapshot(query(collection(db, "books"), where("bookOwnerUid", "!=", currUser!.uid))
      , { includeMetadataChanges: true }
      , (querySnapshot) => {
        // Check if data is already sent to the server:
        const source = querySnapshot.metadata.hasPendingWrites ? "Local" : "Server";
        if (source === "Local") {
          return;
        }

        // oldBookCtx.showToast("Fetching books data for home!");
        const bookList: Array<Book> = [];
        const bookListFirstThree: Array<Book> = [];
        const bookListAfterFirstThree: Array<Book> = [];
        let bookNum = 0;

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

          if (bookData.bookShoppingCart.find(element => element === currUser!.uid)) {
            return;
          }
          else {
            ++bookNum;
            bookList.push(bookData);

            if (bookNum <= 3) {
              bookListFirstThree.push(bookData);
            }
            else if (bookNum > 3) {
              bookListAfterFirstThree.push(bookData);
            }
          }
        });

        setBooks(bookList);
        setBooksFirstThree(bookListFirstThree);
        setBooksAfterFirstThree(bookListAfterFirstThree);
      });

    oldBookCtx.unregisterHomeDataListener = unsubscribe;
  }, []);

  // Call getBooksData() once:
  useEffect(() => {
    getBooksData();
  }, [getBooksData]);

  const goToProductDetail = (arrayIdx: number, arrayUsed: string) => {
    if (arrayUsed === "booksFirstThree") {
      oldBookCtx.setSelectedBookForShoppingCart(booksFirstThree[arrayIdx]);
    }
    else if (arrayUsed === "booksAfterFirstThree") {
      oldBookCtx.setSelectedBookForShoppingCart(booksAfterFirstThree[arrayIdx]);
    }
    else if (arrayUsed === "books") {
      oldBookCtx.setSelectedBookForShoppingCart(books[arrayIdx]);
    }

    history.push("/tabs/productDetail");
  };

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
        {!searchText && booksFirstThree.length > 0 &&
          <IonCol className="section1">
            <IonCardHeader className="card-home">
              <IonCardTitle>
                <h3>You will love this books !</h3>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="wrapper card-home">
              {booksFirstThree.map((book, arrayIdx) => (
                <IonButton
                  onClick={goToProductDetail.bind(null, arrayIdx, "booksFirstThree")}>
                  <IonImg src={book.bookDownloadUrl} />
                </IonButton>
              ))}
            </IonCardContent>
          </IonCol>
        }

        {/* Section 2 */}
        {!searchText && booksAfterFirstThree.length > 0 &&
          <IonGrid className="ion-padding-start ion-padding-end section2">
            <h1>Other Books</h1>
            {booksAfterFirstThree.map((book, arrayIdx) => {
              if (arrayIdx % 2 === 0 && arrayIdx + 1 < booksAfterFirstThree.length) {
                return (
                  <IonRow>
                    <IonCol size="6" className="ion-text-center">
                      <IonCard>
                        <IonButton
                          fill="clear"
                          className="image-sec2"
                          onClick={goToProductDetail.bind(null, arrayIdx,
                            "booksAfterFirstThree")}
                        >
                          <IonImg src={booksAfterFirstThree[arrayIdx].bookDownloadUrl} />
                        </IonButton>
                        <h4>{booksAfterFirstThree[arrayIdx].bookName}</h4>
                      </IonCard>
                    </IonCol>
                    <IonCol size="6" className="ion-text-center">
                      <IonCard>
                        <IonButton
                          fill="clear"
                          className="image-sec2"
                          onClick={goToProductDetail.bind(null, arrayIdx + 1,
                            "booksAfterFirstThree")}
                        >
                          <IonImg src={booksAfterFirstThree[arrayIdx + 1].bookDownloadUrl} />
                        </IonButton>
                        <h4>{booksAfterFirstThree[arrayIdx + 1].bookName}</h4>
                      </IonCard>
                    </IonCol>
                  </IonRow>
                );
              }
              else if (arrayIdx % 2 === 0 && arrayIdx + 1 >= booksAfterFirstThree.length) {
                return (
                  <IonRow>
                    <IonCol size="6" className="ion-text-center">
                      <IonCard>
                        <IonButton
                          fill="clear"
                          className="image-sec2"
                          onClick={goToProductDetail.bind(null, arrayIdx,
                            "booksAfterFirstThree")}
                        >
                          <IonImg src={booksAfterFirstThree[arrayIdx].bookDownloadUrl} />
                        </IonButton>
                        <h4>{booksAfterFirstThree[arrayIdx].bookName}</h4>
                      </IonCard>
                    </IonCol>
                  </IonRow>
                );
              }
            })}
          </IonGrid>
        }

        {/* Home - Search -> Hidden: Off kalau pencet search bar*/}
        {searchText && books.map((book, arrayIdx) => {
          const searchTextRegex: RegExp = new RegExp(searchText, "i");

          if (searchTextRegex.test(book.bookName)
            || searchTextRegex.test(book.bookDescription)) {
            return (
              <IonCard
                className="card-sec3 ion-padding-end"
                onClick={goToProductDetail.bind(null, arrayIdx, "books")}
              >
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
              </IonCard>
            );
          }
        })}
      </IonContent>
    </IonPage>
  );
};

export default Home;
