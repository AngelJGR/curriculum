<template>
  <v-container>
    <h1>Formación</h1>
    <non-content v-if="isEmpty"></non-content>
    <v-card>
      <v-row>
        <v-col cols="6">
          <v-autocomplete
            label="Seleccione una carrera"
            v-model="collegeDegree"
            :items="collegeDegrees"
            :item-text="(obj) => obj.description"
            :item-value="(obj) => obj.id"
            return-object
            clearable
          ></v-autocomplete>
          <!-- <v-combobox
            v-model="collegeDegree"
            :items="collegeDegrees"
            :item-text="description"
            :search-input.sync="searchCollegeDegree"
            hide-selected
            label="Carreras"
            persistent-hint
            :return-object="false"
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    No results matching "<strong>{{ searchCollegeDegree }}</strong>". Press <kbd>enter</kbd> to create a new one
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-combobox> -->
        </v-col>


        <v-col cols="4">
          <v-autocomplete
            label="Seleccione un instituto"
            v-model="college"
            :items="colleges"
            item-text="name"
            item-value="id"
            :search-input.sync="searchCollege"
          ></v-autocomplete>
        </v-col>
        <v-col cols="2"></v-col>
      </v-row>
      <v-card-actions>
        <v-btn @click="addFormation" color="success">Agregar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>

import formation from '../../services/formation'
export default {
  data() {
    return {
      isEmpty: false,
      colleges: [],
      college: null,
      collegeDegrees: [],
      collegeDegree: null,
      searchCollege: null,
      searchCollegeDegree: null
    }
  },
  methods: {
    addFormation() {
      console.log('Añade formación')
    },
    /* setCollege() {

    } */
  },
  created() {
    formation.getFormation('1')
      .then((res) => {
        console.log(res.data.college_degree)
        if (res.data.college_degree_person.length === 0) {
          this.isEmpty = true
        }
        this.colleges = res.data.college || null
        this.collegeDegrees = res.data.college_degree
      })
    /* formation.getColleges()
      .then((res) => {
        console.log(res.data)
        this.colleges = res.data.college || null
      }) */
  },
  watch: {
    searchCollegeDegree (val) {
      formation.getCollegeDregrees(val)
        .then((res) => {
          console.log(res.data)
          this.collegeDegrees.concat(res.data.college_degree)
        })
    }
  }
}
</script>