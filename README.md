Warning: Cannot update a component (`FretCountSlider`) while rendering a different component
click key or fretboard set. fix this first.
then fix fretboard scroll using new nice code













# How does the app work?

>>> Situations:

> App loads:
Based on windowWidth, the app determines how many notes will fit on the screen/fretboard,
when the notes are as big as they can be.

<FretboardSlice>:
- initializes initialState variables based on windowWidth.



### The Fretboard

>>> Situations:

> User sets preferredFretCount with slider.
<FretboardSlice>:
- Updates necessary values: fretCount, notesWidth, fretboardWidth




