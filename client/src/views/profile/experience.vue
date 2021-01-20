<template>
  <v-container>
    <h1>Experiencia</h1>
    <alert-message
      :snackbar="snackbar"
      top
      :color="color"
      :message="message"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import experience from '../../services/experience'
export default Vue.extend({
  data () {
    return {
      snackbar: false,
      color: '',
      message: '',
    }
  },
  methods: {
    getExperience (): void {
      this.snackbar = false
      experience.getExperience(1) // EDITAR
        .then((res) => {
          console.log(res)
          if (res.data.success) {
            // this.color = 'success'
            // this.message = 'Registros obtenidos'
          } else {
            this.snackbar = true
            this.color = 'error'
            this.message = 'Error al obtener los registros'
          }
        })
    }
  },
  created() {
    this.getExperience()
  }
})
</script>