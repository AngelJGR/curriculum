<template>
  <v-snackbar
    v-model="show"
    :timeout="5000"
    top
    :color="color"
    :message="message"
  >
    <b>{{ message }}</b>

    <template v-slot:action="{ attrs }">
      <v-btn
        icon
        color="dark"
        v-bind="attrs"
        @click="show = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    message: String,
    snackbar: Boolean,
    color: String,
  },
  data() {
    return {
      show: false
    }
  },
  created() {
    this.show = this.snackbar
  },
  watch: {
    snackbar() {
      this.show = this.snackbar
    }
  }
})
</script>