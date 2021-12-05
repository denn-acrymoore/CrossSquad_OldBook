import { IonButton, IonCol, IonContent, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, IonIcon, IonLabel, IonInput, IonLoading } from '@ionic/react';
import { useContext, useRef, useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { camera } from 'ionicons/icons';
import './Theme.css';
import { Book, OldBookContext } from '../data/OldBookContext';
import firebaseApp from '../InitializeFirebase';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useHistory } from 'react-router';

const InputSell: React.FC = () => {
  const oldBookCtx = useContext(OldBookContext)
  const {currUser} = oldBookCtx;
  const history = useHistory();
  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  const bookNameInputRef = useRef<HTMLIonInputElement>(null);
  const bookDescriptionInputRef = useRef<HTMLIonInputElement>(null);
  const bookPriceInputRef = useRef<HTMLIonInputElement>(null);

  const [takenPhoto, setTakenPhoto] = useState<{
    webviewPath: string,
    format: string,
  }>();
  const [takenPhotoBlob, setTakenPhotoBlob] = useState<Blob>();
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);

  const takePhotoHandler = async () => {
    const permissionStatus = await Camera.checkPermissions();

    if (permissionStatus.camera !== "granted" || permissionStatus.photos !== "granted") {
      Camera.requestPermissions();
    }

    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      width: 900,
      height: 1600,
      allowEditing: true,
      source: CameraSource.Prompt,
      quality: 80,
    });

    if (!photo || !photo.webPath) {
      oldBookCtx.showToast("Error: Photo not found!");
      return;
    }
    
    // Convert web url into blob:
    const response = await fetch(photo.webPath);
    const blob = await response.blob();
    
    // Check if blob size is more than 1 MB:
    if (blob.size > 1024 * 1024) {
      oldBookCtx.showToast("Photo size is too big!");
      return;
    }

    setTakenPhoto({
      webviewPath: photo.webPath,
      format: photo.format,
    });
    setTakenPhotoBlob(blob);
  };

  const handleSaveBook = () => {
    const enteredBookName = bookNameInputRef.current?.value?.toString().trim();
    const enteredBookDescription = bookDescriptionInputRef.current?.value?.toString().trim();
    const enteredBookPrice = bookPriceInputRef.current?.value?.toString().trim();

    const numberRegex = /^\d+$/;

    // Check if input is empty:
    if (!enteredBookName || enteredBookName.length === 0) {
      oldBookCtx.showToast("Book name must be filled!");
      return;
    }

    if (!enteredBookDescription || enteredBookDescription.length === 0) {
      oldBookCtx.showToast("Book description must be filled!");
      return;
    }

    if (!enteredBookPrice || enteredBookPrice.length === 0) {
      oldBookCtx.showToast("Book price must be filled!");
      return;
    }
    
    if (!takenPhotoBlob) {
      oldBookCtx.showToast("Book photo must be filled!");
      return;
    }

    // Limit the number of input characters:
    if (enteredBookName.length > 50) {
      oldBookCtx.showToast("Book name must not exceed 50 characters!");
      return;
    }

    if (enteredBookDescription.length > 200) {
      oldBookCtx.showToast("Book description must not exceed 200 characters!");
      return;
    }

    // Check if enteredBookPrice is an integer:
    if (!numberRegex.test(enteredBookPrice)) {
      oldBookCtx.showToast("Book price must be an integer!");
      return;
    }

    // Convert enteredBookPrice into a number:
    const enteredBookPriceInteger = Number(enteredBookPrice);

    // Make sure that enteredBookPriceInteger is more than 0:
    if (enteredBookPriceInteger <= 0) {
      oldBookCtx.showToast("Book price must be greated than 0!");
      return;
    }

    // Make sure that takenPhotoBlob size is at most 1 MB:
    if (takenPhotoBlob.size > 1024 * 1024) {
      oldBookCtx.showToast("Photo size is too big!");
      return;
    }

    // Uploading image to Firebase Storage:
    const newBookDoc = doc(collection(db, "books"));
    const storagePath = "books/" + newBookDoc.id + "." + takenPhoto!.format;
    const storageRef = ref(storage, storagePath);

    setIsLoadingOpen(true);
    uploadBytes(storageRef, takenPhotoBlob).then((snapshot) => {
      // Get the download URL:
      getDownloadURL(storageRef).then((url) => {
        // Uploading data to Firebase Firestore:
        const newBookData: Book = {
          bookId: newBookDoc.id,
          bookOwnerUid: currUser!.uid,
          bookName: enteredBookName,
          bookDescription: enteredBookDescription,
          bookPrice: enteredBookPriceInteger,
          bookStorageRef: storagePath,
          bookDownloadUrl: url,
          bookShoppingCart: [],
        };

        setDoc(newBookDoc, newBookData).then(() => {
          oldBookCtx.showToast("Add new book successful!");
          setIsLoadingOpen(false);
          history.length > 0 ? history.goBack() : history.replace("/tabs/sell");
        });
      });
    });
  }

  const handleCancel = () => {
    history.length > 0 ? history.goBack() : history.replace("/tabs/sell");
  }

  return (
    <IonPage id="sell">
      <IonHeader>
        <IonToolbar className="title">
          <IonTitle>Sell</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent id="page-input-sell" fullscreen className="ion-padding-start ion-padding-end">
        <IonLoading 
          isOpen={isLoadingOpen}
          spinner="crescent"
          keyboardClose={true}
          backdropDismiss={false}
          duration={0}
          showBackdrop={true}
        />

        <div className="ion-padding-top" id="here">
          <IonLabel className="text" id="sell-here">Book's Name</IonLabel>
          <IonInput 
            type="text" 
            className="input-sell"
            ref={bookNameInputRef}
            required={true}
          ></IonInput>

          <IonLabel className="text">Book's Description</IonLabel>
          <IonInput 
            type="text" 
            className="input-sell"
            ref={bookDescriptionInputRef}
            required={true}
          ></IonInput>

          <IonLabel className="text">Book's Price</IonLabel>
          <IonInput 
            type="number" 
            className="input-sell"
            ref={bookPriceInputRef}
            required={true}
          ></IonInput>

          <IonLabel className="text">Upload Photo</IonLabel>
          <IonRow>
            <IonCol>
              <IonButton 
                className="upload-sell" 
                onClick={takePhotoHandler}
              >
                Upload
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <div className="image-preview">
                {takenPhoto && <img src={takenPhoto.webviewPath} alt="Preview" />}
              </div>
            </IonCol>
          </IonRow>
        </div>

        <IonRow>
          <IonCol>
            <IonButton 
              className="save-sell" 
              onClick={handleSaveBook}
            >
              Save and Sell
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton 
              className="cancel-sell" 
              onClick={handleCancel}
            >
              Cancel
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default InputSell;
