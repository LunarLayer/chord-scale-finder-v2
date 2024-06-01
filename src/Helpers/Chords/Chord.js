import { ChordMaps } from "./ChordMaps";

export class Chord {
  constructor({
    root = "",
    quality = "",
    additionalQuality = "",
    suspension = "",
    alteration = "",
    alterations = [],
    symbol = "",
    notes = [],
    intervals = [],
    extensions = [],
    modifications = [],
    missingIntervals = [],
    isAbstract = false,
    isValid = true,
    isExactMatch = false,
  } = {}) {
    this.root = root;
    this.quality = quality;
    this.additionalQuality = additionalQuality;
    this.suspension = suspension;
    this.alteration = alteration;
    this.alterations = alterations;
    this.symbol = symbol;
    this.notes = notes;
    this.intervals = intervals;
    this.extensions = extensions;
    this.modifications = modifications;
    this.missingIntervals = missingIntervals;
    this.isAbstract = isAbstract;
    this.isValid = isValid;
    this.isExactMatch = isExactMatch;
  }

  // 1:
  // separate into additionalQuality, suspension and alteration?
  // or give that responsibility to ChordDetails?

  // 2:
  // Is it feasible to merge the 'extend' and 'modify' functions?

  prepareForUse() {
    // TODO Sort alterations
    this.alteration = this.alterations.toString();

    if (this.notes.length === 0) this.notes = this.generateNotes();
  }

  generateNotes() {
    let notes = [];
    let rootIndex = ChordMaps.notes.indexOf(this.root);
    // console.log(this.intervals);
    for (let i = 0; i < this.intervals.length; i++) {
      // console.log(this.intervals[i].number);
      let current = this.intervals[i].number + rootIndex;
      while (current >= 12) current -= 12;

      notes.push(ChordMaps.notes[current]);
    }

    console.log("generated notes: ", notes);
    return notes;
  }

  intervalsMatchExactly(selectedIntervals) {
    return (
      this.intervals.length === selectedIntervals.length &&
      this.intervals.every((interval) =>
        selectedIntervals.includes(interval.number)
      )
    );
  }

  modify(modificationInterval) {
    let modification = "";
    switch (modificationInterval) {
      case 2: // sus2
        console.log("sus2");
        // if (this.quality === "TODO") modification = "maj7";
        break;

      case 5: // sus4
        console.log("sus4");
        // if (this.quality === "TODO") modification = "maj7";
        break;

      case 6: // sus4
        console.log("sus4");
        modification = "b5";
        // if (this.quality === "TODO") modification = "maj7";
        break;

      case 8: // sus4
        modification = "#5";
        // if (this.quality === "TODO") modification = "maj7";
        break;

      default:
        this.isValid = false;
        return;
    }

    // remove interval to be replaced/modified
    this.intervals = this.intervals.filter(
      (interval) =>
        !ChordMaps.similarIntervals[modificationInterval].includes(
          interval.number
        )
    );

    // add the modified interval
    this.intervals.push({ number: modificationInterval, isOmittable: false });

    // add the modification
    this.modifications.push(modification);
  }

  extend(extensionInterval) {
    let extension = null;
    console.log("extending " + this.quality);
    // add the extended interval
    // extension might change name based on the quality
    switch (extensionInterval) {
      case 8: // 7, maj7
        extension = "b13";
        break;

      case 9: // 6
        extension = "6";
        break;

      case 11: // 7, maj7
        console.log("case 7, maj7");
        if (this.quality === "7") extension = "maj7";
        if (this.quality === "maj") this.isValid = false;
        break;

      // case 9: // 6, 13
      //   console.log(
      //     "case 6, 13 - do nothing for now, 6 and 13 needs implementation"
      //   );
      //   // extension = "6";
      //   break;

      default:
        break;
    }

    if (extension) {
      this.intervals.push({ number: extensionInterval, isOmittable: false });
      this.extensions.push(extension);
    }
  }

  canModifySimilar(interval) {
    // might cause problems with 6 chords
    return this.intervals.some(
      (chordInterval) =>
        ChordMaps.similarIntervals[interval].includes(chordInterval.number) &&
        chordInterval.isOmittable
    );
  }

  hasSimilarInterval(interval) {
    // add support for other similar intervals when needed
    switch (interval) {
      case 1:
      case 2:
        return this.hasSecond();

      case 3:
      case 4:
        return this.hasThird();

      case 5:
        return this.hasFourth();

      case 6:
      case 7:
      case 8:
        return this.hasFifth();

      case 9:
        return this.hasSixth();

      case 10:
      case 11:
        return this.hasSeventh();

      default:
        return false;
    }
  }

  chordSymbol() {}

  getMissingIntervals(selectedIntervals) {
    let missingIntervals = [];
    let chordIntervalNumbers = this.intervals.map(
      (interval) => interval.number
    );

    // for (let chordInterval of this.intervals) {
    //   chordIntervalNumbers.push(chordInterval.number);
    // }

    // console.log("chordIntervalNumbers", chordIntervalNumbers);
    for (let interval of selectedIntervals) {
      // console.log("interval of selected intervals: " + interval);
      if (!chordIntervalNumbers.includes(interval)) {
        missingIntervals.push(interval);
      }
    }

    // console.log("found missing intervals: " + missingIntervals);
    return missingIntervals;
  }

  isAug() {
    return this.intervals.includes(8);
  }

  isDim() {
    return this.intervals.includes(6);
  }

  hasSecond() {
    return this.intervals.includes(1) || this.intervals.includes(2);
  }

  hasThird() {
    return this.intervals.includes(3) || this.intervals.includes(4);
  }

  hasFourth() {
    return this.intervals.includes(5);
  }
  hasFifth() {
    return (
      this.intervals.includes(6) ||
      this.intervals.includes(7) ||
      this.intervals.includes(8)
    );
  }

  hasSixth() {
    return this.intervals.includes(9);
  }

  hasSeventh() {
    return this.intervals.includes(10) || this.intervals.includes(11);
  }

  removeFifths(specificFifthInterval) {
    if (specificFifthInterval) {
      this.intervals.splice(this.intervals.indexOf(specificFifthInterval), 1);
    } else {
      this.intervals = this.intervals.filter(
        (interval) => interval < 6 || interval > 8
      );
    }
  }

  alterFifthTo(newFifth) {
    let fifths = this.getFifths();
    if (fifths.length === 1) {
      this.intervals.splice(this.intervals.indexOf(fifths[0]), 1);
      this.intervals.push(newFifth);
    } else {
      console.log("trying to remove more than one fifth, not yet implemented");
    }
  }

  addExtension(interval) {
    switch (interval) {
      case 1:
        // if ()
        break;

      default:
        break;
    }
  }

  getFifths() {
    return this.intervals.filter(
      (interval) => interval === 6 || interval === 7 || interval === 8
    );
  }
}
