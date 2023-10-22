import "./stringVisual.scss";

const StringVisual = ({ stringNumber }) => {
  return (
    <div className={`stringVisual stringVisual${stringNumber}`}>
      <span className="staticPart" />
      <span className="vibratingPart" />
    </div>
  );
};

export default StringVisual;
