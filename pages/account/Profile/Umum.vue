<template>
  <div>

    <h2>Profil Umum</h2>

    <br />

    <v-form ref="form">
      <v-card rounded="lg" elevation="6" raised>
        <v-container>
          <div class="teal--text">Nama Akun</div>
          <div
            class="d-flex align-center justify-space-between"
            v-if="!ubahNama"
          >
            <div>{{ user.nama }}</div>

            <v-btn
              text
              @click="ubahNama = true"
              color="#008693"
              style="text-transform: none"
            >
              Ubah
            </v-btn>
          </div>

          <v-text-field
            v-model="user.nama"
            outlined
            dense
            append-icon="mdi-content-save"
            append-outer-icon="mdi-close"
            @click:append-outer="ubahNama = false"
            @click:append="saveData('nama', user.nama)"
            :rules="namaRules"
            v-else
          ></v-text-field>
        </v-container>
      </v-card>

      <br />

      <v-card rounded="lg" elevation="6" raised>
        <div class="d-flex align-center justify-space-between">
          <v-container>
          <div class="teal--text">Nomor Handphone</div>
          <div class="d-flex align-center justify-space-between" v-if="!ubahNo">
            <div>{{ user.no_telp }}</div>

            <v-btn
              text
              @click="ubahNo = true"
              color="#008693"
              style="text-transform: none"
            >
              Ubah
            </v-btn>
          </div>

          <v-text-field
            v-model="user.no_telp"
            outlined
            dense
            append-icon="mdi-content-save"
            append-outer-icon="mdi-close"
            @click:append-outer="ubahNo = false"
            @click:append="saveData('no_telp', user.no_telp)"
            :rules="waRules"
            v-else
          ></v-text-field>
        </v-container>
        </div>
      </v-card>

      <br />

      <v-card rounded="lg" elevation="6" raised>
        <div class="d-flex align-center justify-space-between">
          <v-container>
            <div class="teal--text">Alamat Email</div>
            <div>{{ user.email }}</div>
          </v-container>
          <v-icon
            color="#008693"
            medium
            class="mr-4 ml-1"
            v-if="user.verifikasi == 'Y'"
          >
            mdi-check-decagram
          </v-icon>
        </div>
      </v-card>
      <br />

      
    </v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
import FlipCountdown from 'vue2-flip-countdown'
import VueCountdown from '@chenfengyuan/vue-countdown'
Vue.component(VueCountdown.name, VueCountdown)

export default {
  name: 'profil-umum',
  data: () => ({
    namaRules: [(v) => !!v || 'Nama harus diisi!'],
    deskripsiRules: [(v) => v.length >= 5 || 'Min. 5 karakter',],
    ubahNo: false,
    ubahNama: false,
    waRules: [
      (v) => v.length >= 10 || 'Min. 10 karakter',
      (v) =>
        /^[+]?[(]?[0-9]{3,4}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{1,8}$/im.test(v) ||
        'Nomor hp varus valid',
    ],
  }),
  computed: {
    ...mapGetters({
      guest: 'auth/guest',
      user: 'auth/user',
      utc: 'timezone/utc',
      timezone: 'timezone/region',
    }),
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    async saveData(param, value) {
        let formData = new FormData()

        formData.set(param, value)
        formData.set('id_user', this.user.id_user)

        await this.$axios
          .put('/user/v1/user/update', formData)
          .then((response) => {
            let { data } = response
            if (param === 'nama') {
              this.ubahNama = false
              this.setAlert({
                status: true,
                color: 'success',
                text: 'Nama berhasil diupdate',
              })
            }
            if (param === 'no_telp') {
              this.ubahNo = false
              this.setAlert({
                status: true,
                color: 'success',
                text: 'No Telepon berhasil diupdate',
              })
            }
            
            this.setAuth(data.data[0])
            this.$cookies.set('user', JSON.stringify(data.data[0]))
          })
          .catch((error) => {
            let responses = error.response.data
            this.setAlert({
              status: true,
              color: 'error',
              text: responses.api_message,
            })

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
      // console.log('nama', param)
      // console.log('value', value)
    },
  },
  async created() {
    console.log('user', this.user)
  },
  async mounted() {
    
  },
}
</script>

<style>
#riwayat{
  height: 200px;
  overflow-y: scroll;
}
#foto{
  display: none;
}
</style>