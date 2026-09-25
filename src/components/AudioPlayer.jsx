import React, { useEffect, useRef, useState } from 'react';

const bars = Array.from({ length: 48 }, (_, i) => 8 + ((i * 17 + i * i * 7) % 36));
const time = value => `${Math.floor(value / 60).toString().padStart(2, '0')}:${Math.floor(value % 60).toString().padStart(2, '0')}`;

export default function AudioPlayer({ src, onComplete, renderActions, suspended = false, startTime = 0, clipDuration = 15 }) {
  const ref = useRef(null);
  const count = useRef(0);
  const finished = useRef(false);
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
    finished.current = false;
    ref.current.currentTime = startTime;
    setPosition(0);
    play();
  }
  function toggle() {
    if (playing) ref.current.pause();
    else if (finished.current) replay();
    else play();
  }
  function ended() {
    if (finished.current || count.current >= 2) return;
    finished.current = true;
    ref.current.pause();
    setPosition(duration);
    count.current += 1;
    setCompleted(count.current);
    setPlaying(false);
    onComplete(count.current);
  }
  function loaded() {
    const length = ref.current.duration;
    const available = Number.isFinite(length) ? Math.max(0, length - startTime) : clipDuration;
    setDuration(Math.min(clipDuration, available));
    if (available <= 0) { setError(true); return; }
    ref.current.currentTime = startTime;
  }
  function updateTime() {
    const elapsed = Math.max(0, ref.current.currentTime - startTime);
    setPosition(Math.min(elapsed, duration));
    if (duration > 0 && elapsed >= duration) ended();
  }
  useEffect(() => {
    if (!playing || !duration) return;
    const remaining = Math.max(0, startTime + duration - ref.current.currentTime);
    const timer = setTimeout(() => {
      if (ref.current.currentTime >= startTime + duration - 0.03) ended();
    }, remaining * 1000);
    return () => clearTimeout(timer);
  }, [playing, position, duration, startTime]);
  return <>
    <div className="audio-stage">
      <div className="audio-stage-label"><span aria-hidden="true">♫</span> SOUNDTRACKNI TINGLANG</div>
      <audio ref={ref} src={src} preload="metadata" onLoadedMetadata={loaded} onTimeUpdate={updateTime} onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={ended} onError={() => { setError(true); setPlaying(false); }} />
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
