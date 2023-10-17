import "./SharpsFlatsDisplay.scss";

function SharpsFlatsDisplay({ selected }) {
  return (
    <div id="SharpsAndFlatsDisplay">
      <button
        className={`flats ${
          selected === "cbmajor" || selected === "abminor" ? "selected" : ""
        }`}
      >
        Bb, Eb, Ab, Db, Gb, Cb, Fb
      </button>
      <button
        className={`flats ${
          selected === "gbmajor" || selected === "ebminor" ? "selected" : ""
        }`}
      >
        Bb, Eb, Ab, Db, Gb, Cb
      </button>
      <button
        className={`flats ${
          selected === "dbmajor" || selected === "bbminor" ? "selected" : ""
        }`}
      >
        Bb, Eb, Ab, Db, Gb
      </button>
      <button
        className={`flats ${
          selected === "abmajor" || selected === "fminor" ? "selected" : ""
        }`}
      >
        Bb, Eb, Ab, Db
      </button>
      <button
        className={`flats ${
          selected === "ebmajor" || selected === "cminor" ? "selected" : ""
        }`}
      >
        Bb, Eb, Ab
      </button>
      <button
        className={`flats ${
          selected === "bbmajor" || selected === "gminor" ? "selected" : ""
        }`}
      >
        Bb, Eb
      </button>
      <button
        className={`flats ${
          selected === "fmajor" || selected === "dminor" ? "selected" : ""
        }`}
      >
        Bb
      </button>
      <button
        className={`naturals ${
          selected === "cmajor" || selected === "aminor" ? "selected" : ""
        }`}
      >
        -
      </button>
      <button
        className={`sharps ${
          selected === "gmajor" || selected === "eminor" ? "selected" : ""
        }`}
      >
        F#
      </button>
      <button
        className={`sharps ${
          selected === "dmajor" || selected === "bminor" ? "selected" : ""
        }`}
      >
        F#, C#
      </button>
      <button
        className={`sharps ${
          selected === "amajor" || selected === "f#minor" ? "selected" : ""
        }`}
      >
        F#, C#, G#
      </button>
      <button
        className={`sharps ${
          selected === "emajor" || selected === "c#minor" ? "selected" : ""
        }`}
      >
        F#, C#, G#, D#
      </button>
      <button
        className={`sharps ${
          selected === "bmajor" || selected === "g#minor" ? "selected" : ""
        }`}
      >
        F#, C#, G#, D#, A#
      </button>
      <button
        className={`sharps ${
          selected === "f#major" || selected === "d#minor" ? "selected" : ""
        }`}
      >
        F#, C#, G#, D#, A#, E#
      </button>
      <button
        className={`sharps ${
          selected === "c#major" || selected === "a#minor" ? "selected" : ""
        }`}
      >
        F#, C#, G#, D#, A#, E#, B#
      </button>
    </div>
  );
}

export default SharpsFlatsDisplay;
