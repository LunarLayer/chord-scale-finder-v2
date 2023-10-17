import "./ToggleSwitch.scss";

function ToggleSwitch({ option1, option2, onToggle, currentlySelected }) {
  return (
    <>
      <div className="toggleSwitch">
        <div className="optionHeaders">
          <p>{option1}</p>
          <p>{option2}</p>
        </div>
        <input
          type="checkbox"
          id={option1}
          className="checkbox"
          onChange={onToggle}
          checked={currentlySelected === option1 ? false : true}
        />
        <label htmlFor={option1} className="label">
          <div className="ball"></div>
        </label>
      </div>
    </>
  );
}

export default ToggleSwitch;
