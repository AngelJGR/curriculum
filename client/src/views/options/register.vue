<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col cols="4">
          <v-btn>Login</v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-form lazy-validation>
            <v-card>
              <v-card-title>
                <h3>Registrar</h3>
              </v-card-title>
              <v-text-field 
                v-model="fullName"
                :rules="[rules.required]"
                label="Nombre completo"
                outlined
              ></v-text-field>
              <v-text-field 
                v-model="email"
                :rules="[rules.required, rules.email]"
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
        min: v => v.length >= 8 || 'Minimo 8 caracteres.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Ingrese un E-mail válido.'
        }
      }
    }
  }
}
</script>