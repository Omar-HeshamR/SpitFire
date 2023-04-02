import { ref, listAll, getMetadata, getDownloadURL } from "firebase/storage";
import { storage } from "../library/firebase"

export async function findFileAndGetDownloadURL(rapperName) {
      let final_url;
      const fileName = `${rapperName} A Video.mp4`
      const directoryRef = ref(storage, 'gs://spitfire-75326.appspot.com');
      const fileList = await listAll(directoryRef);
      // console.log(fileList)
      for (const itemRef of fileList.items) {
        if (itemRef._location.path_ === fileName) {
          final_url = await getDownloadURL(itemRef)
          .then((url) => {
            console.log(url)
            return url
          })
          .catch((error) => {
          });
        }
      }

    return final_url
  }
  