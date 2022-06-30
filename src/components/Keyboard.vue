<template>
  <div class="keyboard">
    <div class="keyboard-line" v-for="line in lines" :key="line.key">
      <Key v-for="key in line.keys" :key="key.value" :value="key.value" :width="key.width" :margin="key.margin" :layout="key.layout" :emitValue="key.emitValue" :disable="key.disable"></Key>
    </div>
  </div>
</template>

<script>
import Key from './Key.vue';
import Keys from '../config/KeyboardKeys.js';

export default {
  name: 'App',
  components: {
    Key,
  },
  methods: {
    CheckCorrectKey(key) {
      var item = this.getItemInKeys(key);
      item.layout = 'correct';
    },
    CheckAlmostKey(key) {
      var item = this.getItemInKeys(key);
      item.layout = 'exists';
    },
    DisableKey(key) {
      var item = this.getItemInKeys(key);
      item.layout = 'nonexistent';
      item.disable = true;
    },
    getItemInKeys(key) {
      for (let x = 0; x < this.lines.length; x++) {
        for (let y = 0; y < this.lines[x].keys.length; y++) {
          const item = this.lines[x].keys[y];
          if (item.value === key) {
            return this.lines[x].keys[y];
          }
        }
      }
    }
  },
  data: () => ({
    lines: Keys,
  }),
  created() {
    this.emitter.on('keyboard-mark-correct-key', (key) => {
      this.CheckCorrectKey(key);
    });
    this.emitter.on('keyboard-mark-almost-key', (key) => {
      this.CheckAlmostKey(key);
    });
    this.emitter.on('keyboard-mark-incorrect-key', (key) => {
      this.DisableKey(key);
    });
  },
};
</script>

<style scoped>
.keyboard {
  width: 100%;
  display: grid;
  grid-gap: 0.5vh;
}

.keyboard-line {
  display: flex;
  flex-direction: row;
  justify-content: center;
  grid-gap: 0.5vh;
}
</style>