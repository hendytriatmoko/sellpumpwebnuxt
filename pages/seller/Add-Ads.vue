<template>
  <div>
    <app-bar />

    <v-app-bar app color="#20929D" dark v-if="$vuetify.breakpoint.xs">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div style="max-width: 1240px; margin: 0 auto !important">
      <v-stepper v-model="e1">
        <v-stepper-header>
          <template v-for="n in steps">
            <v-stepper-step :key="`${n}-step`" :complete="e1 > n" :step="n">
              Tahap {{ n }}
            </v-stepper-step>
            <v-divider v-if="n !== steps" :key="n"></v-divider>
          </template>
        </v-stepper-header>

        <v-stepper-items>
          <v-form ref="form" v-model="valid">
            <v-stepper-content step="1">
              <v-card>
                <v-card-title>Pilih Jenis Iklan</v-card-title>
                <v-list :three-line="$vuetify.breakpoint.xsOnly ? true : false">
                  <div v-for="item in jenisIklan" :key="item.id">
                    <v-list-item @click="step2(item.id)">
                      <v-list-item-avatar tile size="50">
                        <v-img :src="item.icon" contain></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                        <v-list-item-subtitle>
                          {{ item.desc }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                  </div>
                </v-list>
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card>
                <!-- v-on:click="selected = ''" 
                    @click="e1 = 1"-->
                <div class="d-flex justify-space-between align-center">
                  <v-btn
                    icon
                    color="#20929D"
                    v-on:click="test"
                    
                  >
                    <v-icon large>mdi-arrow-left-circle</v-icon>
                  </v-btn>

                  <v-spacer></v-spacer>

                  <v-card-title>Pilih Unit Motor</v-card-title>

                  <v-spacer></v-spacer>

                  <v-btn
                    icon
                    color="#20929D"
                    @click="e1 = 3"
                    v-if="selectedIklan == 3 && selected.length > 1"
                  >
                    <v-icon large>mdi-arrow-right-circle</v-icon>
                  </v-btn>
                </div>

                <v-text-field
                  v-model="keyword"
                  label="Cari"
                  hide-details
                  flat
                  autofocus
                  outlined
                  dense
                  prepend-inner-icon="mdi-magnify"
                  @keyup.enter="getUnitMokas"
                ></v-text-field>

                <v-list :three-line="$vuetify.breakpoint.xsOnly ? true : false">
                  <v-list-item-group v-model="selected" :multiple="multiple">
                    <template v-for="(item, i) in unitMokas">
                      <v-list-item
                        :key="item.id"
                        :value="item"
                        color="indigo"
                      >
                        <template v-slot:default="{ active }">
                          <v-list-item-avatar tile size="50">
                            <v-img :src="getImage(item.foto_1)" contain></v-img>
                          </v-list-item-avatar>

                          <v-list-item-content>
                            <v-list-item-title
                              v-html="item.type"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                              v-html="item.nomor_polisi"
                            ></v-list-item-subtitle>
                            <v-list-item-subtitle
                              v-html="item.tahun"
                            ></v-list-item-subtitle>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-icon v-if="!active" color="grey lighten-1" large>
                              mdi-star
                            </v-icon>
                            <v-icon v-else color="yellow" large>
                              mdi-star
                            </v-icon>
                          </v-list-item-action>
                        </template>
                      </v-list-item>
                      <v-divider :key="i"></v-divider>
                    </template>
                  </v-list-item-group>
                </v-list>

                <v-pagination
                  v-model="page"
                  @input="getUnitMokas"
                  :length="lengthPage"
                  :total-visible="7"
                ></v-pagination>
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card>
                <v-card-title>Isi Detail Iklan Anda</v-card-title>

                <v-text-field
                  v-model="judul_iklan"
                  label="Judul Iklan"
                  outlined
                  dense
                  :counter="70"
                  :rules="judulRules"
                ></v-text-field>

                <v-row>
                  <v-col cols="12" :sm="selectedIklan == 3 ? 12 : 8">
                    <v-textarea
                      v-model="deskripsi_iklan"
                      label="Deskripsikan Iklan Anda"
                      outlined
                      dense
                      auto-grow
                      rows="1"
                      :counter="350"
                      :rules="descRules"
                    ></v-textarea>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="4"
                    class="text-right"
                    v-if="selectedIklan < 3"
                  >
                    <v-btn
                      color="#20929D"
                      dark
                      small
                      class="mt-1"
                      @click="setDeskripsi"
                    >
                      Gunakan deskripsi unit
                    </v-btn>
                  </v-col>
                </v-row>

                <v-divider class="mt-2"></v-divider>

                <v-card-title>Informasi Harga</v-card-title>

                <v-text-field
                  v-model.lazy="amount"
                  :label="selectedIklan == 1 ? 'Harga' : 'Harga Awal'"
                  outlined
                  dense
                  :rules="amountRules"
                  maxlength="11"
                  v-money="money"
                ></v-text-field>
                <div v-if="selectedIklan == 1">
                  <h3>Jual Lebih Cepat</h3>
                  <v-col
                      cols="12"
                      v-for="(item, index) in listsubs"
                      :key="index"
                    >
                      <v-item-group>
                        <div class="scrolling-wrapper-flexbox">
                          <v-row>
                            <v-col
                              cols="12"
                              sm="3"
                              v-for="(pasanglangganan, i) in item.data"
                              :key="i"
                            >
                              <v-card
                                color="#20929D"
                                dark
                                @click="functest(pasanglangganan,i)"
                              >
                                <v-list-item>
                                  <v-list-item-title>
                                    {{ pasanglangganan.nama_langganan }}
                                  </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>
                                    Berlaku hingga
                                    {{
                                      moment
                                        .utc(pasanglangganan.expired_at)
                                        .format('DD MMM YYYY')
                                    }}
                                  </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>
                                    Tersedia:
                                    {{
                                      pasanglangganan.total
                                    }}</v-list-item-title
                                  >
                                </v-list-item>
                                <v-list-item>
                                  <div class="ml-1 row"><div class="lingluar"><div class="check"></div></div> &nbsp;&nbsp;&nbsp;Pakai</div>
                                  
                                </v-list-item>
                              </v-card>
                            </v-col>
                          </v-row>
                        </div>
                      </v-item-group>
                    </v-col>
                    <label >
                      <input type="checkbox"> Saya sudah membaca dan memahami <a href="tentang?tab=ketentuan" class="sdank">syarat dan ketentuan</a> iklan baris
                    </label>
                </div>

                <div v-if="selectedIklan != 1">
                  <div class="text-h6">Kelipatan Tawaran</div>

                  <v-item-group v-model="kelipatan" mandatory>
                    <v-row>
                      <v-col cols="12" sm="4">
                        <v-item
                          v-slot:default="{ active, toggle }"
                          value="50000"
                        >
                          <v-card
                            :color="active ? 'teal' : ''"
                            dark
                            @click="toggle"
                          >
                            <v-card-title class="d-flex justify-center"
                              >Rp 50.000</v-card-title
                            >

                            <v-scroll-y-transition>
                              <div
                                v-if="active"
                                class="display-3 flex-grow-1 text-center"
                              ></div>
                            </v-scroll-y-transition>
                          </v-card>
                        </v-item>
                      </v-col>

                      <v-col cols="12" sm="4">
                        <v-item
                          v-slot:default="{ active, toggle }"
                          value="100000"
                        >
                          <v-card
                            :color="active ? 'teal' : ''"
                            dark
                            @click="toggle"
                          >
                            <v-card-title class="d-flex justify-center"
                              >Rp 100.000</v-card-title
                            >

                            <v-scroll-y-transition>
                              <div
                                v-if="active"
                                class="display-3 flex-grow-1 text-center"
                              ></div>
                            </v-scroll-y-transition>
                          </v-card>
                        </v-item>
                      </v-col>

                      <v-col cols="12" sm="4">
                        <v-item
                          v-slot:default="{ active, toggle }"
                          value="150000"
                        >
                          <v-card
                            :color="active ? 'teal' : ''"
                            dark
                            @click="toggle"
                          >
                            <v-card-title class="d-flex justify-center"
                              >Rp 150.000</v-card-title
                            >

                            <v-scroll-y-transition>
                              <div
                                v-if="active"
                                class="display-3 flex-grow-1 text-center"
                              ></div>
                            </v-scroll-y-transition>
                          </v-card>
                        </v-item>
                      </v-col>
                    </v-row>
                  </v-item-group>

                  <v-list>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Gunakan Tiket</v-list-item-title>
                        <v-list-item-subtitle>
                          Isikan jumlah tiket untuk iklan ini, minimal 1 Tiket
                        </v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-switch
                          v-model="tiket"
                          input-value="true"
                          color="success"
                          @change="useTiket"
                        ></v-switch>
                      </v-list-item-action>
                    </v-list-item>

                    <v-list-item v-if="tiket">
                      <v-text-field
                        v-model="jumlahtiket"
                        label="Jumlah Tiket"
                        outlined
                        dense
                        :autofocus="tiket ? true : false"
                        :rules="jumlahRules"
                        v-mask="mask"
                      ></v-text-field>
                    </v-list-item>
                  </v-list>

                  <v-row>
                    <v-col cols="12" sm="6">
                      <div>Tanggal Mulai Tawar Bersama</div>

                      <v-datetime-picker
                        v-model="tglMulaiTB"
                        :datePickerProps="{
                          min: today,
                        }"
                        @input="dateTimeRange"
                        :textFieldProps="suffix"
                        :timePickerProps="{ format: '24hr' }"
                      >
                        <template slot="dateIcon">
                          <v-icon>mdi-calendar</v-icon>
                        </template>

                        <template slot="timeIcon">
                          <v-icon>mdi-clock</v-icon>
                        </template>

                        <template slot="actions" slot-scope="{ parent }">
                          <v-btn
                            color="success darken-1"
                            @click="parent.okHandler"
                          >
                            OK
                          </v-btn>
                        </template>
                      </v-datetime-picker>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <div>Tanggal Selesai Tawar Bersama</div>

                      <v-datetime-picker
                        v-model="tglSelesaiTB"
                        :datePickerProps="datePickerProps"
                        :textFieldProps="textFieldProps"
                        :timePickerProps="{ format: '24hr' }"
                        @input="checkDateTB"
                      >
                        <template slot="dateIcon">
                          <v-icon>mdi-calendar</v-icon>
                        </template>

                        <template slot="timeIcon">
                          <v-icon>mdi-clock</v-icon>
                        </template>

                        <template slot="actions" slot-scope="{ parent }">
                          <v-btn
                            color="success darken-1"
                            @click="parent.okHandler"
                          >
                            OK
                          </v-btn>
                        </template>
                      </v-datetime-picker>
                    </v-col>
                  </v-row>
                  <div>
                    
                    
                    <div v-if="listsubs.length > 0">
                     
                   
                        <h3>Jual lebih cepat</h3>
                          <v-col
                      cols="12"
                      v-for="(item, index) in listsubs"
                      :key="index"
                    >
                      <v-item-group>
                        <div class="scrolling-wrapper-flexbox">
                          <v-row>
                            <v-col
                              cols="12"
                              sm="3"
                              v-for="(pasanglangganan, i) in item.data"
                              :key="i"
                            >
                              <v-card
                                color="#20929D"
                                dark
                                @click="functest(pasanglangganan,i)"
                              >
                                <v-list-item>
                                  <v-list-item-title>
                                    {{ pasanglangganan.nama_langganan }}
                                  </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>
                                    Berlaku hingga
                                    {{
                                      moment
                                        .utc(pasanglangganan.expired_at)
                                        .format('DD MMM YYYY')
                                    }}
                                  </v-list-item-title>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-title>
                                    Tersedia:
                                    {{
                                      pasanglangganan.total
                                    }}</v-list-item-title
                                  >
                                </v-list-item>
                                <v-list-item>
                                  <div class="ml-1 row"><div class="lingluar"><div class="check"></div></div> &nbsp;&nbsp;&nbsp;Pakai</div>
                                  
                                </v-list-item>
                              </v-card>
                            </v-col>
                          </v-row>
                        </div>
                      </v-item-group>
                    </v-col>
                    </div>

                
                  </div>

                  <div>
                    Iklan akan aktif setelah Anda menekan tombol "Iklankan".
                  </div>

                  <div>Penawaran akan dimulai berdasarkan tanggal diatas.</div>
                </div>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="red"
                    outlined
                    dark
                    @click="id == undefined ? (e1 = 2) : (e1 = 1)"
                  >
                    Sebelumnya
                  </v-btn>
                  <v-btn
                    color="#20929D"
                    class="white--text"
                    
                    @click="storeItem"
                    :loading="loading"
                  >
                    Iklankan
                  </v-btn>
                  <!-- :disabled="!valid" -->
                </v-card-actions>
              </v-card>
            </v-stepper-content>
          </v-form>
        </v-stepper-items>
      </v-stepper>
    </div>

    <Footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mask } from 'vue-the-mask'
import Vue from 'vue'
import VueGeolocation from 'vue-browser-geolocation'
import { VMoney } from 'v-money'

Vue.use(VueGeolocation)

export default {
  name: 'add-ads',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),

     Footer: () =>
      import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
  },
  directives: { money: VMoney, mask },
  data: () => ({
    e1: 1,
    steps: 3,
    valid: true,
    sdank: false,
    jenisIklan: [
      {
        id: 1,
        icon: '/img/icons/harga_pas.png',
        name: 'Iklan Baris',
        desc: 'Jual Motor Berkualitas secara Satuan',
      },
      {
        id: 2,
        icon: '/img/icons/tb-satuan.png',
        name: 'Tawar Bersama Satuan',
        desc: 'Dengan skema tawar bersama, jual motor anda secara satuan!',
      },
      {
        id: 3,
        icon: '/img/icons/tb-paketan.png',
        name: 'Tawar Bersama Paketan',
        desc: 'Dengan skema tawar bersama, jual motor anda secara paketan!',
      },
    ],
    keyword: '',
    selected: '',
    pasanglangganan: null,
    multiple: false,
    unitMokas: [],
    selectedIklan: [],
    selectedUnit: 0,
    judul_iklan: '',
    judulRules: [
      (v) => !!v || 'judul iklan harus diisi',
      (v) => v.length >= 2 || 'Min 2 karakter',
      (v) => v.length <= 70 || 'Max 70 karakter',
    ],
    deskripsi_iklan: '',
    descRules: [
      (v) => !!v || 'deskripsi unit harus diisi',
      (v) => v.length >= 2 || 'Min 2 karakter',
      (v) => v.length <= 350 || 'Max 350 karakter',
    ],
    amount: 0,
    amountRules: [
      (v) => v != 0 || 'Field is required',
      (v) => v.length <= 11 || 'Max 11 karakter',
    ],
    money: {
      precision: 0,
      thousands: '.',
      masked: true,
    },
    kelipatan: '',
    tiket: true,
    jumlahtiket: 1,
    jumlahRules: [
      (v) => v.length >= 1 || 'Min 1 Tiket',
      (v) => v.length <= 9 || 'Max 9 Tiket',
    ],
    mask: '#',
    menu1: false,
    tglMulaiTB: '',
    datePickerProps: {},
    today: '',
    suffix: {},
    textFieldProps: {},
    menu2: false,
    tglSelesaiTB: null,
    formRules: [(v) => !!v || 'Field is required'],
    tbDateRules: [],
    lat: 0,
    lng: 0,
    loading: false,
    serverTime: 0,
    page: 1,
    limit: 20,
    total: 0,
    lengthPage: 1,
    listsubs: [],
    langganan: [],
    id_iklan_langganan: null,
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
      setAlert: 'alert/set',
      setAuth: 'auth/set',
      setProductId: 'product/setProduct',
      setUnitID: 'product/setUnit',
    }),
    functest(pasanglangganan,i) {
      if (this.id_iklan_langganan == pasanglangganan.id_iklan_langganan) {
        this.id_iklan_langganan = null
        const topads = document.querySelectorAll(".check")
        for (let t = 0; t < topads.length; t++) {
          if(t == i){
            topads[i].classList.remove('lingdalam')
          }
        }
      } else {
        this.id_iklan_langganan = pasanglangganan.id_iklan_langganan
        const topads = document.querySelectorAll(".check")
        for (let t = 0; t < topads.length; t++) {
          if(t == i){
            topads[i].classList.add('lingdalam')
          }else{
            topads[t].classList.remove('lingdalam')
          }   
        }
        
        // document.querySelectorAll(".check").classList.add('lingdalam')
      }
      // document.querySelector(".mute").checked = true;
      console.log('test pasanglangganan ', this.id_iklan_langganan)
      // console.log('test i ', i)
    },
    async getJenisIklan() {
      await this.$axios
        .get('/setup/v3/show_iklan', {
          params: {
            limit: this.user.id_mst_user_type == 1 ? 1 : 3,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.jenisIklan = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    step2(item) {
      this.selectedIklan = item
      if (item == 3) {
        this.multiple = true
      } else {
        this.multiple = false
      }
      console.log('idnya',item)
      this.e1 = 2
    },
    stepSkip(item) {
      this.selectedIklan = item
      if (item == 3) {
        this.multiple = true
        this.e1 = 2
      } else {
        this.e1 = 3
      }
    },
    async test(){
      console.log('ini selected', this.selected)
    },
    async getUnitMokas() {
      let offset = (this.page - 1) * this.limit

      await this.$axios
        .get('/produk/v3/unit_mokas', {
          params: {
            id_app_user: this.user.id,
            id_mst_motor_bekas_status: 1,
            search: this.keyword,
            offset: offset,
            limit: this.limit,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.unitMokas = data

          this.total = response.data.count
          this.lengthPage = Math.ceil(this.total / this.limit)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    selectUnit(item) {
      if (this.multiple == false) {
        this.selectedUnit = item
        this.e1 = 3
      }
    },
    setDeskripsi() {
      if (this.selected.deskripsi != null) {
        this.deskripsi_iklan = this.selected.deskripsi
      }
    },
    dateTimeRange() {
      this.tglMulaiTB = this.moment(this.tglMulaiTB).format('YYYY-MM-DD HH:mm')
      this.tglSelesaiTB = this.tglMulaiTB

      let maxdate = this.moment(this.tglMulaiTB)
        .add(7, 'd')
        .format('YYYY-MM-DD')

      this.datePickerProps = {
        min: this.tglMulaiTB,
        max: maxdate,
      }
    },
    checkDateTB() {
      this.tglSelesaiTB = this.moment(this.tglSelesaiTB).format(
        'YYYY-MM-DD HH:mm'
      )
      let check = this.moment(this.tglSelesaiTB).isBefore(this.tglMulaiTB)
      var x = this.moment(this.tglSelesaiTB)
      var y = this.moment(this.tglMulaiTB)
      var duration = this.moment.duration(x.diff(y))
      var h = duration._data.hours
      var m = duration._data.minutes

      if (check == true) {
        this.textFieldProps = {
          rules: [
            h < 0 || 'Tanggal Selesai harus lebih besar dari Tanggal Mulai',
            m < 0 || 'Tanggal Selesai harus lebih besar dari Tanggal Mulai',
          ],
          suffix: this.timezone,
        }
      } else {
        this.textFieldProps = {
          rules: [],
          suffix: this.timezone,
        }
      }
    },
    useTiket() {
      if (this.tiket) {
        this.jumlahtiket = '1'
      } else {
        this.jumlahtiket = 0
      }
    },
    watchLocation() {
      this.$getLocation({
        enableHighAccuracy: true,
      }).then((coordinates) => {
        this.lat = coordinates.lat
        this.lng = coordinates.lng
      })
    },
    async getListSubs() {
      await this.$axios
        .get('/produk/v3/langganan_pemilik_group', {
          params: {
            id_app_user: this.user.id,
            id_mst_langganan_tipe: 7,
            limit: 99,
            offset: 0,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.listsubs = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async storeItem() {
      var r = confirm('Apakah Anda Yakin?')
      if (r == true) {
        this.submit = true

        this.loading = true

        let formData = new FormData()

        if (this.selectedIklan == 1) {
          formData.set('selectedIklan', this.selectedIklan)
          formData.set('id_motor_bekas', this.selectedUnit.id)
          formData.set('photo', this.selectedUnit.foto_1)
          formData.set('judul', this.judul_iklan.trim())
          formData.set('deskripsi', this.deskripsi_iklan.trim())
          formData.set('harga', String(this.amount).replaceAll('.', ''))
          formData.set('latitude', this.lat)
          formData.set('longitude', this.lng)
          formData.set('id_app_user', this.user.id)
          formData.set('id_iklan_langganan', this.id_iklan_langganan)

          await this.$axios
            .post('/iklan/v3/iklan_hp_mokas_satuan', formData, {
              headers: { Authorization: 'Bearer ' + this.user.token },
            })
            .then((response) => {
              let { data } = response
              this.setAlert({
                status: true,
                color: 'success',
                text: data.api_message,
              })
              this.setProductId(data.data.id)
              // this.setUnitID(this.selected.id)
              this.$router.push(
                '/detail-iklan/' +
                  data.data.judul.toLowerCase().replace(/ /g, '-')
              )
            })
            .catch((error) => {
              let responses = error.response.data
              this.setAlert({
                status: true,
                color: 'error',
                text: responses.api_message,
              })

              this.loading = false

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

        if (this.selectedIklan == 2) {
          formData.set('selectedIklan', this.selectedIklan)
          formData.set('id_motor_bekas', this.selectedUnit.id)
          formData.set('photo', this.selectedUnit.foto_1)
          formData.set('judul', this.judul_iklan)
          formData.set('deskripsi', this.deskripsi_iklan)
          formData.set('harga_awal', String(this.amount).replaceAll('.', ''))
          formData.set('kelipatan', this.kelipatan)
          formData.set(
            'tanggal_mulai',
            this.moment(this.tglMulaiTB)
              .add(this.serverTime, 'h')
              .format('YYYY-MM-DD HH:mm:ss')
          )
          formData.set(
            'tanggal_selesai',
            this.moment(this.tglSelesaiTB)
              .add(this.serverTime, 'h')
              .format('YYYY-MM-DD HH:mm:ss')
          )
          formData.set('latitude', this.lat)
          formData.set('longitude', this.lng)
          formData.set('is_verified', this.tiket)
          formData.set('id_mst_type_tb', 1)
          formData.set('id_app_user', this.user.id)
          formData.set('jumlah_tiket', this.jumlahtiket)
          formData.set('id_iklan_langganan', this.id_iklan_langganan)

          await this.$axios
            .post('/iklan/v3/iklan_tb_mokas_satuan', formData, {
              headers: { Authorization: 'Bearer ' + this.user.token },
            })
            .then((response) => {
              let { data } = response
              this.setAlert({
                status: true,
                color: 'success',
                text: data.api_message,
              })
              this.setProductId(data.data.id)
              // this.setUnitID(this.selected.id)
              this.$router.push(
                '/detail-iklan/' +
                  data.data.judul.toLowerCase().replace(/ /g, '-')
              )
            })
            .catch((error) => {
              let responses = error.response.data
              this.setAlert({
                status: true,
                color: 'error',
                text: responses.api_message,
              })

              this.loading = false

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

        if (this.selectedIklan == 3) {
          // var i = 0
          // formData.set('selectedIklan', this.selectedIklan)
          // for (i = 0; i < this.selected.length; i++) {
          //   formData.append('id_motor_bekas', this.selected[i].id)
          // }
          // formData.set('judul', this.judul_iklan)
          // formData.set('deskripsi', this.deskripsi_iklan)
          // formData.set('harga_awal', String(this.amount).replaceAll('.', ''))
          // formData.set('kelipatan', this.kelipatan)
          // formData.set(
          //   'tanggal_mulai',
          //   this.moment(this.tglMulaiTB)
          //     .add(this.serverTime, 'h')
          //     .format('YYYY-MM-DD HH:mm:ss')
          // )
          // formData.set(
          //   'tanggal_selesai',
          //   this.moment(this.tglSelesaiTB)
          //     .add(this.serverTime, 'h')
          //     .format('YYYY-MM-DD HH:mm:ss')
          // )
          // formData.set('latitude', this.lat)
          // formData.set('longitude', this.lng)
          // formData.set('is_verified', this.tiket)
          // formData.set('id_mst_type_tb', 1)
          // formData.set('id_app_user', this.user.id)
          // formData.set('jumlah_tiket', this.jumlahtiket)

          // await this.$axios
          //   .post('/iklan/v3/iklan_tb_mokas_paketan', formData, {
          //     headers: { Authorization: 'Bearer ' + this.user.token },
          //   })
          //   .then((response) => {
          //     let { data } = response
          //     this.setAlert({
          //       status: true,
          //       color: 'success',
          //       text: data.api_message,
          //     })
          //     this.setProductId(data.data.id)
          //     // this.setUnitID(this.selected.id)
          //     this.$router.push(
          //       '/detail-iklan/' +
          //         data.data.judul.toLowerCase().replace(/ /g, '-')
          //     )
          //   })
          //   .catch((error) => {
          //     let responses = error.response.data
          //     this.setAlert({
          //       status: true,
          //       color: 'error',
          //       text: responses.api_message,
          //     })

          //     this.loading = false

          //     if (error.response.status == 403) {
          //       this.setAuth({})
          //       this.$cookies.set('user', null)
          //       this.$cookies.set('prevUrl', this.$route.path)
          //       this.setAlert({
          //         status: true,
          //         color: 'error',
          //         text: responses.api_message,
          //       })
          //       this.$router.push('/login')
          //     }
          //   })
          // var i = 0
          // for (i = 0; i < this.selected.length; i++) {
          //   console.log('id_motor_bekas' + i , this.selected[i].id)
          // }
          console.log('judul', this.judul_iklan)
          console.log('deskripsi', this.deskripsi_iklan)
          console.log('hargaawal', this.amount)
          console.log('kelipatan', this.kelipatan)
          console.log('tgl mulai', this.tglMulaiTB)
          console.log('tgl selesai', this.tglSelesaiTB)
          console.log('tipetb' ,this.tipetb)
          console.log('is verified' ,this.tiket)
          console.log('jumlah tiket' ,this.jumlahtiket)
          console.log('selected', this.selected)
        }
      }
    },
  },
  async created() {
    // await this.getJenisIklan()

    if (this.user.id_mst_user_type == 1) {
      this.jenisIklan.slice(0, 1)
    } else {
      this.jenisIklan.slice(0, 3)
    }

    await this.getUnitMokas()

    this.watchLocation()

    this.tglMulaiTB = this.moment()
      .add(this.utc, 'h')
      .format('YYYY-MM-DD HH:mm')
    this.today = this.moment().add(this.utc, 'h').format('YYYY-MM-DD HH:mm')
    this.suffix = { suffix: this.timezone }

    if (this.utc == 0) {
      this.serverTime = 0
    }
    if (this.utc == 1) {
      this.serverTime = -1
    }
    if (this.utc == 2) {
      this.serverTime = -2
    }

    this.dateTimeRange()

    await this.getListSubs()
  },
}
</script>

<style>
.lingluar{
	width: 20px;
	height: 20px;
	background: white;
	border-radius: 100%;
}
.lingdalam{
	width: 15px;
	height: 15px;
  margin-left: 2.6px;
  margin-top: 3px;
	background: white;
  border: 3px solid #20929D;
	border-radius: 100%;
}
.sdank{
  color: #20929D;
}
.scrolling-wrapper-flexbox {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}
.scrolling-wrapper-flexbox {
  width: 100%;
  -webkit-overflow-scrolling: touch;
}
</style>