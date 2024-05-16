export class Chord {
  constructor({
    rootNote = "",
    symbol = "",
    notes = [],
    intervals = [],
    type = "",
    extensions = [],
    missingIntervals = [],
  } = {}) {
    this.rootNote = rootNote;
    this.symbol = symbol;
    this.notes = notes;
    this.intervals = intervals;
    this.type = type;
    this.extensions = extensions;
    this.missingIntervals = missingIntervals;
  }

  isAug() {
    return this.intervals.includes(8);
  }

  isDim() {
    return this.intervals.includes(6);
  }

  hasFifth() {
    if (
      this.intervals.includes(6) ||
      this.intervals.includes(7) ||
      this.intervals.includes(8)
    ) {
      return true;
    } else {
      return false;
    }
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
        if ()
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

  hasSimilarInterval(zeroBasedInterval) {
    // add support for other similar intervals when needed
    switch (zeroBasedInterval) {
      case 6:
      case 7:
      case 8:
        return this.hasFifth();

      default:
        return false;
    }
  }

  alterSimilarIntervalTo(newInterval) {
    switch (newInterval) {
      case 6:
      case 7:
      case 8:
        return this.hasFifth();

      default:
        return false;
    }
  }

  chordSymbol() {}

  getMissingIntervals(selectedIntervals) {
    let missingIntervals = [];
    let biggestArr, smallestArr;

    if (this.intervals.length > selectedIntervals.length) {
      biggestArr = this.intervals;
      smallestArr = selectedIntervals;
    } else {
      biggestArr = selectedIntervals;
      smallestArr = this.intervals;
    }

    for (let interval of biggestArr) {
      if (!smallestArr.includes(interval)) {
        missingIntervals.push(interval);
      }
    }
    this.missingIntervals = missingIntervals;
    return missingIntervals;
  }

  // Add other methods as needed
}
