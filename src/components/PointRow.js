import "./PointRow.css";

export default function PointRow(props) {
  return (
    <div className="Point-row">
      <div
        className={
          props.state.turn === "X" ? " Player-box-highlight" : "Player-box"
        }
      >
        <h2>X</h2>
      </div>
      <div>
        <h1 className="Score">
          {props.state.xWins + " - " + props.state.oWins}
        </h1>
      </div>
      <div
        className={
          props.state.turn === "O" ? " Player-box-highlight" : "Player-box"
        }
      >
        <h2>O</h2>
      </div>
    </div>
  );
}
