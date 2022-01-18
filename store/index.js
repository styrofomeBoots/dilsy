import { playTone } from '../static/tone'
import { setupStations, getUpdates, isDuplicateUpdate } from '~/static/stations'

const state = () => ({
  isDataReady: false, // notifies map to allow render
  isSoundEnabled: false, // has user enabled sound?
  intervalId: null, // setInterval instance
  stations: [], // all bike stations for selected city. map marker data
  notifications: [], // shows in nav drawer.  most recent first
  updates: [], // updates that are current running
  updateQueue: [], // queued updates to be added to updates[] when it is finished running
  selectedCity: {}, // user selected city.  loads as dc
  // all cities with bikeshare feeds
  sortAlgs: ['location', 'count'],
  selectedSortAlg: 'count',
  scales: ['major', 'pentatonic'],
  selectedScale: 'pentatonic',
  cities: [
    {
      name: 'bay area', // 0
      api: 'baywheels',
      zoom: 12.5,
      center: [37.790515, -122.364474],
    },
    {
      name: 'chicago', // 1
      api: 'divvybikes',
      zoom: 13.1,
      center: [41.876942, -87.629227],
    },
    {
      name: 'columbus', // 2
      api: 'cogobikeshare',
      zoom: 13.1,
      center: [39.959423, -82.999207],
    },
    {
      name: 'washington dc', // 3
      api: 'capitalbikeshare',
      zoom: 13.1,
      center: [38.892112, -77.036548],
    },
    {
      name: 'minneapolis', // 4
      api: 'niceridemn',
      zoom: 13.1,
      center: [44.969344, -93.269558],
    },
    {
      name: 'new york city', // 5
      api: 'citibikenyc',
      zoom: 13.1,
      center: [40.707783, -74.007902],
    },
    {
      name: 'portland', // 6
      api: 'biketownpdx',
      mapZoom: 13.1,
      mapCenter: [45.512515, -122.679884],
    },
  ],
})

const getters = {
  isDataReady: (state) => state.isDataReady,
  stations: (state) => state.stations,
  notifications: (state) => state.notifications,
  cities: (state) =>
    state.cities.map((city, index) => ({ city: city.name, value: index })),
  zoom: (state) => state.selectedCity.zoom,
  center: (state) => state.selectedCity.center,
}

const actions = {
  resetCityData: ({ commit }) => commit('RESET_CITY_DATA'),

  async selectCity({ commit, state, dispatch }, selection) {
    let city = state.cities[selection]
    // if selection is null will choose randomly
    if (!city) {
      const rando = Math.floor(Math.random() * state.cities.length - 1) + 1
      city = state.cities[rando]
    }
    commit('RESET_CITY_DATA')
    commit('SELECT_CITY', city)
    const stations = await setupStations(
      state.selectedCity.api,
      state.selectedSortAlg,
      state.selectedScale
    )
    commit('SET_STATIONS', stations)
    commit(
      'SET_INTERVAL',
      setInterval(async () => {
        await dispatch('updateStations')
      }, 2000)
    )
  },

  async updateStations({ commit, state, dispatch }) {
    const updates = await getUpdates(state.selectedCity.api, state.stations)
    commit('QUEUE_UPDATES', updates)
    if (state.updates.length === 0 && state.updateQueue.length > 0) {
      commit('ADD_UPDATES')
      await dispatch('runUpdates')
    }
  },

  async runUpdates({ commit, state }) {
    for (const update of state.updates) {
      // ---------------------------------------------------------
      // temp solution to fix repeating recent notifications
      if (isDuplicateUpdate(update, state.notifications)) continue
      // ---------------------------------------------------------
      await playTone(update)
      commit('RUN_UPDATE', update)
      const ms = Math.floor(Math.random() * 3000) + 500
      await new Promise((resolve) => setTimeout(resolve, ms))
    }
    commit('RESET_UPDATES')
  },
}

const mutations = {
  RESET_CITY_DATA(state) {
    clearInterval(state.intervalId)
    state.isDataReady = false
    state.selectedCity = null
    state.stations = []
    state.notifications = []
    state.updates = []
    state.updateQueue = []
  },
  SELECT_CITY: (state, city) => (state.selectedCity = city),
  SET_STATIONS: (state, stations) => {
    state.stations = stations
    state.isDataReady = true
  },
  SET_INTERVAL: (state, interval) => (state.intervalId = interval),
  QUEUE_UPDATES: (state, updates) => {
    state.updateQueue = state.updateQueue.concat(updates)
  },
  ADD_UPDATES: (state) => {
    state.updates = state.updates.concat(state.updateQueue)
    state.updateQueue = []
  },
  RUN_UPDATE: (state, update) => {
    const station = state.stations.find((station) => station.id === update.id)
    station.numBikesAvailable = update.numBikesAvailable
    station.lastUpdate = update.currentUpdate
    station.icon = update.icon
    state.notifications.unshift(update)
    if (state.notifications.length === 50) state.notifications.pop()
  },
  RESET_UPDATES: (state) => (state.updates = []),
}

export default {
  state,
  getters,
  actions,
  mutations,
}
