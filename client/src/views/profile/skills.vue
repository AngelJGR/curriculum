<template>
  <v-container>
    <h1>Habilidades</h1>
    <v-row v-if="isEmpty">
      <v-col cols="12">
        <non-content></non-content>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-card>
          <v-row justify="center">
            <v-col
              cols="12" sm="6" md="4"
              v-for="(skill) in skillsPerson" :key="skill.id"
            >
              <skill-component 
                :skill="skill"
                @unsetSkill="unsetSkill"
              >
              </skill-component>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-form lazy-validation ref="form" @submit.prevent="setSkill">
      <v-card :class="{'px-1': $vuetify.breakpoint.xs}" class="px-5 py-3">
        <v-row justify="center">
          <v-col cols="12" sm="6">
            <v-combobox
              v-model="skill"
              :items="skills"
              item-text="description"
              item-value="id"
              label="Habilidad"
              placeholder="Ingrese habilidad"
              :rules="[rules.required]"
              :search-input.sync="search"
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
          <v-col cols="12" sm="6">
            <v-slider
              v-model="score"
              color="red darken-4"
              min="1"
              max="100"
              label="porcentaje"
              :rules="[rules.required]"
            ></v-slider>
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
import skills from '../../services/skills'
import { Skill } from '../../interfaces/skill'
import SkillComponent from './components/Skill.vue'

export default Vue.extend({
  components: { SkillComponent },
  computed: {
    form(): Vue & { validate: () => boolean; reset: () => unknown } {
      return this.$refs.form as Vue & { validate: () => boolean; reset: () => unknown }
    }
  },
  data() {
    return {
      skills: [],
      skillsPerson: new Array<Skill>(),
      skill: null as unknown as Skill,
      score: 0,
      search: '',
      isSearching: false,
      isEmpty: false,
      rules: { required: (value: string) => !!value || 'Requerido.' },
    }
  },
  methods: {
    getSkillsPerson(): void {
      skills.getSkillsPerson()
        .then((res) => {
          if (res.data.skillsPerson.length === 0) {
            this.isEmpty = true
          } else {
            this.skillsPerson = res.data.skillsPerson
          }
        })
    },
    getSkills(val: string): void {
      if (val.length > 0) {
        this.isSearching = true
        skills.getSkills(val)
          .then((res) => {
            this.skills = res.data.skills
            this.isSearching = false
          })
      }
    },
    setSkill(): void {
      if (this.form.validate() && this.skill.description === this.search) {
        skills.setSkill(this.skill.id, this.score)
          .then((res) => {
            if (res.data.success) {
              this.$store.dispatch('alert/success', 'Habilidad agregada')
              this.skillsPerson.push(res.data.skill[0])
              this.form.reset()
              if (this.skillsPerson.length > 0) {
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
    unsetSkill(skillId: number): void {
      skills.unsetSkill(skillId)
        .then((res) => {
          if (res.data.success) {
            this.$store.dispatch('alert/success', 'Registro eliminado')
            const index = this.skillsPerson.map(skill => skill.id).indexOf(skillId)
            this.skillsPerson.splice(index, 1)
            if (this.skillsPerson.length === 0) {
              this.isEmpty = true
            }
          } else {
            this.$store.dispatch('alert/error', 'Ocurrió un error al eliminar el registro')
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