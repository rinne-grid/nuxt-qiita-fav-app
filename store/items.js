export const state = () => {
  itemsSource: null
}

export const getters = {
  getItemsSource (state) {
    return state.itemsSource
  }
}

export const actions = {
  setItemsSource({commit}, payload) {
    commit('setItemsSource', payload)
  }
}

export const mutations = {
  setItemsSource(state, payload) {
    state.itemsSource = payload
  }
}
