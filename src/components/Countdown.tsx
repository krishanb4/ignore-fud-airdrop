import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
const CountdownTimer: React.FC = () => {
  return (
    <div>
      <Countdown
        date={new Date("2023-03-25T16:00:00Z").valueOf()}
        intervalDelay={0}
      />
    </div>
  );
};

export default CountdownTimer;
