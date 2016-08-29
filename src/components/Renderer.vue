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

        const renderer = new Renderer(canvas.width, canvas.height);
        renderer.render((pixels) => {
          const image = new ImageData(pixels, renderer.width, renderer.height);
          Promise.resolve(createImageBitmap(image))
                 .then(bitmap => context.drawImage(bitmap, 0, 0, canvas.width, canvas.height));
        });
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
