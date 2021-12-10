<template>
  <div>
    <section id="info-iklan" class="mt-2">
      <v-row>
        <v-col cols="12" sm="4">
          <v-carousel
            v-model="carousel"
            hide-delimiters
            hide-delimiter-background
            show-arrows
            show-arrows-on-hover
            height="400"
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
          <div class="mx-4 my-2">
            <v-tooltip bottom v-if="!guest">
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  height="47"
                  class="white"
                  v-on="on"
                  @click="doFavorit"
                >
                  <v-icon
                    left
                    v-if="favorit == undefined || favorit.length == 0"
                  >
                    mdi-heart-outline
                  </v-icon>
                  <v-icon color="red" left v-else>mdi-heart</v-icon>
                  Favorit
                </v-btn>
              </template>
              <span>Favorit</span>
            </v-tooltip>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn text height="47" class="white" v-bind="attrs" v-on="on">
                  <v-icon left>mdi-share-variant-outline</v-icon> Bagikan
                </v-btn>
              </template>

              <v-list>
                <v-list-item v-for="(network, index) in networks" :key="index">
                  <ShareNetwork
                    :network="network.network"
                    :key="network.network"
                    :style="{ backgroundColor: network.color }"
                    :url="sharing.url"
                    :title="sharing.title"
                    :description="sharing.description"
                    :quote="sharing.quote"
                    :hashtags="sharing.hashtags"
                    :twitterUser="sharing.twitterUser"
                  >
                    <i :class="network.icon"></i>
                    <span>{{ network.name }}</span>
                  </ShareNetwork>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-tooltip
              bottom
              v-if="
                iklan.id_app_user == user.id && iklan.id_mst_iklan_status != 2
              "
            >
              <template v-slot:activator="{ on }">
                <v-btn text height="47" class="white" v-on="on" @click="edit">
                  <v-icon left>mdi-pencil</v-icon> Edit
                </v-btn>
              </template>

              <span>Edit</span>
            </v-tooltip>
          </div>
        </v-col>

        <v-col cols="12" sm="5">
          <v-row>
            <v-col cols="6">Jenis Iklan:</v-col>

            <v-col cols="6" align="right">
              {{ iklan.mst_iklan_jenis }}
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12">
              <h2>{{ iklan.judul }}</h2>
            </v-col>
          </v-row>

          <v-row dense align="center">
            <v-col cols="6">
              <h2 class="#20929D--text">
                Rp {{ Number(iklan.harga).toLocaleString('id-ID') }}
              </h2>
            </v-col>

            <v-col cols="6">
              <div class="d-flex align-center justify-end">
                {{
                  iklan.log_iklan_view == undefined ? 1 : iklan.log_iklan_view
                }}x <v-icon>mdi-eye</v-icon>
              </div>
            </v-col>
          </v-row>
          <v-row dense align="center">
            <v-col cols="6">
              <div v-if="iklan.garansi != null" style="color: #e53935">
                <v-list-item-avatar>
                  <v-img src="/img/ic_garansi.webp" width="120px"></v-img>
                </v-list-item-avatar>

                Garansi Penjual : {{ iklan.garansi }} hari
              </div>
            </v-col>

            <v-col cols="6">
              <div
                class="d-flex align-center justify-end"
                style="color: #20929d"
              >
                ID Iklan: {{ id }}
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <h3>Deskripsi</h3>
              <div
                class="text-justify"
                style="white-space: pre-wrap"
                v-html="iklan.deskripsi"
              ></div>
            </v-col>
          </v-row>

          <hr class="my-3" />

          <section id="info-penjual">
            <v-row v-if="$vuetify.breakpoint.xs">
              <v-col cols="12">
                <h3>Info Penjual</h3>

                <v-list>
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-icon x-large v-if="seller.photo == ''">
                        mdi-account-circle
                      </v-icon>

                      <v-img :src="getImage(seller.photo)" v-else></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>
                        <a
                          class="d-flex align-center"
                          @click="go(seller.id, seller.nama)"
                        >
                          <v-icon
                            color="blue"
                            small
                            class="mr-1 ml-1"
                            v-if="seller.id_mst_user_type == 2"
                          >
                            mdi-check-decagram
                          </v-icon>
                          <b class="ml-2" style="color: #20929d">{{
                            seller.nama
                          }}</b>
                        </a>
                      </v-list-item-title>

                      <v-list-item-subtitle>
                        <v-avatar size="24" item class="mr-1">
                          <v-img
                            :src="gbrRatting"
                            alt="verified"
                            contain
                          ></v-img>
                        </v-avatar>
                        <span v-if="avg.ratting_user == 1"
                          >Kurang Memuaskan</span
                        >
                        <span v-if="avg.ratting_user == 2"
                          >Cukup Memuaskan</span
                        >
                        <span v-if="avg.ratting_user == 3"
                          >Sangat Memuaskan</span
                        >
                         <span v-if="avg.ratting_user == 0"
                          >Belum Ada Penilaian</span
                        >
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <center>
                    <v-divider> </v-divider>
                    <v-list-item>
                      <v-list-item-content>
                        <center>
                          <v-list-item-subtitle>
                            <div style="color: #20929d">
                              {{ pembayaranTerverifikasi.total }}
                            </div>
                            <div style="color: #505050">Produk Terjual</div>
                          </v-list-item-subtitle>
                        </center>
                      </v-list-item-content>
                      <v-list-item-content>
                        <center>
                          <v-list-item-subtitle>
                            <div style="color: #eb5757">
                              {{ dibatalkanPenjual.total }}
                            </div>
                            <div style="color: #505050">Dibatalkan Penjual</div>
                          </v-list-item-subtitle>
                        </center>
                      </v-list-item-content>
                    </v-list-item>

                    
                  </center>
                </v-list>
              </v-col>
            </v-row>

            <v-row v-else>
              <v-col cols="12">
                <h3>Info Penjual</h3>

                <v-list>
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-icon x-large v-if="seller.photo == ''">
                        mdi-account-circle
                      </v-icon>

                      <v-img :src="getImage(seller.photo)" v-else></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>
                        <a
                          class="d-flex align-center"
                          @click="go(seller.id, seller.nama)"
                        >
                          <v-icon
                            color="blue"
                            small
                            class="mr-1 ml-1"
                            v-if="seller.id_mst_user_type == 2"
                          >
                            mdi-check-decagram
                          </v-icon>
                          <b class="ml-2" style="color: #20929d">{{
                            seller.nama
                          }}</b>
                        </a>
                      </v-list-item-title>

                      <v-list-item-subtitle>
                        <v-avatar size="24" item class="mr-1">
                          <v-img
                            :src="gbrRatting"
                            alt="verified"
                            contain
                          ></v-img>
                        </v-avatar>
                        <span v-if="avg.ratting_user == 1"
                          >Kurang Memuaskan</span
                        >
                        <span v-if="avg.ratting_user == 2"
                          >Cukup Memuaskan</span
                        >
                        <span v-if="avg.ratting_user == 3"
                          >Sangat Memuaskan</span
                        >
                         <span v-if="avg.ratting_user == 0"
                          >Belum Ada Penilaian</span
                        >
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <center>
                    <v-list-item-subtitle class="mt-2">
                      <v-row>
                        <v-col
                          style="border-right: 1px solid black"
                          cols="12"
                          sm="6"
                        >
                          <div style="color: #20929d">
                            {{ pembayaranTerverifikasi.total }}
                          </div>
                          <div style="color: #505050">Produk Terjual</div>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div style="color: #eb5757">
                            {{ dibatalkanPenjual.total }}
                          </div>
                          <div style="color: #505050">Dibatalkan Penjual</div>
                        </v-col>
                      </v-row>
                    </v-list-item-subtitle>
                  </center>
                </v-list>
              </v-col>
            </v-row>
            <hr class="my-3" />

            <v-row>
              <v-col cols="12">
                <h3>Catatan & Kebijakan Penjual</h3>
                <v-list
                  class="py-0"
                  v-if="catatan.length > 0 || kebijakan != undefined"
                >
                  <v-list-item v-for="item in catatan" :key="item.id">
                    <v-list-item-content>
                      <v-list-item-title class="d-flex align-center">
                        <v-icon color="black" class="mr-1">
                          mdi-circle-medium
                        </v-icon>
                        <b>{{ item.judul }}</b>
                      </v-list-item-title>

                      <v-list-item-subtitle>
                        <div
                          v-html="item.deskripsi"
                        ></div> </v-list-item-subtitle
                      >d
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item v-if="kebijakan != undefined">
                    <v-list-item-content>
                      <v-list-item-title class="d-flex align-center">
                        <v-icon color="black" class="mr-1">
                          mdi-circle-medium
                        </v-icon>
                        <b>Kebijakan</b>
                      </v-list-item-title>

                      <v-list-item-subtitle>
                        <div v-html="kebijakan.deskripsi"></div>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>

                <div v-else>belum ada catatan dan kebijakan</div>
              </v-col>
            </v-row>
          </section>
        </v-col>

        <v-col cols="12" sm="3" v-if="!guest">
          <v-btn
            color="#20929D"
            dark
            block
            :to="'/message?id=' + seller.id"
            v-if="iklan.id_app_user != user.id"
          >
            Pesan
          </v-btn>
          <v-btn color="#20929D" dark block to="/login" v-if="guest">
            Pesan
          </v-btn>

          <br />

          <v-btn
            color="#20929D"
            outlined
            block
            @click="hubungi = true"
            v-if="iklan.id_app_user != user.id"
          >
            Hubungi
          </v-btn>
        </v-col>
      </v-row>
    </section>

    <hr class="my-3" />

    <section id="detail-unit">
      <spesifikasi :unitMokas="unitMokas" :unitid="unitid" />
    </section>
    <div v-if="iklan.id_mst_iklan_jenis == 1">
      <div v-if="!guest">
        <div v-if="iklan.id_app_user == user.id">
          <v-btn
            block
            color="#22939E"
            dark
            @click="setterjual = true"
            v-if="iklan.id_mst_iklan_status != 2"
          >
            Set Iklan Terjual
          </v-btn>
        </div>
      </div>
    </div>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title>
          <span class="headline">Info Iklan</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="judul"
              label="Judul Iklan"
              outlined
              dense
              :rules="formRules"
            ></v-text-field>

            <v-text-field
              v-model="deskripsi"
              label="Deskripsi Iklan"
              outlined
              dense
              :rules="formRules"
            ></v-text-field>
            <v-text-field
              v-model.lazy="harga"
              outlined
              solo
              dense
              :rules="amountRules"
              maxlength="11"
              v-money="money"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#20929D"
            :disabled="!valid"
            class="white--text"
            @click="updateIklan"
          >
            Ubah Info Iklan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="hubungi" persistent width="500">
      <v-card>
        <v-toolbar dark color="#20929D" dense>
          <v-toolbar-title>Hubungi</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon @click="hubungi = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-title>Tanyakan lebih lanjut kepada penjual</v-card-title>

        <div class="d-flex justify-space-around">
          <v-btn
            color="#20929D"
            text
            @click="hubungiRecord(telpon)"
            :href="'tel:' + seller.nomor_hp"
          >
            Telepon
          </v-btn>

          <v-btn
            color="#20929D"
            text
            @click="hubungiRecord(chat)"
            :href="'sms:' + seller.nomor_hp"
          >
            SMS
          </v-btn>

          <v-btn
            color="#20929D"
            text
            @click="hubungiRecord(whatsapp)"
            :href="
              'https://api.whatsapp.com/send?phone=' +
              seller.nomor_hp +
              '&text=Hai, saya dari aplikasi SiMotor'
            "
            target="_blank"
          >
            WhatsApp
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="setterjual" persistent width="500">
      <v-card>
        <h3 class="pt-5 pl-10">Tulis alasan anda mengubah status ke terjual</h3>
        <v-col cols="12" md="11">
          <v-textarea
            label="Masukkan Alasan Anda"
            auto-grow
            v-model="note"
            class="pt-5 pl-10 rounded"
          ></v-textarea>
        </v-col>
        <v-card-actions class="justify-end mt--5">
          <v-btn @click="setterjual = false">Kembali</v-btn>
          <v-btn color="grey" dark v-if="note == ''">Perbarui</v-btn>
          <v-btn color="#20929D" dark v-else @click="terjual">Perbarui</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { VMoney } from 'v-money'
export default {
  name: 'iklan-baris',
  props: ['items', 'hits', 'id'],
  components: {
    Spesifikasi: () =>
      import(
        /* webpackChunkName: "spesifikasi" */ '@/components/Spesifikasi.vue'
      ),
  },
  directives: { money: VMoney },
  data: () => ({
    tab: 0,
    favorit: [],
    iklan: [],
    carousel: 0,
    unitMokas: [],
    fotos: [],
    seller: [],
    catatan: [],
    kebijakan: [],
    avg: [],
    sharing: {},
    telpon: 'telpon',
    whatsapp: 'whatsapp',
    chat: 'chat',
    record: '',
    pembeli: '',
    setterjual: false,
    note: '',
    networks: [
      {
        network: 'facebook',
        name: 'Facebook',
        icon: 'fab fah fa-lg fa-facebook-f',
        color: '#1877f2',
      },
      {
        network: 'whatsapp',
        name: 'Whatsapp',
        icon: 'fab fah fa-lg fa-whatsapp',
        color: '#25d366',
      },
    ],
    judul: '',
    deskripsi: '',
    harga: '',
    amountRules: [
      (v) => v != 0 || 'Field is required',
      (v) => v.length <= 11 || 'Max 11 karakter',
    ],
    money: {
      precision: 0,
      thousands: '.',
      masked: true,
    },
    valid: true,
    dialog: false,
    formRules: [(v) => !!v || 'Field is required'],
    hubungi: false,
    gbrRatting: '',
    statistik: [],
    pembayaranTerverifikasi: [],
    dibatalkanPenjual: [],
    menungguPembayaran: [],
  }),
  computed: {
    ...mapGetters({
      guest: 'auth/guest',
      user: 'auth/user',
      // id: 'product/id',
      unitid: 'product/unitid',
    }),
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setSellertId: 'product/setSeller',
      setAuth: 'auth/set',
    }),
    async getHP() {
      await this.$axios
        .get('/iklan/v3/iklan_hp_mokas', {
          params: {
            id: this.id,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.iklan = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getFavorit() {
      await this.$axios
        .get('/iklan/v3/iklan_favorit', {
          params: {
            id_app_user: this.user.id,
            id_iklan: this.id,
            limit: 1,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let data = response.data
          let { hits } = data.hits
          this.favorit = hits[0]
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async doFavorit() {
      let formData = new FormData()
      formData.set('id_iklan', this.id)
      formData.set('id_app_user', this.user.id)
      await this.$axios
        .post('/iklan/v3/iklan_favorit', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.getFavorit()
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
    edit() {
      this.dialog = true
      this.judul = this.iklan.judul
      this.deskripsi = this.iklan.deskripsi
      this.harga = this.iklan.harga
    },
    async updateIklan() {
      let formData = new FormData()
      formData.set('judul', this.judul.trim())
      formData.set('deskripsi', this.deskripsi.trim())
      formData.set('id', this.id)
      formData.set('harga', String(this.harga).replaceAll('.', ''))
      if (this.iklan.id_mst_iklan_jenis == 1) {
        await this.$axios
          .put('/iklan/v3/iklan_hp_mokas_satuan', formData, {
            headers: { Authorization: 'Bearer ' + this.user.token },
          })
          .then((response) => {
            let { data } = response
            this.setAlert({
              status: true,
              color: 'success',
              text: data.api_message,
            })
            location.reload()
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
        await this.$axios
          .put('/iklan/v3/iklan_tb_mokas_satuan', formData, {
            headers: { Authorization: 'Bearer ' + this.user.token },
          })
          .then((response) => {
            let { data } = response
            this.setAlert({
              status: true,
              color: 'success',
              text: data.api_message,
            })
            location.reload()
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
      }
    },
    async detailUnit() {
      await this.$axios
        .get('/produk/v3/unit_mokas_iklan', {
          params: {
            id: this.iklan.motor_bekas[0].id_motor_bekas,
            limit: 1,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.unitMokas = data[0]
          this.fotos = []
          if (this.unitMokas.foto_1 != null) {
            this.fotos.push({ src: this.unitMokas.foto_1 })
          }
          if (this.unitMokas.foto_2 != null) {
            this.fotos.push({ src: this.unitMokas.foto_2 })
          }
          if (this.unitMokas.foto_3 != null) {
            this.fotos.push({ src: this.unitMokas.foto_3 })
          }
          if (this.unitMokas.foto_4 != null) {
            this.fotos.push({ src: this.unitMokas.foto_4 })
          }
          if (this.unitMokas.foto_5 != null) {
            this.fotos.push({ src: this.unitMokas.foto_5 })
          }
          // this.fotos.push(
          //   { src: this.unitMokas.foto_1 },
          //   { src: this.unitMokas.foto_2 },
          //   { src: this.unitMokas.foto_3 },
          //   { src: this.unitMokas.foto_4 },
          //   { src: this.unitMokas.foto_5 }
          // )
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getPenjual() {
      await this.$axios
        .get('/user/v3/user', {
          params: {
            id: this.iklan.id_app_user,
            limit: 1,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.seller = data[0]
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    go(id, name) {
      this.setSellertId(id)
      this.$router.push(
        '/seller/' + name.toLowerCase().replace(/ /g, '-') + '-' + id
      )
    },
    async getCatatan() {
      await this.$axios
        .get('/user/v3/user/catatan_penjual', {
          params: {
            id_app_user: this.seller.id,
            type_catatan: 2,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.catatan = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getKebijakan() {
      await this.$axios
        .get('/user/v3/user/catatan_penjual', {
          params: {
            id_app_user: this.seller.id,
            type_catatan: 1,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.kebijakan = data[0]
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async reviewAvg() {
      await this.$axios
        .get('/transaksi/v3/review_avg', {
          params: {
            id_penjual: this.seller.id,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.avg = data[0]
          if (this.avg.ratting_user == 0) {
            this.gbrRatting = '/img/penilaian/ic_tdk_nilai.webp'
          }
          if (this.avg.ratting_user == 1) {
            this.gbrRatting = '/img/penilaian/ic_tdk_puas.webp'
          }
          if (this.avg.ratting_user == 2) {
            this.gbrRatting = '/img/penilaian/ic_ckp_puas.webp'
          }
          if (this.avg.ratting_user == 3) {
            this.gbrRatting = '/img/penilaian/ic_sngt_puas.webp'
          }
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async terjual() {
      let formData = new FormData()
      formData.set('id', this.iklan.id)
      formData.set('note', this.note)
      await this.$axios
        .post('/iklan/v3/ib_terjual', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.setterjual = false
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
    },
    async hubungiRecord(item) {
      this.record = item
      // console.log('record', item)
      let formData = new FormData()
      formData.set('id_iklan', this.iklan.id)
      formData.set('id_app_user_penjual', this.iklan.id_app_user)
      if (this.user.id == null) {
        formData.set('id_app_user_pembeli', 0)
      } else {
        formData.set('id_app_user_pembeli', this.user.id)
      }
      formData.set('jenis', this.record)
      await this.$axios
        .post('/log/v3/log/call/click ', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response

          console.log('record ke ' + this.record + ' berhasil')
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
    async statistikPenjual() {
      await this.$axios
        .get('/transaksi/v3/statistik_penjual', {
          params: {
            id_penjual: this.seller.id,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.statistik = data
          for (let i = 0; i < this.statistik.length; i++) {
            if (this.statistik[i].id_mst_pembayaran_status == 1) {
              this.menungguPembayaran = this.statistik[i]
            }
            if (this.statistik[i].id_mst_pembayaran_status == 2) {
              this.pembayaranTerverifikasi = this.statistik[i]
            }
            if (this.statistik[i].id_mst_pembayaran_status == 11) {
              this.dibatalkanPenjual = this.statistik[i]
            }
          }

          console.log('data menungguPembayaran', this.menungguPembayaran)
          console.log(
            'data pembayaranTerverifikasi',
            this.pembayaranTerverifikasi
          )
          console.log('data dibatalkanPenjual', this.dibatalkanPenjual)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
  },
  async created() {
    await this.getHP()
    await this.detailUnit()
    await this.getPenjual()
    await this.reviewAvg()
    await this.getCatatan()
    await this.getKebijakan()
    await this.getFavorit()
    await this.statistikPenjual()
    // setInterval(() => {
    //   this.sharing = {
    //     url: 'https://simotor.id/iklan/' + this.id,
    //     title: this.hits.judul,
    //     description: this.hits.deskripsi,
    //     quote: this.hits.judul,
    //     hashtags: 'nuxtjs,simotor',
    //     twitterUser: 'simotor',
    //   }
    // }, 1000)
    console.log('unit mokas', this.unitMokas)
    console.log('fotos', this.fotos)
    console.log('iklan', this.iklan)
    console.log('avg woy', this.avg)
    console.log('route woy', this.$route)

    // this.rute.replace(/p/g, '-')

    if (this.user.id == null) {
      console.log('anda belum login')
    } else {
      console.log('user pembeli', this.user.id)
    }
    this.sharing = {
      url:
        'https://simotor.id/detail-iklan/' +
        this.iklan.judul.toLowerCase().replace(/ /g, '-').replace(/[/]/g, '-') +
        '-' +
        this.id,
      title: this.iklan.judul,
      description: this.iklan.deskripsi,
      quote: this.iklan.judul,
      hashtags: 'nuxtjs,simotor',
      twitterUser: 'simotor',
    }
  },
}
</script>

<style>
div.sticky {
  overflow: hidden;
  position: sticky;
  top: 12.6%;
  z-index: 1;
}
div.fixed {
  position: fixed;
  top: 35%;
  width: 290px;
  z-index: 1;
}
.v-application.primary--text {
  color: #20929d !important;
  caret-color: #20929d !important;
}
ody {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}
h1 {
  text-align: center;
  margin: 50px 0 80px;
}
.share-network-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px;
  margin: auto;
}
a[class^='share-network-'] {
  flex: none;
  color: #ffffff;
  background-color: #333;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 10px 10px 0;
}
a[class^='share-network-'] .fah {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 10px;
  flex: 0 1 auto;
}
a[class^='share-network-'] span {
  padding: 0 10px;
  flex: 1 1 0%;
  font-weight: 500;
}
</style>