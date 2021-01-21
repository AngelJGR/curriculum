<template>
  <v-container>
    <h1>Experiencia</h1>
    <non-content v-if="isEmpty"></non-content>

    <v-card v-else>
      <v-row v-for="(item, index) in experiences" :key="item.id">
        <v-col cols="12" sm="6">
          {{index}} - {{item.id}} - {{item.description}}
        </v-col>
        <v-col cols="12" sm="4">
          {{ item.area }}
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn icon color="success">
            <v-icon>mdi-refresh-circle</v-icon>
          </v-btn>
          <v-btn icon color="error">
            <v-icon>mdi-delete-circle</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <v-divider></v-divider>
    <v-form lazy-validation ref="form" @submit.prevent="setExperience">
      <v-card>
        <v-row justify="center">
          <v-col cols="6">
            <v-combobox
              v-model="organization"
              :items="organizations"
              item-text="name"
              item-value="id"
              label="Organización"
              placeholder="Ingrese organización"
              :rules="[rules.required]"
              :search-input.sync="search"
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
          <v-col cols="6">
            <v-text-field
              v-model="experience.area"
              label="Area / Departamento"
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-textarea
              v-model="experience.description"
              label="descripción"
              :rules="[rules.required]"
            ></v-textarea>
          </v-col>
          <v-col cols="4">
            <!-- <v-slider
              color="red darken-4"
              min="1"
              max="100"
              label="porcentaje"
              :rules="[rules.required]"
            ></v-slider> -->
          </v-col>
          <v-col cols="2">
            <v-btn small type="submit" color="success">Agregar</v-btn>
          </v-col>
        </v-row>
        <v-card-actions>
        </v-card-actions>
      </v-card>
    </v-form>

    <alert-message
      :snackbar="snackbar"
      top
      :color="color"
      :message="message"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import experience from '../../services/experience'
import { Experience } from '../../interfaces/experience'
import { Organization } from '../../interfaces/organization'
export default Vue.extend({
  data () {
    return {
      experiences: [] as Experience[],
      experience: {} as Experience,
      organizations: [] as Organization[],
      // organization: {} as Organization,
      organization: null,
      search: null,
      rules: { required: (value: string) => !!value || 'Requerido.' },
      isEmpty: false,
      isSearching: false,
      snackbar: false,
      color: '',
      message: '',
    }
  },
  methods: {
    getExperience (): void {
      this.snackbar = false
      experience.getExperiences(1) // EDITAR
        .then((res) => {
          console.log(res)
          if (res.data.success) {
            if (res.data.experiences.length === 0) {
              this.isEmpty = true
            }
            this.experiences = res.data.experiences
          } else {
            this.snackbar = true
            this.color = 'error'
            this.message = 'Error al obtener los registros'
          }
        })
    },
    getOrganizations(val: string): void {
      if (val.length > 0) {
        this.isSearching = true
        experience.getOrganizations(1, val) // EDITAR
          .then((res) => {
            this.organizations = res.data.organizations
            this.isSearching = false
          })
      }
    },
    setExperience(): void {
      this.snackbar = false
      this.experience.idOrganization = this.organization.id
      this.experience.idPerson = 1 // EDITAR
      experience.setExperience(this.experience)
        .then((res) => {
          console.log(res)
          this.snackbar = true
          if (res.data.success) {
            this.color = 'success'
            this.message = 'Experiencia agregada'
            this.experiences.push(res.data.experience[0])
            this.$refs.form.reset()
          } else {
            this.color = 'error'
            this.message = 'Ocurrió un error al agregar el registro'
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