import "./SharpsFlatsDisplay.scss";

function SharpsFlatsDisplay({ selected }) {
  console.log("SharpsFlatsDisplay");
  console.log(selected);
  return (
    <div id="SharpsAndFlatsDisplay">
      <button
        className={`flats ${
          selected === "Cbmajor" || selected === "Abminor" ? "selected" : ""
        }`}
      >
        Bb, Eb, Ab, Db, Gb, Cb, Fb
      </button>
      <button
        className={`flats ${
          selected === "Gbmajor" || selected === "Ebminor" ? "selected" : ""
        }`}
      >
        Bb, Eb, Ab, Db, Gb, Cb
      </button>
      <button
        className={`flats ${
          selected === "Dbmajor" || selected === "Bbminor" ? "selected" : ""
        }`}
      >
        Bb, Eb, Ab, Db, Gb
      </button>
      <button
        className={`flats ${
          selected === "Abmajor" || selected === "Fminor" ? "selected" : ""
        }`}
      >
        Bb, Eb, Ab, Db
      </button>
      <button
        className={`flats ${
          selected === "Ebmajor" || selected === "Cminor" ? "selected" : ""
        }`}
      >
        Bb, Eb, Ab
      </button>
      <button
        className={`flats ${
          selected === "Bbmajor" || selected === "Gminor" ? "selected" : ""
        }`}
      >
        Bb, Eb
      </button>
      <button
        className={`flats ${
          selected === "Fmajor" || selected === "Dminor" ? "selected" : ""
        }`}
      >
        Bb
      </button>
      <button
        className={`naturals ${
          selected === "Cmajor" || selected === "Aminor" ? "selected" : ""
        }`}
      >
        -
      </button>
      <button
        className={`sharps ${
          selected === "Gmajor" || selected === "Eminor" ? "selected" : ""
        }`}
      >
        F#
      </button>
      <button
        className={`sharps ${
          selected === "Dmajor" || selected === "Bminor" ? "selected" : ""
        }`}
      >
        F#, C#
      </button>
      <button
        className={`sharps ${
          selected === "Amajor" || selected === "F#minor" ? "selected" : ""
        }`}
      >
        F#, C#, G#
      </button>
      <button
        className={`sharps ${
          selected === "Emajor" || selected === "C#minor" ? "selected" : ""
        }`}
      >
        F#, C#, G#, D#
      </button>
      <button
        className={`sharps ${
          selected === "Bmajor" || selected === "G#minor" ? "selected" : ""
        }`}
      >
        F#, C#, G#, D#, A#
      </button>
      <button
        className={`sharps ${
          selected === "F#major" || selected === "D#minor" ? "selected" : ""
        }`}
      >
        F#, C#, G#, D#, A#, E#
      </button>
      <button
        className={`sharps ${
          selected === "C#major" || selected === "A#minor" ? "selected" : ""
        }`}
      >
        F#, C#, G#, D#, A#, E#, B#
      </button>
    </div>
  );
}

export default SharpsFlatsDisplay;
