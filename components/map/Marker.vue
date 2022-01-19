<template>
  <l-marker :lat-lng="station.latLon" :icon="station.icon">
    <l-tooltip>
      <div>latLon: {{ station.latLon }}</div>
      <div>latLon: {{ station.note }}{{ station.octave }}</div>
    </l-tooltip>
  </l-marker>
</template>

<script>
import { LMarker, LTooltip } from 'vue2-leaflet'
export default {
  components: {
    LMarker,
    LTooltip,
  },
  props: {
    station: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style>
.custom-wrapper {
  position: absolute;
  background-color: transparent;
  opacity: 0.5;
}
.custom-circle {
  position: relative;
  background-color: gray;
  height: 5px;
  width: 5px;
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
    top: -72px;
    left: -72px;
    width: 152px;
    height: 152px;
    opacity: 0;
  }
}
</style>
