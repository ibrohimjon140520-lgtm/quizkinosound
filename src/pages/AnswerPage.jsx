import React from 'react';
import AnswerReveal from '../components/AnswerReveal';
import Confetti from '../components/Confetti';

export default function AnswerPage({ question, onNext, isLast }) {
  return <><Confetti /><section className="answer-page page-enter" aria-label="Kino javobi">
    <AnswerReveal
      answer={question.answer}
      title={question.title}
      year={question.year}
      image={question.image}
      onNext={onNext}
      isLast={isLast}
    />
  </section></>;
}
