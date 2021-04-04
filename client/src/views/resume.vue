<template>
  <v-app>
    <v-main>
      
      <v-app-bar
        color="indigo darken-2"
        dark
        style="border-bottom:1px solid rgba(0,0,0,.12) !important;"
        app
        fixed
        clipped-left
        text
      >
        <v-spacer></v-spacer>
        <v-btn to="profile/personal">
          Editar
        </v-btn>
      </v-app-bar>

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
    console.log(result)
  }
});
</script>
