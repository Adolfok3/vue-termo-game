<template>
  <div :class="['word', wordClass]">
    <Tile v-for="n in 5" :key="n" :id="`${id}_${n}`" :indexLetter="n-1" :correctWord="correctWord" :correctLetter="correctWord[n-1]" :locked="locked" @next="next()" @add="add(n, $event)" @remove="remove(n)"></Tile>
  </div>
</template>

<script>
import Tile from './Tile.vue';
import WordGenerator from '../config/WordGenerator.js';

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    correctWord: {
      type: String,
      default: ''
    },
    locked: {
      type: Boolean,
    },
  },
  components: {
    Tile,
  },
  methods: {
    next() {
      if (this.word.includes('')) {
        return;
      }

      this.informedWord = this.word.join('');
      if (!WordGenerator.existsWord(this.informedWord)) {
        this.animteHeadShake();
        this.emitter.emit('incorrect-word-show');
        return;
      }

      this.emitter.emit('tile-check-value', this.informedWord);
      this.$emit('next', this.informedWord);

      const nextTile = this.id + 1;
      if (nextTile > 6) {
        return;
      }

      this.selectTile(`${nextTile}_1`);
    },
    add(id, value) {
      this.word[id - 1] = value;

      const next = id + 1;
      if (next >= 6) {
        return;
      }

      const nextTile = `${this.id}_${next}`;
      this.selectTile(nextTile);
    },
    remove(id) {
      this.word[id - 1] = '';

      const previous = id - 1;
      if (previous < 1) {
        return;
      }
      const previousTile = `${this.id}_${previous}`;
      this.selectTile(previousTile);
    },
    selectTile(tile) {
      setTimeout(() => {
        this.emitter.emit('tile-selected', tile);
      }, 1);
    },
    animteHeadShake() {
      this.wordClass = '';
      this.wordClass = 'animate-head-shake';
      this.emitter.emit('alert-show');
      setTimeout(() => {
        this.wordClass = '';
      }, 1500);
    }
  },
  data: () => ({
    word: ['', '', '', '', ''],
    wordClass: '',
    informedWord: '',
  }),
};
</script>

<style scoped>
.word {
  display: flex;
  flex-wrap: nowrap;
  grid-gap: 0.5vh;
}

.animate-head-shake {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
  -webkit-animation-name: headShake;
  animation-name: headShake;
}

@-webkit-keyframes headShake {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }

  6.5% {
    -webkit-transform: translateX(-6px) rotateY(-9deg);
    transform: translateX(-6px) rotateY(-9deg);
  }

  18.5% {
    -webkit-transform: translateX(5px) rotateY(7deg);
    transform: translateX(5px) rotateY(7deg);
  }

  31.5% {
    -webkit-transform: translateX(-3px) rotateY(-5deg);
    transform: translateX(-3px) rotateY(-5deg);
  }

  43.5% {
    -webkit-transform: translateX(2px) rotateY(3deg);
    transform: translateX(2px) rotateY(3deg);
  }

  50% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
@keyframes headShake {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }

  6.5% {
    -webkit-transform: translateX(-6px) rotateY(-9deg);
    transform: translateX(-6px) rotateY(-9deg);
  }

  18.5% {
    -webkit-transform: translateX(5px) rotateY(7deg);
    transform: translateX(5px) rotateY(7deg);
  }

  31.5% {
    -webkit-transform: translateX(-3px) rotateY(-5deg);
    transform: translateX(-3px) rotateY(-5deg);
  }

  43.5% {
    -webkit-transform: translateX(2px) rotateY(3deg);
    transform: translateX(2px) rotateY(3deg);
  }

  50% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}
</style>