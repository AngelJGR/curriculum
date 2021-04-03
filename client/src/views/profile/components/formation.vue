<template>
  <v-card>
    <v-card-title>{{formation.college_degree}}</v-card-title>
    <v-card-text>{{formation.college}}</v-card-text>
    <v-card-actions>
      <v-btn x-small color="success">
        <v-icon small>mdi-refresh-circle</v-icon> Actualizar
      </v-btn>
      <v-btn x-small color="error" @click="unsetFormation">
        <v-icon small>mdi-delete-circle</v-icon> Eliminar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    formation: Object,
    index: Number
  },
  methods: {
    unsetFormation(): void {
      this.$emit('unsetFormation', this.formation, this.index)
    }
  }
})
</script>