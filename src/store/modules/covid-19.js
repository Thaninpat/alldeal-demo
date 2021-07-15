import axios from 'axios'

const covid = {
  // namespaced: true,
  state: {
    covidData: [],
  },
  mutations: {
    GET_COVID(state, covidData) {
      state.covidData = covidData
    },
  },

  actions: {
    async getCovid({ commit }) {
      try {
        const { data } = await axios.get(
          'https://covid19.th-stat.com/json/covid19v2/getTimeline.json'
        )
        commit('GET_COVID', data)
      } catch (error) {
        console.error(error)
      }
    },
  },

  getters: {
    covidData(state) {
      return state.covidData
    },
  },
}
export default covid
