import { storage } from "../library/firebase"
import { getStorage, ref, uploadBytes } from "firebase/storage";

// STORAGE FUNCTIONALITIES
export async function uploadVideo(filename, file){
    const storage = getStorage();
    const storageRef = ref(storage, filename);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  }