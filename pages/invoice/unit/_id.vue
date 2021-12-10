<template>
  <div>
    <app-bar />

    <v-app-bar app color="#20929D" dark v-if="$vuetify.breakpoint.xs">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div style="max-width: 1240px; margin: 0 auto !important">
      <h2 align="center">Detail Transaksi</h2>

      <v-alert type="error" prominent dense>
        Selalu waspada terhadap pihak yang tidak bertanggung jawab. Pastikan
        bukti pembayaran yang diupload sudah benar.
      </v-alert>

      <v-card
        rounded="lg"
        elevation="6"
        raised
        v-if="
          orders.id_mst_pembayaran_status == 1 ||
          orders.id_mst_pembayaran_status == 10
        "
      >
        <v-card-title class="justify-center">
          Batas waktu konfirmasi
        </v-card-title>

        <flip-countdown
          :deadline="
            moment
              .utc(orders.expired_at)
              .add(utc, 'h')
              .format('YYYY-MM-DD HH:mm:ss')
          "
        ></flip-countdown>

        <div class="text-center">
          <div class="d-inline-flex pa-2 mb-4 grey lighten-1">
            Sebelum:
            {{ moment.utc(orders.expired_at).format('DD MMM YYYY HH:mm') }}
            {{ timezone }}
          </div>
        </div>
      </v-card>

      <br />
      <v-card rounded="lg" raised>
        <v-card-title>Informasi Produk</v-card-title>
        <v-row align="center" class="pa-2">
          <v-col cols="5">
            <v-list class="pa-0">
              <v-list-item @click="go(orders.id_iklan, iklan.judul)">
                <v-list-item-avatar tile size="80">
                  <v-img :src="getImage(iklan.photo)"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold blue--text">
                    {{ iklan.judul }}
                  </v-list-item-title>
                  <v-list-item-title>
                    <b> Harga Awal </b>
                    Rp
                    {{
                      Number(orders.total_pembayaran).toLocaleString('id-ID')
                    }}
                  </v-list-item-title>
                  <v-list-item-title>
                    Jumlah: {{ orders.jumlah }} Unit
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-divider
            vertical
            color="#808080"
            style="display: inline"
          ></v-divider>
          <v-col cols="3">
            <div>Total Harga</div>
            <div class="red--text font-weight-bold">
              Rp
              {{ Number(orders.total_pembayaran).toLocaleString('id-ID') }}
            </div>
          </v-col>

          <v-col cols="3" align="right">
            <v-btn small color="#008693" dark @click="openPenawaran">
              Form Penawaran
            </v-btn>
            <div>Untuk bantuan klik <a href="\">disini </a></div>
            <v-dialog v-model="dialog">
              <v-container class="text-center" v-if="penawaran == null">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </v-container>

              <v-card v-html="penawaran"></v-card>
            </v-dialog>
          </v-col>
        </v-row>
        <br />

        <v-divider color="#000000" class="ml-2 mr-2"> </v-divider>

        <v-card-title>Informasi Tagihan</v-card-title>
        <v-row align="center" class="pa-2">
          <v-col cols="6">
            <div>Nomor Order</div>
            <div class="primary--text font-weight-bold">
              {{ orders.no_order }}
            </div>
            <br />
            <div>Tanggal Order</div>
            <div class="font-weight-bold">
              {{
                moment
                  .utc(orders.created_at)
                  .add(utc, 'h')
                  .format('DD MMM YYYY HH:mm')
              }}
              {{ timezone }}
            </div>
            <br />

            <div>Status</div>
            <div>
              {{ orders.pembayaran_status }}
            </div>
            <br />
            <div
              v-if="
                orders.id_mst_pembayaran_status == 6 ||
                orders.id_mst_pembayaran_status == 11 ||
                orders.id_mst_pembayaran_status == 12
              "
            >
              Alasan Dibatalkan
            </div>
            <div>
              <b>{{ orders.note_detail }}</b>
            </div>

            <br />
            <div
              v-if="
                orders.id_mst_pembayaran_status == 6 ||
                orders.id_mst_pembayaran_status == 11 ||
                orders.id_mst_pembayaran_status == 12
              "
            >
              Detail Alasan
            </div>
            <div>
              <b>{{ orders.note }}</b>
            </div>
          </v-col>

          <v-col cols="6">
            <div v-if="orders.id_pembeli == user.id">Nama Penjual</div>
            <div v-if="orders.id_pembeli == user.id">
              <b>{{ orders.nama_penjual }}</b>
            </div>
            <br />
            <div>Metode Bayar</div>
            <div>
              {{ orders.metode }}
            </div>
            <br />
            <div>Total Tagihan</div>
            <div>
              <b class="primary--text">
                Rp
                {{ Number(orders.total_pembayaran).toLocaleString('id-ID') }}
              </b>
            </div>
          </v-col>
        </v-row>

        <br />
        <v-divider color="#000000" class="ml-2 mr-2"> </v-divider>
        <div
          align="center"
          v-if="
            orders.id_mst_order_status != 3 &&
            orders.id_mst_pembayaran_status != 10
          "
        >
          <v-card-title>Bukti Pembayaran</v-card-title>
          <v-row align="center" class="pa-2">
            <div v-viewer="{ movable: false }" align="center">
              <img
                :src="gambar"
                contain
                class="mx-2"
                width="800"
                height="400"
                v-if="orders.id_mst_pembayaran_status > 1"
              />
            </div>
            <br />
          </v-row>
        </div>
        <v-divider color="#000000" class="ml-2 mr-2"> </v-divider>
        <div align="left">
          <v-card-title>Status Transaksi</v-card-title>

          <v-btn
            small
            color="teal"
            outlined
            width="30%"
            class="ml-4"
            @click="openLog"
          >
            Lacak Status
          </v-btn>
        </div>
        <v-container class="d-flex justify-space-between">
          <!-- <v-btn
            small
            color="teal"
            dark
            width="45%"
            :to="'/chat/' + orders.id_pembeli"
            v-if="orders.id_penjual == user.id"
          >
            Tanya Pembeli
          </v-btn>

          <v-btn
            small
            color="teal"
            dark
            width="45%"
            :to="'/chat/' + orders.id_penjual"
            v-else
          >
            Tanya Penjual
          </v-btn> -->

          <v-dialog v-model="statusOrder" persistent width="660">
            <v-card>
              <v-card-title class="d-flex align-center justify-space-between">
                <div>Status Transaksi</div>

                <v-btn icon @click="statusOrder = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>

              <v-divider></v-divider>

              <v-container class="text-center" v-if="log.length == 0">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </v-container>

              <v-timeline dense v-else>
                <v-timeline-item v-for="item in log" :key="item.id">
                  <div class="d-flex">
                    <div class="flex-column mr-4">
                      <div
                        :class="
                          item.updated_by_type == 1
                            ? 'teal white--text'
                            : item.updated_by_type == 3
                            ? 'orange white--text'
                            : 'grey white--text'
                        "
                      >
                        <div class="mx-2">
                          {{ item.updated_by_type_nama }}
                        </div>
                      </div>

                      <div class="text-right">
                        {{
                          moment(item.created_at)
                            .add(utc, 'h')
                            .format('DD MMM YYYY HH:mm')
                        }}
                        {{ timezone }}
                      </div>
                    </div>

                    <div class="flex-column">
                      <div>{{ item.pembayaran_status }}</div>
                      <div class="text-caption">{{ item.aktivitas }}</div>
                    </div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card>
          </v-dialog>
        </v-container>
      </v-card>
      <v-dialog v-model="dialogBatal" persistent max-width="500px">
        <v-form ref="form" v-model="valid">
          <v-card>
            <v-toolbar dark color="teal darken-3">
              <v-toolbar-title>Alasan Pembatalan</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon @click="dialogBatal = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-select
              v-model="note"
              :items="noteTolak"
              :rules="AlasanRules"
              item-text="note"
              item-value="id"
              label="Alasan Tolak (Wajib Dipilih)"
              solo
              class="px-2 pt-2"
            ></v-select>

            <v-textarea
              label="Alasan Menolak"
              v-model="noteDetail"
              rows="1"
              auto-grow
              class="mx-4"
              v-if="note == 1"
            ></v-textarea>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="blue darken-1"
                class="white--text"
                @click="batalkan"
                :disabled="!valid"
              >
                Batalkan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>

      <br />
      <div align="center" class="mt-4">
        <h3 v-if="orders.id_mst_pembayaran_status == 10">
          Silahkan lakukan konfirmasi transaksi
        </h3>
        <v-btn
          color="teal"
          dark
          width="45%"
          @click="konfirmasiPenjual"
          v-if="
            orders.id_mst_pembayaran_status == 10 &&
            orders.id_penjual == user.id
          "
        >
          Konfirmasi
        </v-btn>

        <v-btn
          width="45%"
          color="red"
          dark
          v-if="
            orders.id_mst_pembayaran_status == 10 ||
            orders.id_mst_pembayaran_status == 4
          "
          @click="openBatal"
        >
          Batalkan
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FlipCountdown from 'vue2-flip-countdown'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import Vue from 'vue'

Vue.use(Viewer)

export default {
  name: 'invoice',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
    FlipCountdown,
  },
  data: () => ({
    orders: [],
    iklan: [],
    statusOrder: false,
    log: [],
    dialog: false,
    penawaran: null,
    foto: null,
    gambar: null,
    konfirmasiPenjual: false,
    dialogBatal: false,
    valid: true,
    note: 0,
    noteTolak: [],
    AlasanRules: [(v) => !!v || 'Anda belum memilih alasan pembatalan'],
    noteDetail: '',
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user',
      utc: 'timezone/utc',
      timezone: 'timezone/region',
    }),
  },
  methods: {
    ...mapActions({
      setSellertId: 'product/setSeller',
      setProductId: 'product/setProduct',
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    async getOrder() {
      await this.$axios
        .get('/transaksi/v3/order', {
          params: {
            id: this.$route.params.id,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.orders = data[0]
          if (this.orders.id_mst_order_type == 1) {
            this.iklan = this.orders.iklan
          }
          if (
            this.orders.id_mst_pembayaran_status == 4 ||
            this.orders.id_mst_pembayaran_status == 2
          ) {
            this.dtlPembayaran()
          }
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async logStatus() {
      await this.$axios
        .get('/log/v3/log/transaksi', {
          params: {
            id_order: this.$route.params.id,
            limit: 20,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.log = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async openLog() {
      this.statusOrder = true
      await this.logStatus()
    },
    seller(id, name) {
      this.setSellertId(id)
      this.$router.push('/seller/' + name.toLowerCase().replace(/ /g, '-'))
    },
    go(id, name) {
      this.setProductId(id)
      this.$router.push(
        '/detail-iklan/' + name.toLowerCase().replace(/ /g, '-').replace(/[/]/g,'-')+'-'+id
      )
    },
    async formPenawaran() {
      await this.$axios
        .get('/transaksi/v3/form_penawaran', {
          params: {
            id: this.orders.id,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.penawaran = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async openPenawaran() {
      this.dialog = true
      await this.formPenawaran()
    },
    async dtlPembayaran() {
      await this.$axios
        .get('/transaksi/v3/upload_pembayaran', {
          params: {
            id_pembayaran: this.orders.id_pembayaran,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.foto = data[0].foto

          this.getGambar()
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getGambar() {
      await this.$axios
        .get(this.getImage(this.foto), {
          responseType: 'arraybuffer',
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          var bytes = new Uint8Array(response.data)
          var binary = bytes.reduce(
            (data, b) => (data += String.fromCharCode(b)),
            ''
          )
          this.gambar = 'data:image/jpeg;base64,' + btoa(binary)
        })
    },
    async detailTolak() {
      await this.$axios
        .get('/transaksi/v3/mst_pembayaran_note', {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.noteTolak = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async openBatal() {
      this.dialogBatal = true
      await this.detailTolak()
    },
    async konfirmasiPenjualan() {
      var r = confirm('Lanjutkan untuk proses serah terima?')
      if (r == true) {
        let formData = new FormData()

        formData.set('id', this.orders.id)

        await this.$axios
          .post('/transaksi/v3/konfirmasi_persetujuan_penjual', formData, {
            headers: { Authorization: 'Bearer ' + this.user.token },
          })
          .then((response) => {
            let { data } = response
            this.setAlert({
              status: true,
              color: 'success',
              text: data.api_message,
            })
            this.getOrder()
          })
          .catch((error) => {
            let responses = error.response.data
            this.setAlert({
              status: true,
              color: 'success',
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
      }
    },
    async getUsers() {
      await this.$axios
        .get('/user/v3/user', {
          params: {
            id: this.orders.id_pembeli,
            limit: 1,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.pengguna = data[0]
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    onFileChange() {
      if (!this.buktiBayar) {
        return false
      }
      if (!this.buktiBayar.type.match('image.*')) {
        return false
      }

      this.hasImage = true

      const reader = new FileReader()

      reader.onload = (e) => {
        this.previewUrl = e.target.result
      }
      reader.readAsDataURL(this.buktiBayar)
    },
    async upload() {
      let formData = new FormData()

      formData.set('id_pembayaran', this.orders.id_pembayaran)
      formData.set('foto', this.buktiBayar)
      formData.set('created_by_type', 1)
      formData.set('created_by', this.user.id)

      await this.$axios
        .post('/transaksi/v3/upload_pembayaran', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.getOrder()
          this.dtlPembayaran()
        })
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'success',
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
    },
    async detailTolak() {
      await this.$axios
        .get('/transaksi/v3/mst_pembayaran_note', {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.noteTolak = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async batalkan() {
      var r = confirm('Yakin ingin membatalkan order berikut?')
      if (r == true) {
        let formData = new FormData()

        formData.set('id', this.orders.id)
        formData.set('id_app_user', this.user.id)
        formData.set('id_mst_pembayaran_note', this.note)
        formData.set('note_detail', this.noteDetail)

        await this.$axios
          .post('/transaksi/v3/batalkan_pembelian', formData, {
            headers: { Authorization: 'Bearer ' + this.user.token },
          })
          .then((response) => {
            let { data } = response
            this.setAlert({
              status: true,
              color: 'success',
              text: data.api_message,
            })
            this.getOrder()
          })
          .catch((error) => {
            let responses = error.response.data
            this.setAlert({
              status: true,
              color: 'success',
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
      }
    },
    async konfirmasi() {
      var r = confirm('Yakin ingin mengkonfirmasi pembayaran berikut?')
      if (r == true) {
        let formData = new FormData()

        formData.set('id', this.orders.id)

        await this.$axios
          .post('/transaksi/v3/konfirmasi_serah_terima', formData, {
            headers: { Authorization: 'Bearer ' + this.user.token },
          })
          .then((response) => {
            let { data } = response
            this.setAlert({
              status: true,
              color: 'success',
              text: data.api_message,
            })
            this.getOrder()
            this.dtlPembayaran()
            this.dialogKonfirmasi = false
            this.dialogTolak = false
          })
          .catch((error) => {
            let responses = error.response.data
            this.setAlert({
              status: true,
              color: 'success',
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
      }
    },
    async konfirmasiTolak() {
      var r = confirm('Yakin ingin menolak pembayaran berikut?')
      if (r == true) {
        let formData = new FormData()

        formData.set('id', this.orders.id)
        formData.set('id_app_user', this.user.id)
        formData.set('id_mst_pembayaran_note', this.note)
        formData.set('note_detail', this.noteDetail)

        await this.$axios
          .post('/transaksi/v3/tolak_serah_terima', formData, {
            headers: { Authorization: 'Bearer ' + this.user.token },
          })
          .then((response) => {
            let { data } = response
            this.setAlert({
              status: true,
              color: 'success',
              text: data.api_message,
            })
            this.dialogKonfirmasi = false
            this.dialogTolak = false
            this.getOrder()
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
  },
  async created() {
    await this.getOrder()
  },
}
</script>

<style>
</style>