<template>
  <div class="title">
    <img height="40" class="github" :src="require('../assets/github.png')" @click="goToVueTermoGameGithub()"/>
    <span class="title-text">Vue Termo Game</span>
    <span class="adolfok3" @click="goToAdolfok3Github()">@Adolfok3</span>
  </div>
</template>

<script>
export default {
  methods: {
    goToAdolfok3Github() {
      window.open('https://github.com/Adolfok3', '_blank')
    },
    goToVueTermoGameGithub() {
      window.open('https://github.com/Adolfok3/vue-termo-game', '_blank')
    },
  },
};
</script>

<style scoped>
.title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title-text {
  color: white;
  font-size: 2.7vmin;
}

.adolfok3 {
  color: white;
  font-size: 1.5vmin;
  cursor: pointer;
}

.github {
  color: white;
  cursor: pointer;
}
</style>