import React, { useState, useRef } from 'react';
import solarWheel from '/solar-wheel.png';

const planets = [
  { name: 'Mercúrio', reward: '10 pontos' },
  { name: 'Vênus', reward: '20 pontos' },
  { name: 'Terra', reward: '50 pontos' },
  { name: 'Marte', reward: '15 pontos' },
  { name: 'Júpiter', reward: '100 pontos' },
  { name: 'Saturno', reward: '30 pontos' },
  { name: 'Urano', reward: '25 pontos' },
  { name: 'Netuno', reward: '35 pontos' }
];

export default function App() {
  const [reward, setReward] = useState('');
  const wheelRef = useRef(null);

  const spinWheel = () => {
    const selected = Math.floor(Math.random() * planets.length);
    const degree = 360 * 5 + (selected * (360 / planets.length));
    wheelRef.current.style.transform = `rotate(${degree}deg)`;

    setTimeout(() => {
      setReward(`Você caiu em ${planets[selected].name} e ganhou ${planets[selected].reward}!`);
    }, 5200);
  };

  return (
    <div>
      <h1>🌌 Roda Cósmica da Fortuna</h1>
      <div id="wheel-container">
        <img id="wheel" ref={wheelRef} src={solarWheel} alt="Roda do Sistema Solar" />
      </div>
      <button onClick={spinWheel}>Girar</button>
      <div id="reward">{reward}</div>
    </div>
  );
}
