import React from 'react';

export default function Result({ count, onRestart }) {
  return <section className="result-page page-enter"><div className="result-art" aria-hidden="true"><span>✦</span><div>✓</div><span>✧</span></div><div className="eyebrow">AJOYIB, BARCHASI YAKUNLANDI!</div><h1>MBSI Quiz tugadi!</h1><p>Siz barcha {count} ta savolni yakunladingiz.</p><div className="result-summary"><span>Yakunlangan savollar</span><strong>{count} / {count}</strong><div className="progress-track"><div style={{ width: '100%' }} /></div></div><button className="button" onClick={onRestart}>QAYTADAN O‘YNASH <span aria-hidden="true">↻</span></button><p className="start-hint">Yana bir bor kino olamiga sho‘ng‘iymizmi?</p></section>;
}
