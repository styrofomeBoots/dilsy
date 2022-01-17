import axios from 'axios'

export async function getStationInfo(city) {
  const response = await axios.get(
    `https://gbfs.${city}.com/gbfs/en/station_information.json`
  )
  return response.data.data.stations
}

export async function getStationStatus(city) {
  const response = await axios.get(
    `https://gbfs.${city}.com/gbfs/en/station_status.json`
  )
  return response.data.data.stations
}
