<template>
  <v-container>
    <h1>Habilidades</h1>
    <non-content v-if="isEmpty"></non-content>
    <v-card v-else>
      <v-row v-for="(item, index) in skillsPerson" :key="item.id">
        <v-col cols="12" sm="6">
          {{index}} - {{item.id}} - {{item.description}}
        </v-col>
        <v-col cols="12" sm="4">
          <v-progress-circular
            size="80"
            width="10"
            :value="item.score"
            :color="getColor(item.score)"
          ><span class="headline">{{item.score}}</span>
          </v-progress-circular>
        </v-col>
        <v-col cols="12" sm="2">
          <v-btn icon color="success">
            <v-icon>mdi-refresh-circle</v-icon>
          </v-btn>
          <v-btn icon color="error" @click="unsetSkill(item, index)">
            <v-icon>mdi-delete-circle</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <v-divider></v-divider>
    <v-form lazy-validation ref="form" @submit.prevent="setSkill">
      <v-card>
        <v-row justify="center">
          <v-col cols="6">
            <v-combobox
              v-model="skill"
              :items="skills"
              item-text="description"
              item-value="id"
              label="Habilidad"
              placeholder="Ingrese habilidad"
              :rules="[rules.required]"
              :searchInput.sync="search"
              clearable
              @keypress.enter="addSkill"
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
            <v-slider
              v-model="score"
              color="red darken-4"
              min="1"
              max="100"
              label="porcentaje"
              :rules="[rules.required]"
            ></v-slider>
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
      :color="color"
      :message="message"
    />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import skills from '../../services/skills'
import { Skill } from '../../interfaces/skill'

export default Vue.extend({
  data() {
    return {
      skills: [],
      skillsPerson: [] as Skill[],
      skillPerson: {},
      skill: '',
      score: 0,
      search: null,
      isSearching: false,
      isEmpty: false,
      rules: { required: (value: string) => !!value || 'Requerido.' },
      snackbar: false,
      color: '',
      message: '',
    }
  },
  methods: {
    getSkillsPerson() {
      skills.getSkillsPerson(1) // EDITAR
        .then((res) => {
          if (res.data.skillsPerson.length === 0) {
            this.isEmpty = true
          }
          this.skillsPerson = res.data.skillsPerson
        })
    },
    getSkills(val: string) {
      if (val.length > 0) {
        this.isSearching = true
        skills.getSkills(1, val) //EDITAR
          .then((res) => {
            this.skills = res.data.skills
            this.isSearching = false
          })
      }
    },
    getColor(score: number): string {
      return score < 20 ? 'red' : score < 40 ? 'yellow' : score < 80 ? 'primary' : 'success'
    },
    setSkill() {
      if ((this.$refs.form as Vue & { validate: () => boolean }).validate() && this.skill.description === this.search) {
        this.snackbar = false
        skills.setSkill(1, this.skill.id, this.score) // EDITAR
          .then((res) => {
            this.snackbar = true
            if (res.data.success) {
              this.color = 'success'
              this.message = 'Habilidad agregada'
              this.skillsPerson.push(res.data.skill[0])
              this.$refs.form.reset()
              if (this.skillsPerson.length > 0) {
                this.isEmpty = false
              }
            } else {
              this.color = 'error'
              this.message = 'Ocurrió un error al agregar el registro'
            }
          })
      }
    },
    unsetSkill(item: Skill, index: number) {
      this.snackbar = false
      skills.unsetSkill(item.id)
        .then((res) => {
          this.snackbar = true
          if (res.data.success) {
            this.color = 'success'
            this.message = 'Registro eliminado'
            this.skillsPerson.splice(index, 1)
            if (this.skillsPerson.length === 0) {
              this.isEmpty = true
            }
          } else {
            this.color = 'error'
            this.message = 'Ocurrió un error al eliminar el registro'
          }
        })
    },
    addSkill() { // PARA AGREGAR SKIILL NO EXISTENTE
      console.log('Valor...', this.search)
    }
  },
  watch: {
    search (val) {
      if (val) {
        this.getSkills(val)
      }
    }
  },
  created() {
    this.getSkillsPerson()
  }
})
</script>