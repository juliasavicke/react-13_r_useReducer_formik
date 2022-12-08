import { useState, useEffect } from 'react';

function CountUp(props) {
  //sis komponentas kai uzsikrauna dideja nuo 0 iki 500 reiksmes atsinaujina kas 300ms
  // useState useEffect
  const [counterValue, setCounterValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (counterValue < 20) {
        setCounterValue((prevValue) => prevValue + 1);
      } else return;
    }, 150);
    return () => clearTimeout(timer);
  });

  //pasibaigus counteriui isvalyti intervala
  return (
    <div>
      <h4>CountUp</h4>
      <h2>{counterValue}</h2>
    </div>
  );
}
export default CountUp;
