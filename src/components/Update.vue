<template>
  <v-list-item dark>
    <span></span>
    <v-list-item-content>
      <v-list-item-title>
        {{ update.lineOne }}
      </v-list-item-title>
      <v-list-item-subtitle>
        {{ update.lineTwo }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: ["update"],
};
</script>

<style scoped></style>
