import { ChordMaps } from "./ChordMaps";

export class Chord {
  constructor({
    rootNote = "",
    symbol = "",
    notes = [],
    intervals = [],
    type = "",
    alterations = [],
    missingIntervals = [],
    isAbstract = false,
  } = {}) {
    this.rootNote = rootNote;
    this.symbol = symbol;
    this.notes = notes;
    this.intervals = intervals;
    this.type = type;
    this.alterations = alterations;
    this.missingIntervals = missingIntervals;
    this.isAbstract = isAbstract;
  }

  intervalsMatchExactly(selectedIntervals) {
    return (
      this.intervals.length === selectedIntervals.length &&
      this.intervals.every((interval) =>
        selectedIntervals.includes(interval.number)
      )
    );
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

  alterSimilar(newInterval) {
    console.log("altersimilar");
    // remove similar interval first
    this.intervals = this.intervals.filter(
      (interval) =>
        !ChordMaps.similarIntervals[newInterval].includes(interval.number)
    );

    // replace it with newInterval
    this.intervals.push({ number: newInterval, isOmittable: false });

    // add alteration to alterations array
    this.alterations.push(ChordMaps.alterChords[newInterval]);
  }

  canAlterSimilar(interval) {
    return this.intervals.some(
      (intervalObj) =>
        ChordMaps.similarIntervals[interval].includes(intervalObj.number) &&
        intervalObj.isOmittable
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

    for (let interval of selectedIntervals) {
      if (!chordIntervalNumbers.includes(interval)) {
        missingIntervals.push(interval);
      }
    }

    this.missingIntervals = missingIntervals.length;
    return missingIntervals;
  }
}
