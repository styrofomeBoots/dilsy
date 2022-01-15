<template>
  <v-dialog dark v-model="dialog" max-width="500">
    <v-card dark color="#000000">
      <v-card-title class="justify-center"></v-card-title>
      <p class="mb-0 text-center" dark>{{ arrowMsg }}</p>
      <p class="mb-0 text-center">{{ infoMsg }}</p>
      <p class="mb-0 text-center">{{ soundMsg }}</p>
      <v-card-actions class="justify-center">
        <v-btn @click="closeDialog(true)" color="black" small>Enable</v-btn>
        <v-btn @click="closeDialog(false)" color="black" small>Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  components: {},
  data: () => ({
    dialog: true,
    arrowMsg: "click the arrow in the top left to view updates.",
    infoMsg: "click the question mark in the bottom right for more info.",
    soundMsg: "if you would like to listen please enable audio.",
  }),
  methods: {
    closeDialog(value) {
      this.dialog = false;
      this.$emit("close", value);
    },
  },
};
</script>

<style></style>
