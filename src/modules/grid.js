// +=============================================================================================+
// |---------------------------------- BIKE GRID FUNCTIONALITY ----------------------------------|
// |---------------------------------------------------------------------------------------------|
// | THIS MODULE HANDLES MARKER MANIPULATION, NOTE AND OCTAVE GRID SETTINGS AND RETRIEVING DATA  |
// | FROM THE BIKE SHARE API.                                                                    |
// +=============================================================================================+
import axios from 'axios'
import tone from './tone'

export default {
  // +=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=+
  // |                                    VARIABLES                                    |
  // +~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~+
  // BIKE SHARE API ENDPOINTS
  STATION_INFO:
    'https://gbfs.capitalbikeshare.com/gbfs/en/station_information.json',
  STATION_STATUS:
    'https://gbfs.capitalbikeshare.com/gbfs/en/station_status.json',

  // MAP DISPLAY CENTER
  CENTER: [38.8936295, -77.0525735],

  // THE NOTES AND OCTAVES THAT ARE MAPPED OUT ONTO THE MAP.
  // NOTES RUN ON THE X AXIS AND OCTAVES RUN ON THE Y AXIS.
  notes: [
    { note: 'G', point: null },
    { note: 'A', point: null },
    { note: 'B', point: null },
    { note: 'C', point: null },
    { note: 'D', point: null },
    { note: 'E', point: null },
    { note: 'F', point: null }
  ],
  octaves: [
    { octave: '1', point: null },
    { octave: '2', point: null },
    { octave: '3', point: null },
    { octave: '4', point: null },
    { octave: '5', point: null },
    { octave: '6', point: null },
    { octave: '7', point: null }
  ],

  stations: [],

  // +=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~+
  // |                                    FUNCTIONS                                     |
  // +~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=+
  // SETUP FUNCTION SHOULD BE CALLED IN THE COMPONENENT DURING CREATION.
  async setUp() {
    const center = this.CENTER
    const markers = this.stations
    await this.setupStations()
    setInterval(this.updateStations, 5000, this.STATION_STATUS, this.stations)
    const isDataReady = true
    return { center, markers, isDataReady }
  },

  // SET THE NOTES AND OCTAVES IN EQUAL GRID AREAS ALONG THE X AND Y AXIS
  setNoteGrid(stations) {
    const latMax = Math.max.apply(
      Math,
      stations.map(x => x.lat)
    )
    const latMin = Math.min.apply(
      Math,
      stations.map(x => x.lat)
    )
    const lonMax = Math.max.apply(
      Math,
      stations.map(x => x.lon)
    )
    const lonMin = Math.min.apply(
      Math,
      stations.map(x => x.lon)
    )
    const latStep = (latMax - latMin) / this.octaves.length
    const lonStep = (lonMax - lonMin) / this.notes.length
    let latValue = latMin
    let lonValue = lonMin
    this.notes.forEach(el => {
      el.point = lonValue
      lonValue += lonStep
    })
    this.octaves.forEach(el => {
      el.point = latValue
      latValue += latStep
    })
  },

  // FIND THE NOTE AND OCTIVE THAT COINCIDES WITH THE MARKER POINTS
  getMarkerNote(lat, lon) {
    let notes = this.notes.filter(el => el.point <= lon)
    let octaves = this.octaves.filter(el => el.point <= lat)
    let note =
      notes[notes.length - 1]['note'] + octaves[octaves.length - 1]['octave']
    return note
  },

  // GET MARKER DATA, FILTER TO MAP BOUNDS, ADD MARKER NOTE, RETURN MARKER ARRAY
  async setupStations() {
    const infoResponse = await axios.get(this.STATION_INFO)
    const statusResponse = await axios.get(this.STATION_STATUS)
    const stationInfo = infoResponse.data.data.stations
    const stationStatus = statusResponse.data.data.stations
    this.setNoteGrid(stationInfo)
    for (const station of stationInfo) {
      const note = this.getMarkerNote(station.lat, station.lon)
      const status = stationStatus.filter(
        status => status.station_id === station.station_id
      )[0]
      const stationData = {
        id: station.station_id,
        latLon: [station.lat, station.lon],
        note: note,
        name: station.name,
        capacity: station.capacity,
        numBikesAvailable: status.num_bikes_available,
        showRipple: false
      }
      this.stations.push(stationData)
    }
  },

  async sleep(max) {},

  async updateStations(STATION_STATUS, stations) {
    const statusResponse = await axios.get(STATION_STATUS)
    const stationStatus = statusResponse.data.data.stations
    for (const station of stations) {
      station.showRipple = false
      const status = stationStatus.filter(
        status => status.station_id === station.id
      )[0]
      if (station.numBikesAvailable !== status.num_bikes_available) {
        const ms = Math.floor(Math.random() * 1500) + 500
        const message =
          station.numBikesAvailable > status.num_bikes_available
            ? 'A bike has been returned.'
            : 'A bike has been checked out.'
        console.log(`UPDATE: ${station.name}`)
        console.log(`${message} ${status.num_bikes_available} available.`)
        console.log(`Note ${station.note} will play in ${ms.toString()} ms.`)
        console.log('')

        await new Promise(resolve => setTimeout(resolve, ms))
        station.numBikesAvailable = status.num_bikes_available
        station.showRipple = true
        await tone.playNote(station.note)
      }
    }
  }
}
