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
                :rules="[rules.required, rules.isUserExist, rules.max]"
                label="Usuario"
                outlined
                @keyup="validateUser($event.target.value)"
                :loading="loading"
                ref="user"
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

<script>
import login from '../../services/login'
export default {
  data () {
    return {
      user: '',
      password: '',
      fullname: '',
      showPassword: false,
      loading: false,
      // saveLoading: false,
      isFinded: false,
      rules: {
        isUserExist: () => !this.isFinded || 'Este usuario ya existe.',
        required: value => !!value || 'Requerido.',
        min: v => v.length >= 8 || 'Minimo 8 caracteres.',
        max: v => v.length <= 11 || 'Máximo 11 caracteres.'
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
          login.validateUser(user)
            .then((res) => {
              this.isFinded = res.data
              this.loading = false
            })
        }, 500)
      }
    },
    submit(){
      if (this.$refs.form.validate()){
        login.registerUser(this.fullname, this.user, this.password)
          .then((res) => {
            this.$router.push({name: 'Login', params: {success: true, message: 'Registro exitoso!'}})
          })
          .catch((err) => console.log(err))
      }
    }
  }
}
</script>