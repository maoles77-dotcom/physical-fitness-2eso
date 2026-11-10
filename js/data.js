/* Physical Fitness · 2º ESO — vocabulario y test */

/* Categorías del vocabulario (con el color de cada cualidad) */
window.VOCAB_CATS = [
  { id: 'all', en: 'All', es: 'Todo' },
  { id: 'intro', en: 'Physical fitness', es: 'Condición física', c: 'brand' },
  { id: 'end', en: 'Endurance', es: 'Resistencia', c: 'c-end' },
  { id: 'str', en: 'Strength', es: 'Fuerza', c: 'c-str' },
  { id: 'spd', en: 'Speed', es: 'Velocidad', c: 'c-spd' },
  { id: 'flx', en: 'Flexibility', es: 'Flexibilidad', c: 'c-flx' },
  { id: 'bal', en: 'Balance', es: 'Equilibrio', c: 'c-bal' },
  { id: 'coo', en: 'Coordination', es: 'Coordinación', c: 'c-coo' },
  { id: 'agi', en: 'Agility', es: 'Agilidad', c: 'c-agi' },
  { id: 'extra', en: 'Extra words', es: 'Palabras extra' }
];

/* Vocabulario del tema (glosario del departamento). x: 1 = palabra extra añadida en la web */
window.VOCAB = [
  // Condición física
  { en: 'Physical fitness', es: 'Condición física', cat: 'intro' },
  { en: 'To avoid', es: 'Evitar', cat: 'intro' },
  { en: 'Injuries', es: 'Lesiones', cat: 'intro' },
  { en: 'Effectiveness', es: 'Efectividad, eficacia', cat: 'intro' },
  { en: 'Gradually', es: 'Gradualmente, poco a poco', cat: 'intro' },
  { en: 'Therefore', es: 'Por lo tanto', cat: 'intro' },
  { en: 'To carry out', es: 'Llevar a cabo', cat: 'intro' },
  { en: 'Muscle mass', es: 'Masa muscular', cat: 'intro' },
  { en: 'Weight', es: 'Peso', cat: 'intro' },
  { en: 'To achieve', es: 'Conseguir', cat: 'intro' },
  { en: 'Training', es: 'Entrenamiento', cat: 'intro' },
  { en: 'Healthy diet', es: 'Dieta saludable', cat: 'intro' },
  { en: 'Good rest', es: 'Buen descanso', cat: 'intro' },
  { en: 'Breathlessness', es: 'Dificultad para respirar', cat: 'intro' },
  { en: 'Basic physical abilities', es: 'Cualidades físicas básicas', cat: 'intro' },
  { en: 'Psychomotor abilities', es: 'Cualidades psicomotrices', cat: 'intro' },
  // Resistencia
  { en: 'Endurance', es: 'Resistencia', cat: 'end' },
  { en: 'Aerobic endurance', es: 'Resistencia aeróbica', cat: 'end' },
  { en: 'Anaerobic endurance', es: 'Resistencia anaeróbica', cat: 'end' },
  { en: 'Aiming to increase', es: 'Buscando incrementar', cat: 'end' },
  { en: 'Length of time', es: 'Duración', cat: 'end' },
  // Fuerza
  { en: 'Strength', es: 'Fuerza', cat: 'str' },
  { en: 'Deal with loads', es: 'Enfrentarse a cargas (pesos, resistencias)', cat: 'str' },
  { en: 'To overcome a load', es: 'Vencer una carga', cat: 'str' },
  { en: 'Slow it down', es: 'Frenarla', cat: 'str' },
  { en: 'Eccentric contractions', es: 'Contracciones excéntricas', cat: 'str' },
  { en: 'Concentric contractions', es: 'Contracciones concéntricas', cat: 'str' },
  { en: 'Isometric contractions', es: 'Contracciones isométricas', cat: 'str' },
  { en: 'Hold it still', es: 'Mantenerla quieta', cat: 'str' },
  { en: 'Lifting a book', es: 'Levantar un libro', cat: 'str' },
  { en: 'To bend a part of your body', es: 'Doblar una parte de tu cuerpo (flexionar)', cat: 'str' },
  // Velocidad
  { en: 'Speed', es: 'Velocidad', cat: 'spd' },
  { en: 'Reaction speed', es: 'Velocidad de reacción', cat: 'spd' },
  { en: 'Movement speed', es: 'Velocidad gestual', cat: 'spd' },
  { en: 'Speed of locomotion', es: 'Velocidad de desplazamiento', cat: 'spd' },
  { en: 'To focus on', es: 'Centrarse, enfocarse en', cat: 'spd' },
  // Flexibilidad
  { en: 'Flexibility', es: 'Flexibilidad', cat: 'flx' },
  { en: 'To move through the greatest possible range', es: 'Moverse con la máxima amplitud posible', cat: 'flx' },
  { en: 'Joint mobility', es: 'Movilidad articular', cat: 'flx' },
  { en: 'Muscle elasticity', es: 'Elasticidad muscular', cat: 'flx' },
  { en: 'Static flexibility', es: 'Flexibilidad estática', cat: 'flx' },
  { en: 'Dynamic flexibility', es: 'Flexibilidad dinámica', cat: 'flx' },
  { en: 'Whenever possible', es: 'Siempre que sea posible', cat: 'flx' },
  // Equilibrio
  { en: 'Independent movement of the upper and lower limbs', es: 'Movimiento independiente de los miembros superiores e inferiores', cat: 'bal' },
  { en: 'Base of support', es: 'Base de sustentación', cat: 'bal' },
  { en: 'Centre of gravity', es: 'Centro de gravedad', cat: 'bal' },
  { en: 'Static balance', es: 'Equilibrio estático', cat: 'bal' },
  { en: 'Dynamic balance', es: 'Equilibrio dinámico', cat: 'bal' },
  // Coordinación
  { en: 'Economy of effort', es: 'Economía de esfuerzo', cat: 'coo' },
  { en: 'Harmony', es: 'Armonía', cat: 'coo' },
  { en: 'Genetic potential', es: 'Potencial genético', cat: 'coo' },
  { en: 'Stimuli', es: 'Estímulos', cat: 'coo' },
  { en: 'Throughout life', es: 'A lo largo de la vida', cat: 'coo' },
  { en: 'General dynamic coordination', es: 'Coordinación dinámica general', cat: 'coo' },
  { en: 'Handling objects', es: 'Manejo de objetos', cat: 'coo' },
  { en: 'Hand-eye coordination', es: 'Coordinación óculo-manual', cat: 'coo' },
  { en: 'Foot-eye coordination', es: 'Coordinación óculo-pédica', cat: 'coo' },

  // Palabras extra que aparecen en el tema
  { en: 'Balance', es: 'Equilibrio', cat: 'bal', x: 1 },
  { en: 'Coordination', es: 'Coordinación', cat: 'coo', x: 1 },
  { en: 'Agility', es: 'Agilidad', cat: 'agi', x: 1 },
  { en: 'Fatigue', es: 'Fatiga, cansancio', cat: 'end', x: 1 },
  { en: 'Stamina', es: 'Aguante, resistencia', cat: 'intro', x: 1 },
  { en: 'Body fat', es: 'Grasa corporal', cat: 'intro', x: 1 },
  { en: 'Excess weight', es: 'Exceso de peso', cat: 'intro', x: 1 },
  { en: 'Sprint', es: 'Esprint, carrera corta a máxima velocidad', cat: 'end', x: 1 },
  { en: 'Load', es: 'Carga', cat: 'str', x: 1 },
  { en: 'Elbow', es: 'Codo', cat: 'str', x: 1 },
  { en: 'To shorten / to lengthen', es: 'Acortarse / alargarse', cat: 'str', x: 1 },
  { en: 'Light weights', es: 'Pesos ligeros', cat: 'str', x: 1 },
  { en: 'Range', es: 'Amplitud, rango (de movimiento)', cat: 'flx', x: 1 },
  { en: 'Body posture', es: 'Postura corporal', cat: 'bal', x: 1 },
  { en: 'Fear / habit', es: 'Miedo / costumbre', cat: 'bal', x: 1 },
  { en: 'Hopping on one leg', es: 'Saltar a la pata coja', cat: 'coo', x: 1 },
  { en: 'High jump', es: 'Salto de altura', cat: 'coo', x: 1 },
  { en: 'Somersault', es: 'Salto mortal', cat: 'coo', x: 1 },
  { en: 'Round-off', es: 'Rondada', cat: 'coo', x: 1 },
  { en: 'Cartwheel', es: 'Rueda lateral', cat: 'coo', x: 1 },
  { en: 'Roll', es: 'Voltereta', cat: 'coo', x: 1 },
  { en: 'Juggling', es: 'Malabares', cat: 'coo', x: 1 },
  { en: 'Throwing and catching', es: 'Lanzar y recoger', cat: 'coo', x: 1 },
  { en: 'Kicking', es: 'Golpear con el pie, chutar', cat: 'coo', x: 1 },
  { en: 'Sportsperson', es: 'Deportista', cat: 'agi', x: 1 },
  { en: 'To decline', es: 'Disminuir, empeorar', cat: 'agi', x: 1 },
  { en: 'Old age', es: 'Vejez', cat: 'agi', x: 1 },
  { en: 'To retain', es: 'Conservar, mantener', cat: 'agi', x: 1 }
];

/* Test de autoevaluación: a = índice de la respuesta correcta */
window.QUIZ = [
  {
    q: { en: 'Which ability allows us to maintain an effort for as long as possible?', es: '¿Qué cualidad nos permite mantener un esfuerzo durante el mayor tiempo posible?' },
    o: [ { en: 'Speed', es: 'Velocidad' }, { en: 'Endurance', es: 'Resistencia' }, { en: 'Agility', es: 'Agilidad' }, { en: 'Balance', es: 'Equilibrio' } ],
    a: 1,
    f: { en: 'Endurance lets us keep going, coping with fatigue.', es: 'La resistencia nos permite seguir, soportando la fatiga.' }
  },
  {
    q: { en: 'A sprint is an example of…', es: 'Un esprint es un ejemplo de…' },
    o: [ { en: 'aerobic endurance', es: 'resistencia aeróbica' }, { en: 'static flexibility', es: 'flexibilidad estática' }, { en: 'anaerobic endurance', es: 'resistencia anaeróbica' }, { en: 'static balance', es: 'equilibrio estático' } ],
    a: 2,
    f: { en: 'Anaerobic endurance: a short time at high intensity.', es: 'Resistencia anaeróbica: poco tiempo a alta intensidad.' }
  },
  {
    q: { en: 'You hold a book still in the air with your elbow half bent. What type of contraction is it?', es: 'Mantienes un libro quieto en el aire con el codo medio flexionado. ¿Qué tipo de contracción es?' },
    o: [ { en: 'Concentric', es: 'Concéntrica' }, { en: 'Eccentric', es: 'Excéntrica' }, { en: 'Isometric', es: 'Isométrica' } ],
    a: 2,
    f: { en: 'Isometric: the biceps neither shortens nor lengthens.', es: 'Isométrica: el bíceps ni se acorta ni se alarga.' }
  },
  {
    q: { en: 'You slowly put the book back on the table. What does the biceps do?', es: 'Vuelves a dejar el libro despacio sobre la mesa. ¿Qué hace el bíceps?' },
    o: [ { en: 'It lengthens (eccentric)', es: 'Se alarga (excéntrica)' }, { en: 'It shortens (concentric)', es: 'Se acorta (concéntrica)' }, { en: 'It does not work', es: 'No trabaja' } ],
    a: 0,
    f: { en: 'An eccentric contraction slows the load down while the muscle lengthens.', es: 'La contracción excéntrica frena la carga mientras el músculo se alarga.' }
  },
  {
    q: { en: 'At your age, which kind of speed should you focus on?', es: 'A tu edad, ¿en qué tipo de velocidad debes centrarte?' },
    o: [ { en: 'Speed of locomotion', es: 'Velocidad de desplazamiento' }, { en: 'Reaction speed', es: 'Velocidad de reacción' }, { en: 'None', es: 'En ninguna' } ],
    a: 1,
    f: { en: 'Reaction speed first; speed of locomotion is better developed later.', es: 'Primero la velocidad de reacción; la de desplazamiento, más adelante.' }
  },
  {
    q: { en: 'Flexibility depends on joint mobility and…', es: 'La flexibilidad depende de la movilidad articular y de…' },
    o: [ { en: 'muscle elasticity', es: 'la elasticidad muscular' }, { en: 'muscle mass', es: 'la masa muscular' }, { en: 'reaction speed', es: 'la velocidad de reacción' } ],
    a: 0,
    f: { en: 'Joint mobility + muscle elasticity = range of movement.', es: 'Movilidad articular + elasticidad muscular = amplitud de movimiento.' }
  },
  {
    q: { en: 'What should you develop first?', es: '¿Qué debes desarrollar primero?' },
    o: [ { en: 'Dynamic flexibility', es: 'La flexibilidad dinámica' }, { en: 'Static flexibility', es: 'La flexibilidad estática' } ],
    a: 1,
    f: { en: 'First a good level of static flexibility, then dynamic flexibility.', es: 'Primero un buen nivel de flexibilidad estática y después la dinámica.' }
  },
  {
    q: { en: 'Controlling body posture while moving is…', es: 'Controlar la postura del cuerpo en movimiento es…' },
    o: [ { en: 'static balance', es: 'equilibrio estático' }, { en: 'dynamic balance', es: 'equilibrio dinámico' }, { en: 'agility', es: 'agilidad' } ],
    a: 1,
    f: { en: 'Dynamic balance = posture control while moving.', es: 'Equilibrio dinámico = control de la postura en movimiento.' }
  },
  {
    q: { en: 'Kicking and receiving a ball with the foot is an example of…', es: 'Golpear y recibir un balón con el pie es un ejemplo de…' },
    o: [ { en: 'hand–eye coordination', es: 'coordinación óculo-manual' }, { en: 'foot–eye coordination', es: 'coordinación óculo-pédica' }, { en: 'general dynamic coordination', es: 'coordinación dinámica general' } ],
    a: 1,
    f: { en: 'Foot–eye coordination links the feet with handling objects.', es: 'La coordinación óculo-pédica relaciona los pies con el manejo de objetos.' }
  },
  {
    q: { en: 'Which ability has no different types and combines all coordination abilities?', es: '¿Qué cualidad no tiene tipos y combina todas las capacidades coordinativas?' },
    o: [ { en: 'Agility', es: 'Agilidad' }, { en: 'Strength', es: 'Fuerza' }, { en: 'Coordination', es: 'Coordinación' } ],
    a: 0,
    f: { en: 'Agility involves the whole body and has no types.', es: 'La agilidad implica a todo el cuerpo y no tiene tipos.' }
  },
  {
    q: { en: 'Which of these is a basic physical ability?', es: '¿Cuál de estas es una cualidad física básica?' },
    o: [ { en: 'Balance', es: 'Equilibrio' }, { en: 'Coordination', es: 'Coordinación' }, { en: 'Flexibility', es: 'Flexibilidad' } ],
    a: 2,
    f: { en: 'Basic: endurance, strength, speed and flexibility. Psychomotor: balance, coordination and agility.', es: 'Básicas: resistencia, fuerza, velocidad y flexibilidad. Psicomotrices: equilibrio, coordinación y agilidad.' }
  },
  {
    q: { en: 'Why should you be careful with very heavy weights at your age?', es: '¿Por qué debes tener cuidado con los pesos muy pesados a tu edad?' },
    o: [ { en: 'They may cause serious injuries', es: 'Pueden causar lesiones graves' }, { en: 'They make you slower', es: 'Te hacen más lento' }, { en: 'They reduce your flexibility', es: 'Reducen tu flexibilidad' } ],
    a: 0,
    f: { en: 'Use light loads, like your own body weight.', es: 'Usa cargas ligeras, como tu propio peso corporal.' }
  }
];
