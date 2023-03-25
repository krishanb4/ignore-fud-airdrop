import React, { useEffect, useState } from "react";

const CountdownTimer: React.FC = () => {
  const [countdown, setCountdown] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetTime = new Date("2023-03-16T00:00:00Z");
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const diff = targetTime.getTime() - currentTime.getTime();
      if (diff <= 0) {
        clearInterval(intervalId);
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setCountdown({
          days,
          hours,
          minutes,
          seconds,
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <p>
        {countdown.days.toString().padStart(2, "0")}:
        {countdown.hours.toString().padStart(2, "0")}:
        {countdown.minutes.toString().padStart(2, "0")}:
        {countdown.seconds.toString().padStart(2, "0")}
      </p>
    </div>
  );
};

export default CountdownTimer;
