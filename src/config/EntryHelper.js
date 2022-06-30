const acceptedEntries = [
  'A',
  'Ã',
  'Á',
  'À',
  'Â',
  'B',
  'C',
  'D',
  'E',
  'Ê',
  'É',
  'È',
  'F',
  'G',
  'H',
  'I',
  'Í',
  'Ì',
  'Î',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'Ô',
  'Ó',
  'Ò',
  'Õ',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'Ú',
  'Ù',
  'Û',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  'BACKSPACE',
  'ENTER',
];

const replacementEntries = {
  'A': 'A',
  'À': 'A',
  'Á': 'A',
  'Ã': 'A',
  'Â': 'A',
  'E': 'E',
  'É': 'E',
  'È': 'E',
  'Ê': 'E',
  'I': 'I',
  'Í': 'I',
  'Ì': 'I',
  'Î': 'I',
  'O': 'O',
  'Ò': 'O',
  'Ó': 'O',
  'Õ': 'O',
  'Ô': 'O',
  'U': 'U',
  'Ù': 'U',
  'Ú': 'U',
  'Û': 'U',
  'Ç': 'C',
  'C': 'C',
}

class EntryHelper {
  equalsEvenWithAccentuation(entry, correctEntry) {
    const entries = this.getKeysByValue(entry);
    if (entries.length == 0) {
      return entry === correctEntry;
    }

    return entries.indexOf(correctEntry) > -1;
  }

  getEntryWithoutAccentuation(entry) {
    if (replacementEntries.hasOwnProperty(entry)) {
      return replacementEntries[entry];
    }

    return entry;
  }

  removeAccentuation(word) {
    const result = [];
    for (let index = 0; index < word.length; index++) {
      result.push(this.getEntryWithoutAccentuation(word[index]));
    }
    
    return result.join('');
  }

  getKeysByValue(value) {
    var result = [];
    var keys = Object.keys(replacementEntries);
    keys.forEach(key => {
      if (replacementEntries[key] === value) {
        result.push(key);
      }
    });

    return result;
  }

  isValid(key) {
    return acceptedEntries.includes(key);
  }
};

export default new EntryHelper();