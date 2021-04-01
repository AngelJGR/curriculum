<template>
  <v-app>
    <alert-message
      :snackbar="snackbar"
      :color="color"
      :message="message"
    />
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
                <v-btn type="submit" :loading="isLoading">Aceptar</v-btn>
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
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      user: '',
      password: '',
      show: false,
      snackbar: false,
      color: null,
      message: '',
      isLoading: false,
      rules: {
        required: value => !!value || 'Requerido.',
        min: v => v.length >= 8 || 'Minimo 8 caracteres.'
      }
    }
  },
  methods: {
    ...mapMutations(['setUser', 'setToken', 'setFullname']),
    submit() {
      this.isLoading = true
      this.snackbar = false
      login.login(this.user, this.password)
        .then((res) => {
          this.isLoading = false
          if (res.data.success) {
            localStorage.setItem('resume-token', res.data.token)
            this.setUser = res.data.user
            this.setToken = res.data.token
            this.setFullname = res.data.fullname
            this.$router.push({name: 'Personal', params: { show: true, message: res.data.message, color: 'success' }})
          } else {
            this.snackbar = true
            this.color = 'error'
            this.message = res.data.message
          }
        })
        .catch((e) => {
          this.isLoading = false
          console.log('Error', e)
        })
    }
  },
  created() {
    if (this.$route.params.show) {
      this.snackbar = true
      this.color = this.$route.params.color
      this.message = this.$route.params.message
    }
  }
}
</script>