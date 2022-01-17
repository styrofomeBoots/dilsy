<template>
  <v-dialog max-width="700">
    <v-card elevation="2">
      <v-card-title>
        scrella
        <v-btn>
          <v-icon>mdi-help</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle>
        <p class="text-center">
          an audio visual representation of bike share activity.
        </p>
        <p class="text-center">
          please enable audio if you would like to listen.
        </p>
      </v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col></v-col>
          <v-select
            :items="cities"
            item-text="city"
            item-value="index"
            label="city"
          ></v-select>
        </v-row>
        <v-row>
          <v-radio-group row>
            <v-radio label="Enable Sound" value="1"></v-radio>
            <v-radio label="Disable Sound" value="0"></v-radio>
          </v-radio-group>
        </v-row>
        <v-col>
          <span>
            <a href="https://www.lyft.com/bikes" rel="noopener noreferrer"
              >@lyft</a
            >
            and participating cities for the data.
          </span>
          <span>
            <a
              href="https://leafletjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              >@leaflet</a
            >
            and
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noopener noreferrer"
              >@osm</a
            >
            for the mapping libraries.</span
          >
          <span
            >see
            <a href="">@github/styrofomeBoots</a>
            for code and more details.
          </span>
        </v-col>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['cities']),
  },
}
</script>

<style></style>
