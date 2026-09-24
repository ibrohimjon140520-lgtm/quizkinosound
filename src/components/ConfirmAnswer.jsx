import React, { useEffect, useRef } from 'react';

export default function ConfirmAnswer({ onConfirm, onCancel }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    dialog.showModal();
    return () => { dialog.close(); previousFocus?.focus(); };
  }, []);

  return <dialog ref={dialogRef} className="confirm-dialog" aria-labelledby="confirm-title" aria-describedby="confirm-description" onCancel={event => { event.preventDefault(); onCancel(); }}>
    <span className="confirm-icon" aria-hidden="true">?</span>
    <h2 id="confirm-title">Rostdan ham javobni topdingizmi?</h2>
    <p id="confirm-description">Ishonchingiz komil bo‘lmasa, musiqani yana bir marta tinglashingiz mumkin.</p>
    <div className="confirm-actions">
      <button type="button" className="button secondary-button" onClick={onCancel} autoFocus>YO‘Q, ORTGA</button>
      <button type="button" className="button" onClick={onConfirm}>HA, TOPDIM</button>
    </div>
  </dialog>;
}
