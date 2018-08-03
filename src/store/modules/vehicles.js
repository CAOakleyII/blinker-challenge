import { SET_VEHICLES } from '../mutation-types'
import { GET_VEHICLES } from '../action-types'
import 'whatwg-fetch'

const state = {
  vehicles: []
}

const mutations = {
  [SET_VEHICLES] (state, vehicles) {
    state.vehicles = vehicles
  }
}

const actions = {
  [GET_VEHICLES] (context, data) {
    fetch('https://gist.githubusercontent.com/creatifyme/2a334c00a117097bfdb47f031edf292c/raw/efb52ecf1cf92e2261f504ec7639c68b5ff390bd/cars.json')
      .then(resp => {
        if (!resp.ok) {
          throw new Error('Error retrieving cars.json', resp.status, resp.statusText)
        }
        return resp.text()
      })
      .then(json => {
        context.commit(SET_VEHICLES, JSON.parse(json))
      })
      .catch(err => {
        console.error(err)
      })
  }
}

const getters = {}

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}
