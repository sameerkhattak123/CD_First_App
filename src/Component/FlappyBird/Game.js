import React, { useState, useEffect, useRef } from 'react';
import Bird from './Bird';
import Pipe from './Pipe';
import GameOver from './GameOver';

const PIPE_WIDTH = 52;
const PIPE_GAP = 200; // Adjust as necessary

const Game = () => {
  const [birdPosition, setBirdPosition] = useState(250);
  const [gameOver, setGameOver] = useState(false);
  const [pipes, setPipes] = useState([{ height: 200, left: 500, id: 0 }]);
  const gameAreaRef = useRef(null);
  const pipeCounterRef = useRef(1);
  const [gameHeight, setGameHeight] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === ' ') {
        setBirdPosition((prev) => Math.max(prev - 50, 0));
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (gameAreaRef.current) {
      setGameHeight(gameAreaRef.current.clientHeight);
    }
  }, [gameAreaRef]);

  useEffect(() => {
    if (gameOver || !gameHeight) return;

    const gameLoop = setInterval(() => {
      setBirdPosition((prev) => Math.min(prev + 5, 480));
      setPipes((prev) => {
        const newPipes = prev.map(pipe => ({ ...pipe, left: pipe.left - 5 }));

        if (newPipes[0].left < -PIPE_WIDTH) {
          newPipes.shift();
        }

        if (newPipes[newPipes.length - 1].left < 300) {
          const pipeHeight = Math.floor(Math.random() * (gameHeight - PIPE_GAP));
          newPipes.push({ height: pipeHeight, left: 500, id: pipeCounterRef.current++ });
        }

        return newPipes;
      });

      // Check for collision
      // Add your collision logic here

    }, 30);

    return () => clearInterval(gameLoop);
  }, [gameOver, gameHeight]);

  const handleRetry = () => {
    setBirdPosition(250);
    setPipes([{ height: 200, left: 500, id: 0 }]);
    setGameOver(false);
    pipeCounterRef.current = 1;
  };

  return (
    <div ref={gameAreaRef} style={{ position: 'relative', width: '100%', height: '500px', overflow: 'hidden', background: 'skyblue' }}>
      <Bird position={birdPosition} />
      {pipes.map(pipe => (
        <React.Fragment key={pipe.id}>
          <Pipe height={pipe.height} left={pipe.left} />
          <Pipe height={gameHeight - PIPE_GAP - pipe.height} left={pipe.left} isBottom />
        </React.Fragment>
      ))}
      <GameOver visible={gameOver} onRetry={handleRetry} />
    </div>
  );
};

export default Game;
