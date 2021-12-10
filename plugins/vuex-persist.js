import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    key: 'simotor',
    storage: localStorage
  }).plugin(store);
}