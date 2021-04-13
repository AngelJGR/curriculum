<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col cols="4">
          <v-btn to="/">Principal</v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-form lazy-validation @submit.prevent="submit" ref="form">
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
                <v-btn to="/auth/register" :disabled="isLoading">Registrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
    <alert-message/>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

type Dictionary<T> = { [key: string]: T }

export default Vue.extend({
  data () {
    return {
      user: '',
      password: '',
      show: false,
      isLoading: false,
      rules: {
        required: (value: string) => !!value || 'Requerido.',
        min: (v: string) => v.length >= 8 || 'Minimo 8 caracteres.'
      }
    }
  },
  computed: {
    ...mapState({
      alert: (state: any) => state.alert || {}
    })
  },
  methods: {
    submit(): void {
      if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
        this.isLoading = true
        this.$store.dispatch('session/login', {username: this.user, password: this.password})
          .then((res) => {
            this.isLoading = false
            if (res.data.success) {
              this.$router.push({name: 'Personal', params: { show: 'true', message: res.data.message, color: 'success' } as Dictionary<string> })
            } else {
              this.$store.dispatch('alert/error', res.data.message)
            }
          })
          .catch((e) => {
            this.isLoading = false
            console.log('Error', e)
          })
      }
    }
  },
  created() {
    if (this.$route.params.show) {
      this.$store.dispatch(`alert/${this.$route.params.color}`, this.$route.params.message)
    }
  }
})
</script>