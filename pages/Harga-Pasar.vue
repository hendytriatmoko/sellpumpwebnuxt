<template>
  <div>
    <app-bar />
    <div style="max-width: 685px; margin: 0 auto !important">
      <v-card elevation="1">
        <v-img
          src="/img/icons/Banner_hargapasar.webp"
          width="820"
          height="150"
        ></v-img>

        <v-col cols="12">
          <v-text-field
            v-model="motor"
            label="Masukan Merek, Tipe, Model, Tahun"
            placeholder="Motor"
            solo
            dense
            readonly
            @click="dialogduasatu = true"
            append-icon=" mdi-chevron-right"
          >
          </v-text-field>
        </v-col>
        <v-card-actions style="margin-right: 2%">
          <v-spacer></v-spacer>
          <v-btn
            color="#20929D"
            class="white--text"
            disabled
            v-if="
              (merkid == '') &
              (pickTipe == '') &
              (pickTahun == '') &
              (pickModel == '')
            "
          >
            Cek Harga
          </v-btn>
          <v-btn
            color="#20929D"
            class="white--text"
            @click="btnCheck(), getIklanTerkait()"
            v-else
          >
            Cek Harga
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-expand-transition>
        <v-card rounded="lg" v-if="PerkiraanHarga">
          <center>
            <h3 class="mt-4">Perkiraan Harga Motor</h3>
          </center>
          <v-row>
            <v-col cols="12" sm="12">
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img src="/img/icons/ic_merk-web.webp"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-subtitle>Merek</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action> {{ merk }} </v-list-item-action>
                </v-list-item>
                <v-divider> </v-divider>

                <v-list-item>
                  <v-list-item-avatar>
                    <v-img src="/img/icons/ic_tipe-web.webp"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-subtitle>Tipe</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action> {{ pickTipe }} </v-list-item-action>
                </v-list-item>
                <v-divider> </v-divider>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img src="/img/icons/ic_model-web.webp"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-subtitle>Model</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>{{ pickModel }}</v-list-item-action>
                </v-list-item>
                <v-divider> </v-divider>
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img src="/img/icons/ic_tahun-web.webp"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-subtitle>Tahun</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>{{ pickTahun }}</v-list-item-action>
                </v-list-item>

                <v-divider> </v-divider>
              </v-list>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card v-for="item in check" :key="item" color="transparent">
                <!-- <v-card-text>
                   {{ item.harga_min }} 
                  <v-range-slider v-model="value" step="10"  class="align-center" readonly>  </v-range-slider>
                   {{ item.harga_max }}
                </v-card-text>
            -->
                <center>
                  <v-layout row wrap align-center>
                    <v-flex xs12 sm6>
                      <div class="text-xs-center">
                        <div>
                          <v-btn
                            small
                            dark
                            color="#000000"
                            id="custom-disabled"
                          >
                            Rp
                            {{ Number(item.harga_min).toLocaleString('id-ID') }}
                          </v-btn>
                        </div>
                      </div>
                    </v-flex>
                    <v-flex xs12 sm6>
                      <div class="text-xs-center">
                        <div>
                          <v-btn
                            small
                            dark
                            color="#000000"
                            id="custom-disabled"
                          >
                            Rp
                            {{ Number(item.harga_max).toLocaleString('id-ID') }}
                          </v-btn>
                        </div>
                      </div>
                    </v-flex>

                    <v-col cols="12">
                      <v-img
                        src="/img/icons/rangeslider.webp"
                        width="450"
                        contain
                      >
                      </v-img>
                    </v-col>
                  </v-layout>
                </center>
              </v-card>
            </v-col>
          </v-row>
          <br />
          <v-card>
            <div class="mx-4 my-4">
              <center>
                <h3 class="mt-4">Yuk, Ajukan Dana Tunai</h3>
              </center>
              <v-text-field
                label="Perusahaan*"
                placeholder="Perusahaan*"
                outlined
                v-model="brand"
                @click="dialogdana = true"
                readonly
                append-icon=" mdi-chevron-right"
              ></v-text-field>

              <v-text-field
                label="Nama sesuai KTP*"
                placeholder="Nama sesuai KTP*"
                outlined
                v-model="namaKtp"
              ></v-text-field>
              <v-text-field
                label="No Handphone*"
                placeholder="No Handphone*"
                outlined
                v-model="phone"
                :rules="phoneRules"
              ></v-text-field>

              <v-card-actions style="margin-right: 2%">
                <v-spacer></v-spacer>
                <v-btn color="#20929D" class="white--text" @click="DanaTunai" :loading="loading">
                  Ajukan Sekarang
                </v-btn>
              </v-card-actions>
            </div>
          </v-card>
          <br />
          <div>
            <h3 class="ml-4">Partner Kami</h3>
            <h5 class="ml-4 text--secondary">
              Kami bekerja sama dengan perusahaan terbaik di Indonesia untuk
              menyediakan produk finansial terbaik buat kamu.
            </h5>
          
              <v-col cols="12" sm="12">
                <v-sheet>
                  <v-slide-group
                    v-model="partner"
                    active-class="success"
                    show-arrows
                  >
                    <v-slide-item v-for="item in perusahaan" :key="item">
                      <v-card class="ma-2 ml-4" rounded="xl" width="180" >
                        <center>
                        <v-img
                          src="/img/unavailable.webp"
                          width="100"
                          height="100"
                          v-if="item.brand_photo == null"
                        >
                        </v-img>
                        <v-img
                          :src="getImage(item.brand_photo)"
                          width="100"
                          height="100"
                          v-else
                        ></v-img>
                        </center>
                      </v-card>
                    </v-slide-item>
                  </v-slide-group>
                </v-sheet>
              
              </v-col>
       
          </div>
          <v-card>
            <h3 class="mx-4 my-6">Iklan Terkait</h3>
            <v-row class="mx-1" v-if="iklanTerkait.total.value == null">
              <v-col cols="12" sm="12">
                <v-sheet>
                  <v-slide-group
                    v-model="model"
                    active-class="success"
                    show-arrows
                  >
                    <v-slide-item
                      v-for="item in iklanTerkait"
                      :key="item._source.id"
                    >
                      <iklan-terkait :item="item" />
                    </v-slide-item>
                  </v-slide-group>
                </v-sheet>
              </v-col>
            </v-row>
            <v-row class="mx-6" v-else>
              <v-list-item-content>
                <center>
                  <v-img src="/img/icons/ic_noiklan.webp" width="80" contain>
                  </v-img>

                  <v-list-item-title>
                    <b> Tidak ada data </b></v-list-item-title
                  >

                  <v-list-item-subtitle>
                    Maaf, saat ini belum ada data iklan terkait.
                  </v-list-item-subtitle>
                </center>
              </v-list-item-content>
            </v-row>
          </v-card>
        </v-card>
      </v-expand-transition>

      <v-dialog v-model="dialogduasatu" max-width="600">
        <v-card>
          <div class="mx-4 my-4">
            <center>
              <h3 class="pt-4" style="color: #4c4c4c">Detail Motor</h3>
            </center>
            <br />
            <div style="color: #a2a2a2">
              <v-text-field
                dense
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Cari"
                v-model="pencarian"
                slot="extension"
              >
              </v-text-field>

              <div class="d-flex" style="color: #20929d">
                <div
                  class="d-flex"
                  @click="hapusmerk"
                  style="cursor: pointer"
                  v-if="merk != ''"
                >
                  <div class="pt-2">{{ merk }}</div>
                  <v-icon color="#20929D" size="25" class="pt-2"
                    >mdi-chevron-right</v-icon
                  >
                </div>
                <div
                  class="d-flex"
                  @click="hapustipe"
                  style="cursor: pointer"
                  v-if="pickTipe != ''"
                >
                  <div class="pt-2">{{ pickTipe }}</div>
                  <v-icon color="#20929D" size="25" class="pt-2"
                    >mdi-chevron-right</v-icon
                  >
                </div>
                <div
                  class="d-flex"
                  @click="hapusmodel"
                  style="cursor: pointer"
                  v-if="pickModel != ''"
                >
                  <div class="pt-2">{{ pickModel }}</div>
                  <v-icon color="#20929D" size="25" class="pt-2"
                    >mdi-chevron-right</v-icon
                  >
                </div>
                <div
                  class="d-flex"
                  @click="hapustahun"
                  style="cursor: pointer"
                  v-if="pickTahun != ''"
                >
                  <div class="pt-2">{{ pickTahun }}</div>
                  <v-icon color="#20929D" size="25" class="pt-2"
                    >mdi-chevron-right</v-icon
                  >
                </div>
              </div>
              <v-row>
                <v-col cols="12" sm="12">
                  <div v-if="merk == ''">
                    <div
                      v-for="item in brands"
                      :key="item"
                      @click="pilihmerk(item)"
                      style="cursor: pointer"
                    >
                      <div
                        class="d-flex align-center justify-space-between my-4"
                        v-if="item.merk.includes(pencarian.toUpperCase())"
                      >
                        <div style="color: #4c4c4c">
                          {{ item.merk }}
                        </div>
                        <v-icon size="30">mdi-chevron-right</v-icon>
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="
                      (merkid != '') &
                      (pickTipe == '') &
                      (pickTahun == '') &
                      (pickModel == '')
                    "
                  >
                    <div
                      v-for="item in tipe"
                      :key="item"
                      @click="pilihtipe(item)"
                      style="cursor: pointer"
                    >
                      <div
                        class="d-flex align-center justify-space-between my-4"
                        v-if="item.tipe_unit.includes(pencarian.toUpperCase())"
                      >
                        <div style="color: #4c4c4c">
                          {{ item.tipe_unit }}
                        </div>
                        <v-icon size="30">mdi-chevron-right</v-icon>
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="
                      (merkid != '') &
                      (pickTipe != '') &
                      (pickTahun == '') &
                      (pickModel == '')
                    "
                  >
                    <div
                      v-for="item in model"
                      :key="item"
                      @click="pilihmodel(item)"
                      style="cursor: pointer"
                    >
                      <div
                        class="d-flex align-center justify-space-between my-4"
                        v-if="item.model.includes(pencarian.toUpperCase())"
                      >
                        <div style="color: #4c4c4c">
                          {{ item.model }}
                        </div>
                        <v-icon size="30">mdi-chevron-right</v-icon>
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="
                      (merkid != '') &
                      (pickTipe != '') &
                      (pickTahun == '') &
                      (pickModel != '')
                    "
                  >
                    <div
                      v-for="item in tahun"
                      :key="item"
                      @click="pilihtahun(item)"
                      style="cursor: pointer"
                    >
                      <div
                        class="d-flex align-center justify-space-between my-4"
                      >
                        <div style="color: #4c4c4c">
                          {{ item.tahun }}
                        </div>
                        <v-icon size="30">mdi-chevron-right</v-icon>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogdana" max-width="600">
        <v-card>
          <div class="mx-4 my-4">
            <center>
              <h3 class="pt-4" style="color: #4c4c4c">Nama Perusahaan</h3>
            </center>
            <br />
            <div style="color: #a2a2a2">
              <v-text-field
                dense
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Cari"
                v-model="pencarianPerusahaan"
                slot="extension"
              >
              </v-text-field>
              <v-row>
                <v-col cols="12" sm="12">
                  <div>
                    <div
                      v-for="item in perusahaan"
                      :key="item"
                      @click="pilihperusahaan(item)"
                      style="cursor: pointer"
                    >
                      <div
                        class="d-flex align-center justify-space-between my-4"
                        v-if="
                          item.brand.includes(pencarianPerusahaan.toUpperCase())
                        "
                      >
                        <div style="color: #4c4c4c">
                          {{ item.brand }}
                        </div>
                        <v-icon size="30">mdi-chevron-right</v-icon>
                      </div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-card>
      </v-dialog>

    </div>
    <br />
    <Footer />
  </div>
</template>


<script>
import { mapActions } from 'vuex'
export default {
  name: 'HargaPasar',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
    Footer: () =>
      import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
    ListIklan: () =>
      import(
        /* webpackChunkName: "iklan-terkait" */ '@/components/IklanTerkait.vue'
      ),
  },

  data: () => ({
    dialogduasatu: false,
    dialogdana: false,
    PerkiraanHarga: false,
    pencarian: '',
    pencarianPerusahaan: '',
    pencarianmotor: '',
    motor: '',
    phone: '',
    merk: '',
    loading: false,
    brands: [],
    brand: [],
    merkid: '',
    tipe: '',
    check: [],
    pickTipe: '',
    model: '',
    partner: '',
    pickModel: '',
    years: [],
    iklanTerkait: [],
    tahun: '',
    pickTahun: '',
    types: [],
    tipeid: '',
    namaKtp: '',
    urlPerusahaan: '',
    namaRules: [
      (v) => !!v || 'Nama harus diisi (max 50)',
      (v) => v.length >= 2 || 'Min 2 karakter',
      (v) => v.length <= 50 || 'Max 50 karakter',
    ],
    phoneRules: [
      (v) => !!v || 'Nomor HP wajib diisi (Min 10, Max 15)',
      (v) => v && v.length >= 10,
    ],
  }),
  methods: {
       ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
     
    }),
    async getMerk() {
      await this.$axios
        .get('/produk/v3/mst_motor_merk', {
          params: {
            id_mst_motor_merk: this.merkid,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.brands = data
          console.log('brand', this.brands)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async hargaPasar() {
      var params = new URLSearchParams()
      if (this.merkid != '') {
        params.append('id_mst_motor_merk', this.merkid)
      }
      if (this.pickTipe != '') {
        params.append('tipe_unit', this.pickTipe)
      }
      if (this.pickModel != '') {
        params.append('model', this.pickModel)
      }
      var request = {
        params: params,
      }

      await this.$axios
        .get('/produk/v3/produk_mokas_harga_pasar', request)
        .then((response) => {
          if (
            (this.merkid != '') &
            (this.pickTipe == '') &
            (this.pickModel == '') &
            (this.pickTahun == '')
          ) {
            this.tipe = response.data.data
            console.log('tipe', this.tipe)
          } else if (
            (this.merkid != '') &
            (this.pickTipe != '') &
            (this.pickModel == '') &
            (this.pickTahun == '')
          ) {
            this.model = response.data.data
            console.log('model', this.model)
          } else if (
            (this.merkid != '') &
            (this.pickTipe != '') &
            (this.pickModel != '') &
            (this.pickTahun == '')
          ) {
            this.tahun = response.data.data
            console.log('tahun', this.tahun)
          }
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async btnCheck() {
      await this.$axios
        .get('/produk/v3/produk_mokas_harga_pasar', {
          params: {
            id_mst_motor_merk: this.merkid,
            tipe_unit: this.pickTipe,
            model: this.pickModel,
            tahun: this.pickTahun,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.check = data
          console.log('cekharga', this.check)
          this.PerkiraanHarga = true
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async pilihmerk(item) {
      this.merk = item.merk
      this.merkid = item.id
      this.pencarian = ''
      console.log('merkid', this.merkid)
      this.hargaPasar()
    },
    async hapusmerk() {
      this.merk = ''
      this.merkid = ''
      this.pickTipe = ''
      this.pickModel = ''
      this.pickTahun = ''
      this.hargaPasar()
    },
    async hapustipe() {
      this.pickTipe = ''
      this.pickModel = ''
      this.pickTahun = ''
      this.hargaPasar()
    },
    async hapusmodel() {
      this.pickModel = ''
      this.pickTahun = ''
      this.hargaPasar()
    },
    async hapustahun() {
      this.pickTahun = ''
      this.hargaPasar()
    },
    async pilihtipe(item) {
      this.pickTipe = item.tipe_unit
      this.pencarian = ''
      console.log('tipe', this.pickTipe)
      this.hargaPasar()
    },
    async pilihmodel(item) {
      this.pickModel = item.model
      this.pencarian = ''
      console.log('model', this.pickModel)
      this.hargaPasar()
    },
    async pilihtahun(item) {
      this.pickTahun = item.tahun
      console.log('tahun', this.pickTahun)
      this.pencarian = ''
      this.motor =
        this.merk +
        ' / ' +
        this.pickTipe +
        ' / ' +
        this.pickModel +
        ' / ' +
        this.pickTahun
      this.dialogduasatu = false
    },
    async getTipe() {
      await this.$axios
        .get('/produk/v3/produk_mokas_harga_pasar', {
          params: {
            id_mst_motor_merk: this.merkid,
            tipe_unit: this.tipe,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.types = data
          console.log('types', this.types)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getIklanTerkait() {
      await this.$axios
        .get('/search/v4/search_home', {
          params: {
            offset: 0,
            id_mst_iklan_status: 1,
            limit: 15,
            search: this.merk + ' ' + this.pickTipe + ' ' + this.pickModel,
          },
        })
        .then((response) => {
          // let data = response.data
          // let { hits } = data.hits
          this.iklanTerkait = response.data.hits
          console.log('iklanterkaits', this.iklanTerkait)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async DanaTunai() {
      let formData = new FormData()

      formData.set('nama', this.namaKtp)
      formData.set('nomor_hp', this.phone)
      formData.set('id_dana_tunai', this.brandid)
      formData.set('model', this.pickModel)
      formData.set('tahun', this.pickTahun)

      await this.$axios
        .post('/produk/v3/dana_tunai_pengajuan', formData)
        .then((response) => {
          let { data } = response
          this.loading = false
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          // console.log('sukses nih', response)
          this.brand = '',
          this.brandid = '',
          this.namaKtp = '',
          this.phone = '',
          window.open(this.urlPerusahaan)
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
          }
        })
    },
    async getPerusahaan() {
      await this.$axios
        .get('/produk/v3/dana_tunai_company')
        .then((response) => {
          let { data } = response.data
          this.perusahaan = data
          console.log('nama perusahaan', this.perusahaan)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async pilihperusahaan(item) {
      this.brand = item.brand
      this.brandid = item.id
      this.urlPerusahaan = item.url_web
      this.pencarian = ''
      console.log('brandid', item)
      this.dialogdana = false
    },
  },
  async created() {
    await this.getMerk()
    await this.getPerusahaan()
    await this.getTipe()
    await this.btnCheck()
  },
}
</script>
<style scoped>
.scrolling-wrapper-flexbox {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}
.scrolling-wrapper-flexbox {
  width: 100%;
  -webkit-overflow-scrolling: touch;
}
#custom-disabled {
  background-color: #20929d !important;

  pointer-events: none;
}
</style>