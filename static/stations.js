import L from 'leaflet'
import { getStationInfo, getStationStatus } from './api'

const RETURN_MSG = 'bike returned to station'
const CHECKOUT_MSG = 'bike checked out from station'

function setIcon(isUpdate) {
  let html = '<div class="custom-circle">'
  if (isUpdate) {
    html += '<div class="ripple one"></div>'
    html += '<div class="ripple two"></div>'
    html += '<div class="ripple three"></div>'
  }
  html += '</div>'
  return L.divIcon({
    className: 'custom-wrapper',
    html,
  })
}

export async function setupStations(city) {
  const stationInfo = await getStationInfo(city)
  const stationStatus = await getStationStatus(city)
  const stationData = stationInfo.map((station) => {
    const status = stationStatus.find(
      (status) => status.station_id === station.station_id
    )
    return {
      id: station.station_id,
      name: station.name.toLowerCase(),
      latLon: [station.lat, station.lon],
      capacity: station.capacity,
      numBikesAvailable: status.num_bikes_available,
      icon: setIcon(false),
    }
  })
  return stationData
}

export async function getUpdates(city, stations) {
  const stationStatus = await getStationStatus(city)
  const updates = []
  for (const station of stations) {
    const status = stationStatus.find((x) => x.station_id === station.id)
    if (station.numBikesAvailable !== status.num_bikes_available) {
      const message =
        station.numBikesAvailable < status.num_bikes_available
          ? RETURN_MSG
          : CHECKOUT_MSG
      const update = {
        lineOne: station.name,
        lineTwo: `${message}`,
        lineThree: `${status.num_bikes_available}/${station.capacity} bikes available`,
        numBikesAvailable: status.num_bikes_available,
        id: station.id,
        icon: setIcon(true),
      }
      updates.push(update)
    }
  }
  return updates
}

// bug: issue with notifications duplicating and showing up more than once.
// usually only happens within 2 or 3 places of each other. 15 places should
// clear the screen.
// solution?:
//   concat new updates to the front of updates
//   while(updates.length > 0)
//     addNotification(updates[updates.length-1])
//     updates.pop()
export function isDuplicateUpdate(update, notifications) {
  const recentNotifications = notifications.slice(0, 15)
  const isDuplicate = recentNotifications.find(
    (x) =>
      x.id === update.id && x.numBikesAvailable === update.numBikesAvailable
  )
  return isDuplicate
}
