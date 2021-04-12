<template>
  <v-container fluid>
    <h1>Perfil</h1>
    <v-row>
      <v-col cols="12">
        <v-card class="px-4 py-2">
          <v-card-title v-if="!isRegister">
            <h3>Ingrese sus datos personales para completar el perfil</h3>
          </v-card-title>
          <v-row justify="center">
            <v-col cols="12" md="5">
              <v-text-field
                v-model="person.fullname"
                label="Nombre"
                placeholder="Ingrese un nombre"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="5">
              <v-text-field
                v-model="person.ci"
                type="number"
                label="Cédula de identidad"
                placeholder="Ingrese un documento de identidad"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="5">
              <v-text-field
                v-model="person.address"
                label="Dirección"
                placeholder="Ingrese dirección de domicilio"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="5">
              <v-text-field
                v-model="person.phone"
                label="Teléfono"
                placeholder="Ingrese un número de teléfono"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="5">
              <v-text-field
                v-model="person.twitter"
                label="Twitter"
                placeholder="Ingrese su usuario de twitter"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="5">
              <v-text-field
                v-model="person.email"
                label="Email"
                placeholder="Ingrese su correo electrónico"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="5">
              <v-textarea
                v-model="person.about"
                label="Resumen"
                placeholder=""
                outlined
              ></v-textarea>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-btn color="success" @click="updatePerson">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <alert-message/>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import person from '../../services/person'
import { Person } from '../../interfaces/person'

export default Vue.extend({
  data() {
    return {
      person: {} as Person,
      isRegister: false,
    }
  },
  computed: {
    ...mapState({
      alert: (state: any) => state.alert || {}
    })
  },
  methods: {
    updatePerson (): void {
      person.updatePerson(this.person)
        .then((res)=>{
          if (res.data.success) {
            this.$store.dispatch('alert/success', 'Datos actualizados!')
          } else {
            this.$store.dispatch('alert/error', 'Ocurrió un error!')
          }
        })
    }
  },
  created () {
    if (this.$route.params.show) {
      this.$store.dispatch('alert/success', this.$route.params.message)
    }
    person.getPerson()
      .then((res) => {
        if (res.data.person.length > 0) {
          this.person = res.data.person[0]
          this.isRegister = true
        }
      })
  }
})
</script>