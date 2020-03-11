import Vue from "vue";
import Vuex from "vuex";
import data from "./data";

Vue.use(Vuex);

const state = {
  UIState: {
    selectedTool: null,
    selectedReferenceImg: null
  },
  timeline: {
    imageSelect: false,
    draw: false,
    result: false
  },
  toolsData: null,
  referenceImages: null
};
const actions = {
  loadStore({ commit }) {
    commit("LOAD_STORE");
  },
  setUIState({ commit }, newstate) {
    console.log("SSSS", newstate);
    commit("SET_UISTATE", newstate);
  }
};
const mutations = {
  async LOAD_STORE(state) {
    state.toolsData = data.toolsData.slice();
    state.referenceImages = data.referenceImages.slice();
    state.UIState.selectedTool = state.toolsData[0];
    state.UIState.selectedReferenceImg = state.referenceImages[0];
  },
  async SET_UISTATE(state, newstate) {
    state.UIState = Object.assign(state.UIState, newstate);
  }
};
export default new Vuex.Store({
  mutations,
  state,
  actions
});
