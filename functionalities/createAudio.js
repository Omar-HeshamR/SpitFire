const elevenLabsAPI = async (apiKey, text, voice_id) => {
    const axios = require('axios');
    try {
      let voice= "https://api.elevenlabs.io/v1/text-to-speech/"+voice_id;
      const response = await axios({
        method: 'post',
        url: voice,
        data: {
          "text": `${text}`,
          "voice_settings": {
            "stability": 0.10,
            "similarity_boost": 0.50
          }
         },
        headers: {
          'Accept': 'audio/mpeg',
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer'
      });
      return convertToBase64(response.data); //this is where the create
    } catch (error) {
      console.error(error);
    }
  };
  
const mappings = {"Squidward": "3mzRhoXDF0m3YI5aDaPf", "Darth Vader": "8aOFpoRnVHhoOAclBoZ7", "Ben Shapiro": "AQY1ANRmcYGHPGq0HOgG", "Joe Biden": "C6EDOVsH5TOi0E3DZOBV", "Obama": "ECnmG7iRpfwl73wsvlN5", "Mark Zuccerburg": "EEIjUG5LRCZE7WQofbbN", "AOC": "JGBCR3v9wbmTDrH6ACZ5", "Morgan Freeman": "JSnXKawvF2t8Vuc6ExYF", "Optimus Prime": "OahrJyZwa32Zb5AliiQT", "Stephen A Smithh": "QorrotVekkUtnjDvQwQt", "Hilary": "bGfGjjmPAYej1eQ1hOnz", "Trump": "dUvDNAat3tCm2uTOPoKm", "Eminem": "e8kQlmmdv8LHStNanbE9", "Elon Musk": "efSaddRfIzaqLQwEGke4", "Drake": "mbzWnnwc9JwcjDrjwWsc", "Andrew Tate": "nvDWVyRCq5m1PjcEjXmG", "Spongebob": "olYmKtq4GG5KKTNI5VDi", "LeBron James": "pRU3xAeFCsRshjLBvxZC", "Kanye": "qGoK9UgVWGeXF855puBH", "Cardi B": "qTZqDNELL7jRp0GjZMMv", "Shrek": "qkoJbXoPzSzJQ0Verr0F", "Taylor Swift": "rJuZcel2kGBkqPRB5w0W"}
export async function getVerseBase64(rapper, verse){
    const elevenLabsKey = 'cd9925486599d5e131568f5e7197aaf7';
    const voice_id = mappings[rapper];
    try {
        const blob = await elevenLabsAPI(elevenLabsKey, verse, voice_id);
        console.log('success')
        return blob;
    } catch (error) {
        console.error(`An error occurred while converting text to speech: ${error}`);
    }
  }  
  
  function convertToBase64(data) {
    // Convert the data string into a Buffer
    const buffer = Buffer.from(data);
    // Convert the buffer to a base64 string
    const base64 = buffer.toString('base64');
    return base64;
  }

  