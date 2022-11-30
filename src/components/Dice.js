export default function Dice(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#90EE90" : "#ffffff",
  };

  return (
    <div className="dice-face" style={styles} onClick={props.holdDice}>
      <h2 className="dice-number">{props.value}</h2>
    </div>
  );
}
