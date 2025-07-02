import React, { useState, useRef, useEffect } from 'react';
// Não precisamos importar a imagem da roda aqui, pois ela será um background-image no CSS.
// import solarWheel from '/public/solar-wheel.png'; // Esta linha não é mais necessária

const planets = [
  { name: 'Mercúrio', reward: 10 },
  { name: 'Vênus', reward: 20 },
  { name: 'Terra', reward: 50 },
  { name: 'Marte', reward: 15 },
  { name: 'Júpiter', reward: 100 },
  { name: 'Saturno', reward: 30 },
  { name: 'Urano', reward: 25 },
  { name: 'Netuno', reward: 35 }
];

export default function App() {
  const [currentRewardText, setCurrentRewardText] = useState('Clique em Girar para a Fortuna Cósmica!');
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem('cosmicGameScore');
    return savedScore ? parseInt(savedScore, 10) : 0;
  });
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('cosmicGameScore', score.toString());
  }, [score]);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setCurrentRewardText('Girando a Roda...');

    const selected = Math.floor(Math.random() * planets.length);
    const baseDegrees = 360 * 5;
    const degreesPerPlanet = 360 / planets.length;

    // *** MUITO IMPORTANTE: AJUSTE DO finalDegree ***
    // A nova imagem da roda (background.jpg) tem os planetas em posições diferentes
    // da imagem anterior (solar-wheel.png).
    // Você PRECISARÁ CALIBRAR este offset 'offsetDegrees'
    // para que o ponteiro (#wheel-pointer) aponte para o centro exato de cada planeta.
    //
    // Para calibrar:
    // 1. Inspecione o elemento da roda no navegador.
    // 2. Gire-a manualmente no CSS até um planeta específico esteja sob o ponteiro.
    // 3. Anote o ângulo. Divida 360 pelo número de planetas (360/8 = 45 graus por planeta).
    // 4. Veja qual a diferença entre o ângulo anotado e 0 graus (ou 45, 90, etc., para cada planeta).
    // 5. Use essa diferença como seu 'offsetDegrees'.
    //
    // Como a nova imagem tem 8 planetas visíveis, e o primeiro está um pouco para a direita do topo:
    // Comece com um valor como 22.5 (metade de 45), ou 0 e ajuste visualmente.
    const offsetDegrees = 22.5; // Ajuste este valor!
    const finalDegree = baseDegrees + (selected * degreesPerPlanet) + offsetDegrees;

    if (wheelRef.current) {
        wheelRef.current.style.transition = 'transform 5s cubic-bezier(0.25, 1, 0.5, 1)';
        wheelRef.current.style.transform = `rotate(${finalDegree}deg)`;
    }

    setTimeout(() => {
      setCurrentRewardText(`Você caiu em ${planets[selected].name}: ${planets[selected].reward} pontos`);
      setScore(prevScore => prevScore + planets[selected].reward);
      setIsSpinning(false);
    }, 5200);
  };

  return (
    <div>
      <h1>🌌 Roda Cósmica da Fortuna</h1>
      <h2>Pontuação Total: {score}</h2>
      <div id="wheel-container">
        {/* Agora a imagem da roda é um background-image no CSS, então não precisamos de um <img> aqui diretamente para a roda */}
        {/* A div #wheel será a que tem o background-image e gira */}
        <div id="wheel" ref={wheelRef}></div>
        <div id="wheel-pointer"></div>
      </div>
      <button onClick={spinWheel} disabled={isSpinning} aria-label={isSpinning ? 'Girando a roda da fortuna' : 'Girar a roda da fortuna'}>
        {isSpinning ? 'Girando...' : 'Girar'}
      </button>
      <div id="reward">{currentRewardText}</div>
    </div>
  );
}
