<template>
  <v-container>
    <h1>Experiencia</h1>
    <non-content v-if="isEmpty"></non-content>

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
              :searchInput.sync="search"
              clearable
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
export default Vue.extend({
  data () {
    return {
      experiences: [],
      experience: null,
      organizations: [],
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
      experience.getExperience(1) // EDITAR
        .then((res) => {
          console.log(res)
          if (res.data.success) {
            // this.color = 'success'
            // this.message = 'Registros obtenidos'
            if (res.data.experience.length === 0) {
              this.isEmpty = true
            }
            this.experience = res.data.experience
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
      console.log('Click')
    }
  },
  watch: {
    search (val) {
      if (val) {
        this.getOrganizations(val)
      }
    }
  },
  created() {
    this.getExperience()
  }
})
</script>