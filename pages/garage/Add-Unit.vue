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
          <v-stepper-content step="1">
            <v-card>
              <v-card-title>Pilih Foto Motor Anda</v-card-title>
              <v-card-subtitle style="color:red">Masukkan minimal 2(dua) foto</v-card-subtitle>

              <div class="d-flex flex-wrap justify-space-around text-center">
                <div v-for="item in list" :key="item.id">
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
                            :src="item.previewUrl"
                            contain
                            :width="$vuetify.breakpoint.xsOnly ? 130 : 190"
                            :height="$vuetify.breakpoint.xsOnly ? 130 : 190"
                            v-on="on"
                          ></v-img>
                        </template>
                        <span>Pilih Foto</span>
                      </v-tooltip>
                    </label>
                  </image-uploader>
                  {{ item.label }}
                </div>
              </div>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  color="#20929D"
                  dark
                  :disabled="countRules.length >= 2 ? false : true"
                  @click="e1 = 2"
                >
                  Selanjutnya
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card>
              <v-card-title>Pilih Tipe Motor Anda</v-card-title>

              <div
                class="d-flex flex-nowrap justify-space-between text-center mb-4"
                style="overflow-x: auto"
              >
                <v-card flat v-for="item in list" :key="item.id" class="mx-2">
                  <v-img
                    :src="item.previewUrl"
                    contain
                    width="170"
                    height="170"
                  ></v-img>

                  <v-chip small left color="red" dark>{{ item.label }}</v-chip>
                </v-card>
              </div>

              <v-form ref="form" v-model="valid1">
                <v-autocomplete
                  v-model="merk"
                  label="Pilih Merk Motor"
                  outlined
                  dense
                  :items="brands"
                  item-text="merk"
                  item-value="id"
                  :rules="formRules"
                ></v-autocomplete>

                <v-autocomplete
                  v-model="tahun"
                  label="Tahun Motor"
                  outlined
                  dense
                  :items="years"
                  item-text="tahun"
                  item-value="tahun"
                  :rules="formRules"
                ></v-autocomplete>

                <v-autocomplete
                  v-model="type"
                  label="Tipe Motor"
                  outlined
                  dense
                  :items="types"
                  item-text="type"
                  item-value="id"
                  :rules="formRules"
                ></v-autocomplete>
              </v-form>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#20929D" outlined  @click="e1 = 1">Sebelumnya</v-btn>
                <v-btn color="#20929D" dark :disabled="!valid1" @click="e1 = 3">
                  Selanjutnya
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-form ref="form" v-model="valid2">
              <v-card>
                <v-card-title>Isi Detail Motor Anda</v-card-title>

                <v-text-field
                  v-model="warna"
                  label="Warna Motor"
                  outlined
                  dense
                  :rules="warnaRules"
                ></v-text-field>

                <v-select
                  v-model="odometer"
                  label="Odometer"
                  outlined
                  dense
                  :items="odo"
                  item-text="range"
                  item-value="id"
                  :rules="formRules"
                  suffix="KM"
                ></v-select>

                <v-text-field
                  v-model="cc"
                  label="Kapasitas Mesin"
                  outlined
                  dense
                  :rules="formRules"
                  suffix="CC"
                  v-mask="mask"
                ></v-text-field>

                <v-select
                  v-model="transmisi"
                  label="Transmisi Motor"
                  outlined
                  dense
                  :items="trans"
                  item-text="transmisi"
                  item-value="id"
                  :rules="formRules"
                ></v-select>

                <v-select
                  v-model="jenis"
                  label="Jenis Motor"
                  outlined
                  dense
                  :items="jenis_motor"
                  item-text="jenis"
                  item-value="id"
                  :rules="formRules"
                ></v-select>

                <v-card-title>Detail Dokumen Motor</v-card-title>

                <v-text-field
                  v-model="nopol"
                  label="Nomor Polisi"
                  outlined
                  dense
                  maxlength="9"
                  :rules="nopolRules"
                ></v-text-field>

                <v-text-field
                  v-model="lokasi"
                  label="Lokasi Unit"
                  outlined
                  dense
                  :rules="lokasiRules"
                ></v-text-field>

                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Lembar Pajak Ada</v-list-item-title>
                      <v-list-item-subtitle>
                        Anda memiliki lembar Surat Ketetapan Pajak untuk motor
                        berikut
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-switch
                        v-model="pajak"
                        input-value="true"
                        color="#20929D"
                      ></v-switch>
                    </v-list-item-action>
                  </v-list-item>

                  <v-list-item v-if="pajak">
                    <v-menu
                      ref="menu"
                      v-model="menu1"
                      transition="scale-transition"
                      offset-y
                      min-width="290"
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="tglPajak"
                          label="Tanggal Selesai Pajak"
                          prepend-icon="mdi-calendar"
                          outlined
                          dense
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>

                      <v-date-picker v-model="tglPajak">
                        <v-spacer></v-spacer>
                        <v-btn text color="red" @click="menu1 = false">
                          Batalkan
                        </v-btn>
                        <v-btn
                          text
                          color="#20929D"
                          @click="$refs.menu.save(tglPajak)"
                        >
                          Simpan
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Lembar STNK Ada</v-list-item-title>
                      <v-list-item-subtitle>
                        Anda memiliki lembar Surat Tanda Nomor Kendaraan untuk
                        motor berikut
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-switch
                        v-model="stnk"
                        input-value="true"
                        color="#20929D"
                      ></v-switch>
                    </v-list-item-action>
                  </v-list-item>

                  <v-list-item v-if="stnk">
                    <v-menu
                      ref="menu"
                      v-model="menu2"
                      transition="scale-transition"
                      offset-y
                      min-width="290"
                      :close-on-content-click="false"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="tglSTNK"
                          label="Tanggal Selesai STNK"
                          prepend-icon="mdi-calendar"
                          outlined
                          dense
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>

                      <v-date-picker v-model="tglSTNK">
                        <v-spacer></v-spacer>
                        <v-btn text color="red" @click="menu2 = false">
                          Batalkan
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(tglSTNK)"
                        >
                          Simpan
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Lembar BPKB Ada</v-list-item-title>
                      <v-list-item-subtitle>
                        Anda memiliki Buku Pemilik Kendaraan Bermotor (BPKB)
                        untuk motor berikut
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-switch
                        v-model="bpkb"
                        input-value="true"
                        color="#20929D"
                      ></v-switch>
                    </v-list-item-action>
                  </v-list-item>

                  <v-divider></v-divider>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Deskripsi Unit</v-list-item-title>
                      <v-list-item-subtitle>Opsional</v-list-item-subtitle>
                      <v-list-item-subtitle>
                        Deskripsikan unit anda secara singkat dan jelas.
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-switch
                        v-model="desc"
                        input-value="true"
                        color="#20929D"
                      ></v-switch>
                    </v-list-item-action>
                  </v-list-item>

                  <v-list-item v-if="desc">
                    <v-textarea
                      v-model="deskripsi"
                      label="Contoh: Jual unit motor saya"
                      outlined
                      dense
                      auto-grow
                      rows="1"
                      :counter="350"
                      :rules="descRules"
                    ></v-textarea>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Kode Barcode</v-list-item-title>
                      <v-list-item-subtitle>Opsional</v-list-item-subtitle>
                      <v-list-item-subtitle>
                        Anda dapat memasukan kode barcode untuk mempermudah
                        pencarian unit anda.
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-switch
                        v-model="scan"
                        input-value="true"
                        color="success"
                      ></v-switch>
                    </v-list-item-action>
                  </v-list-item>

                  <v-list-item v-if="scan">
                    <v-text-field
                      v-model="barcode"
                      label="Contoh: 1234xxx"
                      outlined
                      dense
                    ></v-text-field>
                  </v-list-item>
                </v-list>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="#20929D" outlined @click="e1 = 2">Sebelumnya</v-btn>
                  <v-btn
                    color="#20929D" dark
                    :disabled="valid1 == valid2 ? false : true"
                    @click="storeItem"
                    :loading="loading"
                  >
                    Simpan
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>

    <Footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mask } from 'vue-the-mask'

export default {
  name: 'add-unit',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),

    Footer: () =>
      import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
  },
  directives: { mask },
  data: () => ({
    e1: 1,
    steps: 3,
    list: [
      {
        id: 1,
        foto: null,
        previewUrl: '/img/icons/thumbnail/Photo.webp',
        label: 'Foto 1',
      },
      {
        id: 2,
        foto: null,
        previewUrl: '/img/icons/thumbnail/Photo.webp',
        label: 'Foto 2',
      },
      {
        id: 3,
        foto: null,
        previewUrl: '/img/icons/thumbnail/Photo.webp',
        label: 'Foto 3',
      },
      {
        id: 4,
        foto: null,
        previewUrl: '/img/icons/thumbnail/Photo.webp',
        label: 'Foto 4',
      },
      {
        id: 5,
        foto: null,
        previewUrl: '/img/icons/thumbnail/Photo.webp',
        label: 'Foto 5',
      },
    ],
    listtemp:[],
    listfix: [
      {foto: null,},
      {foto: null,},
      {foto: null,},
      {foto: null,},
      {foto: null,},
    ],
    hasImage: false,
    image: null,
    countRules: [],
    valid1: true,
    merk: 0,
    brands: [],
    tahun: 0,
    years: [],
    type: 0,
    types: [],
    formRules: [(v) => !!v || 'Kelengkapan harus diisi'],
    valid2: true,
    warna: '',
    odo: [],
    odometer: 0,
    mask: '###',
    cc: '',
    trans: [],
    transmisi: 0,
    jenis_motor: [],
    jenis: 0,
    nopol: '',
    lokasi: '',
    pajak: false,
    tglPajak: null,
    stnk: false,
    tglSTNK: null,
    bpkb: false,
    menu1: false,
    menu2: false,
    desc: false,
    deskripsi: '',
    scan: false,
    barcode: '',
    warnaRules: [
      (v) => !!v || 'Warna harus diisi',
      (v) => v.length >= 4 || 'Min 4 characters',
      (v) => v.length <= 15 || 'Max 15 characters',
    ],
    nopolRules: [
      (v) => !!v || 'Nomor polisi harus diisi',
      (v) => v.length <= 9 || 'Max 9 characters',
    ],
    lokasiRules: [
      (v) => !!v || 'Lokasi harus diisi',
      (v) => v.length >= 4 || 'Min 4 characters',
      (v) => v.length <= 30 || 'Max 30 characters',
    ],
    descRules: [
      (v) => !!v || 'deskripsi harus diisi',
      (v) => v.length >= 2 || 'Min 2 characters',
      (v) => v.length <= 350 || 'Max 350 characters',
    ],
    loading: false,
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },
  watch: {
    merk() {
      this.getTahun()
      this.getTipe()
    },
    tahun() {
      this.getTipe()
    },
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
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
    async testlistfoto(){
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].foto != null) {
          this.listtemp.push(this.list[i].foto)
        }
      }

      for (let i = 0; i < this.listfix.length; i++) {
        if (this.listtemp[i] != undefined) {
          this.listfix[i].foto = this.listtemp[i]
        }else{
          this.listfix[i].foto = null
        }        
      }

      // if (this.listfix == null) {
      //   console.log('list fix kosong')
      // }else{
      //   console.log('list fix', this.listtemp[3])
      // }
      console.log('list fix', this.listfix[2].foto)
      
    },
    async getMerk() {
      await this.$axios
        .get('/produk/v3/mst_motor_merk')
        .then((response) => {
          let { data } = response.data
          this.brands = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getTahun() {
      await this.$axios
        .get('/produk/v3/mst_motor_type_tahun', {
          params: {
            id_mst_motor_merk: this.merk,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.years = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getTipe() {
      await this.$axios
        .get('/produk/v3/mst_motor_type', {
          params: {
            id_mst_motor_merk: this.merk,
            tahun: this.tahun,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.types = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getOdoMeter() {
      await this.$axios
        .get('/produk/v3/mst_odometer')
        .then((response) => {
          let { data } = response.data
          this.odo = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getTransmisi() {
      await this.$axios
        .get('/produk/v3/mst_motor_transmisi')
        .then((response) => {
          let { data } = response.data
          this.trans = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getJenis() {
      await this.$axios
        .get('/produk/v3/mst_motor_jenis')
        .then((response) => {
          let { data } = response.data
          this.jenis_motor = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async storeItem() {
      this.submit = true
      this.loading = true

      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].foto != null) {
          this.listtemp.push(this.list[i].foto)
        }
      }

      for (let i = 0; i < this.listfix.length; i++) {
        if (this.listtemp[i] != undefined) {
          this.listfix[i].foto = this.listtemp[i]
        }else{
          this.listfix[i].foto = null
        }        
      }

      let formData = new FormData()
      if (this.listfix[0].foto != null) {
        formData.set('foto_1', this.listfix[0].foto, 'foto1.jpg')
      }
      if (this.listfix[1].foto != null) {
        formData.set('foto_2', this.listfix[1].foto, 'foto2.jpg')
      }
      if (this.listfix[2].foto != null) {
        formData.set('foto_3', this.listfix[2].foto, 'foto3.jpg')
      }
      if (this.listfix[3].foto != null) {
        formData.set('foto_4', this.listfix[3].foto, 'foto4.jpg')
      }
      if (this.listfix[4].foto != null) {
        formData.set('foto_5', this.listfix[4].foto, 'foto5.jpg')
      }
      
      // formData.set('foto_2', this.list[1].foto, 'foto2.jpg')
      // formData.set('foto_3', this.list[2].foto, 'foto3.jpg')
      // formData.set('foto_4', this.list[3].foto, 'foto4.jpg')
      // formData.set('foto_5', this.list[4].foto, 'foto5.jpg')
      formData.set('id_mst_motor_merk', this.merk)
      formData.set('tahun', this.tahun)
      formData.set('id_mst_motor_type', this.type)
      formData.set('warna', this.warna.toUpperCase().trim())
      formData.set('id_mst_odometer', this.odometer)
      formData.set('cc', this.cc.trim())
      formData.set('id_mst_motor_transmisi', this.transmisi)
      formData.set('id_mst_motor_jenis', this.jenis)
      formData.set('nomor_polisi', this.nopol.toUpperCase().trim())
      formData.set('lokasi', this.lokasi.toUpperCase().trim())
      formData.set('lembar_pajak', this.pajak)
      if (this.tglPajak != null) {
        formData.set('tgl_pajak', this.tglPajak)
      }
      formData.set('lembar_stnk', this.stnk)
      if (this.tglSTNK != null) {
        formData.set('tgl_stnk', this.tglSTNK)
      }
      formData.set('lembar_bpkb', this.bpkb)
      formData.set('kepemilikan_pertama', false)
      formData.set('deskripsi', this.deskripsi)
      formData.set('barcode', this.barcode)
      formData.set('id_app_user', this.user.id)

      await this.$axios
        .post('/produk/v3/unit_mokas', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.loading = false
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
    },
  },
  async created() {
    await this.getMerk()
    await this.getOdoMeter()
    await this.getTransmisi()
    await this.getJenis()
  },
}
</script>

<style>
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