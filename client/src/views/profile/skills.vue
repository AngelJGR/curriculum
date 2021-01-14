<template>
  <v-container>
    <h1>Habilidades</h1>
    <non-content v-if="isEmpty"></non-content>
    <v-card v-else>
      <v-row v-for="(item, index) in skillsPerson" :key="item.id">
        <v-col cols="12" sm="6">
          {{index}} - {{item.description}}
        </v-col>
        <v-col cols="12" sm="4">
          {{item.score}}
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
    <v-form lazy-validation ref="form" @submit.prevent="setSkill">
      <v-card>
        <v-row justify="center">
          <v-col cols="6">
            <v-combobox
              v-model="skill"
              :items="skills"
              label="Habilidad"
              item-text="description"
              placeholder="Ingrese habilidad"
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
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import skills from '../../services/skills'

export default Vue.extend({
  data() {
    return {
      skills: [],
      skillsPerson: [],
      skillPerson: null,
      skill: null,
      score: null,
      search: null,
      isSearching: false,
      isEmpty: false,
      rules: {
        required: value => !!value || 'Requerido.',
      }
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
          console.log(res)
        })
    },
    getSkills(val) {
      this.isSearching = true
      skills.getSkills(1, val) //EDITAR
        .then((res) => {
          this.skills = res.data.skills
          this.isSearching = false
        })
    },
    setSkill() {
      if (this.$refs.form.validate() && this.skill.description === this.search) {
        skills.setSkill(1, this.skill.id, this.score) // EDITAR
          .then((res) => {
            console.log(res)
            this.skillsPerson.push(res.data.skill)
          })
      }
    }
  },
  watch: {
    search (val) {
      this.getSkills(val)
    }
  },
  created() {
    this.getSkillsPerson()
  }
})
</script>