import React from 'react';

export default function QuizProgress({ current, total }) {
  return <div className="quiz-progress"><div className="progress-heading"><span>SAVOL <strong>{String(current).padStart(2, '0')}</strong></span><span>{current} / {total}</span></div><div className="progress-track" role="progressbar" aria-label="Savollar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={current}><div style={{ width: `${current / total * 100}%` }} /></div></div>;
}
