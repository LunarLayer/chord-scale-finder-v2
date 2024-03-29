> Chord / Scale finder (Work in progress)
Welcome to the chord scale finder. 
The goal is to have a clean and intuitive interface/tool for musicians to work and learn with.
The app provides:
- Look up chords, alternate chords and their inversions
- Look up scales and alternate scales
- Creating a chord progression
- Suggesting scales and chords to use over a certain chord in a progression.
- Learning new concepts in music through various topics: Substitute dominants, Modal interchange, Borrowed chords etc. 
- Using either a (highly customizable) fretboard or a piano for learning. 
These will have different tunings, sounds, themes etc.
- Ability to save projects without creating a profile
- Creating a profile, saving (optionally private) projects.
- Browsing projects created by other users

> Stack
React.js (JavaScript Library)
Redux Toolkit (state management)
Tonal.js (music theory library)
Howler.js (library for playing sounds)

> TODO
- Overall styling of the app
- Chord progression module
- Piano
- Settings menu
- QuickMenu
- Simplified Fretboard variant
- Saving/Searching public projects without logging in
- Login functionality
- Create design of notes in Figma
- Consider how to handle code and design for notes out of key
- Add "toggle" option to the "Mark notes" setting.
<ChordScaleIdentifier>
  - Depending on the key/tonality, the intervals of a chord will be named differently.
  - 

> Ideas
- Show chord as arpeggio

<Bugs>
- Fretboard scroll on mobile:
  - touchmove event triggers outside the fretboard
  - Scrolling to the end of fretboard doesn't always work, will snap to second last fret







