import React, { useEffect, useRef, useState } from 'react';
import './YalenaIntro.css';

/**
 * Intro independiente para colocar encima de cualquier landing page React.
 * El componente no contiene ni modifica la landing page: al terminar llama onOpen().
 *
 * Uso:
 * <YalenaIntro onOpen={() => setShowIntro(false)} />
 */
export default function YalenaIntro({
  onOpen,
  imageSrc = `${import.meta.env.BASE_URL}images/yalena-vestido-azul.png`,
  name = 'Yalena Yisel Peña Bertel',
  date = '31 · 12 · 2026',
  time = '7:00 pm',
  buttonText = 'Abrir invitación',
}) {
  const [opening, setOpening] = useState(false);
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const open = () => {
    if (opening) return;
    setOpening(true);
    // 1) el sobre se abre; 2) la landing aparece debajo mientras la intro se desvanece
    timer.current = window.setTimeout(() => {
      setLeaving(true);
      onOpen?.();
      timer.current = window.setTimeout(() => setVisible(false), 1100);
    }, 1650);
  };

  if (!visible) return null;

  return (
    <section
      className={`yalena-intro${opening ? ' yi-opening' : ''}${leaving ? ' yi-leaving' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Invitación de quince años de Yalena"
    >
      <div className="yi-border" aria-hidden="true" />
      <div className="yi-glow yi-glow-left" aria-hidden="true" />
      <div className="yi-glow yi-glow-right" aria-hidden="true" />

      <div className="yi-stars" aria-hidden="true">
        {Array.from({ length: 30 }, (_, i) => (
          <i
            key={i}
            style={{
              left: `${(i * 37 + 5) % 97}%`,
              top: `${(i * 61 + 7) % 94}%`,
              animationDuration: `${1.5 + (i % 5) * 0.55}s`,
              animationDelay: `${-i * 0.19}s`,
            }}
          />
        ))}
      </div>

      <div className="yi-content">
        <div className="yi-crown" aria-hidden="true">
          <img src={`${import.meta.env.BASE_URL}images/corona-azul.png`} alt="" draggable="false" />
        </div>

        <p className="yi-overline">Una invitación muy especial</p>
        <h1>Mis <em>15 Años</em></h1>
        <p className="yi-name">{name}</p>
        <p className="yi-date">{date}<span>✧</span>{time}</p>

        <div className="yi-portrait">
          <img src={imageSrc} alt="Yalena con su vestido azul celeste" />
          <span className="yi-portrait-shine" aria-hidden="true" />
        </div>

        <div className={`yi-envelope${opening ? ' yi-envelope-open' : ''}`} aria-hidden="true">
          <div className="yi-envelope-back" />
          <div className="yi-letter">
            <span>Con cariño,</span>
            <strong>Yalena</strong>
            <svg viewBox="0 0 24 24"><path d="M12 21s-8-4.8-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.2-8 11-8 11Z" /></svg>
          </div>
          <div className="yi-envelope-front" />
          <div className="yi-envelope-flap" />
          <div className="yi-seal"><span>♡</span></div>
        </div>

        <p className="yi-instruction">
          {opening ? 'Preparando una noche mágica…' : 'Hemos preparado algo especial para ti'}
        </p>
        <button className="yi-open-button" onClick={open} disabled={opening}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-11Z"/><path d="m4 6 8 7 8-7"/></svg>
          {opening ? 'Abriendo invitación…' : buttonText}
          <span className="yi-button-sparkle">✧</span>
        </button>
        <p className="yi-footnote">31 de diciembre · 2026</p>
      </div>

      <div className="yi-bottom-flourish" aria-hidden="true">✧　♡　✧</div>
    </section>
  );
}
