export const state = () => ({
  isLoading: false,
})

export const mutations = {
  load(state) {
    state.isLoading = true
  },
  loaded(state) {
    state.isLoading = false
  },
  // open(state) {
  //   state.isOpen = true
  // },
  // close(state) {
  //   state.isOpen = false
  // },
}

export const getters = {
  isLoading: ({ isLoading }) => isLoading,
}
