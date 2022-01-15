import { getStationInfo, getStationStatus } from "./api";

const RETURN_MSG = "bike returned";
const CHECKOUT_MSG = "bike checked out";

export async function setupStationMarkers() {}

export async function setupStations() {
  const stationInfo = await getStationInfo();
  const stationStatus = await getStationStatus();
  const stations = [];
  for (const station of stationInfo) {
    const status = stationStatus.find((x) => x.station_id === x.station_id);
    const data = {
      id: station.station_id,
      name: station.name.toLowerCase(),
      capacity: station.capacity,
      numBikesAvailable: status.num_bikes_available,
    };
    stations.push(data);
  }
  return stations;
}

export async function getUpdates(stations) {
  const stationStatus = await getStationStatus();
  const updatedStations = [];
  const updates = [];
  for (const station of stations) {
    const status = stationStatus.find((x) => x.station_id === station.id);
    if (station.numBikesAvailable !== status.num_bikes_available) {
      const message =
        station.numBikesAvailable < status.num_bikes_available
          ? RETURN_MSG
          : CHECKOUT_MSG;
      const update = {
        lineOne: station.name,
        lineTwo: `${message} ${status.num_bikes_available} available`,
      };
      station.numBikesAvailable = status.num_bikes_available;
      updates.push(update);
    }
    updatedStations.push(station);
  }
  return { updatedStations, updates };
}
