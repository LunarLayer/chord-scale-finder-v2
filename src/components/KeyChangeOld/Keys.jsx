import { useSelector } from "react-redux";

import "./Keys.scss";

import { memo } from "react";
import KeysNote from "./KeysNote";
import { useState } from "react";
import { Note } from "tonal";
import { getNoteLabel } from "../../Helpers/InstrumentHelper";
import { useEffect } from "react";

const Keys = memo(function Keys({ noteSize, handleNoteClicked }) {
  const key = useSelector((store) => store.musicTheory.key);
  const accidental = useSelector((store) => store.musicTheory.accidental);
  const allNotes = useSelector((store) => store.musicTheory.allNotes);
  const labelNotes = useSelector((store) => store.musicTheory.labelNotes);

  let noteLabels = [];
  for (let i = 0; i < 12; i++) {
    let noteLabel = getNoteLabel(allNotes[i].pc, labelNotes, key, accidental);
    noteLabels.push(noteLabel);
  }

  return (
    <div id="Keys">
      <div className="notesWrapper">
        <div className="sharpsOrFlats">
          <KeysNote
            noteLabel={noteLabels[1]}
            size={noteSize}
            handleClick={() => handleNoteClicked()}
          />
          <KeysNote
            noteLabel={noteLabels[3]}
            size={noteSize}
            handleClick={() => handleNoteClicked()}
          />
        </div>
        <div className="naturals">
          <KeysNote
            noteLabel={noteLabels[0]}
            size={noteSize}
            handleClick={() => handleNoteClicked()}
          />
          <KeysNote
            noteLabel={noteLabels[2]}
            size={noteSize}
            handleClick={() => handleNoteClicked()}
          />
          <KeysNote
            noteLabel={noteLabels[4]}
            size={noteSize}
            handleClick={() => handleNoteClicked()}
          />
        </div>
      </div>
      <div className="notesWrapper">
        <div className="sharpsOrFlats">
          <KeysNote
            noteLabel={noteLabels[6]}
            size={noteSize}
            handleClick={() => handleNoteClicked()}
          />
          <KeysNote
            noteLabel={noteLabels[8]}
            size={noteSize}
            handleClick={() => handleNoteClicked()}
          />
          <KeysNote
            noteLabel={noteLabels[10]}
            size={noteSize}
            handleClick={() => handleNoteClicked()}
          />
        </div>
        <div className="naturals">
          <KeysNote
            noteLabel={noteLabels[5]}
            size={noteSize}
            handleClick={() => handleNoteClicked()}
          />
          <KeysNote
            noteLabel={noteLabels[7]}
            size={noteSize}
            handleClick={() => handleNoteClicked()}
          />
          <KeysNote
            noteLabel={noteLabels[9]}
            size={noteSize}
            handleClick={() => handleNoteClicked()}
          />
          <KeysNote
            noteLabel={noteLabels[11]}
            size={noteSize}
            handleClick={() => handleNoteClicked()}
          />
        </div>
      </div>
    </div>
  );
});

export default Keys;
