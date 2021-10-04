const getUrl = ({ store }) => (alias = '') => {
  const { languages } = store.state
  const { currentLanguage } = store.getters

  let subfolder = !currentLanguage || currentLanguage === languages[0] ? '' : currentLanguage
  subfolder = subfolder.length > 0 ? `/${subfolder}/` : '/'

  return `${subfolder}${alias}`
}

export default ({ app }, inject) => {
  inject('URL', getUrl(app))
}
