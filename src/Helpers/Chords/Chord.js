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
        if (this.extension === null) {
          this.quality = "";
        } else {
          this.quality = "min";
        }
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

    let replaceSimilarInterval = false;
    // console.log("extending " + this.quality);

    switch (extensionInterval) {
      case 1:
        if (this.extension >= 9) {
          this.isValid = false;
        } else {
          this.alterations.push("b9");
        }
        break;

      case 2:
        if (this.hasThird()) {
          if (this.extension === "7") {
            this.isValid = false;
          } else {
            this.alterations.push("9");
          }
        } else {
          this.suspension = "sus2";
        }
        break;

      case 3:
        if (this.extension >= 9) {
          this.isValid = false;
        } else {
          this.alterations.push("#9");
        }
        break;

      case 4:
        if (this.quality === "minor" || this.quality === "diminished") {
          this.isValid = false;
        } // always false?
        break;

      case 5:
        if (this.hasThird()) {
          if (this.extension >= 9) {
            this.isValid = false;
          } else {
            this.alterations.push("9");
          }
        } else {
          this.suspension = "sus4";
        }
        break;

      case 6:
        if (this.canModifySimilar(extensionInterval)) {
          this.alterations.push("b5");
          replaceSimilarInterval = true;
        } else if (this.extension >= 11) {
          this.isValid = false;
        } else {
          this.alterations.push("#11");
        }
        break;

      case 7:
        this.isValid = false;
        break;

      case 8:
        if (this.canModifySimilar(extensionInterval)) {
          this.alterations.push("#5");
          replaceSimilarInterval = true;
        } else if (this.extension === 13) {
          this.isValid = false;
        } else {
          this.alterations.push("b13");
        }
        break;

      case 9: // 6
        this.extension = "6";
        break;

      case 10:
        if (this.extension >= 7) {
          this.isValid = false;
        } else {
          this.alterations.push("b7");
        }
        break;

      case 11: // 7, maj7
        if (this.extension >= 7) {
          this.isValid = false;
        } else if (this.quality === "minor") {
          console.log("mMaj7 found");
          this.quality = "mMaj7";
        }
        break;
    }

    if (replaceSimilarInterval) {
      // replace the modified interval
      this.intervals = this.intervals.filter(
        (interval) =>
          !ChordMaps.similarIntervals[extensionInterval].includes(
            interval.number
          )
      );
    } else {
      // add the modified interval
      this.intervals.push({ number: extensionInterval, isOmittable: false });
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
