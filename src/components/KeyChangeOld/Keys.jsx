import { useSelector } from "react-redux";

import "./Keys.scss";

import { memo } from "react";
import KeysNote from "./KeysNote";
import { useState } from "react";
import { Note } from "tonal";

const Keys = memo(function Keys({ noteSize, handleNoteClicked, accidental }) {
  console.log("x" + accidental);
  return (
    <div id="Keys">
      <div className="notesWrapper">
        <div className="sharpsOrFlats">
          <KeysNote
            note={accidental === "#" ? "C#" : "Db"}
            hasAccidental={true}
            size={noteSize}
            handleClick={() =>
              handleNoteClicked(accidental === "#" ? "c" : "d", accidental)
            }
          />
          <KeysNote
            note={accidental === "#" ? "D#" : "Eb"}
            hasAccidental={true}
            size={noteSize}
            handleClick={() =>
              handleNoteClicked(accidental === "#" ? "d" : "e", accidental)
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
            note={accidental === "#" ? "F#" : "Gb"}
            hasAccidental={true}
            size={noteSize}
            handleClick={() =>
              handleNoteClicked(accidental === "#" ? "f" : "g", accidental)
            }
          />
          <KeysNote
            note={accidental === "#" ? "G#" : "Ab"}
            hasAccidental={true}
            size={noteSize}
            handleClick={() =>
              handleNoteClicked(accidental === "#" ? "g" : "a", accidental)
            }
          />
          <KeysNote
            note={accidental === "#" ? "A#" : "Bb"}
            hasAccidental={true}
            size={noteSize}
            handleClick={() =>
              handleNoteClicked(accidental === "#" ? "a" : "b", accidental)
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
