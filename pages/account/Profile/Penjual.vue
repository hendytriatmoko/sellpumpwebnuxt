<template>
  <div>
    <h2>Profil Penjual</h2>

    <br />

    <v-row>
      <v-col cols="12" sm="8">
        <profil-penjual-umum :user="user" />
      </v-col>

      <v-col cols="12" sm="4">
        <v-card rounded="lg" elevation="6" raised>
          <v-card-title class="d-flex align-center justify-space-between">
            <div>Penilaian Saya</div>

            <v-btn icon>
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-card-title>

          <v-divider></v-divider>

          <v-row align="center" no-gutters>
            <v-col cols="6" align="center">
              <div class="teal--text text-caption">
                <div v-if="avg.ratting_user == 0">belum ada rating</div>

                <div v-if="avg.ratting_user == 1">
                  <v-avatar size="50" item>
                    <v-img
                      src="/img/icons/emoji_tidakpuas.png"
                      alt="kecewa"
                    ></v-img>
                  </v-avatar>

                  <div>Kurang Memuaskan</div>
                </div>

                <div v-if="avg.ratting_user == 2">
                  <v-avatar size="40" item>
                    <v-img
                      src="/img/icons/emoji_netral.png"
                      alt="netral"
                    ></v-img>
                  </v-avatar>

                  <div>Cukup Memuaskan</div>
                </div>

                <div v-if="avg.ratting_user == 3">
                  <v-avatar size="25" item>
                    <v-img src="/img/icons/emoji_puas.png" alt="puas"></v-img>
                  </v-avatar>

                  <div>Sangat Memuaskan</div>
                </div>
              </div>
            </v-col>

            <v-col cols="6" align="center">
              <v-icon color="yellow" x-large>mdi-star</v-icon>
              <div>{{ avg.ratting_iklan }} / 5.0</div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <br />

    <v-row>
      <v-col cols="12">
        <catatan-kebijakan :user="user" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card rounded="lg" elevation="6" raised>
          <v-container>
            <div class="teal--text">Pesan Otomatis</div>
            <div>Kustomisasi pesan otomatis disini</div>

            <v-card-text>
              <div>
                Pesan berikut akan otomatis dikirimkan kepada pemenang dari
                iklan tawar bersama yang Anda pasang.
              </div>
              <div>
                Jika Anda belum melakukan kustomisasi, kami akan mengirimkan
                pesan default.
              </div>
            </v-card-text>

            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="chat"
                :rules="chatRules"
                counter="300"
                filled
                label="Pesan Default"
                hint="*Nama Iklan akan muncul diakhir kalimat"
                persistent-hint
              ></v-text-field>
            </v-form>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="teal"
                class="white--text"
                :disabled="!valid"
                @click="save"
              >
                Simpan
              </v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'profil-penjual',
  props: ['user'],
  components: {
    ProfilPenjualUmum: () =>
      import(
        /* webpackChunkName: "profil-penjual-umum" */ '@/components/ProfilPenjualUmum.vue'
      ),
    CatatanKebijakan: () =>
      import(
        /* webpackChunkName: "catatan-kebijakan" */ '@/components/CatatanKebijakan.vue'
      ),
  },
  data: () => ({
    valid: true,
    chat: '',
    chatRules: [
      (v) => !!v || 'Field is required',
      (v) => v.length <= 300 || 'Max 300 characters',
    ],
    template:
      'Selamat kamu sudah memenangkan Iklan Tawar Bersama. Yuk segera hubungi kami :)',
    avg: [],
  }),
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    async getTemplate() {
      await this.$axios
        .get('/user/v3/user/template_chat', {
          params: {
            id_app_user: this.user.id,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.chat = data.chat
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)

          this.chat = this.template
        })
    },
    async save() {
      let formData = new FormData()

      formData.set('id_app_user', this.user.id)
      formData.set('chat', this.chat)

      await this.axios
        .post('/user/v3/user/template_chat', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
        })
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            text: responses.api_message,
          })
        })
    },
    async reviewAvg() {
      await this.$axios
        .get('/transaksi/v3/review_avg', {
          params: {
            id_penjual: this.user.id,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.avg = data[0]
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
  },
  async created() {
    await this.getTemplate()
    await this.reviewAvg()
  },
}
</script>

<style>
</style>