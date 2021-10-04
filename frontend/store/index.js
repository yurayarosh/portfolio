export const state = () => ({
  isLoaded: false,
  navigation: [],
})

export const mutations = {
  init(state) {
    state.isLoaded = true
  },
  setNavigation(state, data) {
    state.navigation = data
  },
}

export const actions = {
  async fetchCollection(ctx, { collection, filter, id }) {
    let filterString = ''

    if (filter) {
      filterString = '?'

      Object.keys(filter).forEach((key, i) => {
        filterString += `${key}=${Object.values(filter)[i]}&`
      })

      filterString = filterString.slice(0, -1) // Remove last & sign.
    }

    if (id) {
      filterString = `/${id}`
    }

    try {
      const response = await fetch(`${process.env.BASE_URL_BACK}/${collection}${filterString}`)

      return await response.json()
    } catch (error) {
      throw new Error(`Fetching "${collection}" collection error.`, error)
    }
  },
}

export const getters = {
  isLoaded: ({ isLoaded }) => isLoaded,
}
