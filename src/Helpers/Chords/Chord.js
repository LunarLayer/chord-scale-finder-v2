import { ChordMaps } from "./ChordMaps";

export class Chord {
  constructor({
    root = "",
    quality = "",
    shortenedQuality = "",
    additionalQuality = "",
    extension = "",
    suspension = "",
    alteration = "",
    alterations = [],
    symbol = "",
    notes = [],
    intervals = [],
    extensions = [],
    modifications = [],
    missingFromSelected = [],
    missingChordIntervals = [],
    isAbstract = false,
    isValid = true,
    isExactMatch = false,
  } = {}) {
    this.root = root;
    this._quality = quality;
    this.shortenedQuality = shortenedQuality;
    this.additionalQuality = additionalQuality;
    this.extension = extension;
    this.suspension = suspension;
    this.alteration = alteration;
    this.alterations = alterations;
    this.symbol = symbol;
    this.notes = notes;
    this.intervals = intervals;
    this.extensions = extensions;
    this.modifications = modifications;
    this.missingFromSelected = missingFromSelected;
    this.missingChordIntervals = missingChordIntervals;
    this.isAbstract = isAbstract;
    this.isValid = isValid;
    this.isExactMatch = isExactMatch;
  }

  get quality() {
    return this._quality;
  }

  set quality(newQuality) {
    this._quality = newQuality;
    this.updateShortenedQuality();
  }

  generateNotes() {
    let notes = [];
    let rootIndex = ChordMaps.notes.indexOf(this.root);
    for (let interval of this.intervals) {
      let current = interval.number + rootIndex;
      while (current >= 12) current -= 12;
      notes.push(ChordMaps.notes[current]);
    }
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

  addAlteration(alteration, intervalNumber) {
    this.alterations.push(alteration);
    this.intervals.push({
      number: intervalNumber,
      isOmittable: false,
      wasAdded: true,
    });
  }

  replaceAlteration(alteration, intervalNumber) {
    // remove interval to be replaced
    this.intervals = this.intervals.filter(
      (interval) =>
        !ChordMaps.similarIntervals[intervalNumber].includes(interval.number)
    );
    this.addAlteration(alteration, intervalNumber);
  }

  changeQuality(quality, intervalNumber) {
    this.quality = quality;
    this.intervals.push({
      number: intervalNumber,
      isOmittable: false,
      wasAdded: true,
    });
  }

  addAdditionalQuality(quality, intervalNumber) {
    this.additionalQuality = quality;
    this.intervals.push({
      number: intervalNumber,
      isOmittable: false,
      wasAdded: true,
    });
  }

  replaceThird(suspension, intervalNumber) {
    this.suspension = suspension;
    this.intervals.push({
      number: intervalNumber,
      isOmittable: false,
      wasAdded: true,
    });
    this.intervals = this.intervals.filter((interval) => interval.number !== 4);
  }

  addExtension(extension, intervalNumber) {
    this.extension = extension;
    this.intervals.push({
      number: intervalNumber,
      isOmittable: false,
      wasAdded: true,
    });
  }

  // possibleChord.canModifySimilar(interval)
  extendOrAlter(interval) {
    if (this.extension === 5) {
      this.isValid = false;
      return;
    }

    switch (interval) {
      case 1:
        if (this.extension >= 9) {
          this.isValid = false;
        } else {
          this.addAlteration("addb9", interval);
        }
        break;

      case 2:
        if (this.isMajor() || this.isDefault()) {
          if (this.missingChordIntervals.includes(4)) {
            this.replaceThird("sus2", interval);
          } else if (this.extension === null) {
            this.addAlteration("add9", interval);
          } else {
            this.isValid = false;
          }
        } else if (this.isMinor() || this.isDim()) {
          this.addAlteration("add9", interval);
        }
        break;

      case 3:
        if (this.extension >= 9) {
          this.isValid = false;
        } else {
          this.addAlteration("add#9", interval);
        }
        break;

      case 4:
        if (this.isMinor() || this.isDim()) {
          this.isValid = false;
        } // always false?
        break;

      case 5:
        if (this.isMajor() || this.isDefault()) {
          if (this.suspension === "sus2") {
            this.suspension = "sus4";
            this.addAlteration("add9", interval);
          } else if (this.missingChordIntervals.includes(4)) {
            this.replaceThird("sus4", interval);
          } else if (this.extension === null || this.extension === 7) {
            // if a third has already been selected
            this.addAlteration("add11", interval);
          } else {
            this.isValid = false;
          }
        }
        break;

      case 6:
        if (this.isDim()) {
          this.isValid = false;
        } else if (this.isAug()) {
          this.addAlteration("add#11", interval);
        } else if (this.missingChordIntervals.includes(7)) {
          this.replaceAlteration("b5", interval);
        } else {
          this.addAlteration("add#11", interval);
        }
        break;

      case 7:
        this.isValid = false;
        break;

      case 8:
        if (this.isAug()) {
          // is this ever used?
          this.isValid = false;
        } else if (this.isDim()) {
          this.addAlteration("addb13", interval);
        } else if (this.missingChordIntervals.includes(7)) {
          this.replaceAlteration("#5", interval);
        } else if (this.hasFifth()) {
          this.addAlteration("b6", interval);
        } else {
          this.addAlteration("addb13", interval);
        }
        break;

      case 9: // 6
        if (this.isDim()) {
          this.isValid = false;
        } else if (this.extension >= 7) {
          this.addAlteration("add13", interval);
        } else {
          this.addExtension(6, interval);
        }
        break;

      case 10:
        if (
          this.extension >= 7 ||
          this.extension === 6 ||
          this.isMajorTriad() ||
          this.isMinorTriad() ||
          this.isAug()
        ) {
          this.isValid = false;
        } else {
          this.addAlteration("b7", interval);
        }
        break;

      case 11: // 7, maj7
        if (this.isMajorTriad()) {
          this.isValid = false;
        } else if (this.isMinorTriad()) {
          this.changeQuality("mMaj7", interval);
        } else if (
          (this.isMinor() && this.extension >= 7) ||
          this.isDefault()
        ) {
          this.addAdditionalQuality(",maj7", interval);
        }
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

    this.missingChordIntervals = missingChordIntervals;
    return missingChordIntervals;
  }

  handleMissingChordIntervals(missingChordIntervals) {
    for (let interval of missingChordIntervals) {
      if (this.isMajor() || this.isDefault()) {
        if (interval === 4) this.no3 = true;
        if (
          interval === 7 &&
          !this.alterations.includes("b5") &&
          !this.alterations.includes("#5")
        )
          this.no5 = true;
      } else if (this.isMinor()) {
        if (interval === 3) this.no3 = true;
        if (
          interval === 7 &&
          !this.alterations.includes("b5") &&
          !this.alterations.includes("#5")
        )
          this.no5 = true;
      } else if (this.isDim()) {
        if (interval === 3) this.no3 = true;
        if (interval === 6) this.no5 = true;
      } else if (this.isAug()) {
        if (interval === 4) this.no3 = true;
        if (interval === 8) this.no5 = true;
      }
    }
  }

  updateShortenedQuality() {
    console.log("shortening");
    let shortenedQuality = "";
    switch (this.quality) {
      case "default":
        shortenedQuality = "";
        break;

      case "major":
        if (
          this.extension === 5 ||
          this.extension === 6 ||
          this.extension === null
        ) {
          shortenedQuality = "";
        } else {
          shortenedQuality = "maj";
        }
        break;

      case "minor":
        shortenedQuality = "min";
        break;

      case "diminished":
        shortenedQuality = "dim";
        break;

      case "augmented":
        shortenedQuality = "aug";
        break;

      case "mMaj7":
        shortenedQuality = "mMaj7";
        break;

      default:
        break;
    }

    this.shortenedQuality = shortenedQuality;
  }

  prepareForDisplay() {
    if (this.no3 && this.suspension !== "sus2" && this.suspension !== "sus4") {
      this.alterations.push("no3");
    }
    if (this.no5) this.alterations.push("no5");

    this.sortAlterations();
    this.updateShortenedQuality();
    this.updateIntervalTypes();

    this.alteration = this.alterations.toString();
    if (this.notes.length === 0) this.notes = this.generateNotes();
  }

  updateIntervalTypes() {
    for (let interval of this.intervals) {
      switch (interval.number) {
        case 0:
          interval.type = "1";
          break;
        case 1:
          interval.type = "b9";
          break;
        case 2:
          if (this.hasThird()) {
            interval.type = "9";
          } else {
            interval.type = "sus2";
          }
          break;
        case 3:
          interval.type = "b3";
          break;
        case 4:
          interval.type = "3";
          break;
        case 5:
          interval.type = "4";
          break;
        case 6:
          interval.type = "b5";
          break;
        case 7:
          interval.type = "5";
          break;
        case 8:
          interval.type = "#5";
          break;
        case 9:
          interval.type = "6";
          break;
        case 10:
          interval.type = "b7";
          break;
        case 11:
          interval.type = "7";
          break;
      }
    }
  }

  hasThird() {
    let hasThird = false;
    for (let interval of this.intervals) {
      if (interval.number === 3 || interval.number === 4) hasThird = true;
    }
    return hasThird;
  }

  sortAlterations() {
    function getAlterationType(alteration) {
      if (alteration.startsWith("add")) {
        return "add";
      } else if (alteration.startsWith("no")) {
        return "no";
      } else if (alteration.includes("b") || alteration.includes("#")) {
        return alteration[0]; // 'b' for flat, '#' for sharp
      } else {
        return ""; // Default for non-standard alterations
      }
    }
    const alterationPriority = {
      b: 1, // Flats
      "#": 1, // Sharps
      add: 2, // Additions
      no: 3, // Omissions
    };

    this.alterations.sort((a, b) => {
      const aType = getAlterationType(a);
      const bType = getAlterationType(b);

      if (alterationPriority[aType] < alterationPriority[bType]) {
        return -1;
      } else if (alterationPriority[aType] > alterationPriority[bType]) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  hasFifth() {
    for (let interval of this.intervals) {
      if (
        interval.number === 6 ||
        interval.number === 7 ||
        interval.number === 8
      )
        return true;
    }
    return false;
  }

  isDefault() {
    return this.quality === "default";
  }

  isMajor() {
    return this.quality === "major";
  }
  isMajorTriad() {
    return (
      this.quality === "major" &&
      this.intervals.filter((interval) => !interval.wasAdded).length === 3
    );
  }

  isMinor() {
    return this.quality === "minor";
  }
  isMinorTriad() {
    return (
      this.quality === "minor" &&
      this.intervals.filter((interval) => !interval.wasAdded).length === 3
    );
  }

  isAug() {
    return this.quality === "augmented";
  }

  isDim() {
    return this.quality === "diminished";
  }
}
