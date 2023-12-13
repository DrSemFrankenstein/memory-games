import React, { Component } from 'react';

class FighterPilotGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      controlPlayer: false,
      hasGameStarted: false,
      hasGameOver: false,
      startDate: null,
      playerRect: {
        x: 275,
        y: 275,
        width: 50,
        height: 50,
      },
      rectangles: [
        {
          x: 75,
          y: 75,
          dx: 5,
          dy: 4,
          width: 75,
          height: 75,
          color: "#000099",
        },
        {
          x: 400,
          y: 75,
          dx: -5,
          dy: 5.5,
          width: 80,
          height: 60,
          color: "#000099",
        },
        {
          x: 75,
          y: 445,
          dx: 5,
          dy: -5,
          width: 40,
          height: 80,
          color: "#000099",
        },
        {
          x: 420,
          y: 450,
          dx: -5,
          dy: -5,
          width: 130,
          height: 25,
          color: "#000099",
        },
      ],
      numberOfSpeed: 0,
    };

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas.getContext("2d");
    this.update();
  }

  millisecondsToMinutes(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  gameOver() {
    if (!this.state.hasGameOver) {
      let endDate = new Date();
      let timeDiff = endDate - this.state.startDate;
      if (timeDiff < 60000) {
        alert(`You survived ${timeDiff / 1000} seconds!`);
      } else {
        let minutesSurvived = this.millisecondsToMinutes(timeDiff);
        alert(`You survived ${minutesSurvived} minutes. WOW!`);
      }

      this.setState({
        hasGameOver: true,
      });

      // Reload the page (for CodePen)
      window.location.reload();
    }
  }

  drawBorder() {
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.clearRect(50, 50, 500, 500);
  }

  isRectangleCollision(rect1, rect2) {
    return !(
      rect1.x > rect2.x + rect2.width ||
      rect1.x + rect1.width < rect2.x ||
      rect1.y > rect2.y + rect2.height ||
      rect1.y + rect1.height < rect2.y
    );
  }

  playerCollisionDetection() {
    if (
      this.state.playerRect.x + this.state.playerRect.width > 550 ||
      this.state.playerRect.x < 50 ||
      this.state.playerRect.y + this.state.playerRect.height > 550 ||
      this.state.playerRect.y < 50
    ) {
      this.gameOver();
    }
  }

  rectangleCollisionDetection() {
    this.state.rectangles.forEach((rect) => {
      if (this.isRectangleCollision(this.state.playerRect, rect)) {
        this.gameOver();
      }
    });
  }

  moveRectangle() {
    this.setState((prevState) => ({
      rectangles: prevState.rectangles.map((rect) => ({
        ...rect,
        x: rect.x + rect.dx,
        y: rect.y + rect.dy,
      })),
    }));
  }

  borderRectangleCollisionDetection() {
    this.setState((prevState) => ({
      rectangles: prevState.rectangles.map((rect) => {
        let newDx = rect.dx;
        let newDy = rect.dy;

        if (rect.x + rect.width > this.canvas.width || rect.x < 0) {
          newDx *= -1;
        }

        if (rect.y + rect.height > this.canvas.height || rect.y < 0) {
          newDy *= -1;
        }

        return {
          ...rect,
          dx: newDx,
          dy: newDy,
        };
      }),
    }));
  }

  configureRectSpeed() {
    const speedUpGame = setInterval(() => {
      this.setState((prevState) => ({
        numberOfSpeed: prevState.numberOfSpeed + 1,
        rectangles: prevState.rectangles.map((rect) => ({
          ...rect,
          dx: rect.dx >= 0 ? rect.dx + 1 : rect.dx - 1,
          dy: rect.dy >= 0 ? rect.dy + 1 : rect.dy - 1,
        })),
      }));

      if (this.state.numberOfSpeed === 4) {
        clearInterval(speedUpGame);
      }
    }, 10000);
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBorder();
    this.drawRect();

    if (this.state.hasGameStarted) {
      this.moveRectangle();
    }

    this.borderRectangleCollisionDetection();
    this.playerCollisionDetection();
    this.rectangleCollisionDetection();
    requestAnimationFrame(() => this.update());
  }

  isCursorInRect(x, y, rect) {
    return x > rect.x && x < rect.x + rect.width && y > rect.y && y < rect.y + rect.height;
  }

  handleMouseDown = (e) => {
    const pos = {
      x: e.clientX - this.canvas.offsetLeft,
      y: e.clientY - this.canvas.offsetTop,
    };

    if (this.isCursorInRect(pos.x, pos.y, this.state.playerRect)) {
      if (!this.state.hasGameStarted) {
        this.setState({
          startDate: new Date(),
        });
        this.configureRectSpeed();
      }

      this.setState({
        hasGameStarted: true,
        controlPlayer: true,
      });
    }
  };

  handleMouseMove = (e) => {
    if (this.state.controlPlayer && !this.state.hasGameOver) {
      const pos = {
        x: e.clientX - this.canvas.offsetLeft,
        y: e.clientY - this.canvas.offsetTop,
      };

      this.setState((prevState) => ({
        playerRect: {
          ...prevState.playerRect,
          x: pos.x - 25,
          y: pos.y - 25,
        },
      }));
    }
  };

  handleMouseUp = () => {
    this.setState({
      controlPlayer: false,
    });
  };

  drawRect() {
    this.ctx.fillStyle = "#990000";
    this.ctx.fillRect(this.state.playerRect.x, this.state.playerRect.y, this.state.playerRect.width, this.state.playerRect.height);
    this.state.rectangles.forEach((rect) => {
      this.ctx.fillStyle = rect.color;
      this.ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    });
  }

  render() {
    return (
      <div>
        <h3>Fighter Pilot Challenge</h3>
        <canvas
          width="600"
          height="600"
          id="canvas"
          ref={this.canvasRef}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
        ></canvas>
      </div>
    );
  }
}

export default FighterPilotGame;
