import React, { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays, MapPin, Clock3, Heart, Crown, CheckCircle2,
  UsersRound, Sparkles, Menu, X, Music2, Flower2, Gift, Mail
} from 'lucide-react';

const EVENT_DATE = new Date('2026-12-31T19:00:00-05:00');
// Reemplaza este valor por el número de WhatsApp de quien recibirá las confirmaciones.
// Formato internacional, solo números. Ejemplo Colombia: 573001234567
const WHATSAPP_NUMBER = '573147287039';
const VIDEO_FILE = '/video-invitacion.mp4'; // Opcional: agrega tu video en la carpeta public.

function getTimeLeft() {
  const distance = EVENT_DATE.getTime() - Date.now();
  if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance % 86400000) / 3600000),
    minutes: Math.floor((distance % 3600000) / 60000),
    seconds: Math.floor((distance % 60000) / 1000),
  };
}

function App() {
  const [left, setLeft] = useState(getTimeLeft);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoAvailable, setVideoAvailable] = useState(true);
  const [guestName, setGuestName] = useState('');
  const [guests, setGuests] = useState('1');
  const [showRSVP, setShowRSVP] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const items = useMemo(() => [
    ['Días', left.days], ['Horas', left.hours],
    ['Minutos', left.minutes], ['Segundos', left.seconds],
  ], [left]);

  const confirm = () => {
    const message = `Hola, confirmo mi asistencia a los 15 años de Yalena Yisel Peña Bertel.\nInvitado: ${guestName.trim() || 'Por confirmar'}\nCantidad de personas: ${guests}`;
    const number = WHATSAPP_NUMBER.replace(/\D/g, '');
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setShowRSVP(false);
  };

  const nav = [
    ['Invitación', '#inicio'], ['Detalles', '#detalles'],
    ['Mis Padres', '#padres'], ['Lluvia de sobres', '#sobres'], ['Confirmar', '#confirmar'],
  ];

  return (
    <main>
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Inicio"><Crown size={30}/></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
          {menuOpen ? <X/> : <Menu/>}
        </button>
        <nav className={menuOpen ? 'nav open' : 'nav'}>
          {nav.map(([label, href], i) => <a key={href} className={i === 0 ? 'active' : ''} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="nav-heart" href="#confirmar" aria-label="Confirmar"><Heart size={22}/></a>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-photo">
          <img src="/images/yalena-vestido-azul.png" alt="Yalena con vestido azul de quinceañera" />
          <div className="photo-glow" />
        </div>
        <div className="hero-copy">
          <div className="crown-mark"><Crown size={66}/><span>Mis</span></div>
          <p className="eyebrow">Una noche mágica para celebrar</p>
          <h1>15 <em>Años</em></h1>
          <div className="ornament"><span/><Heart size={17}/><span/></div>
          <p className="intro">Con mucha alegría y gratitud,<br/>quiero compartir contigo este momento<br/>tan especial de mi vida.</p>
          <div className="name-plaque">
            <strong>Yalena Yisel</strong>
            <span>Peña Bertel</span>
            <Heart size={18} fill="currentColor"/>
          </div>
        </div>
        <div className="butterfly butterfly-a">🦋</div><div className="butterfly butterfly-b">🦋</div>
      </section>

      <section className="details-grid" id="detalles">
        <article className="detail-card"><CalendarDays/><h3>Fecha</h3><p>31 / 12 / 2026</p></article>
        <article className="detail-card"><MapPin/><h3>Lugar</h3><p>Plaza Principal<br/>Santa Clara</p></article>
        <article className="detail-card"><Clock3/><h3>Hora</h3><p>7:00 pm</p></article>
      </section>

      <section className="parents glass-panel" id="padres">
        <div className="section-title"><UsersRound/><span/><h2>Invitan mis Padres</h2><span/></div>
        <p>Olver Peña Terán <b>&</b> Maibeth Bertel Morales</p>
      </section>

      <section className="countdown glass-panel">
        <div className="countdown-heading"><Sparkles/><h2>Cuenta regresiva</h2><Sparkles/></div>
        <p className="countdown-sub">Cada instante nos acerca a esta noche especial</p>
        <div className="timer">
          {items.map(([label, value]) => <div className="time-box" key={label}><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></div>)}
        </div>
      </section>

      <section className="memory">
        <div className="memory-copy"><Gift/><p>Tu presencia hará aún más especial<br/>este día tan importante para mí.</p><div className="ornament"><span/><Heart size={18} fill="currentColor"/><span/></div></div>
      </section>

      <section className="envelope-section glass-panel" id="sobres">
        <div className="envelope-icon"><Mail size={38}/><Heart size={17} fill="currentColor"/></div>
        <div className="envelope-copy">
          <p className="envelope-kicker">Un detalle con cariño</p>
          <h2>Lluvia de sobres</h2>
          <p>Tu compañía es nuestro mejor regalo. Para quienes deseen tener un detalle especial, tendremos <strong>lluvia de sobres</strong>.</p>
        </div>
        <div className="envelope-sparkle"><Sparkles size={24}/></div>
      </section>

      <section className="video-section">
        <h2>Un recuerdo para compartir</h2>
        <p>Un pequeño adelanto de esta celebración llena de magia.</p>
        {videoAvailable && <video controls playsInline preload="metadata" poster="/images/invitacion-referencia.png">
          <source src={VIDEO_FILE} type="video/mp4" onError={() => setVideoAvailable(false)} />
        </video>}
        {!videoAvailable && <div className="video-placeholder"><Music2/><span>Agrega tu video en <b>public/video-invitacion.mp4</b></span></div>}
      </section>

      <section className="closing" id="confirmar">
        <Flower2 className="closing-flower"/>
        <p>Será una noche inolvidable…<br/><strong>¡Espero celebrar contigo!</strong></p>
        <button className="confirm-button" onClick={() => setShowRSVP(true)}><CheckCircle2/> Confirmar asistencia <Heart size={19}/></button>
        <small>Con cariño, Yalena 💙</small>
      </section>

      <footer>Con amor y gratitud · Mis 15 años · 31.12.2026</footer>

      {showRSVP && <div className="modal-backdrop" onClick={() => setShowRSVP(false)}>
        <div className="rsvp-modal" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setShowRSVP(false)} aria-label="Cerrar"><X/></button>
          <Crown className="modal-crown"/>
          <h2>¿Nos acompañas?</h2>
          <p>Confirma tu asistencia a mis quince años.</p>
          <label>Tu nombre<input value={guestName} onChange={e => setGuestName(e.target.value)} placeholder="Escribe tu nombre"/></label>
          <label>¿Cuántas personas asistirán?
            <select value={guests} onChange={e => setGuests(e.target.value)}>
              {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'persona' : 'personas'}</option>)}
            </select>
          </label>
          <button className="confirm-button modal-submit" onClick={confirm}><CheckCircle2/> Enviar confirmación</button>
          <small>Se abrirá WhatsApp para enviar tu respuesta.</small>
        </div>
      </div>}
    </main>
  );
}

export default App;
