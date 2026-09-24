import React, { useState } from 'react';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Selection from './pages/Selection';
import questions from './data/questions';
import logo from './assets/mbsi-logo.jpg';


export default function App() {
  const [page, setPage] = useState('home');
  const [session, setSession] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [finishedIds, setFinishedIds] = useState([]);
  function start() { setFinishedIds([]); setPage('selection'); }
  function select(index) {
    setSelectedIndex(index);
    setSession(value => value + 1);
    setPage('quiz');
    window.scrollTo(0, 0);
  }
  function finishQuestion(id) {
    const updated = [...new Set([...finishedIds, id])];
    setFinishedIds(updated);
    setPage(updated.length === questions.length ? 'result' : 'selection');
    window.scrollTo(0, 0);
  }
  return (
    <div className={`app-shell ${page === 'quiz' ? 'playing-quiz' : ''}`}>
      <header className="site-header">
        <div className="brand"><span className="brand-logo"><img src={logo} alt="MBSI logosi" /></span><span>MBSI <span className="brand-light">Quiz</span></span></div>
      </header>
      <main>
        {page === 'home' && <Home count={questions.length} onStart={start} />}
        {page === 'selection' && <Selection questions={questions} finishedIds={finishedIds} onSelect={select} />}
        {page === 'quiz' && <Quiz key={session} questions={questions} initialIndex={selectedIndex} onQuestionComplete={finishQuestion} isFinalQuestion={finishedIds.length === questions.length - 1} onBack={() => setPage('selection')} />}
        {page === 'result' && <Result count={questions.length} onRestart={start} />}
      </main>
      <footer className="site-footer"><span>© {new Date().getFullYear()} MBSI Quiz</span><span>Kino ixlosmandlari uchun yaratilgan <span className="footer-star">✦</span></span></footer>
    </div>
  );
}
