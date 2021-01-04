<template>
  <v-container>
    <h1>Formación</h1>
  </v-container>
</template>
<script>
import formacion from '../../services/formation'
export default {
  data() {
    return {

    }
  },
  methods: {
    
  },
  created() {
    formacion.getFormation('1')
      .then((res) => console.log(res))
  }
}
</script>