<template>
  <v-dialog dark v-model="dialog" max-width="600">
    <v-card dark color="#000000">
      <v-card-actions class="justify-center">
        <v-btn icon @click="$emit('toggleSound')">
          <v-icon large>
            {{ isSoundEnabled ? "mdi-volume-off" : "mdi-volume-high" }}
          </v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-text class="text-center">
        <p class="mb-0">{{ lineOne }}</p>
        <p class="mb-0">{{ lineTwo }}</p>
        <p class="mb-0">{{ lineThree }}</p>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn small href="/fooRoute" target="_blank">
          <v-icon small>mdi-github</v-icon>
          github
        </v-btn>
        <v-btn small href="/fooRoute" target="_blank">
          <v-icon small>mdi-bicycle</v-icon>
          capital bs
        </v-btn>
        <v-btn small href="/fooRoute" target="_blank">
          <v-icon small>mdi-leaf</v-icon>
          leaflet
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["isSoundEnabled"],
  data: () => ({
    dialog: true,
    lineOne: `a real time audio and visual representation of bikes being checked out from dc's bikeshare program.`,
    lineTwo: `in depth details available on my github.`,
    lineThree: `thanks to capital bikeshare for the free api and leaflet for great geo libraries.`,
  }),
};
</script>

<style scoped></style>
