<template>
  <v-card>
    <v-card-title>{{experience.name}}</v-card-title>
    <v-card-text>{{experience.area}} {{experience.description}}</v-card-text>
    <v-card-actions>
      <v-btn x-small color="success">
        <v-icon small>mdi-refresh-circle</v-icon> Actualizar
      </v-btn>
      <v-btn x-small color="error" @click="unsetExperience">
        <v-icon small>mdi-delete-circle</v-icon> Eliminar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    experience: Object,
    index: Number
  },
  methods: {
    unsetExperience() {
      this.$emit('unsetExperience', this.experience, this.index)
    }
  }
})
</script>