import React from "react";
import { useState, useEffect } from "react";
import Button from "./components/Button";
import LineGraph from "./components/Line";

function App() {
  const [coins, setCoins] = useState([]);
  const [coin, setCoin] = useState({
    prices: [],
    dates: [],
    caps: [],
  });

  useEffect(() => {
    const fetchCoins = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
      );
      const data = await response.json();
      setCoins(data);
    };
    fetchCoins();
  }, []);

  const fetchCoinMarketChart = async (id) => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=14&interval=hourly`
    );
    const data = await response.json();
    const newDates = [];
    const newPrices = [];
    data.prices.map((arr) => {
      newDates.push(new Date(arr[0]).getDates());
      newPrices.push(arr[1]);
    });
    setCoin({ ...coin, prices: newPrices, dates: newDates });
  };

  return (
    <>
      <div className="bg-black py-10 px-5">
        <h1 className="text-white text-5xl py-3 font-bold">
          Watch & Trade Crypto
        </h1>
        <p className="text-orange-500 text-2xl">
          Track the performance of all coins in real time, and trade!
        </p>
        <div className="flex py-2 gap-1 flex-wrap">
          {/* top10 buttons here */}
          {coins.map((coin) => {
            return (
              <Button
                key={coin.id}
                {...coin}
                handleClick={fetchCoinMarketChart}
              />
            );
          })}
        </div>
      </div>
      {/* graphs here */}
      <div className="py-10 pb-20 flex justify-between gap-2 flex-col px-5 md:flex-row">
        <div className="bg-white border rounded-lg items-center w-full md:w-1/2">
          <LineGraph labels={coin?.dates} values={coin?.prices} />
        </div>
        <div className="bg-white border rounded-lg items-center w-full md:w-1/2">
          <LineGraph />
        </div>
      </div>
    </>
  );
}

export default App;

// primary: #fe7c03
// secondary: #0000
// font-color: #ffff

// on results only: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
// 100 results: https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false
// market chart: "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=14&interval=hourly"
