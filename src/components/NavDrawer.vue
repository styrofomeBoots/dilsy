<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="mini"
    color="transparent"
    mobile-breakpoint="0"
    permanent
    touchless
    hide-overlay
    disable-resize-watcher
    floating
    app
  >
    <v-list>
      <v-list-item class="ml-n2" dark>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>
            {{ mini ? "mdi-chevron-right" : "mdi-chevron-left" }}
          </v-icon>
        </v-btn>
        <v-list-item-title class="text-h6">updates</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="notifications.length === 0" dark>
        <span></span>
        <v-list-item-title>waiting for action</v-list-item-title>
      </v-list-item>
      <Notification
        v-for="(notification, index) in notifications"
        :key="index"
        :notification="notification"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Notification from "./Notification";
export default {
  props: ["notifications"],
  components: {
    Notification,
  },
  data: () => ({
    mini: true,
    drawer: true,
  }),
};
</script>

<style>
.v-navigation-drawer__content {
  opacity: 0.4;
  overflow-y: hidden !important;
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 20%,
    transparent 100%
  );
}
</style>
