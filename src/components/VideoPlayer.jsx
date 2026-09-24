import React, { useEffect, useRef, useState } from 'react';

export default function VideoPlayer({ src, onComplete, renderActions }) {
  const videoRef = useRef(null);
  const completedRef = useRef(0);
  const [completed, setCompleted] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const [error, setError] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  async function play() {
    try { await videoRef.current.play(); setBlocked(false); }
    catch { setBlocked(true); }
  }
  useEffect(() => { play(); }, []);

  function handleEnded() {
    if (completedRef.current >= 2) return;
    completedRef.current += 1;
    setCompleted(completedRef.current);
    setPlaying(false);
    onComplete(completedRef.current);
  }

  return <><div className="video-card">
    <div className="video-frame">
      <video ref={videoRef} src={src} autoPlay muted={muted} playsInline preload="auto" disablePictureInPicture onEnded={handleEnded} onError={() => { setError(true); setPlaying(false); }} onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-label="Savol uchun kino lavhasi" />
      {error ? <div className="video-overlay error-overlay"><span className="error-icon">▹</span><h3>Video topilmadi</h3><p>Ushbu savol uchun video hali qo‘shilmagan.</p><small>Video qo‘shilgach, sahifani yangilang.</small></div> : blocked && completed < 2 ? <div className="video-overlay"><button className="button" onClick={play}>▶ Videoni ijro etish</button></div> : null}
    </div>
    <div className="video-toolbar"><span className="playback-status"><span className={`status-dot ${playing ? 'pulse' : ''}`} />{playing ? `${completed + 1}-ijro / 2` : completed ? `${completed} ta ijro yakunlandi` : '1-ijro / 2'}</span><button className="sound-button" onClick={() => setMuted(value => !value)} aria-pressed={!muted} disabled={error}>{muted ? 'Ovozni yoqish' : 'Ovozni o‘chirish'} <span aria-hidden="true">{muted ? '♪' : '♫'}</span></button></div>
  </div>
    {renderActions?.({
      canReplay: completed === 1 && !playing && !error,
      replay: () => {
        if (completedRef.current !== 1 || playing || error) return;
        videoRef.current.currentTime = 0;
        play();
      },
    })}
  </>;
}
