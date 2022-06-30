<template>
  <div class="board">
    <Word v-for="n in 6" :key="n" :id="n" :locked="currentLineWord !== n" :correctWord="generatedWord" @next="next($event)"></Word>
  </div>
</template>

<script>
import Word from './Word.vue';
import WordGenerator from '../config/WordGenerator';

export default {
  components: {
    Word,
  },
  data: () => ({
    currentLineWord: 1,
    generatedWord: '',
  }),
  methods: {
    next(word) {
      if (WordGenerator.isEquals(this.generatedWord, word)) {
        this.currentLineWord = 7;
        this.showGameOver('success');
        return;
      }

      this.currentLineWord++;
      if (this.currentLineWord > 6) {
        this.showGameOver('error');
      }
    },
    showGameOver(status) {
      setTimeout(() => {
        this.emitter.emit(`game-over-show-${status}`, this.generatedWord);
      }, 500);
    },
    generateWord() {
      this.generatedWord = WordGenerator.getRandomWord();
      this.emitter.emit('tile-selected', '1_1');
    },
  },
  mounted() {
    this.generateWord();
  },
};
</script>

<style scoped>

.board {
  display: grid;
  grid-gap: 0.5vh;
}
</style>