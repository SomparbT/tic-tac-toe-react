import { XO } from "../Game";

type PropsT = {
  value: XO;
  onClick: () => void;
  isWinner: boolean;
};

const Square = (props: PropsT) => {
  return (
    <button
      className={
        props.value === "X"
          ? props.isWinner
            ? "x-value-winner"
            : "x-value"
          : props.isWinner
          ? "o-value-winner"
          : "o-value"
      }
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export default Square;
