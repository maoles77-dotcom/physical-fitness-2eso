/* Physical Fitness · 2º ESO — interacción */
(function () {
  'use strict';

  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const html = document.documentElement;
  const body = document.body;
  html.classList.remove('no-js');

  /* Almacenamiento local: puede no estar disponible (modo privado) */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } }
  };

  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const bil = (en, es) => '<span lang="en">' + esc(en) + '</span><span lang="es">' + esc(es) + '</span>';
  const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  /* Ventanita de traducción (se declara aquí porque setLang la cierra) */
  const pop = $('#pop');
  let popWord = '';
  let popFrom = null;

  /* ---------------- Idioma ---------------- */
  function setLang(l) {
    body.dataset.lang = l;
    html.lang = l === 'es' ? 'es' : 'en';
    $$('.lang-switch button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
    store.set('pf-lang', l);
    closePop();
  }
  $$('.lang-switch button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
  setLang(store.get('pf-lang', 'both'));

  /* ---------------- Tema claro / oscuro ---------------- */
  const prefersDark = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = store.get('pf-theme', '');
  if (savedTheme) html.dataset.theme = savedTheme;
  $('#themeBtn').addEventListener('click', () => {
    const dark = html.dataset.theme ? html.dataset.theme === 'dark' : prefersDark;
    html.dataset.theme = dark ? 'light' : 'dark';
    store.set('pf-theme', html.dataset.theme);
  });
  if (!savedTheme && prefersDark) html.dataset.theme = 'dark';

  /* ---------------- Animaciones ---------------- */
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  let paused = store.get('pf-motion', reduce ? 'off' : 'on') === 'off';
  function applyMotion() {
    body.classList.toggle('no-motion', paused);
    $('#motionBtn').setAttribute('aria-pressed', String(paused));
    $$('svg').forEach(s => {
      if (typeof s.pauseAnimations === 'function') { if (paused) s.pauseAnimations(); else s.unpauseAnimations(); }
    });
  }
  $('#motionBtn').addEventListener('click', () => {
    paused = !paused;
    store.set('pf-motion', paused ? 'off' : 'on');
    applyMotion();
  });

  /* ---------------- Ilustraciones ---------------- */
  function mount(id, svg) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = svg;
    const s = el.querySelector('svg');
    if (s && paused && typeof s.pauseAnimations === 'function') s.pauseAnimations();
  }
  mount('heroArt', ART.hero());
  mount('artEndurance', ART.endurance('aerobic'));
  mount('artFlexibility', ART.flexibility());
  mount('artBalance', ART.balance());
  mount('artCoordination', ART.coordination());
  mount('artAgility', ART.agility());
  applyMotion();

  /* Resistencia: aeróbica / anaeróbica */
  const ENDU = { aerobic: { i: 30, d: 92 }, anaerobic: { i: 96, d: 16 } };
  function setEndurance(t) {
    $$('[data-endu]').forEach(b => b.classList.toggle('active', b.dataset.endu === t));
    mount('artEndurance', ART.endurance(t));
    $('#mInt').style.width = ENDU[t].i + '%';
    $('#mDur').style.width = ENDU[t].d + '%';
  }
  $$('[data-endu]').forEach(b => b.addEventListener('click', () => setEndurance(b.dataset.endu)));
  setEndurance('aerobic');

  /* ---------------- Fuerza: brazo y contracciones ---------------- */
  const forearm = $('#forearm');
  const biceps = $('#biceps');
  const triceps = $('#triceps');
  let angle = 0;
  let armAnim = null;
  function drawArm(a) {
    angle = a;
    forearm.setAttribute('transform', 'rotate(' + a.toFixed(1) + ' 110 132)');
    const flex = Math.min(1, Math.max(0, -a / 130));
    biceps.setAttribute('rx', (11 + 7 * flex).toFixed(1));
    biceps.setAttribute('ry', (28 - 9 * flex).toFixed(1));
    biceps.setAttribute('cy', (98 - 4 * flex).toFixed(1));
    triceps.setAttribute('ry', (24 + 3 * flex).toFixed(1));
  }
  const ease = (t) => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  function armTo(target, ms, done) {
    if (armAnim) cancelAnimationFrame(armAnim);
    if (paused || ms <= 0) { drawArm(target); if (done) done(); return; }
    const from = angle, t0 = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - t0) / ms);
      drawArm(from + (target - from) * ease(t));
      if (t < 1) armAnim = requestAnimationFrame(step);
      else { armAnim = null; if (done) done(); }
    };
    armAnim = requestAnimationFrame(step);
  }
  const CON = {
    concentric: {
      en: 'Concentric: the biceps shortens and overcomes the load, lifting the book.',
      es: 'Concéntrica: el bíceps se acorta y vence la carga, levantando el libro.'
    },
    isometric: {
      en: 'Isometric: the biceps neither shortens nor lengthens. The book stays still.',
      es: 'Isométrica: el bíceps ni se acorta ni se alarga. El libro se queda quieto.'
    },
    eccentric: {
      en: 'Eccentric: the biceps lengthens and slows the load down. The movement is controlled.',
      es: 'Excéntrica: el bíceps se alarga y frena la carga. El movimiento está controlado.'
    }
  };
  function playContraction(type) {
    $$('[data-con]').forEach(b => b.classList.toggle('active', b.dataset.con === type));
    $('#conCaption').innerHTML = '<p lang="en">' + esc(CON[type].en) + '</p><p lang="es">' + esc(CON[type].es) + '</p>';
    biceps.classList.remove('tense');
    if (type === 'concentric') {
      armTo(0, angle === 0 ? 0 : 500, () => armTo(-130, 1700));
    } else if (type === 'isometric') {
      armTo(-75, 800, () => biceps.classList.add('tense'));
    } else {
      armTo(-130, angle <= -125 ? 0 : 600, () => armTo(0, 2800));
    }
  }
  $$('[data-con]').forEach(b => b.addEventListener('click', () => playContraction(b.dataset.con)));
  drawArm(0);

  /* ---------------- Velocidad: juego de reacción ---------------- */
  const pad = $('#reactionPad');
  let rTimer = null, rStart = 0;
  let best = parseInt(store.get('pf-best', ''), 10) || null;
  const showBest = () => { $('#rBest').textContent = best ? best + ' ms' : '–'; };
  showBest();
  function rState(s) { pad.dataset.state = s; }
  rState('idle');
  function rPress() {
    const s = pad.dataset.state;
    if (s === 'idle' || s === 'result' || s === 'early') {
      rState('wait');
      clearTimeout(rTimer);
      rTimer = setTimeout(() => { rState('go'); rStart = performance.now(); }, 1200 + Math.random() * 2300);
    } else if (s === 'wait') {
      clearTimeout(rTimer);
      rState('early');
    } else if (s === 'go') {
      const ms = Math.round(performance.now() - rStart);
      $('#rTime').textContent = ms;
      if (!best || ms < best) { best = ms; store.set('pf-best', String(ms)); showBest(); }
      rState('result');
    }
  }
  pad.addEventListener('pointerdown', (e) => { if (e.button === 0 || e.pointerType !== 'mouse') rPress(); });
  pad.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); rPress(); } });
  pad.addEventListener('click', (e) => e.preventDefault());

  /* ---------------- Voz (pronunciación) ---------------- */
  const canSpeak = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  let voice = null;
  function pickVoice() {
    if (!canSpeak) return;
    const v = speechSynthesis.getVoices();
    voice = v.find(x => /en[-_]GB/i.test(x.lang)) || v.find(x => /^en/i.test(x.lang)) || null;
  }
  if (canSpeak) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  else { body.classList.add('no-speech'); $$('.listen, #cardSay').forEach(b => { b.hidden = true; }); }
  function speak(text, btn) {
    if (!canSpeak || !text) return;
    speechSynthesis.cancel();
    $$('.speaking').forEach(b => b.classList.remove('speaking'));
    const u = new SpeechSynthesisUtterance(text);
    u.lang = voice ? voice.lang : 'en-GB';
    if (voice) u.voice = voice;
    u.rate = 0.9;
    if (btn) { btn.classList.add('speaking'); u.onend = u.onerror = () => btn.classList.remove('speaking'); }
    speechSynthesis.speak(u);
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('.listen[data-say]');
    if (b) { e.stopPropagation(); speak(b.dataset.say, b); }
  });

  /* ---------------- Palabras con traducción ---------------- */
  function closePop() {
    if (!pop) return;
    pop.classList.remove('open');
    pop.setAttribute('aria-hidden', 'true');
    if (popFrom) popFrom.classList.remove('on');
    popFrom = null;
  }
  function openPop(t) {
    const inEn = !!t.closest('[lang="en"]');
    const word = t.textContent.trim();
    const en = inEn ? word : t.dataset.tr;
    const es = inEn ? t.dataset.tr : word;
    popWord = en;
    $('#popEn').textContent = en;
    $('#popEs').textContent = es;
    if (popFrom) popFrom.classList.remove('on');
    popFrom = t;
    t.classList.add('on');
    pop.classList.add('open');
    pop.setAttribute('aria-hidden', 'false');
    const r = t.getBoundingClientRect();
    const w = pop.offsetWidth;
    let left = r.left + window.scrollX + r.width / 2 - w / 2;
    left = Math.max(window.scrollX + 8, Math.min(left, window.scrollX + document.documentElement.clientWidth - w - 8));
    pop.style.left = left + 'px';
    pop.style.top = (r.bottom + window.scrollY + 8) + 'px';
  }
  $$('.t').forEach(t => {
    t.setAttribute('tabindex', '0');
    t.setAttribute('role', 'button');
    t.addEventListener('click', (e) => { e.stopPropagation(); if (popFrom === t) closePop(); else openPop(t); });
    t.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPop(t); } });
  });
  $('#popSay').addEventListener('click', (e) => { e.stopPropagation(); speak(popWord, e.currentTarget); });
  pop.addEventListener('click', (e) => e.stopPropagation());
  document.addEventListener('click', closePop);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePop(); });
  window.addEventListener('resize', closePop);

  /* ---------------- Scroll: progreso, cabecera y sección activa ---------------- */
  const bar = $('#progressBar');
  const topbar = $('#topbar');
  function onScroll() {
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + '%';
    topbar.classList.toggle('scrolled', scrollY > 8);
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if ('IntersectionObserver' in window) {
    const links = $$('.nav a');
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        links.forEach(a => a.classList.toggle('active', a.dataset.spy === en.target.id));
        const cur = links.find(a => a.dataset.spy === en.target.id), nav = cur && cur.parentElement;
        if (nav && nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: cur.offsetLeft - (nav.clientWidth - cur.offsetWidth) / 2, behavior: 'smooth' });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['intro', 'basic', 'psycho', 'summary', 'vocab', 'quiz'].forEach(id => { const s = document.getElementById(id); if (s) spy.observe(s); });

    const rev = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); rev.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('.reveal').forEach(el => rev.observe(el));

    /* La primera vez que se ve el brazo, hace una demostración */
    const armObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { playContraction('concentric'); armObs.disconnect(); }
    }, { threshold: 0.5 });
    armObs.observe($('#armSvg'));
  } else {
    $$('.reveal').forEach(el => el.classList.add('in'));
  }

  /* ---------------- Vocabulario ---------------- */
  const CATS = window.VOCAB_CATS;
  const VOCAB = window.VOCAB;
  const catOf = (id) => CATS.find(c => c.id === id) || CATS[0];
  let vCat = 'all';
  function renderCats() {
    $('#vocabCats').innerHTML = CATS.map(c =>
      '<button type="button" class="pill ' + (c.c && c.c !== 'brand' ? c.c : '') + (c.id === vCat ? ' active' : '') + '" data-cat="' + c.id + '">' + bil(c.en, c.es) + '</button>'
    ).join('');
    $$('#vocabCats .pill').forEach(b => b.addEventListener('click', () => { vCat = b.dataset.cat; renderCats(); renderVocab(); }));
  }
  function filtered() {
    const q = norm($('#vocabSearch').value.trim());
    return VOCAB.filter(v => {
      if (vCat === 'extra' && !v.x) return false;
      if (vCat !== 'all' && vCat !== 'extra' && v.cat !== vCat) return false;
      return !q || norm(v.en).includes(q) || norm(v.es).includes(q);
    });
  }
  function renderVocab() {
    const list = filtered();
    $('#vocabCount').innerHTML = bil(list.length + (list.length === 1 ? ' word' : ' words'), list.length + (list.length === 1 ? ' palabra' : ' palabras'));
    $('#vocabGrid').innerHTML = list.length ? list.map((v, i) => {
      const c = catOf(v.cat);
      return '<div class="vcard ' + (c.c && c.c !== 'brand' ? c.c : '') + (v.x ? ' extra' : '') + '" style="animation-delay:' + Math.min(i * 18, 400) + 'ms">' +
        '<span class="en">' + esc(v.en) + '</span>' +
        '<button type="button" class="listen" data-say="' + esc(v.en) + '" aria-label="Listen: ' + esc(v.en) + '"' + (canSpeak ? '' : ' hidden') + '><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z"/></svg></button>' +
        '<span class="es">' + esc(v.es) + '</span>' +
        '<span class="tag">' + bil(c.en, c.es) + (v.x ? ' · extra' : '') + '</span></div>';
    }).join('') : '<p class="empty">' + bil('No words found.', 'No se ha encontrado ninguna palabra.') + '</p>';
  }
  $('#vocabSearch').addEventListener('input', renderVocab);
  renderCats();
  renderVocab();

  /* Pestañas: lista / tarjetas */
  $$('[data-vmode]').forEach(t => t.addEventListener('click', () => {
    const cards = t.dataset.vmode === 'cards';
    $$('[data-vmode]').forEach(x => { x.classList.toggle('active', x === t); x.setAttribute('aria-selected', String(x === t)); });
    $('#vocabList').hidden = cards;
    $('#vocabCards').hidden = !cards;
    if (cards) showCard();
  }));

  /* Tarjetas de repaso */
  let deck = VOCAB.slice();
  let ci = 0;
  let dir = 'en';
  const flash = $('#flash');
  function showCard() {
    const v = deck[ci];
    flash.classList.remove('flipped');
    const front = dir === 'en' ? v.en : v.es;
    const back = dir === 'en' ? v.es : v.en;
    $('#flashFrontTag').textContent = dir === 'en' ? 'EN' : 'ES';
    $('#flashBackTag').textContent = dir === 'en' ? 'ES' : 'EN';
    /* El dorso se cambia cuando la tarjeta ya no lo muestra */
    $('#flashFront').textContent = front;
    setTimeout(() => { $('#flashBack').textContent = back; }, 250);
    $('#cardPos').textContent = (ci + 1) + ' / ' + deck.length;
  }
  flash.addEventListener('click', () => flash.classList.toggle('flipped'));
  $('#cardNext').addEventListener('click', () => { ci = (ci + 1) % deck.length; showCard(); });
  $('#cardPrev').addEventListener('click', () => { ci = (ci - 1 + deck.length) % deck.length; showCard(); });
  $('#cardShuffle').addEventListener('click', () => {
    for (let i = deck.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]]; }
    ci = 0; showCard();
  });
  $('#cardSay').addEventListener('click', (e) => speak(deck[ci].en, e.currentTarget));
  $$('[data-dir]').forEach(b => b.addEventListener('click', () => {
    dir = b.dataset.dir;
    $$('[data-dir]').forEach(x => x.classList.toggle('active', x === b));
    showCard();
  }));
  document.addEventListener('keydown', (e) => {
    if ($('#vocabCards').hidden || /input|textarea/i.test(document.activeElement.tagName)) return;
    if (e.key === 'ArrowRight') $('#cardNext').click();
    if (e.key === 'ArrowLeft') $('#cardPrev').click();
  });

  /* ---------------- Test ---------------- */
  const QUIZ = window.QUIZ;
  const box = $('#quizBox');
  let qi = 0, score = 0, results = [];
  function dots() {
    return '<div class="q-dots" aria-hidden="true">' + QUIZ.map((_, i) =>
      '<i class="' + (results[i] === true ? 'ok' : results[i] === false ? 'ko' : '') + (i === qi ? ' now' : '') + '"></i>').join('') + '</div>';
  }
  function renderQ() {
    const q = QUIZ[qi];
    box.innerHTML =
      '<div class="q-top"><span>' + bil('Question', 'Pregunta') + ' ' + (qi + 1) + ' / ' + QUIZ.length + '</span>' + dots() + '</div>' +
      '<div class="q-text">' + bil(q.q.en, q.q.es) + '</div>' +
      '<div class="q-opts">' + q.o.map((o, i) =>
        '<button type="button" class="q-opt" data-i="' + i + '"><span class="q-letter">' + 'ABCD'[i] + '</span><span class="q-label">' + bil(o.en, o.es) + '</span></button>').join('') + '</div>' +
      '<div id="qFeedback"></div>';
    $$('.q-opt', box).forEach(b => b.addEventListener('click', () => answer(parseInt(b.dataset.i, 10))));
  }
  function answer(i) {
    const q = QUIZ[qi];
    const ok = i === q.a;
    if (ok) score++;
    results[qi] = ok;
    $$('.q-opt', box).forEach((b, j) => {
      b.disabled = true;
      if (j === q.a) b.classList.add('right');
      else if (j === i) b.classList.add('wrong');
    });
    const last = qi === QUIZ.length - 1;
    $('#qFeedback').innerHTML =
      '<div class="q-feedback">' +
      '<span lang="en"><b>' + (ok ? '✓ Correct!' : '✗ Not quite.') + '</b> ' + esc(q.f.en) + '</span>' +
      '<span lang="es"><b>' + (ok ? '✓ ¡Correcto!' : '✗ No exactamente.') + '</b> ' + esc(q.f.es) + '</span></div>' +
      '<div class="q-actions"><button type="button" class="btn btn-primary" id="qNext">' +
      (last ? bil('See my result', 'Ver mi resultado') : bil('Next question', 'Siguiente pregunta')) + '</button></div>';
    $('.q-top .q-dots', box).outerHTML = dots();
    $('#qNext').addEventListener('click', () => { if (last) renderResult(); else { qi++; renderQ(); box.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } });
    $('#qNext').focus({ preventScroll: true });
  }
  function renderResult() {
    const pct = score / QUIZ.length;
    const msg = pct >= 0.9 ? ['Excellent! You are in top form.', '¡Excelente! Estás en plena forma.']
      : pct >= 0.6 ? ['Well done! Review the ones you missed.', '¡Bien hecho! Repasa las que has fallado.']
        : ['Keep training! Read the unit again and retry.', '¡Sigue entrenando! Vuelve a leer el tema e inténtalo de nuevo.'];
    box.innerHTML = '<div class="q-result">' + dots() +
      '<div class="q-score">' + score + '/' + QUIZ.length + '</div>' +
      '<div class="bi-title">' + bil(msg[0], msg[1]) + '</div>' +
      '<button type="button" class="btn btn-primary" id="qAgain">' + bil('Try again', 'Repetir el test') + '</button></div>';
    $('#qAgain').addEventListener('click', () => { qi = 0; score = 0; results = []; renderQ(); });
  }
  renderQ();
})();
