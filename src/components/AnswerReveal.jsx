import React, { useState } from 'react';

export default function AnswerReveal({ answer, title, year, image, onNext, isLast }) {
  const [imageError, setImageError] = useState(false);
  return <div className="answer-reveal" role="status">
    <div className="answer-check">✓</div>
    <span className="section-label">TO‘G‘RI JAVOB</span>
    <figure className="movie-answer">
      {image && !imageError ? <img src={image} alt={`${title || answer} filmi rasmi`} onError={() => setImageError(true)} /> : <div className="poster-placeholder"><span aria-hidden="true">▧</span><p>Kino rasmi hali qo‘shilmagan</p></div>}
      <figcaption><h2>{title || answer}{year && <span className="movie-year"> ({year})</span>}</h2></figcaption>
    </figure>
    <button className="button" onClick={onNext}>{isLast ? 'YAKUNLASH' : 'KEYINGI SAVOL'} <span aria-hidden="true">→</span></button>
  </div>;
}
