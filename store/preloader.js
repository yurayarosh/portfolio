export const state = () => ({
  isLoading: false,
})

export const mutations = {
  start(state) {
    state.isLoading = true
  },
  finish(state) {
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
