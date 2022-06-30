<template>
  <div :class="['game-over', gameOverClass]">
    <div class="game-over-content">
      <div class="game-over-content-title" :style="titleColorStyle">
        <span class="game-over-content-title-text no-background">{{ title }}</span>
      </div>
      <div class="game-over-content-description">{{ description }} <span class="game-over-content-description-text-correct-word">{{ correctWord }}</span></div>
      <div class="game-over-content-button" @click="refresh()">Jogar novamente</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameOver',
  computed: {
    titleColorStyle() {
      return `background-color: ${this.titleColor};`;
    },
  },
  methods: {
    showSuccess(word) {
      this.title = 'Parabéns!';
      this.description = 'Você acertou a palavra';
      this.titleColor = '#26bd46',
      this.correctWord = word;
      this.gameOverClass = 'game-over-show';
    },
    showError(word) {
      this.title = 'Ops!';
      this.description = 'A palavra correta era';
      this.titleColor = '#dad728',
      this.correctWord = word;
      this.gameOverClass = 'game-over-show';
    },
    refresh() {
      window.location.reload();
    },
  },
  data: () => ({
    gameOverClass: '',
    title: '',
    titleColor: '',
    correctWord: '',
    description: '',
  }),
  created() {
    this.emitter.on('game-over-show-success', (word) => {
      this.showSuccess(word);
    });

    this.emitter.on('game-over-show-error', (word) => {
      this.showError(word);
    });
  },
};
</script>

<style scoped>
.game-over {
  display: none;
  position: fixed;
  z-index: 1; 
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto; 
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.game-over-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 400px;
  height: 400px;
  border-radius: 5px;
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
  background-color: #272727;
}

.game-over-content-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 60px;
  border-radius: 5px;
}

.game-over-content-title-text {
  color: white;
  font-size: 25px;
}

.game-over-content-description {
  color: white;
  margin-top: 30px;
}

.game-over-content-description-text-correct-word {
  color: #106ad1;
}

.game-over-content-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
  border-radius: 5px;
  background-color: #2196F3;
  color: white;
  margin-top: 100px;
  cursor: pointer;
}

.game-over-show {
  display: flex !important;
}

@-webkit-keyframes animatetop {
  from {top:-300px; opacity:0} 
  to {top:0; opacity:1}
}

@keyframes animatetop {
  from {top:-300px; opacity:0}
  to {top:0; opacity:1}
}
</style>