function DefaultFretNumbers({ frets, fretWidths }) {
  return (
    <div id="FretNumbers">
      {frets.map((fret, index) => {
        return (
          <p
            key={`fretNumber${index}`}
            style={{ minWidth: fretWidths?.[index] }}
          >
            {index}
          </p>
        );
      })}
    </div>
  );
}

export default DefaultFretNumbers;
