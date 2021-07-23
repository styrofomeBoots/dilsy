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
      >
        <l-tooltip>{{ marker.latLong }}</l-tooltip>
      </l-circle-marker>
    </l-map>
  </div>
</template>

<script>
  import { LMap, LTileLayer, LCircleMarker, LTooltip } from 'vue2-leaflet';
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
        radius: 2,
        color: 'gray',
        latMax: 38.943837,
        latMin: 38.843422,
        lonMax: -76.925315,
        lonMin: -77.179832,
        columns: 7, // columns to represent C,D,E,F,G,A,B
        rows: 7, // rows to represent octaves
      };
    },
    methods: {
      zoomUpdated(zoom) {
        this.zoom = zoom;
      },
      centerUpdated(center) {
        this.center = center;
      },
      boundsUpdated(bounds) {
        this.bounds = bounds;
      },
    },
    created() {
      // find center of map
      let centerLat = (this.latMin + this.latMax) / 2;
      let centerLon = (this.lonMin + this.lonMax) / 2;
      this.center = [centerLat, centerLon];
      // get station locations
      axios.get(this.stationInformation).then((data) => {
        data.data.data.stations.forEach((el) => {
          if (
            el.lat >= this.latMin &&
            el.lat <= this.latMax &&
            el.lon >= this.lonMin &&
            el.lon <= this.lonMax
          ) {
            this.markers.push({ id: el.station_id, latLong: [el.lat, el.lon] });
          }
        });
      });
    },
  };
</script>
