import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

function TextForm() {
  const [text, setText] = useState('');
  const [phoneNumberOne, setPhoneNumberOne] = useState('');
  const [phoneNumberTwo, setPhoneNumberTwo] = useState('');
  const [phoneNumberThree, setPhoneNumberThree] = useState('');

  const [cityName, setCityName] = useState('');

  const handleSubmitNote = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend with the entered text
      const response = await axios.post('http://localhost:5000/voice-call-note', { text , phoneNumberOne});

      // Handle the response, e.g., show a success message
      console.log('Text submitted successfully:', response.data);
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Error submitting text:', error);
    }
  };

  const handleSubmitInfo = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend with the entered text
      const response = await axios.post('http://localhost:5000/voice-call-Info', { cityName , phoneNumberTwo});

      // Handle the response, e.g., show a success message
      console.log('Text submitted successfully:', response.data);
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Error submitting text:', error);
    }
  };

  const handleSubmitJoke = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend with the entered text
      const response = await axios.post('http://localhost:5000/voice-call-joke', { phoneNumberThree});

      // Handle the response, e.g., show a success message
      console.log('Text submitted successfully:', response.data);
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Error submitting text:', error);
    }
  };

  return (
    <div>
      <h2>Personalised Note Maker</h2>
      <h3>Share your personal thoughts!</h3>
      <form onSubmit={handleSubmitNote}>
        <div>
          <label>Enter Message:</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <br/>
          <label>Enter Phone Number:</label>
          <input
            type="text"
            value={phoneNumberOne}
            onChange={(e) => setPhoneNumberOne(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <br/>
      <h2>Send General Information</h2>
      <h3>Get Weather Info</h3>
      <form onSubmit={handleSubmitInfo}>
        <div>

        <label>City Name:</label>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            required
          />
        
        <label>Enter Phone Number:</label>
          <input
            type="text"
            value={phoneNumberTwo}
            onChange={(e) => setPhoneNumberTwo(e.target.value)}
            required
          />

        </div>
        <button type="submit">Submit</button>
      </form>
      <br/>
      <h2>Lighten the day</h2>
      <h3>Lets Hear a Programming Joke</h3>
      <form onSubmit={handleSubmitJoke}>
        <div>
        <label>Enter Phone Number:</label>
          <input
            type="text"
            value={phoneNumberThree}
            onChange={(e) => setPhoneNumberThree(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default TextForm;
