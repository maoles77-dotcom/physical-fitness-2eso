/* Physical Fitness · 2º ESO — ilustraciones animadas (SVG + SMIL)
   Cada articulación gira alrededor de su punto exacto con animateTransform. */
(function () {
  'use strict';

  const SPLINE = '.45 0 .55 1';

  /* Animación de giro: valores en grados alrededor de (cx, cy) */
  function rot(values, cx, cy, dur, opt) {
    opt = opt || {};
    const n = values.length;
    const keyTimes = opt.keyTimes || values.map((_, i) => (i / (n - 1)).toFixed(3)).join(';');
    const splines = Array(n - 1).fill(SPLINE).join(';');
    return '<animateTransform attributeName="transform" type="rotate" additive="sum"' +
      ' values="' + values.map(v => v + ' ' + cx + ' ' + cy).join(';') + '"' +
      ' keyTimes="' + keyTimes + '" calcMode="spline" keySplines="' + splines + '"' +
      ' dur="' + dur + 's" begin="' + (opt.begin || '0s') + '" repeatCount="indefinite"/>';
  }

  /* Animación de desplazamiento vertical (rebote del cuerpo) */
  function bob(dur, amount) {
    return '<animateTransform attributeName="transform" type="translate" additive="sum"' +
      ' values="0 0;0 -' + amount + ';0 0;0 -' + amount + ';0 0" keyTimes="0;0.25;0.5;0.75;1"' +
      ' calcMode="spline" keySplines="' + Array(4).fill(SPLINE).join(';') + '" dur="' + dur + 's" repeatCount="indefinite"/>';
  }

  /* Pierna de corredor: muslo desde la cadera y pierna desde la rodilla */
  function leg(cls, d, begin) {
    return '<g>' + rot([-38, 28, -38], 98, 104, d, { begin: begin }) +
      '<line x1="98" y1="104" x2="98" y2="138" class="' + cls + '" stroke-width="11"/>' +
      '<g>' + rot([12, 55, 105, 12], 98, 138, d, { begin: begin, keyTimes: '0;0.5;0.75;1' }) +
      '<line x1="98" y1="138" x2="98" y2="170" class="' + cls + '" stroke-width="10"/>' +
      '<line x1="98" y1="170" x2="111" y2="171" class="' + cls + '" stroke-width="8"/>' +
      '</g></g>';
  }

  /* Brazo de corredor: balanceo desde el hombro, antebrazo flexionado */
  function arm(cls, d, begin) {
    return '<g>' + rot([36, -40, 36], 106, 60, d, { begin: begin }) +
      '<line x1="106" y1="60" x2="106" y2="84" class="' + cls + '" stroke-width="9"/>' +
      '<g transform="rotate(-100 106 84)"><line x1="106" y1="84" x2="106" y2="104" class="' + cls + '" stroke-width="8"/></g>' +
      '</g>';
  }

  /* Corredor completo (vista lateral, mirando a la derecha) */
  function runner(d) {
    const half = '-' + (d / 2).toFixed(3) + 's';
    return '<g>' + bob(d, 4) +
      leg('fig-far', d, half) + arm('fig-far', d, half) +
      '<line x1="98" y1="104" x2="108" y2="56" class="fig" stroke-width="12"/>' +
      '<circle cx="114" cy="39" r="12.5" class="fig-fill"/>' +
      leg('fig', d, '0s') + arm('fig', d, '0s') +
      '</g>';
  }

  /* Corazón que late */
  function heart(x, y, s, beat) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' +
      '<g><animateTransform attributeName="transform" type="scale" values="1;1.22;1;1.12;1" keyTimes="0;0.15;0.3;0.45;1" dur="' + beat + 's" repeatCount="indefinite"/>' +
      '<path d="M0 6 C -10 -6, -24 4, -12 16 L0 28 L12 16 C 24 4, 10 -6, 0 6Z" fill="#E5383B" transform="translate(0 -14)"/></g></g>';
  }

  /* Suelo que se desplaza (sensación de carrera) */
  function ground(speed, y) {
    return '<line x1="0" y1="' + y + '" x2="200" y2="' + y + '" class="ground" stroke-width="3" stroke-dasharray="16 12">' +
      '<animate attributeName="stroke-dashoffset" from="0" to="56" dur="' + speed + 's" repeatCount="indefinite"/></line>';
  }

  /* Líneas de velocidad detrás del corredor */
  function speedLines(speed) {
    let s = '';
    [[60, 22], [90, 30], [120, 18]].forEach((l, i) => {
      s += '<line x1="20" y1="' + l[0] + '" x2="' + (20 + l[1]) + '" y2="' + l[0] + '" class="ac-stroke" stroke-width="4" stroke-linecap="round" opacity="0">' +
        '<animate attributeName="opacity" values="0;.7;0" dur="' + speed + 's" begin="' + (i * speed / 3).toFixed(2) + 's" repeatCount="indefinite"/>' +
        '<animateTransform attributeName="transform" type="translate" values="20 0;-10 0" dur="' + speed + 's" begin="' + (i * speed / 3).toFixed(2) + 's" repeatCount="indefinite"/></line>';
    });
    return s;
  }

  const ART = {};

  ART.hero = function () {
    return '<svg viewBox="0 0 200 200" role="img">' +
      '<defs><radialGradient id="hg" cx="50%" cy="55%" r="50%"><stop offset="0" stop-color="var(--brand)" stop-opacity=".18"/><stop offset="1" stop-color="var(--brand)" stop-opacity="0"/></radialGradient></defs>' +
      '<circle cx="100" cy="108" r="92" fill="url(#hg)"/>' +
      '<circle cx="100" cy="108" r="74" fill="none" stroke="var(--brand)" stroke-opacity=".18" stroke-width="2" stroke-dasharray="4 8">' +
      '<animateTransform attributeName="transform" type="rotate" from="0 100 108" to="360 100 108" dur="40s" repeatCount="indefinite"/></circle>' +
      /* Electrocardiograma */
      '<path d="M8 28 H52 L58 16 L66 42 L72 22 L76 28 H120 L126 16 L134 42 L140 22 L144 28 H192" fill="none" stroke="#E5383B" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="260" stroke-dashoffset="260">' +
      '<animate attributeName="stroke-dashoffset" values="260;0;-260" dur="3s" repeatCount="indefinite"/></path>' +
      '<g style="--ac: var(--brand)">' + speedLines(0.9) + '</g>' +
      ground(0.55, 176) +
      '<ellipse cx="102" cy="178" rx="30" ry="4" fill="var(--figure)" opacity=".12"/>' +
      runner(0.7) +
      '</svg>';
  };

  ART.endurance = function (type) {
    const fast = type === 'anaerobic';
    const d = fast ? 0.42 : 0.95;
    return '<svg viewBox="0 0 200 200">' +
      speedLines(fast ? 0.45 : 1.3) +
      ground(fast ? 0.32 : 0.9, 176) +
      '<ellipse cx="102" cy="178" rx="30" ry="4" fill="var(--figure)" opacity=".12"/>' +
      runner(d) +
      heart(168, 34, 0.9, fast ? 0.42 : 0.9) +
      '</svg>';
  };

  ART.flexibility = function () {
    const d = 5.5;
    const kt = '0;0.38;0.66;0.92;1';
    return '<svg viewBox="0 0 200 200">' +
      '<rect x="34" y="176" width="140" height="7" rx="3.5" class="ac-fill" opacity=".35"/>' +
      /* Arco que muestra la amplitud del movimiento */
      '<path d="M90 40 A72 72 0 0 1 161 125" fill="none" class="ac-stroke" stroke-width="4" stroke-linecap="round" stroke-dasharray="0 140" opacity=".85">' +
      '<animate attributeName="stroke-dasharray" values="0 140;126 140;126 140;0 140;0 140" keyTimes="' + kt + '" calcMode="spline" keySplines="' + Array(4).fill(SPLINE).join(';') + '" dur="' + d + 's" repeatCount="indefinite"/></path>' +
      /* Piernas */
      '<line x1="88" y1="112" x2="85" y2="174" class="fig-far" stroke-width="11"/>' +
      '<line x1="85" y1="174" x2="99" y2="175" class="fig-far" stroke-width="8"/>' +
      '<line x1="92" y1="112" x2="95" y2="174" class="fig" stroke-width="11"/>' +
      '<line x1="95" y1="174" x2="109" y2="175" class="fig" stroke-width="8"/>' +
      /* Tronco que se flexiona desde la cadera */
      '<g>' + rot([0, 104, 104, 0, 0], 90, 112, d, { keyTimes: kt }) +
      '<line x1="90" y1="112" x2="90" y2="62" class="fig" stroke-width="12"/>' +
      '<circle cx="90" cy="44" r="12.5" class="fig-fill"/>' +
      '<g>' + rot([0, 32, 32, 0, 0], 90, 66, d, { keyTimes: kt }) +
      '<line x1="92" y1="66" x2="96" y2="24" class="fig" stroke-width="9"/></g>' +
      '</g>' +
      '</svg>';
  };

  ART.balance = function () {
    const d = 3.6;
    return '<svg viewBox="0 0 200 200">' +
      /* Barra de equilibrio */
      '<rect x="24" y="160" width="152" height="10" rx="3" fill="var(--figure-2)"/>' +
      '<rect x="46" y="170" width="8" height="22" fill="var(--figure-2)"/><rect x="146" y="170" width="8" height="22" fill="var(--figure-2)"/>' +
      /* Base de sustentación */
      '<rect x="96" y="155" width="20" height="5" rx="2" fill="var(--c-bal)"/>' +
      '<g>' + rot([0, 2.6, -2.2, 1.6, 0], 106, 158, d) +
      /* Pierna de apoyo */
      '<line x1="106" y1="112" x2="106" y2="156" class="fig" stroke-width="11"/>' +
      '<line x1="100" y1="157" x2="116" y2="157" class="fig" stroke-width="7"/>' +
      /* Pierna libre hacia atrás */
      '<line x1="106" y1="112" x2="60" y2="100" class="fig-far" stroke-width="10"/>' +
      '<line x1="60" y1="100" x2="50" y2="96" class="fig-far" stroke-width="8"/>' +
      /* Tronco y cabeza hacia delante */
      '<line x1="106" y1="112" x2="148" y2="98" class="fig" stroke-width="12"/>' +
      '<circle cx="163" cy="92" r="12" class="fig-fill"/>' +
      /* Brazos abiertos */
      '<line x1="142" y1="100" x2="126" y2="70" class="fig" stroke-width="8"/>' +
      '<line x1="142" y1="100" x2="152" y2="132" class="fig-far" stroke-width="8"/>' +
      /* Centro de gravedad y su proyección sobre la base */
      '<line x1="108" y1="110" x2="108" y2="154" stroke="var(--c-str)" stroke-width="2" stroke-dasharray="4 4"/>' +
      '<circle cx="108" cy="108" r="6.5" fill="var(--c-str)" stroke="var(--surface)" stroke-width="2">' +
      '<animate attributeName="r" values="6.5;8;6.5" dur="1.6s" repeatCount="indefinite"/></circle>' +
      '</g>' +
      '</svg>';
  };

  ART.coordination = function () {
    const d = 1.8;
    const path = 'M62 116 Q 70 6 138 116 Q 100 150 62 116';
    const ball = (color, begin) =>
      '<circle r="7.5" fill="' + color + '" stroke="var(--surface)" stroke-width="2">' +
      '<animateMotion path="' + path + '" dur="' + d + 's" begin="' + begin + '" repeatCount="indefinite" calcMode="spline" keyPoints="0;0.5;1" keyTimes="0;0.6;1" keySplines=".3 0 .7 1;.3 0 .7 1"/></circle>';
    const toss = (begin) => '<animateTransform attributeName="transform" type="translate" additive="sum" values="0 0;0 -5;0 0" dur="' + (d / 3).toFixed(2) + 's" begin="' + begin + '" repeatCount="indefinite"/>';
    return '<svg viewBox="0 0 200 200">' +
      '<ellipse cx="100" cy="188" rx="36" ry="4" fill="var(--figure)" opacity=".12"/>' +
      '<line x1="100" y1="140" x2="84" y2="186" class="fig" stroke-width="11"/>' +
      '<line x1="100" y1="140" x2="116" y2="186" class="fig" stroke-width="11"/>' +
      '<line x1="100" y1="68" x2="100" y2="140" class="fig" stroke-width="13"/>' +
      '<circle cx="100" cy="50" r="13" class="fig-fill"/>' +
      '<g>' + toss('0s') + '<polyline points="90,76 72,102 62,118" class="fig" stroke-width="9"/></g>' +
      '<g>' + toss('-' + (d / 6).toFixed(2) + 's') + '<polyline points="110,76 128,102 138,118" class="fig" stroke-width="9"/></g>' +
      ball('var(--c-coo)', '0s') + ball('var(--c-spd)', '-' + (d / 3).toFixed(2) + 's') + ball('var(--c-end)', '-' + (2 * d / 3).toFixed(2) + 's') +
      '</svg>';
  };

  ART.agility = function () {
    const path = 'M30 184 L150 152 L50 120 L150 88 L50 56 L150 22';
    const cone = (x, y) => '<path d="M' + x + ' ' + (y - 9) + ' L' + (x + 7) + ' ' + (y + 6) + ' L' + (x - 7) + ' ' + (y + 6) + 'Z" fill="var(--c-agi)"/>' +
      '<rect x="' + (x - 9) + '" y="' + (y + 5) + '" width="18" height="3" rx="1.5" fill="var(--c-agi)" opacity=".6"/>';
    return '<svg viewBox="0 0 200 200">' +
      '<rect x="14" y="10" width="172" height="182" rx="14" fill="none" stroke="var(--figure-2)" stroke-opacity=".5" stroke-width="2" stroke-dasharray="6 6"/>' +
      '<path d="' + path + '" fill="none" stroke="var(--c-agi)" stroke-opacity=".35" stroke-width="3" stroke-dasharray="2 7" stroke-linecap="round"/>' +
      cone(136, 150) + cone(64, 120) + cone(136, 88) + cone(64, 58) + cone(136, 26) +
      '<g><circle r="13" fill="var(--c-agi)" opacity=".18"><animate attributeName="r" values="11;16;11" dur=".6s" repeatCount="indefinite"/></circle>' +
      '<circle r="8.5" fill="var(--figure)" stroke="var(--c-agi)" stroke-width="3"/>' +
      '<animateMotion path="' + path + '" dur="4.4s" repeatCount="indefinite" keyPoints="0;1;0" keyTimes="0;0.5;1" calcMode="spline" keySplines=".4 0 .6 1;.4 0 .6 1"/></g>' +
      '</svg>';
  };

  /* Los atributos de presentación SVG (fill="…") no admiten var(): se pasan a style="…" */
  function fixVars(svg) {
    return svg.replace(/<[a-zA-Z][^>]*>/g, function (tag) {
      const props = [];
      const clean = tag.replace(/\s(fill|stroke|stop-color)="(var\([^"]+\))"/g, function (_, p, v) {
        props.push(p + ':' + v);
        return '';
      });
      if (!props.length) return clean;
      return clean.replace(/^<([a-zA-Z]+)/, '<$1 style="' + props.join(';') + '"');
    });
  }
  Object.keys(ART).forEach(function (k) {
    const f = ART[k];
    ART[k] = function () { return fixVars(f.apply(null, arguments)); };
  });

  window.ART = ART;
})();
