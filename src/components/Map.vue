<template>
  <l-map
    style="height: 100%; width: 100%"
    :zoom="zoom"
    :center="center"
    v-if="isDataReady"
    :options="{ zoomControl: false, attributionControl: false }"
  >
    <l-tile-layer :url="mapUrl" :attribution="''"></l-tile-layer>
    <MapMarker
      v-for="(station, index) in stations"
      :station="station"
      :key="index"
    />
    <l-control-attribution
      position="bottomright"
      prefix=""
    ></l-control-attribution>
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LControlAttribution } from "vue2-leaflet";
import MapMarker from "./MapMarker";
export default {
  props: ["stations"],
  components: {
    LMap,
    LTileLayer,
    LControlAttribution,
    MapMarker,
  },
  data: () => ({
    isDataReady: true,
    leafletLogo: require("@/assets/imgs/leaflet.svg"),
    githubLogo: require("@/assets/imgs/github.svg"),
    mapUrl: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    center: [38.892112, -77.036548],
    zoom: 13.1,
  }),
  methods: {},
};
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

.icon {
  margin: 0 0 0.5rem 0;
}

.attributes {
  display: flex;
  flex-direction: column;
  opacity: 0.3;
}

.custom-wrapper {
  position: absolute;
  background-color: transparent;
}
.custom-circle {
  position: relative;
  background-color: gray;
  height: 6px;
  width: 6px;
  border-radius: 50%;
}

.ripple {
  position: absolute;
  border: 2px solid gray;
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
