import { IonButton, IonCol, IonContent, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, IonIcon, IonLabel, IonInput } from '@ionic/react';
import { useContext, useRef, useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { camera } from 'ionicons/icons';
import './Theme.css';
import { OldBookContext } from '../data/OldBookContext';
import firebaseApp from '../InitializeFirebase';
import { collection, doc, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { useHistory } from 'react-router';

const InputSell: React.FC = () => {
  const oldBookCtx = useContext(OldBookContext)
  const {currUser} = oldBookCtx;
  const history = useHistory();
  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  const [takenPhoto, setTakenPhoto] = useState<{
    webviewPath: string,
    format: string,
  }>();

  const [takenPhotoBlob, setTakenPhotoBlob] =  useState<Blob>();

  const takePhotoHandler = async () => {
    const permissionStatus = await Camera.checkPermissions();

    if (permissionStatus.camera !== "granted" || permissionStatus.photos !== "granted") {
      Camera.requestPermissions();
    }

    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
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
      oldBookCtx.showToast("Max photo size = 1 MB!");
      return;
    }

    setTakenPhoto({
      webviewPath: photo.webPath,
      format: photo.format,
    });
    setTakenPhotoBlob(blob);
  };

  const handleSaveBook = () => {
    const newCityRef = doc(collection(db, "cities"));
    oldBookCtx.showToast(newCityRef.id);
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
        <div className="ion-padding-top" id="here">
          <IonLabel className="text" id="sell-here">Book's Name</IonLabel>
          <IonInput type="text" className="input-sell"></IonInput>

          <IonLabel className="text">Book's Description</IonLabel>
          <IonInput type="text" className="input-sell"></IonInput>

          <IonLabel className="text">Book's Price</IonLabel>
          <IonInput type="number" className="input-sell"></IonInput>

          <IonLabel className="text">Upload Photo</IonLabel>
          <IonRow>
            <IonCol>
              <IonButton className="upload-sell" onClick={takePhotoHandler}>
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
