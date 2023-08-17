import './App.css';
import React, { useRef,useState, useEffect } from 'react';
import './NavBar.css';
import LightBulb from './lightbulb.png'


function App() {
  const secondPageRef = useRef(null);  // Create a ref for the second page div
  const thirdPageRef = useRef(null);  // Create a ref for the second page div
  const firstPageRef = useRef(null);  // Create a ref for the second page div
  const [percentage, setPercentage] = useState(0);
  const [numBusinesses, setNumBusinesses] = useState("");
  const [chanceSuccess, setChanceSuccess] = useState(0);

  const handleScrollToSecondPage = () => {
    startAnimation()
    secondPageRef.current.scrollIntoView({ behavior: 'smooth' });  // Use the ref to scroll into view
  };
  const handleScrollToThirdPage = () => {
    thirdPageRef.current.scrollIntoView({ behavior: 'smooth' });  // Use the ref to scroll into view
  };
  const handleScrollToFirstPage = () => {
    firstPageRef.current.scrollIntoView({ behavior: 'smooth' });  // Use the ref to scroll into view
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    
    // Use a regular expression to check if the value is a number
    if (/^\d*$/.test(value)) {
      setNumBusinesses(value);

      let chanceOfFailure = Math.pow(0.95, value + 1); 
      let chanceOfSuccess = (1 - chanceOfFailure)*100
      let rounded = Math.round(chanceOfSuccess * 10) / 10;  

      setChanceSuccess(rounded);
    }
  };

  let totalDuration = 0;
  const maxDuration = 3000;

  const getRandomNumber = () => Math.round((Math.random() * 100) * 10) / 10; 

  const startAnimation = () => {
      setPercentage(0); 

      const updateAnimation = (currentDuration) => {
          if (totalDuration + currentDuration < maxDuration) {
              setPercentage(getRandomNumber());
              totalDuration += currentDuration;

              // Increase the delay by multiplying the current duration, for the slowing effect
              const nextDuration = currentDuration * 1.07;
              setTimeout(() => updateAnimation(nextDuration), nextDuration);
          } else {
              setPercentage(chanceSuccess.toFixed(1));
              totalDuration = 0; // Reset the total duration for next time
          }
      };

      updateAnimation(10); // Start the animation with an initial delay of 10ms
  };

  return (
    <div className="App" ref={firstPageRef}>
        <div className="navbar">
            <div id='navBarTitle' onClick={handleScrollToFirstPage}>
                <div id='capitalE'>E
                </div>
                <a >EntrepreneurCalculator.online</a>
            </div>
            <div id='navBarRightSide'>
                <a id='navBarAbout' onClick={handleScrollToThirdPage}>How It Works?</a>
            </div>
        </div>
        <div id='landingPageDiv'>
          <div id='landingPageLeft'>
            <h1>Count your launches. <br></br>Calculate your success.</h1>
            <p>Venturing into a new business? Discover if your next endeavour has the potential to strike gold!</p>
            <input
              placeholder='Number of Past Businesses Here...'
              type='text'
              value={numBusinesses}
              onChange={handleInputChange}
            />
            <button onClick={handleScrollToSecondPage}>Calculate Success Chances</button>
          </div>
          <div id='landingPageRight'>
            <img src={LightBulb} alt='Image of a lightbulb'></img>
          </div>
        </div>
        <div id="secondPageDiv" ref={secondPageRef}>
          <h2>The chances your next business hits it big is:</h2>
          <div className="percentage-container">
            <span id='percentageCalc'>{percentage}</span>
            <span>%</span>
        </div>
        </div>
        <div id="thirdPageDiv" ref={thirdPageRef}>
          <h2 id='howItWorksTitle'>How It Works</h2>
          <h2 id='headerThirdPage'>According to ScrapingFish.com...</h2>
          <p id='scrapingFishDescr'>Only around 5% of the products they analyzed on IndieHackers.com generate a monthly revenue exceeding ~$8,333 (around ~$100k/year)</p>
          <h2 id='estChanceTitle'>So the (estimated) chance of success is:</h2>
          <p id='showCalculations'><span>Chance Of Failure</span> = (0.95)^(Number Of Businesses You’ve Had)</p>
          <p id='showCalculations'><span>Chance Of Success</span> = 1 - Chance of Failure</p>
        </div>

    </div>
  );
}

export default App;
