const express = require('express');
const openai = require('openai');
const bodyParser = require('body-parser');
const cors = require('cors')

openai.apiKey = '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';

const app = express();

// use body-parser middleware to parse request bodies
app.use(bodyParser.json());
app.use(cors()) 

app.post('/chat', (req, res) => {
    console.log("we got a request -> ", req.body.prompt)
  const prompt = req.body.prompt; // get the prompt from the request body
  openai.completions.create({
    engine: 'text-davinci-002',
    prompt: prompt,
    max_tokens: 2048,
    temperature: 0.5,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  }, (error, response) => {
    if (error) {
      res.send({error: error});
    } else {
      res.send({response: response.choices[0].text});
    }
  });
});


openai.engines.list((error, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log(response.data);
  }
});


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
