export async function createRap(rapper1, rapper2, topics){

  const { Configuration, OpenAIApi } = require("openai");

  const configuration = new Configuration({
    apiKey: "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",
  });

  const openai = new OpenAIApi(configuration);

  const prompt = `Make a unique rap battle between ${rapper1} and ${rapper2} that considers each's personal info. Each of the 6 verses should have 4 lines. End each line with a period, and don't include too many commas. Align the topics of the rap battles with this information: ${topics}`

  const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
          {role: "system", content: `You are a rap battle creator. You will be generating 3 verses for each rapper, alternating between them. The first verse of each rapper should be a roast directed towards the other rapper. The next 3 verses of each rapper should be focused on roasting the other rapper, based on their previous verse. Please adhere to the following format for each the text output of the verses:

          rapper1Name: (verse#)
                   
          rapper2Name: (verse#)`},
          {role: "user", content: `${prompt}` }
      ],
      temperature: 0.70
    });


  let rap = completion.data.choices[0].message.content;
  return seperateIntoVerses(rapper1, rapper2, rap);
}

function seperateIntoVerses(rapper1, rapper2, rap) {
const rapper1Info = {};
const rapper2Info = {};
rapper1Info.name = nameSwap(rapper1);
rapper2Info.name = nameSwap(rapper2);
const verses = rap.split("\n\n");
rapper1Info.verses = [];
rapper2Info.verses = [];


for (let i = 0; i < verses.length; i++) {
  let verseText = verses[i]
  const index = verseText.indexOf('\n');
  if (index >= 0) {
    verseText = verseText.slice(index+1); // remove text before first newline
  }
  verseText = verseText.replace(/\n/g, ' ');
  if (i % 2 === 0) {
    rapper1Info.verses.push(verseText);
  } else {
    rapper2Info.verses.push(verseText);
  }
}
return [rapper1Info, rapper2Info];
}

function nameSwap(rapperName){
  const namePairs = {
    "Donald Trump": "Trump",
    "Optimus Prime": "Optimus Prime",
    "Joseph Biden": "Joe Biden",
    "Barack Obama": "Obama",
    "Lebron James": "LeBron James",
    "Morgan Freeman": "Morgan Freeman",
    "Andrew Tate": "Andrew Tate",
    "Taylor Swift": "Taylor Swift",
    "Kanye West": "Kanye",
    "Drake": "Drake",
    "Spongebob": "Spongebob",
    "Squidward": "Squidward",
    "Eminem": "Eminem",
    "Mark Zuckerberg": "Mark Zuccerburg",
    "Ben Shapiro": "Ben Shapiro",
    "Cardi B": "Cardi B",
    "Elon Musk": "Elon Musk"
  };
  return namePairs[rapperName]
}