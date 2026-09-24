import React, { useEffect, useRef, useState } from 'react';

export default function Countdown({ onComplete }) {
  const [seconds, setSeconds] = useState(5);
  const callback = useRef(onComplete);
  callback.current = onComplete;
  useEffect(() => {
    const timer = setTimeout(() => {
      if (seconds === 1) callback.current();
      else setSeconds(value => value - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [seconds]);
  return <div className="countdown-block" role="status" aria-live="polite"><span className="section-label">JAVOB OCHILMOQDA</span><div className="countdown-number" key={seconds}>{seconds}</div><p>So‘nggi taxminingiz qanday?</p></div>;
}
