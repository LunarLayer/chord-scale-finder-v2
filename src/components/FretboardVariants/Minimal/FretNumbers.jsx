function MinimalFretNumbers({ frets, notesWidth, gap }) {
  return (
    <div id="FretNumbers" style={{ gap: gap }}>
      {frets.map((fret, index) => {
        return (
          <p key={`fretNumber${index}`} style={{ minWidth: notesWidth }}>
            {index}
          </p>
        );
      })}
    </div>
  );
}

export default MinimalFretNumbers;
