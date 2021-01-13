<template>
  <v-container>
    <h1>Habilidades</h1>
    <non-content v-if="isEmpty"></non-content>

    <v-divider></v-divider>
    <v-form lazy-validation ref="form" @submit.prevent="setSkill">
      <v-card>
        <v-row justify="center">
          <v-col cols="6">
            <v-text-field
              label="Habilidad"
              placeholder="Describa habilidad"
              v-model="skill.description"
              :rules="[rules.required]"
            ></v-text-field>
            <!-- <v-autocomplete
              label="Seleccione una carrera"
              v-model="collegeDegree"
              :items="collegeDegrees"
              :item-text="(obj) => obj.description"
              :item-value="(obj) => obj.id"
              return-object
              clearable
              :rules="[rules.required]"
            ></v-autocomplete> -->
          </v-col>
          <v-col cols="4">
            <v-slider
              v-model="skill.score"
              color="red darken-4"
              min="1"
              max="100"
              label="porcentaje"
              :rules="[rules.required]"
            ></v-slider>
            <!-- <v-autocomplete
              label="Seleccione un instituto"
              v-model="college"
              :items="colleges"
              item-text="name"
              item-value="id"
              return-object
              clearable
              :rules="[rules.required]"
            ></v-autocomplete> -->
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
      skill: {
        id: null,
        description: null,
        score: null
      },
      isEmpty: false,
      rules: {
        required: value => !!value || 'Requerido.',
      }
    }
  },
  methods: {
    getSkills() {
      skills.getSkills(1)
        .then((res) => {
          if (res.data.skills.length === 0) {
            this.isEmpty = true
          }
        })
    },
    setSkill() {
      if (this.$refs.form.validate()) {
        console.log(this.skill)
        skills.setSkill()
          .then((res) => {
            console.log(res)
          })
      }
    }
  },
  created() {
    this.getSkills()
  }
})
</script>