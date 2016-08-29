<template>
  <div class="container">
    <h1>zxcv <small>renderer</small></h1>
    <p>
      A test renderer using Javascript web workers.
    </p>
    <hr />
    <renderer></renderer>
 </div>
</template>

<script>
  import Renderer from './components/Renderer';
  import store from './vuex/store';

  export default {
    store,
    components: {
      Renderer,
    },
  };
</script>

<style lang="sass">
  $icon-font-path: "../node_modules/bootstrap-sass/assets/fonts/bootstrap/";
  @import "./scss/_variables.scss";
  @import "../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss";
</style>
