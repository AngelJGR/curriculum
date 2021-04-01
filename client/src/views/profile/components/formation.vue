<template>
  <v-card>
    <v-row>
      <v-col cols="12" sm="6">
        {{formation.id_college_degree}} - {{formation.college_degree}}
      </v-col>
      <v-col cols="12" sm="4">
        {{formation.college}}
      </v-col>
      <v-col cols="12" sm="2">
        <v-btn icon color="success">
          <v-icon>mdi-refresh-circle</v-icon>
        </v-btn>
        <v-btn icon color="error" @click="unsetFormation">
          <v-icon>mdi-delete-circle</v-icon>
        </v-btn>
      </v-col>
    </v-row>
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