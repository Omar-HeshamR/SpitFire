
import { ref, listAll } from "firebase/storage";
import { storage } from "../library/firebase"

export async function findFileAndGetDownloadURL(rapperName) {
    try {
      const fileName = `${rapperName} A Video.mp4`
      const directoryRef = ref(storage, 'gs://spitfire-75326.appspot.com');
      const fileList = await listAll(directoryRef);
      // console.log(fileList)
      for (const itemRef of fileList.items) {
        if (itemRef._location.path_ === fileName) {
          console.log(itemRef)
          const downloadURL = await itemRef.getDownloadURL();
          console.log("Download URL:", downloadURL);
          return downloadURL;
        }
      }
      // console.log("File not found");
      return null;
    } catch (error) {
      console.log("Error listing files:", error);
      return null;
    }
  }
  