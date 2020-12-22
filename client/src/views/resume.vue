<template>
  <v-app>
    <v-main>
      <!-- <HelloWorld/> -->
      <not-found v-if="!isUserExist"></not-found>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import info from '../services/info'
import NotFound from './not-found.vue';

export default Vue.extend({
  name: 'App',

  components: {
    NotFound,
  },

  data: () => ({
    isUserExist: null,

  }),
  async created() {
    const result = await info.getInformation(this.$route.params.username)
    this.isUserExist = result.data
  }
});
</script>
