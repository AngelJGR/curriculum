<template>
  <v-container>
    <h1>Formación</h1>
    <non-content v-if="isEmpty"></non-content>
    <v-card v-else>
      <v-row v-for="item in formation" :key="item.id">
        <v-col cols="12" md="6">
          {{item.college_degree}}
        </v-col>
        <v-col cols="12" md="4">
          {{item.college}}
        </v-col>
        <v-col cols="12" md="2">
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
            return-object
            clearable
          ></v-autocomplete>
        </v-col>
        <v-col cols="2"></v-col>
      </v-row>
      <v-card-actions>
        <v-btn @click="setCollegeDegree" color="success">Agregar</v-btn>
      </v-card-actions>
    </v-card>
    <alert-message
      :snackbar="snackbar"
      top
      :color="color"
      :message="message"
    />
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
      formation: null,
      snackbar: false,
      color: '',
      message: '',
      // searchCollege: null,
      // searchCollegeDegree: null
    }
  },
  methods: {
    setCollegeDegree() {
      this.snackbar = false
      formation.setCollegeDegree(1, this.collegeDegree.id, this.college.id_college)
        .then((res) => {
          this.snackbar = true
          if (res.data.success) {
            this.color = 'success'
            this.message = 'Datos ingresados exitósamente'
            this.formation.push(res.data.college_degree_person[0])
            this.collegeDegree = null
            this.college = null
          } else {
            this.color = 'error'
            this.message = 'Ocurrió un error al ingresar datos'
          }
        })
    },
  },
  created() {
    formation.getFormation('1')
      .then((res) => {
        if (res.data.college_degree_person.length === 0) {
          this.isEmpty = true
        }
        this.colleges = res.data.college || null
        this.collegeDegrees = res.data.college_degree
        this.formation = res.data.college_degree_person
      })
    /* formation.getColleges()
      .then((res) => {
        console.log(res.data)
        this.colleges = res.data.college || null
      }) */
  },
  /* watch: {
    searchCollegeDegree (val) {
      formation.getCollegeDregrees(val)
        .then((res) => {
          console.log(res.data)
          this.collegeDegrees.concat(res.data.college_degree)
        })
    }
  } */
}
</script>