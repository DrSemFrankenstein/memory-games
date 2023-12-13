import React, { useEffect, useRef, useState } from "react";

export default function RedCircleGame() {
  const canvasContainerRef = useRef(null); // Reference to the canvas container
  const canvasRef = useRef(null);
  const shapes = useRef([]);
  const [redCirclesDetected, setRedCirclesDetected] = useState(0);
  const [totalRedCircles, setTotalRedCircles] = useState(0);
  const [gameStartTime, setGameStartTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 800,
    height: 600,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let clickedRedCircles = [];
    let roundStartTime;

    const colors = ["blue", "red", "green", "yellow", "magenta"];

    class Shape {
      constructor() {
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speedFactor = 5;
        this.speedX = (Math.random() * 2 - 1) * this.speedFactor;
        this.speedY = (Math.random() * 2 - 1) * this.speedFactor;

        const shapeType = Math.random();
        if (shapeType < 0.33) {
          this.type = "circle";
          this.radius = Math.random() * 30 + 10;
        } else if (shapeType < 0.66) {
          this.type = "square";
          this.size = Math.random() * 40 + 20;
        } else {
          this.type = "triangle";
          this.size = Math.random() * 40 + 20;
        }

        this.hidden = false;
      }

      draw() {
        if (this.hidden) {
          return;
        }

        ctx.beginPath();
        if (this.type === "circle") {
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        } else if (this.type === "square") {
          ctx.rect(
            this.x - this.size / 2,
            this.y - this.size / 2,
            this.size,
            this.size
          );
        } else if (this.type === "triangle") {
          ctx.moveTo(this.x, this.y - this.size / 2);
          ctx.lineTo(this.x + this.size / 2, this.y + this.size / 2);
          ctx.lineTo(this.x - this.size / 2, this.y + this.size / 2);
          ctx.closePath();
        }
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        this.draw();
      }
    }

    const createShapes = () => {
      const remainingShapes = 10 - shapes.current.length;
      for (let i = 0; i < remainingShapes; i++) {
        const shape = new Shape();
        shapes.current.push(shape);
        // Check if the generated shape is a red circle and increment the total count
        if (shape.color === "red" && shape.type === "circle") {
          setTotalRedCircles((prevTotal) => prevTotal + 1);
        }
      }
    };

    const removeShape = () => {
      if (shapes.current.length > 0) {
        // Remove the first shape from the array
        shapes.current.shift();
      }
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.current.forEach((shape) => {
        shape.update();
      });

      animationFrameId = requestAnimationFrame(update);
    };

    const addNewShape = () => {
      // Create and add a new shape
      const shape = new Shape();
      shapes.current.push(shape);
      // Check if the generated shape is a red circle and increment the total count
      if (shape.color === "red" && shape.type === "circle") {
        setTotalRedCircles((prevTotalRedCircles) => prevTotalRedCircles + 1);
      }
    };

    const handleRedCircleClick = (shape) => {
      if (!shape.hidden && shape.color === "red") {
        shape.hidden = true;
        clickedRedCircles.push(shape);
        setRedCirclesDetected(clickedRedCircles.length);
      }
    };

    const startGame = () => {
      createShapes();
      roundStartTime = Date.now();
      setGameStartTime(roundStartTime);
      setGameOver(false); // Reset game over state
      update();
      // Use setInterval to add a new shape every 2 seconds
      const intervalId = setInterval(addNewShape, 1000);
      // Use setInterval to remove one shape every 2 seconds
      const removeIntervalId = setInterval(removeShape, 2000);
      return { intervalId, removeIntervalId };
    };

    const resetGame = () => {
      clearInterval(gameIntervals.intervalId);
      clearInterval(gameIntervals.removeIntervalId);
      shapes.current = [];
      clickedRedCircles = [];
      setGameOver(true); // Set game over state
      setTimeLeft(30); // Reset the timer
    };

    // Start the game and store interval IDs
    const gameIntervals = startGame();

    // Set a timer to end the round after 30 seconds
    const timerInterval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedSeconds = Math.floor((currentTime - roundStartTime) / 1000);
      const remainingTime = 30 - elapsedSeconds;
      setTimeLeft(remainingTime);
      if (remainingTime <= 0) {
        resetGame();
        clearInterval(gameIntervals.intervalId);
        clearInterval(gameIntervals.removeIntervalId);
        clearInterval(timerInterval); // Stop the timer interval
      }
    }, 1000); // Update timer every second

    canvas.addEventListener("click", (event) => {
      if (!gameOver) {
        const { offsetX, offsetY } = event;
        shapes.current.forEach((shape) => {
          const distance = Math.sqrt(
            (offsetX - shape.x) ** 2 + (offsetY - shape.y) ** 2
          );
          if (distance <= shape.radius) {
            handleRedCircleClick(shape);
          }
        });
      }
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(gameIntervals.intervalId);
      clearInterval(gameIntervals.removeIntervalId);
      clearInterval(timerInterval);
      canvas.removeEventListener("click", () => {});
    };
  }, [gameOver]);

  const handleNewGameClick = () => {
    setTotalRedCircles(0);
    setRedCirclesDetected(0);
    setGameOver(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Red Circles Game</h3>
      {gameOver ? (
        <div>
          <div>Game Over</div>
          <div>Total Red Circles: {totalRedCircles}</div>
          <div>Red Circles Detected: {redCirclesDetected}</div>
          <button onClick={handleNewGameClick}>New Game</button>
        </div>
      ) : (
        <>
          <div>Time Left: {timeLeft} seconds</div>
          <div
            ref={canvasContainerRef}
            style={{ width: "100%", height: "60vh" }}
          >
            <canvas
              ref={canvasRef}
              width={canvasDimensions.width}
              height={canvasDimensions.height}
              style={{ cursor: "pointer", border: "ridge" }}
            />
          </div>
        </>
      )}
    </div>
  );
}
