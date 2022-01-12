<template>
  <div style="height: 100vh;">
    <l-map
      style="height: 100%; width: 100%"
      :zoom="zoom"
      :center="center"
      v-if="isDataReady"
    >
      <l-tile-layer :url="mapUrl"></l-tile-layer>
      <l-circle-marker
        v-for="marker in markers"
        :key="marker.id"
        :radius="radius"
        :color="color"
        :lat-lng="marker.latLon"
      >
        <l-tooltip>
          <div>latLon: {{ marker.latLon }}</div>
          <div>note: {{ marker.note }}</div>
        </l-tooltip>
      </l-circle-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LCircleMarker, LTooltip } from 'vue2-leaflet'
import grid from '../modules/grid'

export default {
  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LTooltip
  },
  data() {
    return {
      isDataReady: false,
      mapUrl: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      zoom: 13.1,
      center: [],
      markers: [],
      radius: 1,
      color: 'gray',
      intervalId: null
    }
  },
  methods: {},
  async created() {
    let setup = await grid.setUp()
    this.center = setup.center
    this.markers = setup.markers
    this.isDataReady = setup.isDataReady
  }
}
</script>
