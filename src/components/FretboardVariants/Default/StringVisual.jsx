const StringVisual = ({ stringNumber, stringHeight }) => {
  return (
    <div
      className={`stringVisual stringVisual${stringNumber}`}
      style={{
        height: stringHeight,
      }}
    >
      <span className="staticPart" />
      <span className="vibratingPart" />
    </div>
  );
};

export default StringVisual;
