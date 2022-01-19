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
    <v-sheet color="transparent">
      <v-list>
        <v-list-item class="ml-n2">
          <v-btn icon @click.stop="mini = !mini">
            <v-icon>
              {{ mini ? 'mdi-chevron-right' : 'mdi-chevron-left' }}
            </v-icon>
          </v-btn>
          <v-list-item-title class="text-h6">updates</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="notifications.length === 0">
          <span></span>
          <v-list-item-title>waiting for action</v-list-item-title>
        </v-list-item>
        <Notification
          v-for="(notification, index) in notifications"
          :key="index"
          :notification="notification"
        />
      </v-list>
    </v-sheet>
    <template #append>
      <v-list-item class="ml-n2 help-button">
        <v-btn icon small>
          <v-icon small>mdi-cog</v-icon>
        </v-btn>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import Notification from './navDrawer/Notification'
export default {
  components: { Notification },
  data: () => ({
    mini: true,
    drawer: true,
  }),
  computed: {
    ...mapGetters(['notifications']),
  },
}
</script>

<style>
.v-sheet {
  height: 100%;
  opacity: 0.55;
  overflow-y: hidden !important;
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 70%,
    transparent 100%
  );
}

.help-button {
  opacity: 0.4;
}
</style>
