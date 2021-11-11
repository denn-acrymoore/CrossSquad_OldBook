import { IonButton, IonCol, IonContent, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, IonIcon, IonLabel, IonInput } from '@ionic/react';
import { useRef, useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { camera } from 'ionicons/icons';
import './Theme.css';

const InputSell: React.FC = () => {
  const [takenPhoto, setTakenPhoto] = useState<{
    path: string | undefined;
    preview: string;
  }>();

  const takePhotoHandler = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 80,
      width: 500
    });
    console.log(photo);

    if (!photo || !photo.webPath) {
      return;
    }

    setTakenPhoto({
      path: photo.path,
      preview: photo.webPath
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="title">
          <IonTitle><b>Sell</b></IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding-start ion-padding-end">
        <div className="ion-padding-top">
          <IonLabel className="text">Book's Name</IonLabel>
          <IonInput type="text" className="input-sell"></IonInput>

          <br />

          <IonLabel className="text">Book's Description</IonLabel>
          <IonInput type="text" className="input-sell"></IonInput>

          <br />

          <IonLabel className="text">Book's Price</IonLabel>
          <IonInput type="number" className="input-sell"></IonInput>

          <br />

          <IonLabel className="text">Upload Photo</IonLabel>
          <IonRow>
            <IonCol>
              <IonButton className="upload-sell" onClick={takePhotoHandler}>
                <IonLabel>Upload</IonLabel>
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <div className="image-preview">
                {takenPhoto && <img src={takenPhoto.preview} alt="Preview" />}
              </div>
            </IonCol>
          </IonRow>
        </div>

        <IonRow>
          <IonCol>
            <IonButton className="save-sell" href="/tabs/sell">
              <IonLabel>Save and Sell</IonLabel>
            </IonButton>
          </IonCol>
          <IonCol>
            <IonButton className="cancel-sell" href="/tabs/sell">
              <IonLabel>Cancel</IonLabel>
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default InputSell;
