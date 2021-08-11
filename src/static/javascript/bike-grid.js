// +=============================================================================================+
// |---------------------------------- BIKE GRID FUNCTIONALITY ----------------------------------|
// |---------------------------------------------------------------------------------------------|
// | THIS MODULE HANDLES MARKER MANIPULATION, NOTE AND OCTAVE GRID SETTINGS AND RETRIEVING DATA  |
// | FROM THE BIKE SHARE API.                                                                    |
// +=============================================================================================+
import axios from 'axios'

export default {
  // +=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=+
  // |                                    VARIABLES                                    |
  // +~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~+
  // BIKE SHARE API ENDPOINTS
  STATION_INFO:
    'https://gbfs.capitalbikeshare.com/gbfs/en/station_information.json',
  STATION_STATUS:
    'https://gbfs.capitalbikeshare.com/gbfs/en/station_status.json',

  // MAP DISPLAY BOUNDARIES
  LAT_MAX: 38.943837,
  LAT_MIN: 38.843422,
  LON_MAX: -76.925315,
  LON_MIN: -77.179832,

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

  // +=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~+
  // |                                    FUNCTIONS                                     |
  // +~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=+
  // SETUP FUNCTION SHOULD BE CALLED IN THE COMPONENENT DURING CREATION.
  async setUp() {
    this.setNoteGrid()
    const center = this.getMapCenter()
    const markers = await this.getMarkers()
    const isDataReady = true
    return { center, markers, isDataReady }
  },

  getMapCenter() {
    const LAT_CENTER = (this.LAT_MIN + this.LAT_MAX) / 2
    const LON_CENTER = (this.LON_MIN + this.LON_MAX) / 2
    return [LAT_CENTER, LON_CENTER]
  },

  // SET THE NOTES AND OCTAVES IN EQUAL GRID AREAS ALONG THE X AND Y AXIS
  setNoteGrid() {
    const latStep = (this.LAT_MAX - this.LAT_MIN) / this.octaves.length
    const lonStep = (this.LON_MAX - this.LON_MIN) / this.notes.length
    let latValue = this.LAT_MIN
    let lonValue = this.LON_MIN
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
  async getMarkers() {
    let markers = []
    let data = await axios.get(this.STATION_INFO)
    let stations = data.data.data.stations
    stations.forEach(el => {
      if (
        el.lat >= this.LAT_MIN &&
        el.lat <= this.LAT_MAX &&
        el.lon >= this.LON_MIN &&
        el.lon <= this.LON_MAX
      ) {
        let note = this.getMarkerNote(el.lat, el.lon)
        markers.push({
          id: el.station_id,
          latLon: [el.lat, el.lon],
          note: note
        })
      }
    })
    return markers
  }
}
