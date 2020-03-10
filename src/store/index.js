import Vue from "vue";
import Vuex from "vuex";
import data from "./data";

Vue.use(Vuex);

const state = {
  selectedTool: null,
  toolsData: null
};
const actions = {
  loadStore({ commit }) {
    commit("LOAD_STORE");
  }
};
const mutations = {
  async LOAD_STORE(state) {
    state.toolsData = data.toolsData.slice();
    state.referenceImages = data.referenceImages.slice();
    state.selectedTool = state.toolsData[0];
  }
};
export default new Vuex.Store({
  mutations,
  state,
  actions
});
