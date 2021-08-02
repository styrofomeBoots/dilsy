<template>
  <div style="height: 100vh;">
    <l-map style="height: 100%; width: 100%" :zoom="zoom" :center="center">
      <l-tile-layer :url="mapUrl"></l-tile-layer>
      <l-circle-marker
        v-for="marker in markers"
        :key="marker.id"
        :radius="radius"
        :color="color"
        :lat-lng="marker.latLong"
        @click="playMarker(marker.note)"
      >
        <l-tooltip>
          <div>latLon: {{ marker.latLong }}</div>
          <div>note: {{ marker.note }}</div>
        </l-tooltip>
      </l-circle-marker>
    </l-map>
  </div>
</template>

<script>
  import { LMap, LTileLayer, LCircleMarker, LTooltip } from 'vue2-leaflet';
  import * as Tone from 'tone';
  import axios from 'axios';

  export default {
    components: {
      LMap,
      LTileLayer,
      LCircleMarker,
      LTooltip,
    },
    data() {
      return {
        stationInformation:
          'https://gbfs.capitalbikeshare.com/gbfs/en/station_information.json',
        stationStatus:
          'https://gbfs.capitalbikeshare.com/gbfs/en/station_status.json',
        mapUrl: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        zoom: 13.1,
        center: [],
        markers: [],
        radius: 4,
        color: 'gray',
        latMax: 38.943837,
        latMin: 38.843422,
        lonMax: -76.925315,
        lonMin: -77.179832,
        notes: [
          { note: 'G', lonValue: null },
          { note: 'A', lonValue: null },
          { note: 'B', lonValue: null },
          { note: 'C', lonValue: null },
          { note: 'D', lonValue: null },
          { note: 'E', lonValue: null },
          { note: 'F', lonValue: null },
        ],
        octaves: [
          { octave: '1', latValue: null },
          { octave: '2', latValue: null },
          { octave: '3', latValue: null },
          { octave: '4', latValue: null },
          { octave: '5', latValue: null },
          { octave: '6', latValue: null },
          { octave: '7', latValue: null },
        ],
      };
    },
    methods: {
      // zoomUpdated(zoom) {
      //   this.zoom = zoom;
      // },
      // centerUpdated(center) {
      //   this.center = center;
      // },
      // boundsUpdated(bounds) {
      //   this.bounds = bounds;
      // },
      findMapCenter() {
        const centerLat = (this.latMin + this.latMax) / 2;
        const centerLon = (this.lonMin + this.lonMax) / 2;
        this.center = [centerLat, centerLon];
      },
      createMusicalGrid() {
        const latGridLength = (this.latMax - this.latMin) / this.octaves.length;
        const lonGridLength = (this.lonMax - this.lonMin) / this.notes.length;
        let latValue = this.latMin;
        let lonValue = this.lonMin;
        this.notes.forEach((el) => {
          el.lonValue = lonValue;
          lonValue += lonGridLength;
        });
        this.octaves.forEach((el) => {
          el.latValue = latValue;
          latValue += latGridLength;
        });
      },
      findNoteAndOctive(lat, lon) {
        const lonNote = this.notes.filter((el) => el.lonValue <= lon);
        const latOctave = this.octaves.filter((el) => el.latValue <= lat);
        return (
          lonNote[lonNote.length - 1]['note'] +
          latOctave[latOctave.length - 1]['octave']
        );
      },
      getandParseStationLocations() {
        axios.get(this.stationInformation).then((data) => {
          data.data.data.stations.forEach((el) => {
            if (
              el.lat >= this.latMin &&
              el.lat <= this.latMax &&
              el.lon >= this.lonMin &&
              el.lon <= this.lonMax
            ) {
              const completeNote = this.findNoteAndOctive(el.lat, el.lon);
              this.markers.push({
                id: el.station_id,
                latLong: [el.lat, el.lon],
                note: completeNote,
              });
            }
          });
        });
      },
      playMarker(note) {
        console.log(note);
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease(note, 1);
      },
    },
    created() {
      this.findMapCenter();
      this.createMusicalGrid();
      this.getandParseStationLocations();
    },
  };
</script>
