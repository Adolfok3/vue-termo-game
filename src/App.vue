<template>
  <Game></Game>
</template>

<script>
import Game from './components/Game.vue';
import EntryHelper from './config/EntryHelper.js';

export default {
  name: 'App',
  components: {
    Game,
  },
  created() {
    window.addEventListener('keydown', e => {
      var key = e.key.toUpperCase();
      if (!EntryHelper.isValid(key)) {
        return;
      }

      key = EntryHelper.getEntryWithoutAccentuation(key);
      this.emitter.emit('keydown', key);
    });
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');

body {
  background-color: #272727;
  margin: 0px;
  padding: 0px;
  font-family: 'Fredoka One', cursive;
}

.subtitle-text {
  color: white;
  font-size: 1vw !important;
}

.button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.no-background {
  background-color: transparent;
}
</style>
