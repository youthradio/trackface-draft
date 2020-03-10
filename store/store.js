import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        tool: ''
    },
    mutations: {
        change(state, tool) {
            state.tool = tool
        }
    }

})
