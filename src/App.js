import axios from 'axios';
import React, { useState } from 'react';
import "./App.css";

function App() {
  const [maxPrice, setMaxPrice] = useState(0);
  const [maxShortPrice, setMaxShortPrice] = useState(0);

  const [longPrices, setLongPrices] = useState('');
  const [shortPrices, setShortPrices] = useState('');

  const onSubmitLong = async (event) => {
    event.preventDefault();

    let prices = longPrices.split(',').map((price) => parseInt(price))

    if(prices.some(isNaN)) {
      alert('please enter valid stock price');
      return;
    }
    
    let findMaxProfit = await axios.post('https://intense-thicket-51061.herokuapp.com/maxprofit', {
      prices
    });

    setMaxPrice(findMaxProfit.data.maxProfit);
  }

  const onSubmitShort = async (event) => {
    event.preventDefault();

    let prices = shortPrices.split(',').map((price) => parseInt(price));

    if(prices.some(isNaN)) {
      alert('please enter valid stock price');
      return;
    }
    
    let findMaxProfit = await axios.post('https://intense-thicket-51061.herokuapp.com/maxprofitwithshortsell', {
      prices
    });

    setMaxShortPrice(findMaxProfit.data.maxProfitWithShortsell);
  }

  return (
    <div className="container">
        <div className="headline">
          <h1>Stock Calculator</h1>
        </div>

        <form onSubmit={onSubmitLong} className="price-series">
          <label>
            <input
              onChange={e => setLongPrices(e.target.value)}
              type="text" 
              placeholder="Enter Stock prices (use commas)" />
          </label>

          <label>
            <input type="text" readOnly value={maxPrice} className="answer-box" />
          </label>

          <button type="submit">
            Max Single Trade Profit
          </button>
        </form>

        <form onSubmit={onSubmitShort} className="price-series">
        <label>
          <input 
            onChange={e => setShortPrices(e.target.value)}
            type="text" 
            placeholder="Enter Stock prices (use commas)" />
        </label>
        <label>
          <input type="text" readOnly value={maxShortPrice} className="answer-box" />
        </label>

        <button type="submit">
          Max Profit with ShortSell
        </button>
        </form>
    </div>
  );
}

export default App;
