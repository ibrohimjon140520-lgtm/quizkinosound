import React from 'react';

export default function Home({ count, onStart }) {
  return (
    <section className="home page-enter">
      <div className="eyebrow"><span /> KINO OLAMIGA XUSH KELIBSIZ</div>
      <h1>MBSI <span>Quiz</span></h1>
      <p className="hero-description">Soundtrackni tinglang<br className="mobile-break" /> va javobni toping!</p>
      <div className="cinema-art" aria-hidden="true">
        <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
        <span className="art-spark spark-one">✦</span><span className="art-spark spark-two">✧</span>
        <span className="floating-label label-left"><span>▶</span> Tinglang</span>
        <div className="mini-player">
          <div className="mini-top"><span /><span /><span /><i>MBSI MUSIC</i></div>
          <div className="mini-screen"><div className="screen-glow" /><div className="play-circle">♫</div><span className="screen-caption">Har bir ohang — yangi savol</span></div>
          <div className="mini-controls"><span>▶</span><div><i /></div><span>00:30</span></div>
        </div>
        <span className="floating-label label-right"><span>✧</span> Javobni toping</span>
      </div>
      <button className="button start-button" onClick={onStart} disabled={!count}>BOSHLASH <span aria-hidden="true">↗</span></button>
      <p className="start-hint">Tayyormisiz? Kino haqidagi bilimlaringizni sinang.</p>
      <div className="steps">
        <div className="step"><span className="step-icon">▶</span><div><h2>Tinglang</h2><p>Musiqani tinglang va kinoni eslang</p></div></div>
        <div className="step"><span className="step-icon">?</span><div><h2>Javobni o‘ylang</h2><p>Kino nomini topa olasizmi?</p></div></div>
        <div className="step"><span className="step-icon">✓</span><div><h2>O‘zingizni sinang</h2><p>{count} ta savol, bir olam taassurot</p></div></div>
      </div>
    </section>
  );
}
