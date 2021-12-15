import "./SingleBox.css";

let centerHorizontals = ["0-1", "1-1", "2-1"];
let centerVerticals = ["1-0", "1-1", "1-2"];

export default function SingleBox(props) {
  let coordinate = props.coordinate;
  let value = props.value;
  let className = "SingleBox";
  if (centerVerticals.includes(coordinate)) {
    className += " CenterVertical";
  }

  if (centerHorizontals.includes(coordinate)) {
    className += " CenterHorizontal";
  }

  return (
    <button className={className} onClick={props.onClick}>
      <h1>{value === null ? "" : value}</h1>
    </button>
  );
}
