### Todo:
> Fretboard scroll on desktop and mobile with atomatic snap to edge of note/fret

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