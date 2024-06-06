import { ChordMaps } from "./ChordMaps";

export class Chord {
  constructor({
    root = "",
    quality = "",
    extension = "",
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
    missingChordIntervals = [],
    isAbstract = false,
    isValid = true,
    isExactMatch = false,
  } = {}) {
    this.root = root;
    this.quality = quality;
    this.extension = extension;
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
    this.missingChordIntervals = missingChordIntervals;
    this.isAbstract = isAbstract;
    this.isValid = isValid;
    this.isExactMatch = isExactMatch;
  }

  // 1:
  // separate into additionalQuality, suspension and alteration?
  // or give that responsibility to ChordDetails?

  // 2:
  // Is it feasible to merge the 'extend' and 'modify' functions?

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

    // console.log("generated notes: ", notes);
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

  // possibleChord.canModifySimilar(interval)
  extendOrAlter(extensionInterval) {
    if (this.extension === 5) {
      this.isValid = false;
      return;
    }

    let operation = ""; // replace // discard
    // console.log("extending " + this.quality);

    switch (extensionInterval) {
      case 1:
        if (this.extension >= 9) {
          operation = "discard";
        } else {
          this.alterations.push("b9");
          operation = "add";
        }
        break;

      case 2:
        if (this.quality === "major" || this.quality === "default") {
          // if a third is not selected by the user,
          // replace this chords' third with a sus2
          if (this.missingChordIntervals.includes(4)) {
            this.suspension = "sus2";
            operation = "replaceThird";
          } else if (this.extension === null) {
            // if a third has already been selected
            this.alterations.push("9");
            operation = "add";
          } else {
            operation = "discard";
          }
        }
        break;

      case 3:
        if (this.extension >= 9) {
          operation = "discard";
        } else {
          this.alterations.push("#9");
          operation = "add";
        }
        break;

      case 4:
        if (this.quality === "minor" || this.quality === "diminished") {
          operation = "discard";
        } // always false?
        break;

      case 5:
        if (this.quality === "major" || this.quality === "default") {
          if (this.suspension === "sus2") {
            this.suspension = "sus4";
            this.alterations.push("9");
            operation = "add";
          } else if (this.missingIntervals.includes(4)) {
            this.suspension = "sus4";
            operation = "replaceThird";
          } else if (this.extension === null || this.extension === 7) {
            // if a third has already been selected
            this.alterations.push("11");
            operation = "add";
          } else {
            operation = "discard";
          }
        }
        break;

      case 6:
        if (this.canModifySimilar(extensionInterval)) {
          this.alterations.push("b5");
          operation = "replace";
        } else if (this.extension >= 11) {
          operation = "discard";
        } else {
          this.alterations.push("#11");
          operation = "add";
        }
        break;

      case 7:
        operation = "discard";
        break;

      case 8:
        if (this.canModifySimilar(extensionInterval)) {
          this.alterations.push("#5");
          operation = "replace";
        } else if (this.extension === 13) {
          operation = "discard";
        } else {
          this.alterations.push("b13");
          operation = "add";
        }
        break;

      case 9: // 6
        this.extension = "6";
        operation = "add";
        break;

      case 10:
        if (
          this.extension >= 7 ||
          (this.quality === "major" && this.extension === null)
        ) {
          operation = "discard";
        } else {
          this.alterations.push("b7");
          operation = "add";
        }
        break;

      case 11: // 7, maj7
        if (this.quality === "major" && this.extension === null) {
          operation = "discard";
        } else if (this.quality === "minor") {
          this.quality = "mMaj7";
          operation = "add";
        }
        break;
    }

    switch (operation) {
      case "add":
        this.intervals.push({ number: extensionInterval, isOmittable: false });
        break;

      case "replace":
        this.intervals = this.intervals.filter(
          (interval) =>
            !ChordMaps.similarIntervals[extensionInterval].includes(
              interval.number
            )
        );
        break;

      case "replaceThird":
        this.intervals.push({ number: extensionInterval, isOmittable: false });
        console.log(this.intervals);
        this.intervals = this.intervals.filter(
          (interval) => interval.number !== 4
        );
        console.log(this.intervals);
        break;

      case "discard":
        this.isValid = false;
        break;
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

  // chordSymbol() {}

  getMissingIntervalsFromSelected(selectedIntervals) {
    let missingFromSelected = [];

    let chordIntervalNumbers = this.intervals.map(
      (interval) => interval.number
    );

    for (let selectedInterval of selectedIntervals) {
      if (!chordIntervalNumbers.includes(selectedInterval)) {
        missingFromSelected.push(selectedInterval);
      }
    }

    this.missingFromSelected = missingFromSelected;
    return missingFromSelected;
  }

  getMissingChordIntervals(selectedIntervals) {
    let missingChordIntervals = [];

    for (let interval of this.intervals) {
      if (!selectedIntervals.includes(interval.number)) {
        missingChordIntervals.push(interval.number);
      }
    }

    // console.log(this.root + this.quality + this.extension);
    // console.log("missingChordIntervals: " + missingChordIntervals);

    this.missingChordIntervals = missingChordIntervals;
    return missingChordIntervals;
  }

  checkForNo3AndNo5(interval) {
    switch (this.quality) {
      case "default":
      case "major":
        if (interval === 4) this.no3 = true;
        if (interval === 7) this.no5 = true;
        break;

      case "minor":
        if (interval === 3) this.no3 = true;
        if (interval === 7) this.no5 = true;
        break;

      case "diminished":
        if (interval === 3) this.no3 = true;
        // if (interval === 6) this.isValid = false;
        break;

      case "augmented":
        if (interval === 4) this.no3 = true;
        // if (interval === 8) this.isValid = false;
        break;

      default:
        break;
    }
  }

  prepareForUse() {
    switch (this.quality) {
      case "default":
        this.quality = "";
        break;
      case "major":
        if (this.extension === 5 || this.extension === null) {
          this.quality = "";
        } else {
          this.quality = "maj";
        }
        break;
      case "minor":
        this.quality = "min";

        break;
      case "diminished":
        this.quality = "dim";
        break;
      case "augmented":
        this.quality = "aug";
        break;
      default:
        break;
    }

    if (this.hasNo3) this.alterations.push("no3");
    if (this.hasNo5) this.alterations.push("no5");
    // for (let interval of this.intervals) {
    //   if (this.missingChordIntervals.includes(interval)) {
    //     interval.isMissing = true;
    //   } else {
    //     interval.isMissing = false;
    //   }
    // }
    this.alteration = this.alterations.toString();
    if (this.notes.length === 0) this.notes = this.generateNotes();
  }

  // getMissingIntervals(selectedIntervals) {
  //   let missingIntervals = { missingFromSelected: [], missingFromChord: [] };

  //   let chordIntervalNumbers = this.intervals.map(
  //     (interval) => interval.number
  //   );

  //   for (let interval of selectedIntervals) {
  //     if (!chordIntervalNumbers.includes(interval)) {
  //       missingIntervals.missingFromSelected.push(interval);
  //     }
  //   }

  //   for (let interval of chordIntervalNumbers) {
  //     if (!selectedIntervals.includes(interval)) {
  //       missingIntervals.missingFromChord.push(interval);
  //     }
  //   }

  //   // console.log(this.root + this.quality + this.extension);
  //   // console.log("missingFromSelected: " + missingIntervals.missingFromSelected);
  //   // console.log("missingFromChord: " + missingIntervals.missingFromChord);
  //   // console.log("found missing intervals: " + missingIntervals);
  //   this.missingIntervals = missingIntervals;
  //   return missingIntervals;
  // }

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
      // console.log("trying to remove more than one fifth, not yet implemented");
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
