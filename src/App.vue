<template>
  <v-app>
    <v-main>
      <Map />
    </v-main>
  </v-app>
</template>

<script>
  import Map from './components/Map';
  export default {
    name: 'App',

    components: {
      Map,
    },

    data: () => ({
      //
    }),
  };
</script>

<style>
  html {
    overflow-y: hidden;
  }
</style>
