<template>
  <v-container fluid>
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
                  <v-btn
                    text
                    height="47"
                    class="white"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon left>mdi-share-variant-outline</v-icon> Bagikan
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item
                    v-for="(network, index) in networks"
                    :key="index"
                  >
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

              <v-col cols="6" align="right"> Aksesoris & Suku Cadang </v-col>
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
                <div style="color: #20929d">Kondisi: {{ this.kondisi }}</div>
              </v-col>
              <v-col cols="6">
                <div class="d-flex align-center justify-end">
                  {{ iklan.log_iklan_view }} x <v-icon>mdi-eye</v-icon>
                </div>
                <div
                  class="d-flex align-center justify-end"
                  style="color: #20929d"
                >
                  ID Iklan: {{ iklan.id }}
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <h3>Deskripsi</h3>
                <div class="text-justify" style="white-space: pre-wrap">
                  {{ iklan.deskripsi }}
                </div>
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
                              size="50"
                              v-if="seller.id_mst_user_type == 2"
                            >
                              mdi-check-decagram
                            </v-icon>
                            <b class="ml-2" style="color: #333333">{{ seller.nama }}</b>
                          </a>
                        </v-list-item-title>

                        <v-list-item-subtitle>
                          <v-avatar
                            size="24"
                            item
                            class="mr-1"
                          >
                            <v-img
                              :src="gbrRatting"
                              alt="verified"
                              contain
                            ></v-img>
                          </v-avatar>
                          <span v-if="avg.ratting_user == 1">
                            Kurang Memuaskan
                          </span>
                          <span v-if="avg.ratting_user == 2">
                            Cukup Memuaskan
                          </span>
                          <span v-if="avg.ratting_user == 3">
                            Sangat Memuaskan
                          </span>
                           <span v-if="avg.ratting_user == 0"
                          >Belum Ada Penilaian</span
                        >
                        </v-list-item-subtitle>
                        
                      </v-list-item-content>
                    </v-list-item>
                    <center>
                    <v-list-item-subtitle class="mt-2">
                      <v-row>
                        <v-col style="border-right:1px solid black" cols="12" sm="6">
                          <div style="color:#20929D">{{ pembayaranTerverifikasi.total }}</div>
                          <div style="color:#505050">Produk Terjual</div>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div style="color:#EB5757">{{ dibatalkanPenjual.total }}</div>
                          <div style="color:#505050">Dibatalkan Penjual</div>
                        </v-col>
                      </v-row>
                    </v-list-item-subtitle>
                    </center>
                  </v-list>
                </v-col>
              </v-row>
              <hr class="my-3" />
              <v-row>
                <v-col cols="12" sm="9">
                  <h3>Catatan & Kebijakan Penjual</h3>
                  <v-list v-if="catatan.length > 0 || kebijakan != undefined">
                    <v-list-item v-for="item in catatan" :key="item.id">
                      <v-list-item-content>
                        <v-list-item-title class="d-flex align-center">
                          <v-icon color="black" class="mr-1">
                            mdi-circle-medium
                          </v-icon>
                          <b>{{ item.judul }}</b>
                        </v-list-item-title>

                        <v-list-item-subtitle>
                          <div v-html="item.deskripsi"></div>
                        </v-list-item-subtitle>
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

          <v-col cols="12" sm="3">
            <v-btn
              color="#20929D"
              dark
              block
              :to="'/message?id=' + seller.id"
              v-if="!guest"
              target="_blank"
            >
              Pesan
            </v-btn>
            <v-btn
              color="#20929D"
              dark
              block
              to="/login"
              v-if="guest"
              target="_blank"
            >
              Pesan
            </v-btn>

            <br />

            <v-btn color="#20929D" outlined block @click="hubungi = true">
              Hubungi
            </v-btn>
          </v-col>
        </v-row>
        <div v-if="iklan.id_mst_iklan_jenis == 5">
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
      </section>

      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title>
            <span class="headline">Info Iklan</span>
          </v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <div
                class="pb-3 d-flex flex-wrap justify-space-around text-center"
              >
                <div v-for="item in list" :key="item.id" class="required ml-3">
                  <image-uploader
                    v-model="item.foto"
                    :quality="0.7"
                    :scaleRatio="0.5"
                    accept="image/*"
                    :preview="false"
                    :className="[
                      'fileinput',
                      { 'fileinput--loaded': hasImage },
                    ]"
                    :autoRotate="true"
                    outputFormat="blob"
                    @input="setImage('foto' + item.id)"
                    :id="'foto' + item.id"
                  >
                    <label :for="'foto' + item.id" slot="upload-label">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-img
                            :src="
                              item.previewUrl.includes('produk/as')
                                ? getImage(item.previewUrl)
                                : item.previewUrl
                            "
                            contain
                            :width="$vuetify.breakpoint.xsOnly ? 130 : 60"
                            :height="$vuetify.breakpoint.xsOnly ? 130 : 60"
                            v-on="on"
                            style="position: relative"
                          >
                            <v-btn
                              class="mx-2"
                              fab
                              dark
                              small
                              @click="hapusgambar(item.id)"
                              v-if="item.foto != null"
                              style="
                                width: 20px;
                                height: 20px;
                                position: absolute;
                                right: -8px;
                                top: 1px;
                              "
                              color="primary"
                            >
                              <div dark>x</div>
                            </v-btn>
                          </v-img>
                        </template>
                        <span>Pilih Foto</span>
                      </v-tooltip>
                    </label>
                  </image-uploader>
                  {{ item.label }}
                </div>
              </div>

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
              <v-list-item-title> Kondisi </v-list-item-title>
              <v-list-item>
                <v-radio-group v-model="kondisiedit" row>
                  <v-radio label="Baru" :value="1"></v-radio>
                  <v-radio label="Bekas" :value="2"></v-radio>
                </v-radio-group>
              </v-list-item>
              <v-text-field
                label="Harga"
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
              Ubah Iklan Anda
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
              color="green"
              text
              @click="hubungiRecord(telpon)"
              :href="'tel:' + seller.nomor_hp"
            >
              Telepon
            </v-btn>

            <v-btn
              color="yellow"
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
              WhatsApp Now
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
      <v-dialog v-model="setterjual" persistent width="500">
        <v-card>
          <h3 class="pt-5 pl-10">
            Tulis alasan anda mengubah status ke terjual
          </h3>
          <v-col cols="12" md="11">
            <v-textarea
              label="Masukkan Alasan Anda"
              auto-grow
              v-model="note"
              class="pt-5 pl-10 rounded"
            ></v-textarea>
          </v-col>
          <v-card-actions class="justify-end mt--5">
            <v-btn @click="setterjual = false" color="#20929D" text outlined
              >Kembali</v-btn
            >
            <v-btn color="grey" dark v-if="note == ''">Perbarui</v-btn>
            <v-btn color="#20929D" dark v-else @click="terjual">Perbarui</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { VMoney } from 'v-money'
export default {
  name: 'aksesoris-sparepart',
  props: ['items','id'],
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
    telpon: 'telpon',
    whatsapp: 'whatsapp',
    chat: 'chat',
    record: '',
    pembeli: '',
    hubungi: false,
    setterjual: false,
    note: '',
    kondisi: '',
    sharing: {},
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
    list: [
      {
        id: 1,
        foto: null,
        previewUrl: '/img/icons/thumbnail/Photo.png',
        label: 'Foto 1',
        required: '*',
      },
      {
        id: 2,
        foto: null,
        previewUrl: '/img/icons/thumbnail/Photo.png',
        label: 'Foto 2',
        required: '*',
      },
      {
        id: 3,
        foto: null,
        previewUrl: '/img/icons/thumbnail/Photo.png',
        label: 'Foto 3',
        required: '',
      },
      {
        id: 4,
        foto: null,
        previewUrl: '/img/icons/thumbnail/Photo.png',
        label: 'Foto 4',
        required: '',
      },
      {
        id: 5,
        foto: null,
        previewUrl: '/img/icons/thumbnail/Photo.png',
        label: 'Foto 5',
        required: '',
      },
    ],
    listtemp: [],
    listfix: [
      { foto: null },
      { foto: null },
      { foto: null },
      { foto: null },
      { foto: null },
    ],
    listfixedit: [
      { foto: null },
      { foto: null },
      { foto: null },
      { foto: null },
      { foto: null },
    ],
    countRules: [],
    hasImage: false,
    judul: '',
    deskripsi: '',
    harga: '',
    kondisiedit: '',
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
    gbrRatting: '',
    statistik:[],
    pembayaranTerverifikasi:[],
    dibatalkanPenjual:[],
    menungguPembayaran:[],
  }),
  computed: {
    ...mapGetters({
      guest: 'auth/guest',
      user: 'auth/user',
      // id: 'product/id',
      unitid: 'product/unitid',
      utc: 'timezone/utc',
      timezone: 'timezone/region',
    }),
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setSellertId: 'product/setSeller',
      setAuth: 'auth/set',
    }),
    async getAss() {
      await this.$axios
        .get('/iklan/v3/iklan_as', {
          params: {
            id: this.id,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.iklan = data
          if (this.iklan.data_produk[0].foto_1 != null) {
            this.fotos.push({ src: this.iklan.data_produk[0].foto_1 })
          }
          if (this.iklan.data_produk[0].foto_2 != null) {
            this.fotos.push({ src: this.iklan.data_produk[0].foto_2 })
          }
          if (this.iklan.data_produk[0].foto_3 != null) {
            this.fotos.push({ src: this.iklan.data_produk[0].foto_3 })
          }
          if (this.iklan.data_produk[0].foto_4 != null) {
            this.fotos.push({ src: this.iklan.data_produk[0].foto_4 })
          }
          if (this.iklan.data_produk[0].foto_5 != null) {
            this.fotos.push({ src: this.iklan.data_produk[0].foto_5 })
          }
          // this.fotos.push(
          //   { src: this.iklan.data_produk[0].foto_1 },
          //   { src: this.iklan.data_produk[0].foto_2 },
          //   { src: this.iklan.data_produk[0].foto_3 },
          //   { src: this.iklan.data_produk[0].foto_4 },
          //   { src: this.iklan.data_produk[0].foto_5 },
          // )
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    setImage(file) {
      this.hasImage = true
      this.image = file
      this.onFileChange(file)
    },
    onFileChange(foto) {
      const reader = new FileReader()

      if (foto == 'foto1') {
        reader.onload = (e) => {
          this.list[0].previewUrl = e.target.result
        }
        reader.readAsDataURL(this.list[0].foto)
        this.countRules.push(this.list[0].foto)
      }
      if (foto == 'foto2') {
        reader.onload = (e) => {
          this.list[1].previewUrl = e.target.result
        }
        reader.readAsDataURL(this.list[1].foto)
        this.countRules.push(this.list[1].foto)
      }
      if (foto == 'foto3') {
        reader.onload = (e) => {
          this.list[2].previewUrl = e.target.result
        }
        reader.readAsDataURL(this.list[2].foto)
        this.countRules.push(this.list[2].foto)
      }
      if (foto == 'foto4') {
        reader.onload = (e) => {
          this.list[3].previewUrl = e.target.result
        }
        reader.readAsDataURL(this.list[3].foto)
        this.countRules.push(this.list[3].foto)
      }
      if (foto == 'foto5') {
        reader.onload = (e) => {
          this.list[4].previewUrl = e.target.result
        }
        reader.readAsDataURL(this.list[4].foto)
        this.countRules.push(this.list[4].foto)
      }
    },
    async hapusgambar(id) {
      console.log('gambar sebelum', this.list)
      if (id == 1) {
        this.list[id - 1].foto = null
        this.list[id - 1].previewUrl = '/img/icons/thumbnail/Photo.png'
      }
      if (id == 2) {
        this.list[id - 1].foto = null
        this.list[id - 1].previewUrl = '/img/icons/thumbnail/Photo.png'
      }
      if (id == 3) {
        this.list[id - 1].foto = null
        this.list[id - 1].previewUrl = '/img/icons/thumbnail/Photo.png'
      }
      if (id == 4) {
        this.list[id - 1].foto = null
        this.list[id - 1].previewUrl = '/img/icons/thumbnail/Photo.png'
      }
      if (id == 5) {
        this.list[id - 1].foto = null
        this.list[id - 1].previewUrl = '/img/icons/thumbnail/Photo.png'
      }
      console.log('gambar', this.list)
    },
    async terjual() {
      var r = confirm('Konfirmasi untuk mengubah status iklan ke terjual?')
      if (r == true) {
        let formData = new FormData()

        formData.append('id', this.id)
        formData.append('id_mst_iklan_status', 2)

        await this.axios
          .put('iklan/v3/iklan_hp_mokas_satuan', formData, {
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
            if (error.response.status == 403) {
              this.setAuth(null)
              this.setToken(null)
              window.localStorage.setItem('user', null)
              window.localStorage.setItem('token', null)
              window.location.href = '/'
            }
          })
      }
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
    go(id, name) {
      this.setSellertId(id)
      this.$router.push('/seller/' + name.toLowerCase().replace(/ /g, '-') +'-'+id )
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
          if (this.avg.ratting_user==0) {
            this.gbrRatting = '/img/penilaian/ic_tdk_nilai.webp'
          }
          if (this.avg.ratting_user==1) {
            this.gbrRatting = '/img/penilaian/ic_tdk_puas.webp'
          }
          if (this.avg.ratting_user==2) {
            this.gbrRatting = '/img/penilaian/ic_ckp_puas.webp'
          }
          if (this.avg.ratting_user==3) {
            this.gbrRatting = '/img/penilaian/ic_sngt_puas.webp'
          }
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
    async tryaja() {
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].foto != null) {
          this.listtemp.push(this.list[i].foto)
        }
      }
      for (let i = 0; i < this.listfix.length; i++) {
        if (this.listtemp[i] != undefined) {
          this.listfix[i].foto = this.listtemp[i]
        } else {
          this.listfix[i].foto = null
        }
      }
      if (
        typeof this.listfix[0].foto != 'string' &&
        this.listfix[0].foto != null
      ) {
        console.log('ini blob')
      }
      if (typeof this.listfix[0].foto == 'string') {
        console.log('ini string')
      }
      if (this.listfix[0].foto == null) {
        console.log('ini null')
      }

      // for (let i = 0; i < this.listfix.length; i++) {
      //   if (this.listfix[i].foto == this.iklan.data_produk[0].foto_1) {
      //     console.log('data ditemukan pada data produk foto_1')
      //   }else{
      //     console.log('data tidak ditemukan')
      //   }
      // }

      // if (typeof this.listfix[0].foto != "string") {

      //   console.log('data blob')
      // }else{
      //   console.log('data listfix',this.listfix)
      // }
      console.log('data list temp', this.listtemp)
      console.log('data listfix', this.listfix)
    },
    edit() {
      this.dialog = true
      this.judul = this.iklan.judul
      this.deskripsi = this.iklan.deskripsi
      this.harga = this.iklan.harga
      this.kondisiedit = this.iklan.data_produk[0].id_mst_kondisi
      if (this.iklan.data_produk[0].foto_1 != null) {
        this.list[0].previewUrl = this.iklan.data_produk[0].foto_1
        this.list[0].foto = this.iklan.data_produk[0].foto_1
      }
      if (this.iklan.data_produk[0].foto_2 != null) {
        this.list[1].previewUrl = this.iklan.data_produk[0].foto_2
        this.list[1].foto = this.iklan.data_produk[0].foto_2
      }
      if (this.iklan.data_produk[0].foto_3 != null) {
        this.list[2].previewUrl = this.iklan.data_produk[0].foto_3
        this.list[2].foto = this.iklan.data_produk[0].foto_3
      }
      if (this.iklan.data_produk[0].foto_4 != null) {
        this.list[3].previewUrl = this.iklan.data_produk[0].foto_4
        this.list[3].foto = this.iklan.data_produk[0].foto_4
      }
      if (this.iklan.data_produk[0].foto_5 != null) {
        this.list[4].previewUrl = this.iklan.data_produk[0].foto_5
        this.list[4].foto = this.iklan.data_produk[0].foto_5
      }

      console.log('list', this.list)
    },
    async updateIklan() {
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].foto != null) {
          this.listtemp.push(this.list[i].foto)
        }
      }
      for (let i = 0; i < this.listfix.length; i++) {
        if (this.listtemp[i] != undefined) {
          this.listfix[i].foto = this.listtemp[i]
        } else {
          this.listfix[i].foto = null
        }
      }

      let formData = new FormData()
      formData.set('judul', this.judul.trim())
      formData.set('deskripsi', this.deskripsi.trim())
      formData.set('harga', String(this.harga).replaceAll('.', ''))
      formData.set('id_mst_kondisi', this.kondisiedit)
      formData.set('id', this.id)
      formData.set('id_app_user', this.user.id)

      if (
        typeof this.listfix[0].foto != 'string' &&
        this.listfix[0].foto != null
      ) {
        formData.set('foto_1', this.listfix[0].foto, 'foto1.jpg')
      }
      if (typeof this.listfix[0].foto == 'string') {
        formData.set('foto_1_s', this.listfix[0].foto)
      }

      if (
        typeof this.listfix[1].foto != 'string' &&
        this.listfix[1].foto != null
      ) {
        formData.set('foto_2', this.listfix[1].foto, 'foto2.jpg')
      }
      if (typeof this.listfix[1].foto == 'string') {
        formData.set('foto_2_s', this.listfix[1].foto)
      }

      if (
        typeof this.listfix[2].foto != 'string' &&
        this.listfix[2].foto != null
      ) {
        formData.set('foto_3', this.listfix[2].foto, 'foto3.jpg')
      }
      if (typeof this.listfix[2].foto == 'string') {
        formData.set('foto_3_s', this.listfix[2].foto)
      }
      if (this.listfix[2].foto == null) {
        formData.set('foto_3_s', '')
      }

      if (
        typeof this.listfix[3].foto != 'string' &&
        this.listfix[3].foto != null
      ) {
        formData.set('foto_4', this.listfix[2].foto, 'foto4.jpg')
      }
      if (typeof this.listfix[3].foto == 'string') {
        formData.set('foto_4_s', this.listfix[3].foto)
      }
      if (this.listfix[3].foto == null) {
        formData.set('foto_4_s', 'empty')
      }

      if (
        typeof this.listfix[4].foto != 'string' &&
        this.listfix[4].foto != null
      ) {
        formData.set('foto_5', this.listfix[2].foto, 'foto5.jpg')
      }
      if (typeof this.listfix[4].foto == 'string') {
        formData.set('foto_5_s', this.listfix[4].foto)
      }
      if (this.listfix[4].foto == null) {
        formData.set('foto_5_s', 'empty')
      }

      for (let i = 0; i < this.listfix.length; i++) {
        if (this.listfix[i].foto == this.iklan.data_produk[0].foto_1) {
          formData.set('foto_1_s', this.listfix[i].foto)
        }
      }

      await this.$axios
        .put('/iklan/v3/iklan_as', formData, {
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

          console.log('data menungguPembayaran',this.menungguPembayaran)
          console.log('data pembayaranTerverifikasi',this.pembayaranTerverifikasi)
          console.log('data dibatalkanPenjual',this.dibatalkanPenjual)
          
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
  },
  async created() {
    await this.getAss()
    await this.getPenjual()
    await this.reviewAvg()
    await this.getCatatan()
    await this.getKebijakan()
    await this.statistikPenjual()
    console.log('ini ass id', this.id)
    console.log('ini ass', this.iklan)
    console.log('ini foto', this.fotos)
    console.log('ini seller', this.seller)
    console.log('ini avg', this.avg)
    console.log('ini catatan', this.catatan)
    console.log('ini kebijakan', this.kebijakan)

    console.log('ini user login', this.user)

    this.kondisi = this.iklan.data_produk[0].mst_kondisi
    this.sharing = {
      url: 'https://simotor.id/detail-iklan/' + this.iklan.judul.toLowerCase().replace(/ /g, '-').replace(/[/]/g,'-')+'-'+this.id,
      title: this.iklan.judul,
      description: this.iklan.deskripsi,
      quote: this.iklan.judul,
      hashtags: 'nuxtjs,simotor',
      twitterUser: 'simotor',
    }
     
    //   setInterval(() => {
    //   this.sharing = {
    //     url: 'https://simotor.id/iklan/' + this.id,
    //     title: this.hits.judul,
    //     description: this.hits.deskripsi,
    //     quote: this.hits.judul,
    //     hashtags: 'nuxtjs,simotor',
    //     twitterUser: 'simotor',
    //   }
    // }, 1000)
  },
}
</script>

<style>
.pilih {
  background: rgba(32, 146, 157, 0.1);
}
#foto1 {
  display: none;
}
#foto2 {
  display: none;
}
#foto3 {
  display: none;
}
#foto4 {
  display: none;
}
#foto5 {
  display: none;
}
</style>