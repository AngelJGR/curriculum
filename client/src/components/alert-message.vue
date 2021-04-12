<template>
  <v-snackbar
    v-model="alert.show"
    :timeout="5000"
    top
    right
    :color="alert.color"
  >
    <b>{{ alert.message }}</b>

    <template v-slot:action="{ attrs }">
      <v-btn
        icon
        color="dark"
        v-bind="attrs"
        @click="alert.show = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import State from '../interfaces/state/state'

export default Vue.extend({
  computed: {
    ...mapState({
      alert: (state: State) => state.alert || {}
    })
  },
  created() {
    console.log('created', this.alert)
  },
  updated() {
    console.log('updated', this.alert)
  }
})
</script>