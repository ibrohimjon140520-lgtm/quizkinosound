import React, { useEffect, useRef, useState } from 'react';

const bars = Array.from({ length: 48 }, (_, i) => 8 + ((i * 17 + i * i * 7) % 36));
const time = value => `${Math.floor(value / 60).toString().padStart(2, '0')}:${Math.floor(value % 60).toString().padStart(2, '0')}`;

export default function AudioPlayer({ src, onComplete, renderActions, suspended = false }) {
  const ref = useRef(null);
  const count = useRef(0);
  const [completed, setCompleted] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState(false);
  const [notice, setNotice] = useState('');
  useEffect(() => {
    if (suspended) ref.current?.pause();
  }, [suspended]);
  async function play() {
    try { await ref.current.play(); setNotice(''); }
    catch { setNotice('Ijroni boshlash uchun play tugmasini bosing.'); }
  }
  function replay() {
    if (count.current !== 1 || playing || error) return;
    ref.current.currentTime = 0;
    setPosition(0);
    play();
  }
  function toggle() {
    if (playing) ref.current.pause();
    else if (ref.current.ended) replay();
    else play();
  }
  function ended() {
    if (count.current >= 2) return;
    count.current += 1;
    setCompleted(count.current);
    setPlaying(false);
    onComplete(count.current);
  }
  return <>
    <div className="audio-stage">
      <div className="audio-stage-label"><span aria-hidden="true">♫</span> SOUNDTRACKNI TINGLANG</div>
      <audio ref={ref} src={src} preload="metadata" onLoadedMetadata={() => setDuration(Number.isFinite(ref.current.duration) ? ref.current.duration : 0)} onTimeUpdate={() => setPosition(ref.current.currentTime)} onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={ended} onError={() => { setError(true); setPlaying(false); }} />
      <div className={`audio-bubble ${playing ? 'is-playing' : ''}`}>
        <button className="audio-play" type="button" onClick={toggle} disabled={error || completed >= 2} aria-label={playing ? 'Pauza' : 'Musiqani ijro etish'}>
          {playing ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h4v16H6zm8 0h4v16h-4z" /></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v18l15-9z" /></svg>}
        </button>
        <div className="audio-visual">
          <div className="audio-wave" aria-hidden="true">{bars.map((height, i) => <span key={i} className={duration && i / bars.length < position / duration ? 'heard' : ''} style={{ height: `${height}px` }} />)}</div>
          <div className="audio-time"><span>{time(position)}</span><span>{time(duration)}</span></div>
        </div>
      </div>
      <p className="audio-status" role="status">{error ? 'Audio hali qo‘shilmagan yoki ochilmadi.' : notice || (playing ? `${completed + 1}-ijro · Diqqat bilan tinglang` : completed ? `${completed} ta ijro yakunlandi` : 'Boshlash uchun ▶ tugmasini bosing')}</p>
    </div>
    {renderActions?.({ canReplay: completed === 1 && !playing && !error, replay })}
  </>;
}
