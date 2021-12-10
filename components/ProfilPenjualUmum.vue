<template>
  <v-card rounded="lg" elevation="6" raised>
    <v-container>
      <div class="teal--text">Umum</div>
      <div>Informasi umum, slogan, dll</div>

      <br />

      <v-form ref="form" v-model="valid">
        <v-card outlined rounded="lg">
          <v-container>
            <div>Info Penjual</div>
            <div
              class="d-flex align-center justify-space-between"
              v-if="!ubahInfo"
            >
              <div>{{ user.deskripsi }}</div>

              <v-btn
                text
                @click="ubahInfo = true"
                color="#008693"
                style="text-transform: none"
              >
                Ubah
              </v-btn>
            </div>

            <v-text-field
              v-model="formInfo"
              outlined
              dense
              append-icon="mdi-content-save"
              append-outer-icon="mdi-close"
              @click:append-outer="ubahInfo = false"
              @click:append="saveData('deskripsi', formInfo)"
              :rules="infoRules"
              v-else
            ></v-text-field>
          </v-container>
        </v-card>

        <br />

        <v-card outlined rounded="lg">
          <v-container>
            <div>Slogan</div>
            <div
              class="d-flex align-center justify-space-between"
              v-if="!ubahSlogan"
            >
              <div>{{ user.slogan }}</div>

              <v-btn
                text
                @click="ubahSlogan = true"
                color="#008693"
                style="text-transform: none"
              >
                Ubah
              </v-btn>
            </div>

            <v-text-field
              v-model="formSlogan"
              outlined
              dense
              append-icon="mdi-content-save"
              append-outer-icon="mdi-close"
              @click:append-outer="ubahSlogan = false"
              @click:append="saveData('slogan', formSlogan)"
              :rules="infoRules"
              v-else
            ></v-text-field>
          </v-container>
        </v-card>

        <br />

        <v-card outlined rounded="lg">
          <v-container>
            <div>Kota</div>
            <div
              class="d-flex align-center justify-space-between"
              v-if="!ubahKota"
            >
              <div>{{ user.kota }}</div>

              <v-btn
                text
                @click="ubahKota = true"
                color="#008693"
                style="text-transform: none"
              >
                Ubah
              </v-btn>
            </div>

            <v-text-field
              v-model="formKota"
              outlined
              dense
              append-icon="mdi-content-save"
              append-outer-icon="mdi-close"
              @click:append-outer="ubahKota = false"
              @click:append="saveData('kota', formKota)"
              :rules="kotaRules"
              v-else
            ></v-text-field>
          </v-container>
        </v-card>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'profil-penjual-umum',
  props: ['user'],
  data: () => ({
    valid: true,
    ubahInfo: false,
    ubahSlogan: false,
    ubahKota: false,
    formInfo: '',
    formSlogan: '',
    formKota: '',
    infoRules: [
      (v) => v.length >= 15 || 'Min. 15 karakter',
      (v) => v.length <= 150 || 'Maks. 150 karakter',
    ],
    kotaRules: [
      (v) => v.length >= 4 || 'Min. 4 karakter',
      (v) => v.length <= 60 || 'Maks. 60 karakter',
    ],
  }),
  async created() {
    this.formInfo = this.user.deskripsi
    this.formSlogan = this.user.slogan
    this.formKota = this.user.kota === null ? '' : this.user.kota
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    async saveData(param, value) {
      if (this.valid) {
        let formData = new FormData()

        formData.set(param, value)
        formData.set('id', this.user.id)

        await this.$axios
          .put('/user/v3/user', formData, {
            headers: { Authorization: 'Bearer ' + this.user.token },
          })
          .then((response) => {
            let { data } = response
            if (param === 'deskripsi') this.ubahInfo = false
            if (param === 'slogan') this.ubahSlogan = false
            if (param === 'kota') this.ubahKota = false
            this.setAlert({
              status: true,
              color: 'success',
              text: data.api_message,
            })
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
      } else {
        this.setAlert({
          status: true,
          color: 'error',
          text: 'Terdapat kesalahan pengisian',
        })
      }
    },
  },
}
</script>

<style>
</style>