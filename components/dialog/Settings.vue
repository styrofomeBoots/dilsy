<template>
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
  </v-card-text>
</template>

<script>
export default {}
</script>

<style></style>
