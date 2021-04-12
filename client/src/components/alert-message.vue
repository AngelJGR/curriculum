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

export default Vue.extend({
  computed: {
    ...mapState({
      alert: (state: any) => state.alert || {}
    })
  }
})
</script>