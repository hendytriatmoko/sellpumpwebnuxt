<template>
  <div>
    <app-bar />
  
    <v-card flat class="pa-4" rounded="xl">
      <v-carousel
        cycle
        show-arrows
        hide-delimiter-background
        :show-arrows-on-hover="$vuetify.breakpoint.xs ? false : true"
        height="400"
        align="center"
      >
        <v-carousel-item
          v-for="(item, index) in banners"
          :key="index"
          :src="item.foto"
          max-height="400"
          max-width="1920"
        ></v-carousel-item>
      </v-carousel>
    </v-card>

    <br />

    <div style="max-width: 1240px; margin: 0 auto !important">
      <v-row align="start">
        <v-col cols="12" sm="9">
          <v-card rounded="lg" elevation="6" height="330px">
            <v-container>
              <div class="d-flex align-center justify-space-between ml-4 my-2">
                <h2>Produk Terlaris</h2>
              </div>

              <div v-if="hitsTerlaris.length > 0">
                <div class="ml-4">
                  Rekomendasi produk produk terlaris dari Griya Saller Pump
                </div>

                <div class="scrolling-wrapper-flexbox text-center">
                  <!-- moment(item.date).add(utc, 'h').format('DD MMM, YYYY') -->
                  <v-card
                    class="ma-2 ml-4"
                    rounded="xl"
                    v-for="(item, index) in hitsTerlaris"
                    contain
                    :key="index"
                    @click="
                      go(item.id_produk, item.nama_produk)"
                    >
                    <v-list>
                      <v-list-item>
                        <v-list-item-avatar size="70">

                          <v-img :src="getImageProduk(item.gambar_produk)"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-title class="d-flex">
                          <div class="teal white--text pa-2 rounded-xl" >
                            Rp
                            {{ Number(item.harga_produk).toLocaleString('id-ID') }}
                          </div>
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <div class="d-flex align-center justify-center">
                      <b>{{ item.kategori }} - {{ item.sub_kategori }}</b>
                    </div>

                    <div>{{ item.nama_produk }}</div>
                  </v-card>
                </div>
              </div>

              <div v-else>
                <v-list three-line>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon x-large>mdi-clipboard</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title>
                        Belum ada Produk terlaris
                      </v-list-item-title>

                      <v-list-item-subtitle>
                        Maaf, saat ini belum ada Produk terlaris.
                      </v-list-item-subtitle>

                      <v-list-item-subtitle>
                        Selalu cek Produk terlaris disini untuk mengetahui daftar Produk terlaris
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </div>
            </v-container>
          </v-card>
        </v-col>

        <v-col cols="12" sm="3">
          <v-card rounded="lg" elevation="6">
            <v-list-item>
              <v-list-item-title><b>Artikel Terbaru</b></v-list-item-title>

              <v-list-item-action>
                <nuxt-link to="/list-artikel">
                  <b  style="color: #20929D">Semua</b>
                </nuxt-link>
              </v-list-item-action>
            </v-list-item>

            <v-card
              rounded="lg"
              elevation="6"
              class="mb-2 mx-2"
              v-for="item in artikel"
              :key="item.id"
              :to="'/artikel/'+item.id_artikel"
            >
              <v-list-item dense>
                <v-list-item-avatar tile>
                  <v-img :src="getImageProduk(item.gambar_artikel)"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.judul_artikel }}
                  </v-list-item-title>

                  <v-list-item-subtitle>by Admin</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>

            <br />
          </v-card>
        </v-col>
      </v-row>

      <div v-if="iklanTerbaru.length > 0">
        <v-divider class="mt-6 mb-4"></v-divider>

        <div class="d-flex flex-wrap align-center">
          <h2 class="mr-4">Rekomendasi Baru</h2>

          <nuxt-link to="/katalog">
            <b  style="color: #20929D">Lihat semua</b>
          </nuxt-link>
        </div>

        <br />

        <v-row>
          <v-col
            cols="6"
            sm="3"
            v-for="item in iklanTerbaru"
            :key="item.id_produk"
          >
            <list-iklan :item="item" />
          </v-col>
        </v-row>

        <br />
  
        <div align="center">
          <v-btn
            color="#20929D"
            dark
            outlined
            @click="getIklanTerbaru"
            v-if="iklanTerbaru.length < 40 && iklanTerbaru.length < total"
          >
            Muat Lebih Banyak
          </v-btn>
        </div>

        <br />
      </div>
 
      <!-- 
      <div v-if="tbBerlangsung.length > 0">
        <v-divider class="mt-6 mb-4"></v-divider>

        <div class="d-flex flex-wrap align-center">
          <h2 class="mr-4">Tawar Bersama Berlangsung</h2>

          <nuxt-link to="/search?q=&category=2&order=tanggal_mulai&tb=true">
            <b>Lihat semua</b>
          </nuxt-link>
        </div>

        <br />

        <v-row>
          <v-col
            cols="6"
            sm="3"
            v-for="item in tbBerlangsung"
            :key="item._source.id"
          >
            <list-iklan :item="item" />
          </v-col>
        </v-row>
      </div> -->
   
    </div>
          <Footer />
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'Home',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
       Footer: () =>
      import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
    ListIklan: () =>
      import(/* webpackChunkName: "list-iklan" */ '@/components/ListIklan.vue'),
    ListPromo: () =>
      import(/* webpackChunkName: "list-promo" */ '@/components/ListPromo.vue')
    
  },
  data: () => ({
    banners: [
      {
        id:1,
        foto:'/img/banner1.PNG'
      },
      {
        id:2,
        foto:'/img/banner2.PNG'
      },
      {
        id:3,
        foto:'/img/banner3.PNG'
      },
      {
        id:4,
        foto:'/img/banner4.PNG'
      },
      {
        id:5,
        foto:'/img/banner5.PNG'
      },
      {
        id:6,
        foto:'/img/banner6.PNG'
      },
    ],
    categories: [
      {
        title: 'Tawar Bersama',
        src: '/img/icons/ic_hometb.webp',
        route: '/search?q=&category=2&order=posting_terbaru&tb=false',
      },
      {
        title: 'Iklan Baris',
        src: '/img/icons/ic_homeib.webp',
        route: '/kategori-ib',
      },
      {
        title: 'Aksesoris & Suku Cadang',
        src: '/img/icons/ic_homeaks.webp',
        route: '/aksesoris-sparepart',
      },
      // {
      //   title: 'Tiket Tawar Bersama',
      //   src: '/img/icons/ic_tiket.webp',
      //   route: '/ticket',
      // },
    ],
  
    jadwal: [],
    artikel: [],
    tbBerlangsung: [],
    iklanPromo: [],
    iklanTerbaru: [],
    page: 1,
    limit: 4,
    offset: 0,
    id_type_banner: [],
    total: 0,
    lengthPage: 0,
    time: '',
    listPesanan:[],
    unikTerlaris:[],
    hitsTerlaris:[],
  }),
  computed: {
    ...mapGetters({
      utc: 'timezone/utc',
      timezone: 'timezone/region',
    }),
  },
  methods: {
    ...mapActions({
      setSellertId: 'product/setSeller',
      setProductId: 'product/setProduct',
    }),
    async getBanners() {
      await this.$axios
        .get('/master/v3/mst_banner', {
          params: {
            limit: 5,
            id_type_banner: 1
            
          },
        })
        .then((response) => {
          let { data } = response.data
          this.banners = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getJadwalTB() {
      await this.$axios
        .get('/iklan/v3/iklan_jadwal_tb', {
          params: {
            id_mst_iklan_status: 1,
            limit: 20,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.jadwal = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getArtikel() {
      await this.$axios
        .get('/produk/v1/artikel/getartikel', {
          params: {
            limit: 4,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.artikel = data
          console.log('artikel', this.artikel)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getTbBerlangsung() {
      await this.$axios
        .get('/search/v4/search', {
          params: {
            id_mst_iklan_status: 1,
            sort: 'tanggal_mulai',
            limit: 4,
            tb_berlangsung: true,
          },
        })
        .then((response) => {
          let data = response.data
          let { hits } = data.hits
          this.tbBerlangsung = hits
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },

    async getIklanTerbaru() {
      let offset = (this.page - 1) * this.limit

      await this.$axios
        .get('/produk/v1/produk/getproduk',{
          // params: {
          //   limit: 4,
          //   offset: offset,
          // },
        })
        .then((response) => {
          this.iklanTerbaru = response.data.data
          console.log('produk', this.iklanTerbaru)
          // let data = response.data
          // let { hits } = response.data.data
          // this.iklanTerbaru.push(...hits)

          // this.total = data.hits.total.value
          // this.lengthPage = Math.ceil(this.total / this.limit)
          // this.page++
          // console.log('tot', data.hits.total.value)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getIklanPromo() {
      await this.$axios
        .get('/search/v4/search', {
          params: {
            id_mst_iklan_status: 1,
            promo: true,
            limit: 4,
          },
        })
        .then((response) => {
          let data = response.data
          let { hits } = data.hits
          this.iklanPromo = hits
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    go(id, name) {
      this.setProductId(id)

      this.$router.push(
        '/detail-iklan/' + name.toLowerCase().replace(/ /g, '-').replace(/[/]/g,'-')+'-'+id
      )
    },
    async getPesanan(){
      var params = new URLSearchParams();    

      var request = {
        params: params,
        headers: { Authorization: this.DataToken }
      };
      this.$axios
        .get("/keranjang/v1/pesanan/getpesanan", request)
        .then(response => {
          this.listPesanan = response.data.data
          let distinctPesanan = [
              ...new Map(this.listPesanan.map((item) => [item["id_produk"], item])).values(),
          ];
          let terlaris = []
          for (let k = 0; k < distinctPesanan.length; k++) {
            terlaris.push(
              {
                id_produk:distinctPesanan[k].id_produk,
                count:0
              }
            )
          }
          for (let x = 0; x < this.listPesanan.length; x++) {
            for (let y = 0; y < terlaris.length; y++) {
              if (terlaris[y].id_produk == this.listPesanan[x].id_produk) {
                terlaris[y].count += 1
              }
            }
          }
          this.unikTerlaris = terlaris.sort((a,b) =>  b.count-a.count )
          this.getDataTerlaris()
          console.log("distinctInv nih", distinctPesanan);
          console.log("terlaris", this.unikTerlaris);
          console.log('pesanan', this.listPesanan)
        })
        .catch(error => {
          console.log(error.response.data.api_message);
        });
    },
    async getDataTerlaris(){
      this.hitsTerlaris = []
      for (let i = 0; i < this.unikTerlaris.length; i++) {
        if (i < 5) {
          var params = new URLSearchParams();

          params.append("id_produk", this.unikTerlaris[i].id_produk);

          var request = {
            params: params,
          };
          await this.$axios
            .get('/produk/v1/produk/getproduk', request)
            .then((response) => {
                // this.listIklan = response.data.data[0]
                this.hitsTerlaris.push(response.data.data[0])
            })
            .catch((error) => {
                let responses = error.response.data
                console.log(responses.api_message)
            })
        }
      }
      console.log('hits terlari', this.hitsTerlaris)
    },
  },
  async created() {
    this.DataToken = this.$cookies.get("token");
    await this.getArtikel()
    this.getIklanTerbaru()
    await this.getPesanan()
    // await this.getTbBerlangsung()
    // await this.getIklanPromo()
    this.setProductId({})
    console.log('iklan terbaru', this.iklanTerbaru)
    console.log('page', this.page)
    console.log('length page', this.lengthPage)
    console.log('total', this.total)
    console.log('jadwal', this.jadwal)
    console.log('promo', this.iklanPromo)

    // let app = this
    // let now = setInterval(() => {
    //   app.time = this.moment().add(this.utc, 'h').toDate()
    // }, 1000)
    // now.setDate(now.getDate() - 1)
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
</style>
