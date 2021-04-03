<template>
  <v-card flat class="px-3">
    <v-row justify="center" align="center">
      <v-col cols="5">
        <v-icon>mdi-check-circle-outline</v-icon>
        {{skill.description}}
      </v-col>
      <v-col cols="5" class="d-flex justify-end">
        <v-fab-transition style="bottom: 10px;">
          <v-progress-circular
            :rotate="-90"
            size="80"
            width="10"
            :value="skill.score"
            :color="getColor"
          ><span class="headline">{{skill.score}}</span>
          </v-progress-circular>
        </v-fab-transition>
      </v-col>
      <v-col cols="2">
        <v-btn icon color="success">
          <v-icon>mdi-refresh-circle</v-icon>
        </v-btn>
        <v-btn icon color="error" @click="unsetSkill">
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
    skill: Object
  },
  computed: {
    getColor (): string {
      return this.skill.score < 20 ? 'red' : this.skill.score < 40 ? 'yellow' :this.skill.score < 80 ? 'primary' : 'success'
    }
  },
  methods: {
    unsetSkill() {
      this.$emit('unsetSkill', this.skill.id)
    }
  }
})
</script>