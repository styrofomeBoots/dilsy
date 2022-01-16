<template>
  <v-app dark>
    <NavDrawer :notifications="notifications" />
    <Map :stations="stations" />
    <WelcomeDialog @close="closeWelcomeDialog" />
    <HelpDialog
      v-if="showHelpDialog"
      @close="showHelpDialog = false"
      @toggleSound="toggleSoundEnabled"
      :isSoundEnabled="isSoundEnabled"
    />
    <v-btn @click="showHelpDialog = true" dark class="help-btn" small icon>
      <v-icon>mdi-help-circle-outline</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import NavDrawer from "./components/NavDrawer";
import Map from "./components/Map";
import WelcomeDialog from "./components/dialog/WelcomeDialog";
import HelpDialog from "./components/dialog/HelpDialog";

import { setupStations, getUpdates } from "./modules/stations";

export default {
  name: "App",

  components: {
    NavDrawer,
    Map,
    WelcomeDialog,
    HelpDialog,
  },

  data: () => ({
    isSoundEnabled: false,
    isRunningUpdates: false,
    showHelpDialog: false,
    stations: [],
    notifications: [],
    updates: [],
    updateQueue: [],
    intervalId: null,
  }),
  async created() {
    this.stations = await setupStations();
    setInterval(async () => {
      await this.getStationUpdates();
    }, 5000);
  },
  methods: {
    async getStationUpdates() {
      const updates = await getUpdates(this.stations);
      this.updates = this.updates.concat(updates);
      if (this.updateQueue.length === 0 && this.updates.length > 0) {
        this.updateQueue = this.updateQueue.concat(this.updates);
        this.updates = [];
        await this.runUpdates();
      }
    },

    async runUpdates() {
      for (const update of this.updateQueue) {
        // await playNote goes here
        const station = this.stations.find(
          (station) => station.id === update.id
        );
        station.numBikesAvailable = update.numBikesAvailable;
        station.icon = update.icon;
        this.notifications.unshift(update);
        if (this.notifications.length === 50) {
          this.notifications.pop();
        }
        const ms = Math.floor(Math.random() * 2000) + 1000;
        await new Promise((resolve) => setTimeout(resolve, ms));
      }
      this.updateQueue = [];
    },
    closeWelcomeDialog(value) {
      this.isSoundEnabled = value;
    },
    toggleSoundEnabled() {
      this.isSoundEnabled = !this.isSoundEnabled;
    },
  },
};
</script>
<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}

.help-btn {
  opacity: 0.3;
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
}
</style>
