import React from 'react';

export default function Selection({ questions, finishedIds, onSelect }) {
  return <section className="selection-page page-enter">
    <div className="selection-heading"><div><div className="eyebrow">KINO BILIMLARINGIZNI SINANG</div><h1>Soundtrackni tanlang</h1><p>Istalgan musiqani tanlang va kino nomini toping.</p></div><span className="selection-count">{finishedIds.length} / {questions.length} yakunlandi</span></div>
    <div className="video-grid">
      {questions.map((question, index) => {
        const done = finishedIds.includes(question.id);
        return <button className={`video-choice ${done ? 'is-finished' : ''}`} key={question.id} onClick={() => onSelect(index)} disabled={done} aria-label={`${index + 1}-soundtrack${done ? ', yakunlangan' : ', savolni ochish'}`}>
          <div className="choice-preview"><span className="choice-number">{String(index + 1).padStart(2, '0')}</span><span className="choice-play" aria-hidden="true">{done ? '✓' : '♫'}</span><span className="choice-watermark" aria-hidden="true">MBSI QUIZ</span></div>
          <div className="choice-caption"><strong>{index + 1}-soundtrack</strong><span>{done ? 'Yakunlandi ✓' : 'Tinglash →'}</span></div>
        </button>;
      })}
    </div>
  </section>;
}
