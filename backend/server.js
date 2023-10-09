const express = require('express');
const bodyParser = require('body-parser');
const plivo = require('plivo');
const axios = require('axios');
const cors = require('cors'); // Import the 'cors' middleware
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;
const apiKey = ''; //Weather api key
const callerNum = ''; // Number used for outbound calls

app.use(bodyParser.json());

const corsOptions = {
    origin: '*',
  };
  
app.use(cors(corsOptions));

// Create a Plivo client instance
const authId = ''; // Replace it with Plivo auth ID.
const authToken = ''; // Replace with your Plivo auth token
const ngrokAddr = ''; //ngrok link to share xml data
const plivoClient = new plivo.Client(authId, authToken);

  app.get('/custom_message', (req, res) => {
    res.sendFile(__dirname + '/custom_message.xml');
  });


function parseWeatherInfo(weatherObj)
{
  retStr = `Temperature: ${(weatherObj['temp']-273.15).toFixed(2)} degree celsius,
            Feels like: ${(weatherObj['feels_like']-273.15).toFixed(2)} degree celsius,
            Minimum Temperature: ${(weatherObj['temp_min']-273.15).toFixed(2)} degree celsius,
            Maximum Temperature: ${(weatherObj['temp_max']-273.15).toFixed(2)} degree celsius,
            Pressure: ${(weatherObj['pressure']).toFixed(2)},
            Humidity: ${(weatherObj['humidity']).toFixed(2)}
  `;
  return retStr;
}

// Endpoint to initiate a voice call
app.post('/voice-call-note', async (req, res) => {
    
  const { text, phoneNumberOne} = req.body; // Phone number to make the call to
    const message_xml = 
    `<Response>
        <Speak>${'Personalised note for you: '+ text}</Speak>
    </Response>`;

    // save message_xml in custom_message.xml file
    fs.writeFile('custom_message.xml', message_xml, function (err) {
    if (err) return console.log(err);
    console.log('custom_message.xml saved');
    });

  try {
    // Create a Plivo call and play a recorded message
    const response = await plivoClient.calls.create(
      callerNum, // Replace with your Plivo source phone number
      phoneNumberOne,
      ngrokAddr,
      {
        answerMethod: 'GET',
      }
    );

    console.log('Plivo voice call initiated:', response);
    res.status(200).json({ message: 'Voice call initiated' });
  } catch (error) {
    console.error('Error making Plivo voice call:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/voice-call-info', async (req, res) => {
    
  const { phoneNumberTwo , cityName} = req.body; // Phone number to make the call to
    const weatherReport = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
    const weatherObj = weatherReport['data']['main'];
    const weatherInfo = parseWeatherInfo(weatherObj);
    // console.log("weather report = ",weatherReport['data']['main']['temp']);
    const message_xml = 
    `<Response>
        <Speak>${'The weather report of '+ cityName + ' for today is ' + weatherInfo}</Speak>
    </Response>`;

    // save message_xml in custom_message.xml file
    fs.writeFile('custom_message.xml', message_xml, function (err) {
    if (err) return console.log(err);
    console.log('custom_message.xml saved');
    });

  try {
    // Create a Plivo call and play a recorded message
    const response = await plivoClient.calls.create(
      callerNum, // Replace with your Plivo source phone number
      phoneNumberTwo,
      ngrokAddr,
      {
        answerMethod: 'GET',
      }
    );

    console.log('Plivo voice call initiated:', response);
    res.status(200).json({ message: 'Voice call initiated' });
  } catch (error) {
    console.error('Error making Plivo voice call:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/voice-call-joke', async (req, res) => {
    
  const {phoneNumberThree} = req.body; // Phone number to make the call to
    const jokeForToday = await axios.get(`https://v2.jokeapi.dev/joke/Programming?format=txt&type=single`);
    // console.log("joke for today = ",jokeForToday, " type = ",typeof(jokeForToday));
    const message_xml = 
    `<Response>
        <Speak>${'The joke for today is ' + jokeForToday['data']}</Speak>
    </Response>`;

    // save message_xml in custom_message.xml file
    fs.writeFile('custom_message.xml', message_xml, function (err) {
    if (err) return console.log(err);
    console.log('custom_message.xml saved');
    });

  try {
    // Create a Plivo call and play a recorded message
    const response = await plivoClient.calls.create(
      callerNum, // Replace with your Plivo source phone number
      phoneNumberThree,
      ngrokAddr,
      {
        answerMethod: 'GET',
      }
    );

    console.log('Plivo voice call initiated:', response);
    res.status(200).json({ message: 'Voice call initiated' });
  } catch (error) {
    console.error('Error making Plivo voice call:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
