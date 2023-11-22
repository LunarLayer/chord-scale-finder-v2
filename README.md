This project is still being worked on. 
It's found in the state that it is while I'm currently working on it.

In short, it will become a web-app for musicians to use, to look up chords, scales.
The dream is that it will eventually be able to suggest chords and scales to play over a specified chord progression, however it can be used for much more, granted the aim is to provide a very simple and user friendly experience.




> Currently working on:
Fretboard scroll. 
getFretboardWidth needs to run the if (fretboardIsReady && preferredFretCount)






Applayout dispatch(loginUser(guest));

-> init userSlice state
-> musicTheorySlice -> state.notes = user.settings.notes
-> fretboardSlice -> useselector musicTheory.notes -> Render strings



> Actions involving selectedNotes
<SoundEngine>
> PlayNote (note)
> PlayScale (fretboard.strings -> grab notes sequentially starting from string 1 -> 2 -> 3 -> etc.)
> PlayChord (musicTheory.selectedNotes -> Play selectedNotes with a slight delay)

> MarkNotes: 
> <Single>: 
Add: dispatch(selectNoteOnString({ note, stringIndex }));
Render: fretboard.strings
> <Identical>: 
Add: dispatch(selectNotes(note));
Render: if selectedNotes.includes(note (already has oct)) -> note.selected = true;
> <All>: 
Add: SelectedNotes.push(C# + i (i = 0 - 8))
Render: if selectedNotes.includes(note (already has oct)) -> note.selected = true;




### Todo:
<FretboardSlice>
> Consider if fretCount should be 1 less. (look at scrollToNearestFret reducer)
<soundEngine>
> Load a sound on/off symbol instead of delaying everything until the instrument audio has loaded.
<Fretboard> 
> scroll on desktop and mobile with atomatic snap to edge of note/fret
Make instruments resizable (how cool would that be!)

<Tonal.js>
> Only import what's needed

<Howler.js>


> User login
> <Bonus> Save user data in DB: PreferredInstrument, Projects, b/w or colored notes, etc.

> Fretboard theme: standardFretboard

> Piano theme

> Key change (finish design and implement)

> FretboardSettings (finish design and implement)

> Implement a chord analysis/-progression library.

> Change folder and comp names so they all use PascalCase



<2>
> Remove the String component, hardcode it in the fretboard, keep the Note component, pass an additional style down to the Note component (border-radius etc...) (i guess it will just overwrite default styles if any)
Memoize Note

<3>
> Implement both fretsWidth(fretboard) and notesWidth(fretboard and "noteboard" lol)

<4> 
> Update fretboardSlice's updateState() & getInitialStatew to use if (theme1) else if (theme 2) etc.

<5>
Check everything works with notesboard (lol)
Design and implement defaultFretboard



> DefaultFretboard -> no strings comp, its inside the return.
> MinimalFretboard -> no strings comp, its inside the return.
- Note component is reusable.







# How does the app work?

>>> Situations:

> App loads:
Based on windowWidth, the app determines how many notes will fit on the screen/fretboard,
when the notes are as big as they can be.

<FretboardSlice>:
- initializes initialState variables based on windowWidth.



### The Fretboard

>>> Situations:

> User sets preferredfretCount with slider.
<FretboardSlice>:
- Updates necessary values: fretCount, notesWidth, fretboardWidth







// When you face the problem of subpixel rendering and the right wall of the last notes/fret disappear, 
remember you compensated for this on the block-fretboard. 
remove the compensation once a solution has been found.


