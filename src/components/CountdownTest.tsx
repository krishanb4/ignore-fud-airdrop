import React, { useEffect, useState } from "react";

const CountdownTimerTest: React.FC<{ countdownToUTC: string }> = ({
  countdownToUTC,
}) => {
  const [countdown, setCountdown] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const countdownToTime = new Date(countdownToUTC);
      const currentTime = new Date(Date.now());
      const timeDifferenceInSeconds = Math.floor(
        (countdownToTime.getTime() - currentTime.getTime()) / 1000
      );

      if (timeDifferenceInSeconds <= 0) {
        clearInterval(intervalId);
        setCountdown({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor(timeDifferenceInSeconds / 3600);
        const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
        const seconds = Math.floor(timeDifferenceInSeconds % 60);
        setCountdown({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countdownToUTC]);

  return (
    <div>
      <p>
        {countdown.hours.toString().padStart(2, "0")}:
        {countdown.minutes.toString().padStart(2, "0")}:
        {countdown.seconds.toString().padStart(2, "0")}
      </p>
    </div>
  );
};

export default CountdownTimerTest;
