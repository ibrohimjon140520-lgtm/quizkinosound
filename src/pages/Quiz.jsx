import React, { useEffect, useState } from 'react';
import AudioPlayer from '../components/AudioPlayer';
import QuizProgress from '../components/QuizProgress';
import CountdownPage from './CountdownPage';
import AnswerPage from './AnswerPage';
import ConfirmAnswer from '../components/ConfirmAnswer';

export default function Quiz({ questions, initialIndex = 0, onQuestionComplete, isFinalQuestion, onBack }) {
  const index = initialIndex;
  const [phase, setPhase] = useState('watching');
  const [completed, setCompleted] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const question = questions[index];
  useEffect(() => {
    if (phase !== 'ready') window.scrollTo({ top: 0, behavior: 'instant' });
  }, [phase, index]);
  function next() {
    if (phase !== 'answer') return;
    onQuestionComplete(question.id);
  }
  if (!question) return <section className="quiz-page"><h1>Hozircha savollar yo‘q</h1></section>;
  if (phase === 'countdown') return <CountdownPage onComplete={() => setPhase('answer')} />;
  if (phase === 'answer') return <AnswerPage question={question} onNext={next} isLast={isFinalQuestion} />;
  return <section className="quiz-page page-enter">
    <div className="quiz-topline"><button className="back-button" onClick={onBack}>← Soundtracklar</button><QuizProgress current={index + 1} total={questions.length} /></div>
    <div className="quiz-heading"><div className="eyebrow">DIQQAT BILAN TINGLANG</div><h1>Bu qaysi kino soundtracki?</h1><p>Musiqani tinglang, eslang va javobingizni o‘ylang.</p></div>
    <AudioPlayer
      key={question.id}
      src={question.audio}
      suspended={confirmOpen}
      onComplete={count => { setCompleted(count); setPhase('ready'); }}
      renderActions={({ canReplay, replay }) => <div className="quiz-action">
        <div className="quiz-buttons">
          <button type="button" className="button" disabled={!canReplay} onClick={replay}>QAYTA TINGLASH <span aria-hidden="true">↻</span></button>
          <button type="button" className="button" disabled={phase !== 'ready'} onClick={() => {
            if (phase !== 'ready') return;
            if (completed >= 2) setPhase('countdown');
            else setConfirmOpen(true);
          }}>JAVOBNI KO‘RISH <span aria-hidden="true">→</span></button>
        </div>
        <p className="action-hint">{phase === 'watching' ? 'Musiqani bir marta tinglagach javobni ochishingiz mumkin.' : 'Javobingiz tayyormi? Keling, tekshiramiz.'}</p>
      </div>}
    />
    {confirmOpen && <ConfirmAnswer onCancel={() => setConfirmOpen(false)} onConfirm={() => { setConfirmOpen(false); setPhase('countdown'); }} />}
  </section>;
}
