import Vue from "vue";
import Vuex from "vuex";
import data from "./data";

Vue.use(Vuex);

const state = {
  UIState: {
    selectedColor: null,
    selectedStrokeWeight: null,
    selectedReferenceImg: null,
    selectedAction: null
  },
  progress: null,
  toolsData: null,
  referenceImages: null,
  testResult: {
    loading: null,
    result: null,
    error: null,
    targetImg: null,
    refImg: null
  }
};
const actions = {
  loadStore({ commit }) {
    commit("LOAD_STORE");
  },
  setUIState({ commit }, newstate) {
    commit("SET_UISTATE", newstate);
  },
  setProgressState({ commit }, newstate) {
    commit("SET_PROGSTATE", newstate);
  },
  setResultState({ commit }, newstate) {
    commit("SET_RESULT", newstate);
  }
};
const mutations = {
  async LOAD_STORE(state) {
    state.toolsData = Object.assign({}, data.toolsData);
    state.referenceImages = data.referenceImages.slice();
    state.UIState.selectedAction = "none";
    state.UIState.selectedColor = state.toolsData.colors[0];
    state.UIState.selectedStrokeWeight = state.toolsData.strokeWeight[0];
    state.UIState.selectedReferenceImg = state.referenceImages[0];
    state.progresss = "imageSelection";
    state.testResult.loading = false;
  },
  async SET_UISTATE(state, newstate) {
    state.UIState = Object.assign(state.UIState, newstate);
  },
  async SET_PROGSTATE(state, newstate) {
    state.progress = newstate;
  },
  async SET_RESULT(state, newstate) {
    state.testResult = Object.assign(state.testResult, newstate);
  }
};
export default new Vuex.Store({
  mutations,
  state,
  actions
});
