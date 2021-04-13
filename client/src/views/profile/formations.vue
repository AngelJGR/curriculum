<template>
  <v-container>
    <h1>Formación</h1>
    <v-row v-if="isEmpty">
      <v-col cols="12">
        <non-content></non-content>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-card class="px-2">
          <v-row justify="space-around">
            <v-col 
              cols="12" sm="6" md="4"
              v-for="(item, index) in formation" :key="item.id"
            >
              <formation-component
                :formation="item"
                :index="index"
                @unsetFormation="unsetFormation"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-form lazy-validation ref="form" @submit.prevent="setFormation">
      <v-card :class="{'px-1': $vuetify.breakpoint.xs}" class="px-5 py-3">
        <v-row justify="center">
          <v-col cols="12" sm="6">
            <v-autocomplete
              label="Seleccione una carrera"
              v-model="collegeDegree"
              :items="collegeDegrees"
              :item-text="(obj) => obj.description"
              :item-value="(obj) => obj.id"
              return-object
              clearable
              :rules="[rules.required]"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="6">
            <v-autocomplete
              label="Seleccione un instituto"
              v-model="college"
              :items="colleges"
              item-text="name"
              item-value="id"
              return-object
              clearable
              :rules="[rules.required]"
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-btn type="submit" color="success">Agregar</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
    <alert-message/>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import FormationComponent from './components/formation.vue'

import FormationService from '../../services/formation'

import Formation from '../../interfaces/formation'
import College from '../../interfaces/college'
import CollegeDegree from '../../interfaces/collegeDegree'

export default Vue.extend({
  components: {
    FormationComponent
  },
  data() {
    return {
      isEmpty: false,
      colleges: new Array<College>(),
      college: {} as College,
      collegeDegrees: new Array<CollegeDegree>(),
      collegeDegree: {} as CollegeDegree,
      formation: new Array<Formation>(),
      rules: {
        required: (value: string) => !!value || 'Requerido.',
      }
    }
  },
  methods: {
    setFormation(): void {
      if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
        FormationService.setFormation(this.collegeDegree.id, this.college.id_college)
          .then((res) => {
            if (res.data.success) {
              this.$store.dispatch('alert/success', 'Datos ingresados exitósamente')
              this.formation.push(res.data.college_degree_person[0])
              const index = this.collegeDegrees.findIndex(item => item.id === res.data.college_degree_person[0].id_college_degree)
              if (index > -1) {
                this.collegeDegrees.splice(index, 1)
              }
              // eslint-disable-next-line
              (this.$refs.form as Vue & {reset: () => unknown}).reset()
              if (this.formation.length > 0) {
                this.isEmpty = false
              }
            } else {
              this.$store.dispatch('alert/error', 'Ocurrió un error al ingresar datos')
            }
          })
      }
    },
    unsetFormation(formation: Formation, index: number): void {
      FormationService.unsetFormation(formation.id)
        .then((res) => {
          if (res.data.success) {
            this.$store.dispatch('alert/success', 'Registro eliminado')
            this.collegeDegrees.push({
              id: formation.id_college_degree,
              description: formation.college_degree,
              // eslint-disable-next-line
              id_college_degree_type: formation.id_college_degree_type
            })
            this.formation.splice(index, 1)
            if (this.formation.length === 0) {
              this.isEmpty = true
            }
          } else {
            this.$store.dispatch('alert/error', 'Ocurrió un error al eliminar el registro')
          }
        })
    }
  },
  created(): void {
    FormationService.getFormation()
      .then((res) => {
        if (res.data.college_degree_person.length === 0) {
          this.isEmpty = true
        }
        this.colleges = res.data.college || null
        this.collegeDegrees = res.data.college_degree
        this.formation = res.data.college_degree_person
      })
  },
})
</script>