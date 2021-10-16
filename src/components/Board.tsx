import Square from "./Square";
import { XO } from "../Game";

type PropsT = {
  squares: XO[];
  onClick: (i: number) => void;
};

const Board = (props: PropsT) => {
  const renderSquare = (i: number) => (
    <Square key={i} value={props.squares[i]} onClick={() => props.onClick(i)} />
  );

  // Rewrite Board to use two loops to make the squares instead of hard-coding them.
  const renderBoard = () => {
    const arrBoard = [];
    for (let i = 0; i < 9; i += 3) {
      const arrRow = [];
      for (let j = i; j <= i + 2; j++) {
        arrRow.push(renderSquare(j));
      }
      arrBoard.push(
        <div key={i} className="board-row">
          {arrRow}
        </div>
      );
    }
    return arrBoard;
  };

  return (
    <div>
      <h1 className="game-header">
        TIC <span>TAC</span> TOE
      </h1>
      {renderBoard()}
    </div>
  );
};

export default Board;
