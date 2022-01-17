<template>
  <v-app dark>
    <NavDrawer />
    <Map />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import NavDrawer from '../components/NavDrawer'
import Map from '../components/Map'
export default {
  components: {
    NavDrawer,
    Map,
  },
  mounted() {
    this.selectCity(null)
  },
  methods: {
    ...mapActions(['selectCity']),
  },
}
</script>
<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
