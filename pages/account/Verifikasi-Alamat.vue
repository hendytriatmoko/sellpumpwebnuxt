<template>
  <div>
    <app-bar />

    <v-app-bar app color="#22939E" dark v-if="$vuetify.breakpoint.xs">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>
    <div >
      <div id="display" style="max-width: 700px; margin: 0 auto !important">
        <v-card class="rounded-lg my-4">
          <div class="ml-5 pt-3 pb-3">
            <h2 style="color: #4c4c4c">Verifikasi Alamat</h2>
            <div style="color: #a2a2a2">
              Verifikasi Alamat Anda
            </div>
          </div>
          <v-divider></v-divider>
          <br>
          <v-col cols="12">
            <v-text-field
              label="Masukkan kota, kecamatan atau kode pos"
              v-model="searchLokasi"
              @keyup="getLokasi"
              solo
            ></v-text-field>
            
            <v-card v-if="searchLokasi.length>2 && selectedLokasi == ''"
              :style="lokasi.length == 0 ?'margin-top:-30px;position:absolute;z-index:2;width:97%;height:70px' : 'margin-top:-30px;position:absolute;z-index:2;width:97%;height:220px;overflow-y:scroll'">
              <v-alert
                :value="selesai == false && (searchLokasi.length > 2) && lokasi.length == 0"
                color="warning"
              >
                <span>Harap Tunggu Sebentar...</span>

                <v-progress-circular
                  :size="40"
                  color="amber"
                  indeterminate
                ></v-progress-circular>
              </v-alert>
              <v-alert
                :value="selesai == true && (searchLokasi.length > 2) && lokasi.length == 0"
                color="warning"
              >
                <span>Tidak ditemukan, Mohon cari kata kunci lain...</span>
              </v-alert>
              <v-list >
                <v-list-item-group>
                  <template >
                    <v-list-item v-for="item in lokasi" :key="item.id" @click="pilihLokasi(item)">
                      <v-list-item-title>{{item.lokasi}}</v-list-item-title>
                    </v-list-item>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-card>

            <v-text-field
              label="Detail Alamat. Cth:Nama Jalan, Gedung, No. Rumah"
              solo
              v-model="detailLokasi"
            ></v-text-field>
          </v-col>
          <label class="mx-4 my-4">
            <input type="checkbox" v-model="syarat" :value="true" /> Saya sudah membaca dan memahami
            <nuxt-link to="/tentang?tab=kebijakan"
              >syarat dan ketentuan</nuxt-link
            >
            verifikasi alamat
          </label>
          <v-card-actions style="margin-right: 2%">
            <v-spacer></v-spacer>
            <v-btn
              color="#20929D"
              class="white--text"
              :disabled=" selectedLokasi != '' && syarat == true && detailLokasi != '' ? false : true"
              @click="postLokasi"
            >
              Verifikasi
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'iklan',
  data: () => ({
    lokasi: [],
    searchLokasi: '',
    selectedLokasi:'',
    syarat: false,
    selesai: false,
    detailLokasi: '',
    idLokasi: '',

  }),
  computed: {
    ...mapGetters({
      productid: 'product/productid',
      user: 'auth/user',
    }),
  },
  methods: {
    ...mapActions({
      setProductId: 'product/setProduct',
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    async getLokasi() {
      if (this.searchLokasi.length > 2) {
        this.selesai = false
        this.lokasi = []
        this.selectedLokasi = ''
        await this.$axios
          .get('/master/v3/mst_alamat', {
            params: {
              search: this.searchLokasi,
              // limit:200,
            },
          })
          .then((response) => {
            let { data } = response.data
            this.lokasi = data
            console.log('ini lokasi', this.lokasi)
            this.selesai = true
          })
          .catch((error) => {
            let responses = error.response.data
            console.log(responses.api_message)
          })
      }else{
        this.lokasi = []
        this.selesai = false
      }
    },
    async pilihLokasi(item){
      this.selectedLokasi = item.lokasi
      this.idLokasi = item.id
      this.searchLokasi = item.lokasi
      this.lokasi = []
      console.log('lokasi dipilih',this.selectedLokasi)
    },
    async postLokasi(){
      console.log('lokasi dipilih',this.selectedLokasi)
      console.log('detail lokasi',this.detailLokasi)
      console.log('syarat',this.syarat)
      console.log('id',this.idLokasi)
      console.log('user',this.user.id)

      let formData = new FormData()

      formData.set('id_app_user', this.user.id)
      formData.set('id_mst_kode_pos', this.idLokasi)
      formData.set('alamat_detail', this.detailLokasi)

      await this.$axios
        .post('/user/v3/user/pengajuan_verifikasi_alamat', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.$router.push('/account/profile/umum')
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
          this.setAlert({
              status: true,
              color: 'error',
              text: responses.api_message,
            })
        })
    },
  },
  async created() {
  },
}
</script>

<style>

</style>