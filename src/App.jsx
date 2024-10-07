import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      onClick={onSquareClick}
      className="bg-white border border-gray-400 w-16 h-16 m-px rounded text-3xl font-bold"
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, gameOver, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares) || gameOver) {
      return;
    }

    const nextSquares = squares.slice();
    xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (gameOver) {
    status = "Game Over";
  } else {
    status = "Now playing: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <h1 className="text-2xl font-medium italic my-4">{status}</h1>
      <div className="flex">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="flex">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="flex">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    setXIsNext(!xIsNext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setGameOver(!nextSquares.includes(null) && true);
  }

  function jumpTo(move) {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
    setGameOver(history[move].includes(null) ? false : true);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move === 0) {
      description = "Go to game start";
    } else {
      description = `Go to move #${move}`;
    }
    return (
      <li key={move}>
        <button
          onClick={() => jumpTo(move)}
          className="bg-slate-200 font-medium border border-blue-300 px-2 py-1 w-full rounded"
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <section className="flex flex-wrap py-8 justify-center items-center gap-8 min-h-screen">
      <div>
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          gameOver={gameOver}
          onPlay={handlePlay}
        />
      </div>
      <div>
        <ol className="space-y-2 border p-3">{moves}</ol>
      </div>
    </section>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
