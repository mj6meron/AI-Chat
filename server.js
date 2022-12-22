const { Configuration, OpenAIApi } =require("openai");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const port = process.env.PORT || 3000;

const app = express();

// use body-parser middleware to parse request bodies
app.use(bodyParser.json());
app.use(cors()) 



const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post('/chat', async (req, res) => {
  const prompt = req.body.prompt; // get the prompt from the request body
  console.log(prompt)
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 4090,
      temperature: 0,
    });
    res.send({response: response.data.choices[0]});
  } catch (error) {
    console.log(error)
    res.send({error: error});
  }
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});