import { useEffect, useState } from "react";

type Props = {
  initialSeconds: number;
};

const CountdownTimer = (props: Props) => {
  const { initialSeconds } = props;
  const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
      // Exit early if countdown is finished
      if (seconds <= 0) {
        return;
      }

    //   Set up the timer
     const timer = setInterval(()=>{
        setSeconds((prev:number) => prev — 1)
      },1000)
      // Clean up the timer
      return () => clearInterval(timer);
    }, [seconds]);

  // Format the remaining time (e.g., “00:05:10” for 5 minutes and 10 seconds)
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div>
      <h1>Countdown Timer</h1>
      <p>{formatTime(seconds)}</p>
    </div>
  );
};

export default CountdownTimer;

// import React from ‘react’;
// import CountdownTimer from ‘./CountdownTimer’;

// const App = () => {
// return <CountdownTimer initialSeconds={300} />;
// };

// export default App;
