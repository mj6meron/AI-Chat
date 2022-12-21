const { Configuration, OpenAIApi } =require("openai");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

// use body-parser middleware to parse request bodies
app.use(bodyParser.json());
app.use(cors()) 



const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);


app.post('/chat', async (req, res) => {
  console.log("we here")
  await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    max_tokens: 7,
    temperature: 0,
  }).then(response => {
    res.send({response: response.choices[0].text});
  }).catch(error => {
    res.send({error: error});
  });
})




app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
