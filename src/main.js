import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import store from './vuex/store';
import { sync } from 'vuex-router-sync';

Vue.use(VueRouter);

const router = new VueRouter();
const Root = Vue.extend(App);

router.map({
  '/': {
    component: App,
  },
});

sync(store, router);
router.start(Root, '#app');
