const Square = (props) => {
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
