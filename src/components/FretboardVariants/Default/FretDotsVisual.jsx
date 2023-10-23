function FretDotsVisual({ fretNumber, notesWidth }) {
  switch (fretNumber) {
    case 3:
    case 5:
    case 7:
    case 9:
    case 15:
    case 17:
    case 19:
    case 21:
      return (
        <div
          className="fretDot"
          style={{
            width: notesWidth - 10,
            height: notesWidth - 10,
            top: 45 + "%",
          }}
        />
      );
    case 12:
    case 24:
      return (
        <>
          <div
            className="fretDot"
            style={{
              width: notesWidth - 10,
              height: notesWidth - 10,
              top: 25 + "%",
              transform: `translateY(${-50}%)`,
            }}
          />
          <div
            className="fretDot"
            style={{
              width: notesWidth - 10,
              height: notesWidth - 10,
              bottom: 25 + "%",
              transform: `translateY(${+50}%)`,
            }}
          />
        </>
      );
    default:
      return null;
  }
}

export default FretDotsVisual;
