import Vue from 'vue'
import Vuex from 'vuex'
import vehicles from './modules/vehicles'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    vehicles
  },
  strict: debug
})
