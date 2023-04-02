export async function createRap(rapper1, rapper2, topics){
  const { Configuration, OpenAIApi } = require("openai");
  const prompt = `Make a unique rap battle between ${rapper1} and ${rapper2} that considers each's personal info. Each of the 8 verses should have 4 lines. End each line with a period, and don't include too many commas. Align the topics of the rap battles with this information: ${topics}`


  const configuration = new Configuration({
      apiKey: "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",
    });
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
          {role: "system", content: `You are a rap battle creator. You will be generating 4 verses for each rapper, alternating between them. The first verse of each rapper should be a roast directed towards the other rapper. The next 3 verses of each rapper should be focused on roasting the other rapper, based on their previous verse. Please adhere to the following format for each the text output of the verses:

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
rapper1Info.name = rapper1;
rapper2Info.name = rapper2;
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
