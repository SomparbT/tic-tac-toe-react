import { XO } from "../Game";

type PropsT = {
  value: XO;
  onClick: () => void;
};

const Square = (props: PropsT) => {
  return (
    <button
      className={props.value === "X" ? "x-value" : "O-value"}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export default Square;
