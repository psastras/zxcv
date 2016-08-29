<template>
  <canvas v-el:canvas>
  </canvas>
  <button type="button" class="btn btn-primary" v-on:click="render()">Render</button>
</template>

<script>
  import Renderer from '../lib/renderer';

  export default {
    methods: {
      render() {
        const canvas = this.$els.canvas;
        const context = canvas.getContext('2d');

        const renderer = new Renderer(300, 200);
        renderer.render();
        context.putImageData(new ImageData(renderer.pixels, renderer.width, renderer.height), 0, 0);
      },
    },
  };
</script>

<style scoped>
  canvas {
    background: #000000;
    width: 100%;
    margin: 1em 0em;
  }
</style>
