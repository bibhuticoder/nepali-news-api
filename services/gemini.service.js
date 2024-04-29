const { GoogleGenerativeAI } = require('@google/generative-ai');

const summarize = async (text) => {
    const KEY = "AIzaSyBlCdVdqcHIi1cqqGC_v_ek-lmL8EWCmLo"

    // GoogleGenerativeAI required config
    const configuration = new GoogleGenerativeAI(KEY);

    // Model initialization
    const modelId = "gemini-pro";
    const model = configuration.getGenerativeModel({ model: modelId });

    const chat = model.startChat({
        generationConfig: {
            // maxOutputTokens: 100,
        }
    })

    const result = await chat.sendMessage(`Summarize the following. Keep it in simple english as possible and output it on plain-text format.
    ${text}
    `);
    const response = await result.response;
    const responseText = response.text();

    return responseText
}

module.exports = { summarize }
