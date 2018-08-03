import { SET_VEHICLES } from '../mutation-types'

const state = {
  vehicles: []
}

const mutations = {
  [SET_VEHICLES] (state, vehicles) {
    state.vehicles = vehicles
  }
}

const actions = { }

const getters = {}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}
