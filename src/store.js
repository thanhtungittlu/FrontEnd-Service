import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
      url: "http://192.168.101.89:5000/"
    }
  });