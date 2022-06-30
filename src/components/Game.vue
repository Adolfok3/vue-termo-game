<template>
  <div class="game">
    <Title></Title>
    <Board></Board>
    <Keyboard></Keyboard>
    <GameOver></GameOver>
    <Alert></Alert>
  </div>
</template>

<script>
import Title from './Title.vue';
import Board from './Board.vue';
import Keyboard from './Keyboard.vue';
import GameOver from './GameOver.vue'
import Alert from './Alert.vue'

export default {
  name: 'Game',
  components: {
    Title,
    Board,
    Keyboard,
    GameOver,
    Alert,
  },
};
</script>

<style scoped>
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  row-gap: 12.5vmin;
}
</style>