<template>
  <div>
    <section id="info-iklan" class="mt-2">
      <v-row>
        <v-col cols="12" sm="4">
          <v-img :src="getImageProduk(hits.gambar_produk)">
          </v-img>
          
        </v-col>

        <v-col cols="12" sm="5">
          <v-row>
            <v-col cols="6">Jenis Iklan:</v-col>

            <v-col cols="6" align="right">
              {{ hits.kategori }}
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="12">
              <h2>{{ hits.nama_produk }}</h2>
            </v-col>
          </v-row>

          <v-row dense align="center">
            <v-col cols="6">
              <h2 class="#20929D--text">
                Rp {{ Number(hits.harga_produk).toLocaleString('id-ID') }}
              </h2>
            </v-col>

            <v-col cols="6">
              <div class="d-flex align-center justify-end">
                {{ hits.tayangan }} <v-icon>mdi-eye</v-icon>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <h3>Deskripsi</h3>
              <div
                class="text-justify"
                style="white-space: pre-wrap"
                v-html="hits.deskripsi_produk"
              ></div>
            </v-col>
          </v-row>

          <hr class="my-3" />

        </v-col>

        <v-col cols="12" sm="3">
          <div class="d-flex mx-4 my-2">
            <v-tooltip bottom >
              <template v-slot:activator="{ on }">
                <v-btn
                  text
                  height="47"
                  class="white"
                  v-on="on"
                  @click="doFavorit"
                >
                  <v-icon color="red" left>mdi-cart</v-icon>
                  Keranjang
                </v-btn>
              </template>
              <span>Favorit</span>
            </v-tooltip>
            <v-tooltip
              bottom
            >
              <template v-slot:activator="{ on }">
                <v-btn text height="47" class="white" v-on="on" @click="edit">
                  <v-icon left>mdi-pencil</v-icon> Edit
                </v-btn>
              </template>

              <span>Edit</span>
            </v-tooltip>
          </div>
          <v-btn
            color="#20929D"
            dark
            block
            :to="'/message?id=' + seller.id"
          >
            Pesan
          </v-btn>

          <br />

          <v-btn
            color="#20929D"
            outlined
            block
            @click="hubungi = true"
          >
            Hubungi
          </v-btn>
        </v-col>
      </v-row>
    </section>

    <hr class="my-3" />
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { VMoney } from 'v-money'
export default {
  name: 'iklan-baris',
  props: ['items', 'id'],
  components: {
    Spesifikasi: () =>
      import(
        /* webpackChunkName: "spesifikasi" */ '@/components/Spesifikasi.vue'
      ),
  },
  directives: { money: VMoney },
  data: () => ({
    tab: 0,
    hits:[],
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
    async getDtlIklan() {
      await this.$axios
        await this.$axios
        .get('/produk/v1/produk/getproduk',{
          params: {
              id_produk: this.id,
            },
        })
        .then((response) => {
          this.hits = response.data.data[0]
          console.log('hits', this.hits)
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
  },
  async created() {
    await this.getDtlIklan()
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