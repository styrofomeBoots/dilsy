<template>
  <l-map
    v-if="isDataReady"
    style="height: 100%; width: 100%"
    :zoom="zoom"
    :center="center"
    :options="{ zoomControl: false, attributionControl: false }"
  >
    <l-tile-layer :url="mapUrl" :attribution="''"></l-tile-layer>
    <MapMarker
      v-for="(station, index) in stations"
      :key="index"
      :station="station"
    />
    <l-control-attribution
      position="bottomright"
      prefix=""
    ></l-control-attribution>
  </l-map>
</template>

<script>
import { mapGetters } from 'vuex'
import { LMap, LTileLayer, LControlAttribution } from 'vue2-leaflet'
import MapMarker from './map/Marker'
export default {
  components: {
    LMap,
    LTileLayer,
    LControlAttribution,
    MapMarker,
  },
  data: () => ({
    // leafletLogo: require('@/assets/imgs/leaflet.svg'),
    // githubLogo: require('@/assets/imgs/github.svg'),
    mapUrl: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  }),
  computed: {
    ...mapGetters(['isDataReady', 'stations', 'zoom', 'center']),
  },
}
</script>

<style>
.vue2leaflet-map {
  z-index: 0;
}

.leaflet-bar a {
  background-color: transparent !important;
  border-bottom: none !important;
}

.leaflet-control-zoom {
  margin-bottom: 0.25rem !important;
  border: none !important;
  opacity: 0.4 !important;
}

.leaflet-control-attribution {
  background-color: transparent !important;
  padding: 0 1rem 0.5rem 0 !important;
}

.attributes {
  display: flex;
  flex-direction: column;
  opacity: 0.3;
}
</style>
