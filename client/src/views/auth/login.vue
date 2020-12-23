<template>
  <v-app>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
      color="success"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          icon
          color="dark"
          v-bind="attrs"
          @click="snackbar = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-container fluid>
      <v-row>
        <v-col cols="4">
          <v-btn to="/">Principal</v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-form lazy-validation @submit.prevent="submit">
            <v-card class="px-5 py-4">
              <v-card-title>
                <h3>Login</h3>
              </v-card-title>
              <v-text-field 
                v-model="user"
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
                <v-btn type="submit">Aceptar</v-btn>
                <v-btn to="/auth/register">Registrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import login from '../../services/login'
export default {
  data () {
    return {
      user: '',
      password: '',
      show: false,
      snackbar: false,
      timeout: 4000,
      text: '',
      rules: {
        required: value => !!value || 'Requerido.',
        min: v => v.length >= 8 || 'Minimo 8 caracteres.'
      }
    }
  },
  methods: {
    submit() {
      login.login(this.user, this.password)
        .then((res) => {
          this.$router.push('/')
          // localStorage.setItem('token', res.data.token)
        })
        .catch((e) => console.log('Error', e))
    }
  },
  created() {
    if (this.$route.params.success) {
      this.snackbar = true
      this.text = this.$route.params.message
    }
  }
}
</script>