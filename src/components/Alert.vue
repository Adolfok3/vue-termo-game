<template>
  <div :class="['alert', showClass]">
    Palavra inválida
  </div>
</template>

<script>
export default {
  name: 'Alert',
  data: () => ({
    showClass: '',
  }),
  created() {
    this.emitter.on('alert-show', () => {
      this.showClass = 'alert-show';
      setTimeout(() => {
        this.showClass = '';
      }, 2000);
    });
  },
};
</script>

<style scoped>
.alert {
  display: none;
  position: fixed;
  z-index: 1; 
  top: 0;
  height: 3vh;
  width: 22vh;
  margin-top: 5vh;
  background-color: #2196F3;
  color: white;
  border-radius: 3px 3px 3px 3px;
  justify-content: center;
  align-items: center;
  font-size: 2vmin;
}

.alert-show {
  display: flex !important;
}
</style>