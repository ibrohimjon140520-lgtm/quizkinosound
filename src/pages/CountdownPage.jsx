import React from 'react';
import Countdown from '../components/Countdown';

export default function CountdownPage({ onComplete }) {
  return <section className="countdown-page page-enter" aria-label="Javobgacha qolgan vaqt">
    <Countdown onComplete={onComplete} />
  </section>;
}
