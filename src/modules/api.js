import axios from "axios";

const URL_INFO =
  "https://gbfs.capitalbikeshare.com/gbfs/en/station_information.json";
const URL_STATUS =
  "https://gbfs.capitalbikeshare.com/gbfs/en/station_status.json";

export async function getStationInfo() {
  const response = await axios.get(URL_INFO);
  return response.data.data.stations;
}

export async function getStationStatus() {
  const response = await axios.get(URL_STATUS);
  return response.data.data.stations;
}
