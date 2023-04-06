import { storage } from "../library/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadAudioToFirebaseStorage(postID, audioBase64) {

    const audio_blobs = audioBase64.map(base64ToBlob);
    const bufferPromises = audio_blobs.map((blob) => blob.arrayBuffer());

    const Final_audio_blob = await Promise.all(bufferPromises).then((buffers) => {
    const totalLength = buffers.reduce((acc, buffer) => acc + buffer.byteLength, 0);
    const concatenated = new Uint8Array(totalLength);
    let offset = 0;
    for (const buffer of buffers) {
      concatenated.set(new Uint8Array(buffer), offset);
      offset += buffer.byteLength;
    }
    const mergedBlob = new Blob([concatenated]);
    // console.log("MERGED", mergedBlob)
    return mergedBlob
  });

    // Create a reference to the file that will be uploaded.
    const fileName = `${postID}.mp3`;
    const fileRef = ref(storage, fileName);

    try{
    uploadBytes(fileRef, Final_audio_blob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    }); 
    }catch(err){
      console.log("ERROR", err)
    }
 

    console.log(fileRef)

    // Return a reference to the uploaded file.
    return fileName;
  }
  
export async function getAudio(filename){
  const fileRef = ref(storage, filename);

  const blob_url = await getDownloadURL(fileRef)
  .then((url) => {
    return url
  })
  .catch((error) => {
    // Handle any errors
  });


  // console.log(blob_url)
  return blob_url;
  }

// HELPER FUNCTION

function base64ToBlob(base64String, contentType) {
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], {type: contentType});

  return blob;
}
  
  