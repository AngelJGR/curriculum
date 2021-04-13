<template>
  <v-container>
    <h1>Experiencia</h1>
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
              v-for="(item, index) in experiences" :key="item.id"
            >
              <experience-component
                :experience="item"
                :index="index"
                @unsetExperience="unsetExperience"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-form lazy-validation ref="form" @submit.prevent="setExperience">
      <v-card :class="{'px-1': $vuetify.breakpoint.xs}" class="px-5 py-3">
        <v-row justify="center">
          <v-col cols="12" sm="6">
            <v-combobox
              v-model="organization"
              :items="organizations"
              item-text="name"
              item-value="id"
              label="Organización"
              placeholder="Ingrese organización"
              :rules="[rules.required]"
              :searchInput.sync="search"
              clearable
              return-object
            >
              <template v-slot:no-data>
                <v-list-item v-if="!isSearching">
                  <v-list-item-content>
                    <v-list-item-title>
                      No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-progress-circular
                  v-else
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="experience.area"
              label="Area / Departamento"
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-textarea
              v-model="experience.description"
              label="descripción"
              :rules="[rules.required]"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-btn small type="submit" color="success">Agregar</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
    <alert-message/>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import ExperienceComponent from './components/Experience.vue'

import experience from '../../services/experience'
import { Experience } from '../../interfaces/experience'
import { Organization } from '../../interfaces/organization'
export default Vue.extend({
  components:{
    ExperienceComponent
  },
  data () {
    return {
      experiences: [] as Experience[],
      experience: {} as Experience,
      organizations: [] as Organization[],
      organization: null as unknown as Organization,
      search: null,
      rules: { required: (value: string) => !!value || 'Requerido.' },
      isEmpty: false,
      isSearching: false,
    }
  },
  methods: {
    getExperience (): void {
      experience.getExperiences()
        .then((res) => {
          if (res.data.success) {
            if (res.data.experiences.length === 0) {
              this.isEmpty = true
            }
            this.experiences = res.data.experiences
          } else {
            this.$store.dispatch('alert/error', 'Error al obtener los registros')
          }
        })
    },
    getOrganizations(val: string): void {
      if (val.length > 0) {
        this.isSearching = true
        experience.getOrganizations(val)
          .then((res) => {
            this.organizations = res.data.organizations
            this.isSearching = false
          })
      }
    },
    setExperience(): void {
      if ((this.$refs.form as Vue & {validate: () => boolean}).validate()) {
        this.experience.idOrganization = this.organization.id
        experience.setExperience(this.experience)
          .then((res) => {
            if (res.data.success) {
              this.$store.dispatch('alert/success', 'Experiencia agregada')
              this.experiences.push(res.data.experience[0])
              this.$refs.form.reset()
              if (this.experiences.length > 0) {
                this.isEmpty = false
              }
            } else {
              this.$store.dispatch('alert/error', 'Ocurrió un error al agregar el registro')
            }
          })
      } else {
        this.$store.dispatch('alert/error', 'Complete los campos')
      }
    },
    unsetExperience(item: Experience, index: number) {
      experience.unsetExperience(item.id)
        .then((res) => {
          if (res.data.success) {
            this.$store.dispatch('alert/success', 'Registro eliminado')
            this.experiences.splice(index, 1)
            if (this.experiences.length === 0) {
              this.isEmpty = true
            }
          } else {
            this.$store.dispatch('alert/success', 'Ocurrió un error al eliminar el registro')
          }
        })
    }
  },
  watch: {
    search: function(val: string) {
      if (val) {
        this.getOrganizations(val)
      }
    }
    /* organization: {
      deep: true,
      handler: function (val: Organization) {
        if (val.name) {
          this.getOrganizations(val.name)
        }
      }
    } */
  },
  created() {
    this.getExperience()
  }
})
</script>