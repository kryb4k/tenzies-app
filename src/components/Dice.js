export default function Dice(props) {
  const styles = {
    backgroundColor: props.isHeld ? "green" : "white",
  };

  return (
    <div className="dice-face" style={styles} onClick={props.holdDice}>
      <h2 className="dice-number">{props.value}</h2>
    </div>
  );
}
