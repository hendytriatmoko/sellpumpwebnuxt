<template>
  <div>
    <app-bar />

    <v-app-bar app color="#20929D" dark v-if="$vuetify.breakpoint.xs">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>
    <v-alert class="mx-6 mt-3" type="error" prominent dense outlined>
        Selalu waspada terhadap pihak yang tidak bertanggung jawab. Pastikan
        bukti pembayaran yang diupload sudah benar.
    </v-alert>
    <v-card 
        :style="user.id_type_pinalti == 0 ? 'border-left:10px solid green'
        : user.id_type_pinalti == 1 ? 'border-left:10px solid #F2C94C;'
        : user.id_type_pinalti == 2 ? 'border-left:10px solid #F2994A;'
        : user.id_type_pinalti == 3 ? 'border-left:10px solid #EB5757;' : ''"
        rounded="lg" 
        elevation="6" 
        raised class="mx-6 mt-3" >

        <v-card-title  class="d-flex align-center justify-space-between">
        <div class="d-flex align-center"> 
            <v-avatar size="40" class="mr-1">
                <v-img
            src="/img/icons/akun_aman.webp"
            contain
            v-if="user.id_type_pinalti == 0"
        ></v-img>

        <v-img
            src="/img/icons/akun_wanprestasi1.webp"
            contain
            v-if="user.id_type_pinalti == 1"
        ></v-img>

        <v-img
            src="/img/icons/akun_wanprestasi2.webp"
            contain
            v-if="user.id_type_pinalti == 2"
        ></v-img>

        <v-img
            src="/img/icons/akun_blokir.webp"
            contain
            v-if="user.id_type_pinalti == 3"
        ></v-img>
            </v-avatar>
            <h3>Harap Diperhatikan!</h3>     
        </div>
        </v-card-title>
        <v-card-text class="pl-15">        
        <h4 v-if="user.id_type_pinalti == 0">
            Akun Anda tidak pernah melakukan pembatalan transaksi. Hindari
            pembatalan transaksi agar akun anda tidak diblokir.
        </h4>

        <h4 v-if="user.id_type_pinalti == 1">
            Anda telah melakukan 1x pembatalan transaksi pembelian. Hindari pembatalan kembali
            agar akun anda tidak terkena suspend ( tidak dapat melakukan penawaran selama 7 hari )
        </h4>

        <h4 v-if="user.id_type_pinalti == 2">
            Anda telah melakukan 14x pembatalan transaksi pembelian. Hindari pembatalan kembali
            agar akun anda tidak terkena suspend ( tidak dapat melakukan penawaran selama 14 hari )
        </h4>

        <h4 v-if="user.id_type_pinalti == 3">
            Anda telah melakukan 3x pembatalan transaksi yang mengakibatkan
            akun anda di blokir selamanya.
        </h4>
        </v-card-text>
    </v-card>
    <v-card
        rounded="lg" 
        elevation="6" 
        raised class="mx-6 mt-3"
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
    <v-row class="mx-4 my-4">
      <v-col cols="12" sm="8" >
          <v-card>
              <v-card-title>Informasi Produk</v-card-title>
              <v-list >
                  <v-list-item @click="go(orders.id_iklan, iklan.judul)">
                      <v-list-item-avatar class="rounded-lg" size="120">
                          <img :src="getImage(iklan.photo)" contain>
                      </v-list-item-avatar>
                      <v-list-item-title>
                          <div class="ml-10">
                          <div class="pb-2" style="color:#4C4C4C"> <b> {{ iklan.judul }}</b></div>
                          <div class="pb-2" style="color:#4C4C4C"> <b> Jumlah: {{ orders.jumlah }} Unit</b></div>
                          <div class="pb-2" style="color:#008693"> <b> Tawar Bersama</b></div>
                          <div class="pb-2" style="color:#4C4C4C"> <b> 
                            Rp
                            {{
                              Number(orders.total_pembayaran).toLocaleString('id-ID')
                            }}</b>
                          </div>
                          </div>
                      </v-list-item-title>
                  </v-list-item>
              </v-list>
              <v-divider class="mx-4"></v-divider>
              <div class="d-flex align-center justify-space-between mx-4">
                <v-card-title>Total Harga : Rp
                  {{
                    Number(orders.total_pembayaran).toLocaleString('id-ID')
                  }}
                </v-card-title>
                <v-btn small color="#008693" dark @click="openPenawaran">
                  Form Penawaran
                </v-btn>
              </div>
              <v-divider class="mx-4"></v-divider>
              <v-card-title>Informasi Produk</v-card-title>
              <v-row class="mx-4">
                  <v-col cols="12" sm="6">
                      <div>Nomor Order :</div>
                      <div><b> {{ orders.no_order }} </b></div>
                      <br>
                      <div>Tanggal Order :</div>
                      <div><b> 
                        {{
                          moment
                            .utc(orders.created_at)
                            .add(utc, 'h')
                            .format('DD MMM YYYY HH:mm')
                        }}
                        {{ timezone }} </b>
                      </div>
                      <br>
                      <div>Metode Bayar :</div>
                      <div><b> {{ orders.metode }} </b></div>
                  </v-col>
                  <v-col cols="12" sm="6">
                      <div>Status :</div>
                      <div style="color:red"><b> {{ orders.pembayaran_status }} </b></div>
                      <br>
                      <div v-if="orders.id_pembeli == user.id">Nama Penjual</div>
                      <div v-if="orders.id_pembeli == user.id">
                        <b>{{ orders.nama_penjual }}</b>
                      </div>

                      <div v-if="orders.id_penjual == user.id">Nama Pembeli</div>

                      <div v-if="orders.id_penjual == user.id">
                        <b>{{ orders.nama_pembeli }}</b>
                      </div>
                      
                      <div v-if="orders.id_penjual == user.id">
                        <br />
                        Nama Pembeli Sesuai KTP
                      </div>

                      <div v-if="orders.id_penjual == user.id">
                        <b>{{ orders.nama_ktp }}</b>
                      </div>
                      <br>
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
                      <br>
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
              </v-row>
              <br>
              <v-divider class="mx-4"></v-divider>
              <div class="d-flex align-center justify-space-between mx-4">
                  <v-card-title>Total Harga</v-card-title>
                  <v-card-title>Rp{{ Number(orders.total_pembayaran).toLocaleString('id-ID') }}</v-card-title>
                  
              </div>
              <div v-if="
              orders.id_mst_order_status != 3 &&
              orders.id_mst_pembayaran_status != 10" >
                <v-btn v-if="
                  orders.id_mst_pembayaran_status == 1 &&
                  user.id != orders.id_penjual"
                  color="#20929D" 
                  @click="uploadpembayaran=true" 
                  class="white--text mx-4"> 
                    Upload Bukti Pembayaran
                </v-btn>
              </div>
              <div v-if="
              orders.id_mst_order_status == 1 &&
              orders.id_mst_pembayaran_status == 4" >
                <v-btn v-if="
                  orders.id_mst_pembayaran_status == 4 &&
                  user.id != orders.id_penjual"
                  color="#20929D" 
                  @click="uploadpembayaran=true" 
                  class="white--text mx-4"> 
                    Lihat Bukti Pembayaran
                </v-btn>
              </div>
              <div v-if="
              orders.id_mst_order_status == 2 &&
              orders.id_mst_pembayaran_status == 2" >
                <v-btn
                  color="#20929D" 
                  @click="uploadpembayaran=true" 
                  class="white--text mx-4"> 
                    Lihat Bukti Pembayaran
                </v-btn>
              </div>
              <div v-if="
              orders.id_mst_order_status == 1 &&
              orders.id_mst_pembayaran_status == 4" >
                <v-btn v-if="
                  orders.id_mst_pembayaran_status == 4 &&
                  user.id == orders.id_penjual"
                  color="#20929D" 
                  @click="uploadpembayaran=true" 
                  class="white--text mx-4"> 
                    Lihat Bukti Pembayaran
                </v-btn>
              </div>
              <br>
              <br>
          </v-card>
          <br>
          
      </v-col>
      <v-col cols="12" sm="4">
          <v-card>
            <v-card-title class="d-flex align-center justify-space-between">
              <div>Status Transaksi</div>
            </v-card-title>

            <v-divider></v-divider>

            <v-container class="text-center" v-if="log.length == 0">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-container>

            <v-timeline dense v-else>
              <v-timeline-item color="#008693" v-for="item in log" :key="item.id">
                <div class="d-flex">
                  <div class="flex-column">
                    <div class="pr-1"><b> {{ item.pembayaran_status }}</b></div>
                    <div class="text-caption pr-1">{{ item.aktivitas }}</div>
                  </div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card>
      </v-col>
    </v-row>
    <div align="center" class="mt-4">
      <h3 v-if="orders.id_mst_pembayaran_status == 10">
        Silahkan lakukan konfirmasi/pembatalan transaksi
      </h3>
      <v-btn
        color="teal"
        dark
        width="45%"
        @click="konfirmasiPenjualan"
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

    <v-dialog v-model="dialog">
      <v-container class="text-center" v-if="penawaran == null">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-container>

      <v-card v-html="penawaran"></v-card>
    </v-dialog>
    <v-dialog v-model="uploadpembayaran" persistent width="700px">
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between">
          <div> Bukti Pembayaran</div>
          <v-btn icon @click="uploadpembayaran = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <br>
        <v-card-subtitle v-if="orders.id_penjual != user.id">
          Anda wajib melakukan konfirmasi pembayaran agar tiket dapat
          diproses.
        </v-card-subtitle>

        <v-card-subtitle v-if="orders.id_penjual == user.id">
          Sebelum melakukan konfirmasi, perhatikan baik-baik foto yang
          dikirimkan oleh pembeli.
        </v-card-subtitle>
        <center>
          <image-uploader
            v-model="buktiBayar"
            :quality="0.7"
            :scaleRatio="0.5"
            accept="image/*"
            :preview="false"
            :className="['fileinput', { 'fileinput--loaded': hasImage }]"
            :autoRotate="true"
            outputFormat="blob"
            @input="onFileChange"
            id="foto"
            style="width:25%"
            v-if="
                orders.id_mst_pembayaran_status == 1 &&
                user.id != orders.id_penjual
              "
          >
            <label for="foto" slot="upload-label">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-img
                    :src="previewUrl"
                    contain
                    :width="$vuetify.breakpoint.xsOnly ? 100 : 200"
                    :height="$vuetify.breakpoint.xsOnly ? 100 : 200"
                    v-on="on"
                    style="position: relative"
                    align="center"
                  >

                  </v-img>
                  <!-- <v-card
                    flat
                    width="300"
                    height="300"
                    :color="!hasImage ? 'grey lighten-3' : 'transparent'"
                    class="d-flex align-center justify-center"
                    v-on="on"
                  >
                    <v-icon x-large v-if="!hasImage">mdi-file-upload</v-icon>

                    <v-img :src="previewUrl" contain v-else></v-img>
                  </v-card> -->
                </template>
                <span>Pilih Foto</span>
              </v-tooltip>
            </label>
          </image-uploader>
        </center>
        <br>
        <center>
        <div v-viewer="{ movable: false }">
          <img
            :src="gambar"
            contain
            class="mx-2"
            max-width="400"
            max-height="400"
            v-if="orders.id_mst_pembayaran_status > 1"
          />
        </div>
        </center>
        <v-card-subtitle
          >*Pastikan gambar yang diupload jelas dan terbaca</v-card-subtitle
        >

        <v-divider></v-divider>
        
        <v-btn
          block
          color="#20929D"
          class="mt-4"
          @click="upload"
          v-if="
            orders.id_mst_pembayaran_status == 1 &&
            orders.id_penjual != user.id
          "
          :disabled="hasImage ? false : true"
          
        >
          Upload Bukti Pembayaran
        </v-btn>
        <v-btn
          block
          color="#20929D"
          class="mt-4"
          dark
          @click="dialogKonfirmasi = true"
          v-if="
            orders.id_mst_pembayaran_status == 4 &&
            orders.id_penjual == user.id
          "
        >
          Konfirmasi Pembayaran
        </v-btn>
        
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogBatal" persistent max-width="500px">
      <v-form ref="form" v-model="valid">
        <v-card>
          <v-toolbar dark color="#20929D">
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
    <v-dialog v-model="dialogKonfirmasi" width="500" persistent>
      <v-card>
        <v-toolbar dark color="#20929D">
          <v-toolbar-title>Konfirmasi Pembayaran</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon @click="dialogKonfirmasi = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-container fluid>
          Apakah Anda yakin ingin melakukan konfirmasi pembayaran
          berikut?
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="#20929D"
            text
            outlined
            @click="openTolak()"
          >
            Tolak
          </v-btn>

          <v-btn color="#20929D" dark @click="konfirmasi">
            Konfirmasi
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogTolak" persistent max-width="500px">
      <v-card>
        <v-toolbar dark color="#20929D">
          <v-toolbar-title>Tolak Serah Terima</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon @click="dialogTolak = false">
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

        <v-card-text v-if="note == 1">
          <v-textarea
            label="Alasan Menolak"
            v-model="noteDetail"
            rows="1"
            auto-grow
          ></v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#20929D"
            text
            outlined
            @click="dialogTolak = false"
          >
            Batalkan
          </v-btn>
          <v-btn color="#20929D" dark @click="konfirmasiTolak">
            Tolak
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Footer /> 
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

    Footer: () =>
      import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
    FlipCountdown,
  },
  data: () => ({
    orders: [],
    iklan: [],
    statusOrder: false,
    log: [],
    rekening: [],
    buktiBayar: null,
    uploadpembayaran: false,
    dialog: false,
    penawaran: null,
    dialogKonfirmasi: false,
    dialogTolak: false,
    foto: null,
    gambar: null,
    konfirmasiPenjual: false,
    dialogBatal: false,
    valid: true,
    note: '',
    noteTolak: [],
    noteDetail: '',
    AlasanRules: [(v) => !!v || 'Anda belum memilih alasan pembatalan'],
    previewUrl: '/img/icons/thumbnail/Photo.png',
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
            this.getRekening()
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
      console.log(this.previewUrl)
    },

    async openLog() {
      this.statusOrder = true
      await this.logStatus()
    },
    seller(id, name) {
      this.setSellertId(id)
      this.$router.push('/seller/' + name.toLowerCase().replace(/ /g, '-')+'-'+id)
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
    async getRekening() {
      await this.$axios
        .get('/user/v3/user/rekening', {
          params: {
            id_app_user: this.orders.id_penjual,
            id: this.orders.id_app_user_rekening,
            limit: 2,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.rekening = data[0]
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
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
     async openTolak() {
      this.dialogTolak = true
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
            this.logStatus()
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
          this.logStatus()
          this.dtlPembayaran()
          this.uploadpembayaran = false
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
    // async detailTolak() {
    //   await this.$axios
    //     .get('/transaksi/v3/mst_pembayaran_note', {
    //       headers: { Authorization: 'Bearer ' + this.user.token },
    //     })
    //     .then((response) => {
    //       let { data } = response.data
    //       this.noteTolak = data
    //     })
    //     .catch((error) => {
    //       let responses = error.response.data
    //       console.log(responses.api_message)
    //     })
    // },
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
            this.logStatus()
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
            this.logStatus()
            this.dtlPembayaran()
            this.dialogKonfirmasi = false
            this.dialogTolak = false
            this.uploadpembayaran= false
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
            this.uploadpembayaran= false
            this.getOrder()
            this.logStatus()
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
    await this.logStatus()
    console.log('orders',this.orders)
  },
}
</script>

<style>
#foto{
  display: none;
}
</style>