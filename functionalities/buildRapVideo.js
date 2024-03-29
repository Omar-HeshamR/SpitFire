import { getVerseBase64 } from './createAudio';
import { createRap } from './createVerses';
import { uploadAudioToFirebaseStorage } from "./storageInteractions"

async function createBlobArray(rapperInfo){

    const length = rapperInfo[0].verses.length + rapperInfo[1].verses.length;
    let select = true
    let verseCount = 0
    const blobArray = []
    const audioFileNames = []
    for(let i = 0; i < length; i++){
      console.log('Verse number', verseCount)
      let fileName = `verse${i}.mpeg`
      audioFileNames.push(fileName)
      if(select){
        console.log(`${rapperInfo[0].name}\n${rapperInfo[0].verses[verseCount]}\n${fileName}`);
        const blobVal = await getVerseBase64(rapperInfo[0].name, rapperInfo[0].verses[verseCount], fileName);
        console.log('Blob value\n', blobVal)
        blobArray.push(blobVal)
      }else{
        console.log(`${rapperInfo[1].name}\n${rapperInfo[1].verses[verseCount]}\n${fileName}`);
        const blobVal = await getVerseBase64(rapperInfo[1].name, rapperInfo[1].verses[verseCount], fileName);
        console.log('Blob value\n', blobVal)
        blobArray.push(blobVal)
      }
      if(select == false){
        verseCount += 1
      }
      select = !select;
    }
    return blobArray;
  }  

async function sendVideo(rapper1, rapper2, versesAudio){
  const axios = require('axios');
  const response = await axios({
    method: 'post',
    url: 'whatever the URL ends up being',
    data: {
      "rapper1": `${rapper1}`,
      "rapper2": `${rapper2}`,
      "versesAudio": versesAudio
      },
    headers: {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
    },
  });
  return response
}

function base64ToMp4Blob(base64) {
  const binaryString = atob(base64);
  const byteArray = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i);
  }
  return new Blob([byteArray], { type: 'video/mp4' });
}

export async function buildRapBattle(postID, rapper1, rapper2, topics){
  const rapperInformation = await createRap(rapper1, rapper2, topics)
  let verseBase64 = await createBlobArray(rapperInformation)
  verseBase64 = verseBase64.filter(function(element) {
    return element !== undefined;
  });
  const stored_audio_refrenece = await uploadAudioToFirebaseStorage(postID, verseBase64)
  return stored_audio_refrenece
}

// this does not work on vercel.. Serverless Function Execution Timeout (Seconds) 10 60 900 based on plan
// export async function buildRapBattle(postID, rapper1, rapper2, topics){
//     // const rapperInformation = await createRap(rapper1, rapper2, topics)
//     const response = await fetch('/api/getRapInfo', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({rapper1: rapper1, rapper2: rapper2, topics: topics})
//     })
//     const json = await response.json()
//     const rapperInformation = json.rapperInformation
//     console.log('Rap info', rapperInformation)
//     let verseBase64 = await createBlobArray(rapperInformation)
//     verseBase64 = verseBase64.filter(function(element) {
//       return element !== undefined;
//     });
//     const stored_audio_refrenece = await uploadAudioToFirebaseStorage(postID, verseBase64)
//     return stored_audio_refrenece
//   }

// export async function buildRapBattle(rapper1, rapper2, topics){
//   const rapperInformation = await createRap(rapper1, rapper2, topics)
//   const verseBase64 = await createBlobArray(rapperInformation)
//   const response = await sendVideo(rapper1, rapper2, verseBase64)
//   return base64ToMp4Blob(response.data)
// }

