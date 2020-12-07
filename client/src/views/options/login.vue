<template>
<v-container fluid>
  <v-row>
    <v-col cols="4">
      <v-btn>Principal</v-btn>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="12" md="6">
      <v-card class="mx-auto">
        <v-card-title>
          <h3>Login</h3>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Usuario" outlined rules="required"></v-text-field>
          <v-text-field 
            :type="!show ? 'password' : 'text'"
            :append-icon="!show ? 'mdi-eye' : 'mdi-eye-off'"
            label="Contraseña"
            outlined
            @click:append="show = !show"
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn>Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  }
}
</script>