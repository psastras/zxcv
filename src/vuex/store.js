import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/logger';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);
Vue.config.debug = debug;


const state = {
  is_render: false,
};

const mutations = {
  RENDER(state) {
    state.is_render = true;
  },
};

export default new Vuex.Store({
  state,
  mutations,
  strict: debug,
  middlewares: debug ? [createLogger()] : [],
});
