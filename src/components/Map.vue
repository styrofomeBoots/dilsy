<template>
  <div style="height: 100vh;">
    <l-map
      style="height: 100%; width: 100%"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-tile-layer :url="url"></l-tile-layer>
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
        url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        zoom: 13.1,
        center: [38.89, -77.03],
        bounds: null,
        stationInformation:
          'https://gbfs.capitalbikeshare.com/gbfs/en/station_information.json',
        stationStatus:
          'https://gbfs.capitalbikeshare.com/gbfs/en/station_status.json',
        markers: [],
        radius: 3,
        color: 'gray',
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
      axios.get(this.stationInformation).then((data) => {
        data.data.data.stations.forEach((el) => {
          this.markers.push({ id: el.station_id, latLong: [el.lat, el.lon] });
        });
      });
    },
  };
</script>
