import './App.css';

import { useState } from 'react';
import { CLASS_NAMES } from './classNames.js'



function App() {
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [predictionIndex, setPredictionIndex] = useState();
  const [predictionProb, setPredictionProb] = useState();

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

  const predict = async() => {
    setImage(imageUrl);
    try {
      const response = await fetch('http://localhost:3001/prediction', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          imageUrl: imageUrl,
        })
      })
      const { index, prob } = await response.json();
      setPredictionProb(prob);
      setPredictionIndex(index);
      setImageUrl('');
    } catch(error) {
      console.log(error)
    }
  }

  function onInputChange (event) {
    setImageUrl(event.target.value);
  }

  return (
    <div className="App">
      {
        image ? <img width='400px' src={image} alt='food'/> : null
      }
      {
        predictionProb && predictionIndex 
        && <h2>Food predicted: {capitalize(CLASS_NAMES[predictionIndex].replace(/_/g," "))}, Confidence: {(predictionProb*100).toPrecision(4)}%</h2> 
      }
      <input onChange={onInputChange} value={imageUrl}/>
      <button onClick={predict}>
        Predict
      </button>
    </div>
  );
}

export default App;
