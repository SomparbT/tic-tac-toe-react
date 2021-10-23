import React, { useState } from "react";

import Board from "./components/Board";

export type XO = "X" | "O";

type HistoryT = {
  squares: XO[];
  playedRow: number;
  playedCol: number;
  // test
};

const initialHistory = {
  squares: Array(9).fill(null),
  playedRow: -1,
  playedCol: -1,
};

const calculateWinner = (squares: XO[]) => {
  const winnerBoard: boolean[] = Array(9).fill(false);
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
  let winner = null;
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      winnerBoard[a] = true;
      winnerBoard[b] = true;
      winnerBoard[c] = true;
      winner = squares[a]
    }
  }

  return { winner, winnerBoard };
};

const Game: React.FC = () => {
  const [history, setHistory] = useState<HistoryT[]>([initialHistory]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [ascendingSort, setAscendingSort] = useState(true);

  const handleClick = (i: number) => {
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = currentHistory[currentHistory.length - 1];
    const squares = current.squares.slice();
    const winnerResult = calculateWinner(squares);
    if (winnerResult.winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(
      currentHistory.concat([
        {
          squares: squares,
          playedRow: Math.floor(i / 3) + 1,
          playedCol: Math.floor(i % 3) + 1,
        },
      ])
    );
    setStepNumber(currentHistory.length);
    setXIsNext((prev: boolean) => !prev);
  };

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const toggleSortHandler = () => {
    setAscendingSort((prevState) => !prevState);
  };

  const reset = () => {
    setHistory([initialHistory]);
    setStepNumber(0);
    setXIsNext(true);
    setAscendingSort(true);
  };

  const current = history[stepNumber];
  const winnerResult = calculateWinner(current.squares);
  const winner = winnerResult.winner;

  const moves = history.map((step: HistoryT, move: number) => {
    const desc = move
      ? `Go to move #${move}, played row #${step.playedRow}, column#${step.playedCol}`
      : "Go to game start";
    return (
      <li key={move}>
        <button
          className={move === stepNumber ? "bold-button" : ""}
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
      </li>
    );
  });

  if (!ascendingSort) {
    moves.reverse();
  }

  let status: string;
  if (winner) {
    status = "Winner: " + winner;
  } else if (stepNumber === 9) {
    status = "It's a draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i: number) => handleClick(i)}
          winnerBoard={winnerResult.winnerBoard}
        />
        <button className="reset-btn" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="game-info">
        <div className={winner ? "winner" : "player-status"}>{status}</div>
        <button className="ASC-sort-btn" onClick={toggleSortHandler}>
          Ascending Sort
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
