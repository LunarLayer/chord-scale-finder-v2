import { useSelector } from "react-redux";

import "./Keys.scss";

import { memo } from "react";
import KeysNote from "./KeysNote";

const Keys = memo(function Keys({ noteSize, handleNoteClicked }) {
  const accidentalType = useSelector(
    (store) => store.musicTheory.accidentalType
  );
  const tonalityType = useSelector((store) => store.musicTheory.tonalityType);

  return (
    <div id="Keys">
      <div className="notesWrapper">
        <div className="sharpsOrFlats">
          <KeysNote
            note={accidentalType === "#" ? "C" : "D"}
            hasAccidental={true}
            size={noteSize}
            handleClick={() =>
              handleNoteClicked(
                accidentalType === "#" ? "c" : "d",
                accidentalType
              )
            }
          />
          <KeysNote
            note={accidentalType === "#" ? "D" : "E"}
            hasAccidental={true}
            size={noteSize}
            handleClick={() =>
              handleNoteClicked(
                accidentalType === "#" ? "d" : "e",
                accidentalType
              )
            }
          />
        </div>
        <div className="naturals">
          <KeysNote
            note="C"
            hasAccidental={false}
            size={noteSize}
            handleClick={() => handleNoteClicked("c", "")}
          />
          <KeysNote
            note="D"
            hasAccidental={false}
            size={noteSize}
            handleClick={() => handleNoteClicked("d", "")}
          />
          <KeysNote
            note="E"
            hasAccidental={false}
            size={noteSize}
            handleClick={() => handleNoteClicked("e", "")}
          />
        </div>
      </div>
      <div className="notesWrapper">
        <div className="sharpsOrFlats">
          <KeysNote
            note={accidentalType === "#" ? "F" : "G"}
            hasAccidental={true}
            size={noteSize}
            handleClick={() =>
              handleNoteClicked(
                accidentalType === "#" ? "f" : "g",
                accidentalType
              )
            }
          />
          <KeysNote
            note={accidentalType === "#" ? "G" : "A"}
            hasAccidental={true}
            size={noteSize}
            handleClick={() =>
              handleNoteClicked(
                accidentalType === "#" ? "g" : "a",
                accidentalType
              )
            }
          />
          <KeysNote
            note={accidentalType === "#" ? "A" : "B"}
            hasAccidental={true}
            size={noteSize}
            handleClick={() =>
              handleNoteClicked(
                accidentalType === "#" ? "a" : "b",
                accidentalType
              )
            }
          />
        </div>
        <div className="naturals">
          <KeysNote
            note="F"
            hasAccidental={false}
            size={noteSize}
            handleClick={() => handleNoteClicked("f", "")}
          />
          <KeysNote
            note="G"
            hasAccidental={false}
            size={noteSize}
            handleClick={() => handleNoteClicked("g", "")}
          />
          <KeysNote
            note="A"
            hasAccidental={false}
            size={noteSize}
            handleClick={() => handleNoteClicked("a", "")}
          />
          <KeysNote
            note="B"
            hasAccidental={false}
            size={noteSize}
            handleClick={() => handleNoteClicked("b", "")}
          />
        </div>
      </div>
    </div>
  );
});

export default Keys;
