<template>
  <div>
    <app-bar />

    <v-app-bar app color="#22939E" dark v-if="$vuetify.breakpoint.xs">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div style="max-width: 1240px; margin: 0 auto !important">
      <v-row>
        <v-col cols="12" sm="6">
          <v-carousel
            v-model="carousel"
            hide-delimiters
            hide-delimiter-background
            show-arrows
            show-arrows-on-hover
            height="450"
          >
            <v-carousel-item
              v-for="(item, index) in fotos"
              :key="index"
              :src="getImage(item.src)"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
            </v-carousel-item>
          </v-carousel>

          <div class="d-flex justify-space-between mt-2">
            <v-card
              rounded="lg"
              hover
              v-for="(item, index) in fotos"
              :key="index"
              @click="carousel = index"
            >
              <v-img :src="getImage(item.src)" width="65" height="65"></v-img>
            </v-card>
          </div>

          <br />

          <div v-if="!guest">
            <v-row v-if="user.id == unitMokas.id_app_user">
              <v-col cols="6">
                <v-btn
                  block
                  color="#20929D"
                  dark
                  :to="'/garage/edit/' + $route.params.id"
                  :disabled="
                    unitMokas.id_mst_motor_bekas_status == 1 ||
                    unitMokas.id_mst_motor_bekas_status == 5
                      ? false
                      : true
                  "
                >
                  <v-icon left>mdi-pencil</v-icon> Ubah Iklan
                </v-btn>
              </v-col>

              <v-col cols="6">
                <v-btn
                  block
                  color="#20929D"
                  outlined
                  dark
                  @click="deleteUnit"
                  :disabled="
                    unitMokas.id_mst_motor_bekas_status == 1 ||
                    unitMokas.id_mst_motor_bekas_status == 5
                      ? false
                      : true
                  "
                >
                  <v-icon left>mdi-trash-can</v-icon> Hapus
                </v-btn>
              </v-col>

              <v-col cols="6">
                <v-btn
                  block
                  color="#20929D"
                  outlined
                  dark
                  @click="dialog = true"
                  v-on:click="getBarcode"
                >
                  <v-icon left>mdi-barcode-scan</v-icon> Barcode
                </v-btn>
              </v-col>

              <v-col cols="6">
                <v-btn
                  block
                  color="#20929D"
                  :disabled="iklan.length > 0 ? false : true"
                >
                  Lihat Iklan
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-col>

        <v-col cols="12" sm="6">
          <h2>Detail Unit</h2>

          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-img src="/img/icons/IdMotor.png"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>ID Motor</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>{{ $route.params.id }}</v-list-item-action>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item>
              <v-list-item-avatar>
                <v-img src="/img/icons/Merek.png"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Merk</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>{{ unitMokas.merk }}</v-list-item-action>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item>
              <v-list-item-avatar>
                <v-img src="/img/icons/Tipe.png"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Tipe</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>{{ unitMokas.type }}</v-list-item-action>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item>
              <v-list-item-avatar>
                <v-img src="/img/icons/Tahun.png"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Tahun</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>{{ unitMokas.tahun }}</v-list-item-action>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item>
              <v-list-item-avatar>
                <v-img src="/img/icons/Odo.png"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Odometer</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                {{ unitMokas.odometer }} KM
              </v-list-item-action>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item>
              <v-list-item-avatar>
                <v-img src="/img/icons/Warna.png"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Warna</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>{{ unitMokas.warna }}</v-list-item-action>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item>
              <v-list-item-avatar>
                <v-img src="/img/icons/CC.png"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>CC Mesin</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>{{ unitMokas.cc }} CC</v-list-item-action>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item>
              <v-list-item-avatar>
                <v-img src="/img/icons/Tranmisi.png"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Transmisi</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                {{ unitMokas.transmisi }}
              </v-list-item-action>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item>
              <v-list-item-avatar>
                <v-img src="/img/icons/Jenis.png"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Jenis Motor</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                {{ unitMokas.jenis_motor }}
              </v-list-item-action>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item v-if="unitMokas.lokasi_samsat != null">
              <v-list-item-avatar>
                <v-img src="/img/icons/Lok.png"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Lokasi Samsat</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                {{ unitMokas.lokasi_samsat }}
              </v-list-item-action>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item>
              <v-list-item-avatar>
                <v-img src="/img/icons/Lok.png"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Lokasi Motor</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>{{ unitMokas.lokasi }}</v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-avatar>
                <v-img src="/img/icons/STNK.png"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>STNK</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                {{ unitMokas.lembar_stnk ? 'Ada' : 'Tidak' }}
              </v-list-item-action>
            </v-list-item>

            <v-divider> </v-divider>

            <v-list-item v-if="unitMokas.lembar_stnk">
              <v-list-item-avatar>
                <v-img src="/img/icons/STNK.png"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Tanggal STNK</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                {{ moment.utc(unitMokas.tanggal_stnk).format('DD MMMM YYYY') }}
              </v-list-item-action>
            </v-list-item>

            <v-divider> </v-divider>

            <v-list-item>
              <v-list-item-avatar>
                <v-img src="/img/icons/Pajak.png"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Lembar Pajak</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                {{ unitMokas.lembar_pajak ? 'Ada' : 'Tidak' }}
              </v-list-item-action>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item v-if="unitMokas.lembar_pajak">
              <v-list-item-avatar>
                <v-img src="/img/icons/Pajak.png"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Tanggal Pajak</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                {{ moment.utc(unitMokas.tanggal_pajak).format('DD MMMM YYYY') }}
              </v-list-item-action>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item>
              <v-list-item-avatar>
                <v-img src="/img/icons/BPKB.png"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>BPKB</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                {{ unitMokas.lembar_bpkb ? 'Ada' : 'Tidak' }}
              </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Status</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                {{ unitMokas.status }}
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <v-dialog v-model="dialog">
        <v-card v-html="barcode"></v-card>
      </v-dialog>
    </div>
    <div v-if="unitMokas.id_mst_motor_bekas_status == 1">
      <v-btn block color="#20929D" dark :to="'/seller/add?id=' + unitMokas.id">
        Iklankan
      </v-btn>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'unit',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),

       Footer: () =>
      import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
  },
  data: () => ({
    carousel: 0,
    unitMokas: [],
    fotos: [],
    iklan: [],
    hits: [],
    dialog: false,
    barcode: '',
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user',
      guest: 'auth/guest',
    }),
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    async unit_mokas() {
      await this.$axios
        .get('/produk/v3/unit_mokas', {
          params: {
            id: this.$route.params.id,
            limit: 1,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.unitMokas = data[0]

          let foto1 = this.unitMokas.foto_1
          let foto2 = this.unitMokas.foto_2
          let foto3 = this.unitMokas.foto_3
          let foto4 = this.unitMokas.foto_4
          let foto5 = this.unitMokas.foto_5
          if (foto1 != null) {
            this.fotos.push({ src: foto1 })
          }
          if (foto2 != null) {
            this.fotos.push({ src: foto2 })
          }
          if (foto3 != null) {
            this.fotos.push({ src: foto3 })
          }
          if (foto4 != null) {
            this.fotos.push({ src: foto4 })
          }
          if (foto5 != null) {
            this.fotos.push({ src: foto5 })
          }
          // this.fotos.push(
          //   { src: foto1 },
          //   { src: foto2 },
          //   { src: foto3 },
          //   { src: foto4 },
          //   { src: foto5 }
          // )
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async linkIklan() {
      await this.$axios
        .get('/iklan/v3/link_iklan_tb', {
          params: {
            id_motor_bekas: this.$route.params.id,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.iklan = data[0]
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getDtlIklan(id) {
      await this.$axios
        .get('/search/v3/search', {
          params: {
            id: id,
            limit: 1,
          },
        })
        .then((response) => {
          let data = response.data
          let { hits } = data.hits
          this.hits = hits[0]._source
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async deleteUnit() {
      let r = confirm('Anda yakin akan menghapus unit ini?')

      if (r == true) {
        let formData = new FormData()

        formData.set('id', this.$route.params.id)
        formData.set('limit', 1)

        await this.$axios
          .post('/produk/v3/unit_mokas_delete', formData, {
            headers: { Authorization: 'Bearer ' + this.user.token },
          })
          .then((response) => {
            let { data } = response
            this.unitMokas = data.data

            this.setAlert({
              status: true,
              color: 'success',
              text: data.api_message,
            })

            this.$router.push('/account/profile/iklan-garasi')
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
      }
    },
    async getBarcode() {
      await this.$axios
        .get('/produk/v3/barcode', {
          params: {
            id: this.$route.params.id,
            limit: 1,
          },
        })
        .then((response) => {
          let { data } = response
          this.barcode = data
          this.dialog = true
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
  },
  async created() {
    await this.unit_mokas()
    await this.linkIklan()
  },
}
</script>

<style>
</style>