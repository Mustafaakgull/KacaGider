import { useEffect, useState } from "react";

function CountdownTimer({ deadline }) {
  const [secondsLeft, setSecondsLeft] = useState(
    Math.max(0, Math.ceil((deadline - Date.now()) / 1000))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setSecondsLeft(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  return <div>Time left: {secondsLeft} seconds</div>;
}

export default CountdownTimer;