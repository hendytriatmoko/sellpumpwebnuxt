<template>
  <div>
    <v-app-bar app color="#20929D" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container>
      <v-row dense>
        <v-col cols="12" sm="6" md="6" class="text-center">
          <v-autocomplete
            v-model="selectedType"
            label="Tipe Report"
            :items="types"
            hide-selected
            clearable
            @click:clear="clearType"
          ></v-autocomplete>
        </v-col>
      </v-row>

      <v-form ref="form" v-model="valid">
        <v-row dense>
          <v-col cols="12" sm="6" md="6">
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="Bulan / Tanggal"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                  clearable
                  :rules="dateRules"
                  required
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="date"
                @input="menu = false"
                :type="selectedType"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12" sm="6" md="6" class="text-center">
            <v-autocomplete
              v-model="selectedUser"
              label="User"
              :items="users"
              item-text="nama"
              item-value="id"
              hide-selected
              clearable
              @click:clear="$nextTick(() => (selectedUser = null))"
            ></v-autocomplete>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12" sm="6" md="6" class="text-center">
            <v-btn
              rounded
              color="#20929D"
              
              outlined
              @click="report"
              :disabled="!valid"
              :loading="loading"
            >
              Download
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'report',
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.initialize()
    })
  },
  data: () => ({
    date: null,
    menu: false,
    types: [
      {
        text: 'per Bulan',
        value: 'month',
      },
      {
        text: 'per Tanggal',
        value: 'date',
      },
    ],
    selectedType: null,
    users: [],
    selectedUser: null,
    dateRules: [(v) => !!v || 'Field is required'],
    valid: true,
    idBmr: null,
    loader: null,
    loading: false,
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    initialize() {
      if (this.user.id_mst_user_type == 1) {
        alert('Anda tidak berhak mengakses halaman ini')
        this.$router.push('/')
      }
    },
    clearType() {
      this.$nextTick(() => (this.selectedType = null))
      this.date = null
    },
    async userBmr() {
      await this.$axios
        .get('/search/v3/user_search', {
          params: {
            search: 'raharja',
            limit: 999,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          let hits = data.hits
          this.idBmr = hits.hits
          this.listUser()
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async listUser() {
      var i = 0
      var params = new URLSearchParams()
      for (i = 0; i < this.idBmr.length; i++) {
        params.append('id', this.idBmr[i]._source.id)
      }
      params.append('id_mst_user_type', 2)
      params.append('limit', 999)
      var request = {
        params: params,
        headers: { Authorization: 'Bearer ' + this.user.token },
      }
      await this.$axios
        .get('/user/v3/user', request)
        .then((response) => {
          let { data } = response.data
          this.users = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async report() {
      this.loader = 'loading'
      let formData = new FormData()
      formData.append('date', this.date)
      formData.append('id_app_user_ho', 2)
      if (this.selectedUser != null) {
        formData.append('id_app_user', this.selectedUser)
      }
      await this.$axios
        .post('/report/v3/reporttb', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          this.loader = null
          let { data } = response
          if (data.fileurl == '') {
            this.setAlert({
              status: true,
              color: 'error',
              text: 'Data Kosong',
            })
          } else {
            this.download(data.fileurl)
          }
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)

          if (error.response.status == 403) {
            this.setAuth({})
            this.$cookies.set('user', null)
            this.$cookies.set('prevUrl', this.$route.path)
            this.setAlert({
              status: true,
              color: 'error',
              text: responses.api_message,
            })
            this.$router.push('/login')
          }
        })
    },
    async download(filename) {
      await this.$axios
        .get('/report/download/' + filename, {
          headers: { Authorization: 'Bearer ' + this.user.token },
          responseType: 'arraybuffer',
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', '[' + this.date + ']' + ' Report.zip')
          document.body.appendChild(link)
          link.click()
          this.download = true
          setTimeout(() => {
            this.download = false
          }, 2000)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
  },
  async created() {
    await this.userBmr()
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 3000)
      this.loader = null
    },
  },
}
</script>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>