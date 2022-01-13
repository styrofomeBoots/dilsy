<template>
  <div style="height: 100vh;">
    <l-map
      style="height: 100%; width: 100%"
      :zoom="zoom"
      :center="center"
      v-if="isDataReady"
    >
      <l-tile-layer :url="mapUrl"></l-tile-layer>
      <l-marker
        v-for="marker in markers"
        :key="marker.id"
        :lat-lng="marker.latLon"
        :icon="getIcon(marker.showRipple)"
      >
        <l-tooltip>
          <div>latLon: {{ marker.latLon }}</div>
          <div>note: {{ marker.note }}</div>
        </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LTooltip } from 'vue2-leaflet'
import grid from '../modules/grid'

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip
  },
  data() {
    return {
      isDataReady: false,
      mapUrl: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      zoom: 13.1,
      center: [],
      markers: [],
      radius: 3,
      color: 'gray',
      intervalId: null
    }
  },
  methods: {
    getIcon(showRipple) {
      let html = '<div class="custom-circle">'
      if (showRipple) {
        html += '<div class="ripple one"></div>'
        html += '<div class="ripple two"></div>'
        html += '<div class="ripple three"></div>'
      }
      html += '</div>'
      return L.divIcon({
        className: 'custom-wrapper',
        html: html
      })
    }
  },
  async created() {
    let setup = await grid.setUp()
    this.center = setup.center
    this.markers = setup.markers
    this.isDataReady = setup.isDataReady
  }
}
</script>
<style>
.custom-wrapper {
  position: absolute;
  background-color: transparent;
}

.custom-circle {
  position: relative;
  background-color: gray;
  height: 5px;
  width: 5px;
  border-radius: 50%;
}

.red-circle {
  background-color: red;
  height: 20px;
  width: 20px;
  border-radius: 50%;
}

.ripple {
  position: absolute;
  border: 4px solid gray;
  opacity: 0;
  border-radius: 100%;
  animation: ripple 3s cubic-bezier(0, 0.1, 0.7, 1) 1;
}

.three {
  animation-delay: -1s;
}

.two {
  animation-delay: -0.5s;
}

@keyframes ripple {
  0% {
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -75px;
    left: -75px;
    width: 150px;
    height: 150px;
    opacity: 0;
  }
}
</style>
