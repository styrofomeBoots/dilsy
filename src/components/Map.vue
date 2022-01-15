<template>
  <l-map
    style="height: 100%; width: 100%"
    :zoom="zoom"
    :center="center"
    v-if="isDataReady"
    :options="{ zoomControl: false, attributionControl: false }"
  >
    <l-tile-layer :url="mapUrl" :attribution="''"></l-tile-layer>
    <l-control-attribution
      position="bottomright"
      prefix=""
    ></l-control-attribution>
  </l-map>
</template>

<script>
import {
  LMap,
  LTileLayer,
  // LControlZoom,
  LControlAttribution,
} from "vue2-leaflet";
export default {
  components: {
    LMap,
    LTileLayer,
    // LControlZoom,
    LControlAttribution,
  },
  data: () => ({
    isDataReady: true,
    leafletLogo: require("@/assets/imgs/leaflet.svg"),
    githubLogo: require("@/assets/imgs/github.svg"),
    mapUrl: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    // center: [38.8936295, -77.0525735],
    center: [38.892112, -77.036548],
    zoom: 13.1,
  }),
  computed: {
    // attribution() {
    //   return `
    //     <div class="attributes">
    //       <a target="_blank" href="http://osm.org/copyright"><img src=${this.githubLogo} height="20px"/></a>
    //       <a target="_blank" href="http://osm.org/copyright"><img src=${this.leafletLogo} height="20px"/></a>
    //     </div>
    //     `;
    // },
  },
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
</style>
