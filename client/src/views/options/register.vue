<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col cols="4">
          <v-btn to="/login">Login</v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-form lazy-validation>
            <v-card class="px-5 py-4">
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
                v-model="user"
                :rules="[rules.required, rules.isUserExist]"
                label="Usuario"
                outlined
                @keyup="validateUser($event.target.value)"
                :loading="loading"
                ref="user"
              >
                <template v-slot:append v-if="user !== ''">
                  <v-progress-circular 
                    v-if="loading"
                    indeterminate
                    size="25"
                  ></v-progress-circular>
                  <v-icon v-show="!loading && !isFinded" color="success">mdi-check-circle</v-icon>
                  <v-icon v-show="!loading && isFinded" color="error">mdi-alert-circle</v-icon>
                </template>
              </v-text-field>
              <v-text-field 
                v-model="password"
                :type="!showPassword ? 'password' : 'text'"
                :append-icon="!showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                label="Contraseña"
                outlined
                @click:append="showPassword = !showPassword"
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
import services from '../../services/index'
export default {
  data () {
    return {
      user: '',
      password: '',
      fullName: '',
      showPassword: false,
      loading: false,
      isFinded: false,
      rules: {
        isUserExist: () => !this.isFinded || 'Este usuario ya existe.',
        required: value => !!value || 'Requerido.',
        min: v => v.length >= 8 || 'Minimo 8 caracteres.'
      }
    }
  },
  watch: {
    isFinded () {
      this.$refs.user.validate();
    }
  },
  methods: {
    validateUser(user){
      if (user !== "") {
        this.loading = true
        setTimeout(() => {
          services.validateUser(user)
            .then((res) => {
              this.isFinded = res.data
              this.loading = false
            })
        }, 500)
      }
    }
  }
}
</script>