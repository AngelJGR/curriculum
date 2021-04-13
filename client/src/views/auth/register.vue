<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-form lazy-validation ref="form" @submit.prevent="submit">
            <v-card class="px-5 py-4">
              <v-card-title>
                <h3>Registrar</h3>
              </v-card-title>
              <v-text-field 
                v-model="fullname"
                :rules="[rules.required]"
                label="Nombre completo"
                outlined
              ></v-text-field>
              <v-text-field 
                v-model="user"
                :rules="[rules.required, rules.isUserExist(isFinded), rules.max]"
                label="Usuario"
                outlined
                @keyup="validateUser($event.target.value)"
                :loading="loading"
                ref="username"
                counter
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
                <v-btn type="submit">Aceptar</v-btn>
                <v-btn to="/auth/login">Cancelar</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import login from '../../services/login'

type Dictionary<T> = { [key: string]: T }

export default Vue.extend({
  data () {
    return {
      user: '',
      password: '',
      fullname: '',
      showPassword: false,
      loading: false,
      isFinded: false,
      rules: {
        isUserExist: (isFinded: boolean) => !isFinded || 'Este usuario ya existe.',
        required: (value: string) => !!value || 'Requerido.',
        min: (v: string) => v.length >= 8 || 'Minimo 8 caracteres.',
        max: (v: string) => v.length <= 11 || 'Máximo 11 caracteres.'
      }
    }
  },
  computed: {
    form(): Vue & { validate: () => boolean } {
      return this.$refs.form as Vue & { validate: () => boolean }
    },
    username(): Vue & { validate: () => boolean } {
      return this.$refs.username as Vue & { validate: () => boolean }
    }
  },
  methods: {
    validateUser(user: string){
      this.loading = true
        setTimeout(() => {
          if (user !== "") {
            login.validateUser(user)
              .then((res) => {
                if (this.isFinded !== res.data) {
                  this.isFinded = res.data
                }
                this.loading = false
              })
          }
        }, 500)
    },
    submit(){
      if (this.form.validate()){
        login.registerUser(this.fullname, this.user, this.password)
          .then(() => {
            this.$router.push({name: 'Login', params: { show: 'true', message: 'Registro exitoso!', color: 'success' } as Dictionary<string> })
          })
          .catch((err) => console.log(err))
      }
    }
  }
})
</script>