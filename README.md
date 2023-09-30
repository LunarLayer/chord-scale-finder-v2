Warning: Cannot update a component (`FretCountSlider`) while rendering a different component
click key or fretboard set. fix this first.
then fix fretboard scroll using new nice code













# How does the app work?

>>> Situations:

> App loads:
Based on windowWidth, the app determines how many notes will fit on the screen/fretboard,
when the notes are as big as they can be.

<FretboardSlice>:
- Initialize values: notesGap, notesMinWidth, notesMaxWidth, fretboardPadding based on windowWidth
- SetFretCap(windowWidth, fretboardPadding, notesGap, notesMinWidth)
- setFretCount(windowWidth, fretboardPadding, notesGap, notesMaxWidth, state.fretCap)
- setNotesWidth(notesMaxWidth)
- setFretboardWidth(fretCount, notesWidth, notesGap)

> User changes the fretCount with the slider
<FretboardSlice>:
- setPreferredFretCount(sliderValue)
- setFretCount(preferredFretCount)
- 
- 



