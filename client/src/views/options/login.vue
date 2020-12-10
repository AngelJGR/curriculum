<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col cols="4">
          <v-btn>Principal</v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-form lazy-validation>
            <v-card>
              <v-card-title>
                <h3>Login</h3>
              </v-card-title>
              <v-text-field 
                v-model="email"
                :rules="[rules.required]"
                label="Usuario"
                outlined
              ></v-text-field>
              <v-text-field 
                v-model="password"
                :type="!show ? 'password' : 'text'"
                :append-icon="!show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                label="Contraseña"
                outlined
                @click:append="show = !show"
              ></v-text-field>
              <v-card-actions>
                <v-btn>Aceptar</v-btn>
                <v-btn to="/register">Registrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      show: false,
      rules: {
        required: value => !!value || 'Requerido.',
        min: v => v.length >= 8 || 'Minimo 8 caracteres.'
      }
    }
  }
}
</script>