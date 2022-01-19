<template>
  <v-dialog max-width="700">
    <v-card elevation="2">
      <v-card-title>
        <v-text>rita</v-text>
        <v-btn small icon>
          <v-icon small>mdi-help</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle>
        <p class="text-center">
          {{ ritaAbout }}
        </p>
        <p class="text-center">
          {{ soundWarning }}
        </p>
      </v-card-subtitle>
      <About v-if="showAboutDialog" />
      <Settings v-if="!showAboutDialog" />
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import About from './dialog/About'
import Settings from './dialog/Settings'

export default {
  components: { About, Settings },
  data: () => ({
    showAboutDialog: false,
    ritaMsg:
      'an a/v representation of bike share activity in different cities.',
    soundWarning: 'please enable audio if you would like to listen.',
  }),
  computed: {
    ...mapGetters(['cities']),
  },
}
</script>

<style></style>
