<template>
  <div :class="['key', 'button', disable ? 'no-hover' : '']" :style="[keyStyle, backgroundStyle]" @click="keyPressed()">
    <span class="key-text no-background" :style="keyTextStyle">{{ value }}</span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: 'A'
    },
    margin: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 8.5,
    },
    layout: {
      type: String,
      default: 'unverified',
    },
    emitValue: {
      type: String
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    keyStyle() {
      return `width: ${this.width}vmin;`;
    },
    backgroundStyle() {
      return this.keyClasses.find(f => f.layout === this.layout).buttonStyle;
    },
    keyTextStyle() {
      return this.keyClasses.find(f => f.layout === this.layout).textStyle;
    },
  },
  methods: {
    keyPressed() {
      if (this.disable) {
        return;
      }
      
      const value = this.emitValue || this.value;
      this.emitter.emit('keydown', value);
    },
  },
  data: () => ({
    keyClasses: [
      {
        layout: 'unverified',
        buttonStyle: 'background-color: #4e4e4e34;',
        textStyle: 'color: white;'
      },
      {
        layout: 'exists',
        buttonStyle: 'background-color: #dad728;',
        textStyle: 'color: white;'
      },
      {
        layout: 'correct',
        buttonStyle: 'background-color: #26bd46;',
        textStyle: 'color: white;'
      },
      {
        layout: 'nonexistent',
        buttonStyle: 'background-color: transparent',
        textStyle: 'color: #ffffff34;'
      },
    ]
  }),
};
</script>

<style scoped>
.key {
  height: 6vh;
  max-width: 280px;
  border-radius: 5%;
}

.key-text {
  font-size: 3vmin;
}
.no-hover {
  cursor: auto;
}
</style>