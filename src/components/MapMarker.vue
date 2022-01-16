<template>
  <l-marker :lat-lng="station.latLon" :icon="station.icon">
    <l-tooltip>
      <div>latLon: {{ station.latLon }}</div>
    </l-tooltip>
  </l-marker>
</template>

<script>
import { LMarker, LTooltip } from "vue2-leaflet";
export default {
  props: ["station"],
  components: {
    LMarker,
    LTooltip,
  },
};
</script>

<style></style>
