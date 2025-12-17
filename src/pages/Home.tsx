import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ActionSheet, ActionSheetButtonStyle } from "@capacitor/action-sheet";
import { AppLauncher } from "@capacitor/app-launcher";
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
import { Browser } from '@capacitor/browser';
import ExploreContainer from "../components/ExploreContainer";
import { Device } from "@capacitor/device";
import { Camera, CameraResultType } from '@capacitor/camera';
import { Clipboard } from '@capacitor/clipboard';
import { Dialog } from '@capacitor/dialog';
import { Share } from '@capacitor/share';


import "./Home.css";

const Home: React.FC = () => {
  const showActionSheet = async () => {
    const result = await ActionSheet.showActions({
      title: "Photo Options",
      message: "Select an option to perform",
      options: [
        {
          title: "example1",
        },
        {
          title: "example2",
        },
        {
          title: "example3",
          style: ActionSheetButtonStyle.Destructive,
        },
      ],
    });

    console.log("Action Sheet result:", result);
  };

  const openYoutubeApp = async () => {
    const info = await Device.getInfo();
    const canOpenIOS = await AppLauncher.canOpenUrl({
      url: "youtube://",
    });

    if (info.platform === "ios" && canOpenIOS.value) {
      await AppLauncher.openUrl({ url: "youtube://" });
      return;
    }

    const canOpenAndroid = await AppLauncher.canOpenUrl({
      url: "com.google.android.youtube",
    });

    if (info.platform === "android" && canOpenAndroid.value) {
      await AppLauncher.openUrl({
        url: "com.google.android.youtube",
      });
    }
  };

  const scanBarcode = async () => {
    const result = await CapacitorBarcodeScanner.scanBarcode({ hint: 1 });
    console.log(result);
  };

  const openCapacitorSite = async () => {
    await Browser.open({ url: 'http://capacitorjs.com/' });
  };

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    var imageUrl = image.webPath;
    console.log(imageUrl);
  };

  const checkClipboard = async () => {
    const { type, value } = await Clipboard.read();
    console.log(`Got ${type} from clipboard: ${value}`);
    await Dialog.alert({
      title: 'tipo ' + type,
      message: 'valor ' + value
    });
  };

  const shareContent = async () => {
    await Share.share({
      title: 'Share',
      text: 'Share',
      url: 'http://capacitorjs.com/',
    });
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h2 onClick={showActionSheet}>Show Action Sheet</h2>
        <br />
        <h2 onClick={openYoutubeApp}>Open youtube app</h2>
        <br />
        <h2 onClick={scanBarcode}>Scan Barcode</h2>
        <br />
        <h2 onClick={openCapacitorSite}>Open Capacitor Site</h2>
        <br />
        <h2 onClick={takePicture}>Open camera</h2>
        <br />
        <h2 onClick={checkClipboard}>show clipboard value</h2>
        <br />
        <h2 onClick={shareContent}>Share content</h2>

      </IonContent>
    </IonPage>
  );
};

export default Home;
