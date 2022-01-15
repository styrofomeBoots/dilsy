<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="mini"
      color="transparent"
      mobile-breakpoint="0"
      permanent
      hide-overlay
      disable-resize-watcher
      floating
      app
    >
      <v-list>
        <v-list-item class="ml-n2" dark>
          <v-btn icon @click.stop="mini = !mini">
            <v-icon>
              {{ mini ? "mdi-chevron-left" : "mdi-chevron-right" }}
            </v-icon>
          </v-btn>
          <v-list-item-title class="text-h6">updates</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="updates.length === 0" dark>
          <span></span>
          <v-list-item-title>waiting for action</v-list-item-title>
        </v-list-item>
        <Update
          v-for="(update, index) in updates"
          :key="index"
          :update="update"
        />
      </v-list>
    </v-navigation-drawer>
    <Map />
    <Dialog @close="closeDialog" />
    <v-btn dark class="help-btn" small icon>
      <v-icon>mdi-help-circle-outline</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import Map from "./components/Map";
import Update from "./components/Update";
import Dialog from "./components/dialog/Dialog";

import { setupStations, getUpdates } from "./modules/stations";

export default {
  name: "App",

  components: {
    Map,
    Update,
    Dialog,
  },

  data: () => ({
    mini: true,
    drawer: true,
    isSoundEnabled: false,
    isRunningUpdates: false,
    stations: [],
    updates: [],
    updateQueue: [],
    updateIntervalId: null,
    firstTime: true,
  }),
  async created() {
    this.stations = await setupStations();
    this.intervalId = setInterval(() => {
      this.updateStations();
    }, 5000);
  },
  methods: {
    async updateStations() {
      const updates = await getUpdates(this.stations);
      this.stations = updates.updatedStations;
      this.updateQueue = this.updateQueue.concat(updates.updates);
      if (this.firstTime) {
        this.firstTime = false;
        this.updateQueue = [];
      }
      if (!this.isRunningUpdates && this.updateQueue.length === 0) return;
      this.isRunningUpdates = true;
      this.runUpdates();
    },

    async runUpdates() {
      for (const update of this.updateQueue) {
        this.updates.unshift(update);
        this.updateQueue.shift();
        const ms = Math.floor(Math.random() * 1500) + 500;
        await new Promise((resolve) => setTimeout(resolve, ms));
        if (this.updateQueue.length === 0) {
          this.isRunningUpdates = false;
        }
      }
    },
    closeDialog(value) {
      this.isSoundEnabled = value;
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

.v-navigation-drawer__content {
  opacity: 0.4;
  overflow-y: hidden !important;
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 20%,
    transparent 100%
  );
}

.help-btn {
  opacity: 0.3;
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
}
</style>
