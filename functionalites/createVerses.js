

export async function createVerses(rapper1, rapper2){
    const { Configuration, OpenAIApi } = require("openai");
    const prompt = `Make a unique rap battle between ${rapper1} and ${rapper2} that considers each's personal info. Each of the 8 verses should have 4 lines.`

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

    return completion.data.choices[0].message.content;
}

