export const state = () => ({
  isLoaded: false,
})

export const mutations = {
  init(state) {
    state.isLoaded = true
  },
}

export const getters = {
  isLoaded: ({ isLoaded }) => isLoaded,
}
