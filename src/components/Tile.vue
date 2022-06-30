<template>
  <div :id="id" :class="['button', 'tile', tileClass]" @click="select()">{{ value }}</div>
</template>

<script>
import EntryHelper from '../config/EntryHelper.js';

export default {
  name: 'Tile',
  props: {
    id: {
      type: String,
      required: true,
    },
    correctWord: {
      type: String,
      default: '',
    },
    correctLetter: {
      type: String,
      default: '',
    },
    indexLetter: {
      type: Number,
      default: 0,
    },
    locked: {
      type: Boolean,
    },
  },
  data: () => ({
    value: '',
    tileClass: '',
    selectedId: '',
  }),
  methods: {
    select() {
      if (this.locked) {
        return;
      }

      this.emitter.emit('tile-selected', this.id);
    },
    onKeydown(key) {
      if (this.locked) {
        return;
      }
      
      if (this.selectedId !== this.id) {
        return;
      }

      if (key === 'BACKSPACE') {
        this.value = '';
        this.$emit('remove');
        return;
      }

      if (key === 'ENTER') {
        this.$emit('next');
        return;
      }

      this.value = key;
      this.$emit('add', this.value);
    },
    onSelected(id) {
      if (this.locked) {
        return;
      }

      this.selectedId = id;
      if (this.id === id) {
        this.tileClass = 'tile-selected';
        return;
      }
      
      this.tileClass = '';
    },
    checkValue(informedWord) {
      if (this.locked) {
        return;
      }

      if (EntryHelper.equalsEvenWithAccentuation(this.value, this.correctLetter)) {
        this.tileClass = 'tile-correct';
        this.emitter.emit('keyboard-mark-correct-key', this.value);
        this.value = this.correctLetter;

        return;
      }

      if (!this.correctWord.includes(this.value) && !EntryHelper.removeAccentuation(this.correctWord).includes(this.value)) {
        this.tileClass = '';
        this.emitter.emit('keyboard-mark-incorrect-key', this.value);
        return;
      }

      if (this.indexLetter === 0 ||
          this.getCountOfSameWord() > this.getCountOfSameWordToStart(informedWord)) {
        this.tileClass = 'tile-almost';
        this.emitter.emit('keyboard-mark-almost-key', this.value);
        return;
      }
      
      this.tileClass = '';
      this.emitter.emit('keyboard-mark-incorrect-key', this.value);
    },
    getCountOfSameWord() {
      var count = 0;
      for (let x = 0; x < this.correctWord.length; x++) {
        if (this.correctWord[x] === this.value) {
          count++;
        }
      }

      return count;
    },
    getCountOfSameWordToStart(informedWord) {
      var count = 0;
      for (var x = this.indexLetter - 1; x >= 0; x--) {
        if (informedWord[x] === this.value) {
          count++;
        }
      }

      return count;
    },
  },
  created() {
    this.emitter.on('keydown', key => {
      this.onKeydown(key);
    });

    this.emitter.on('tile-selected', id => {
      this.onSelected(id);
    });

    this.emitter.on('tile-check-value', (informedWord) => {
      this.checkValue(informedWord);
    });
  },
};
</script>

<style scoped>
.tile {
  width: 8vmin;
  height: 8vmin;
  border-radius: 10%;
  background-color: #595959;
  color: #ffffff;
  font-size: 3vmin;
}

.tile-correct {
  background-color: #26bd46 !important;
}

.tile-almost {
  background-color: #dad728 !important;
}

.tile-selected {
  background-color: #a0a0a0 !important;
}
</style>