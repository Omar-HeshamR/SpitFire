
import { ref, listAll } from "firebase/storage";

import { storage } from "../library/firebase"

async function findFileAndGetDownloadURL(rapperName) {
    try {
      const fileName = `${rapperName} A Video.mp4`
      const directoryRef = ref(storage, 'https://console.firebase.google.com/project/spitfire-75326/storage/spitfire-75326.appspot.com/files');
      const fileList = await listAll(directoryRef);
      for (const itemRef of fileList.items) {
        if (itemRef.name === fileName) {
          const downloadURL = await itemRef.getDownloadURL();
          console.log("Download URL:", downloadURL);
          return downloadURL;
        }
      }
      console.log("File not found");
      return null;
    } catch (error) {
      console.log("Error listing files:", error);
      return null;
    }
  }
  