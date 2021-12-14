<template>
  <div>
    <app-bar />
  
    <v-card flat class="pa-4" rounded="xl">
      <v-carousel
        cycle
        show-arrows
        hide-delimiter-background
        :show-arrows-on-hover="$vuetify.breakpoint.xs ? false : true"
        height="250"
        align="center"
      >
        <v-carousel-item
          v-for="(item, index) in banners"
          :key="index"
          :src="getImage(item.foto_web)"
          reverse-transition="fade-transition"
          transition="fade-transition"
          :to="'/banner/' + item.id"
          max-height="250"
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

                <nuxt-link to="/jadwal"  style="color: #20929D"> Lihat Semua </nuxt-link>
              </div>

              <div v-if="jadwal.length > 0">
                <div class="ml-4">
                  Rekomendasi produk produk terlaris dari Griya Seller Pump
                </div>

                <div class="scrolling-wrapper-flexbox text-center">
                  <!-- moment(item.date).add(utc, 'h').format('DD MMM, YYYY') -->
                  <v-card
                    class="ma-2 ml-4"
                    rounded="xl"
                    v-for="(item, index) in jadwal"
                    contain
                    :key="index"
                    @click="
                      go(
                        item.id_app_user,
                        item.nama,
                        moment(item.date).format('YYYY-MM-DD')
                       
                      )
                    "
                  >
                    <v-list>
                      <v-list-item>
                        <v-list-item-avatar size="70">
                          <v-img
                            src="/img/icons/people.webp"
                            contain
                            v-if="item.photo == 'null'"
                          ></v-img>

                          <v-img :src="getImage(item.photo)" v-else></v-img>
                        </v-list-item-avatar>

                        <v-list-item-title class="d-flex">
                          <div class="teal white--text pa-2 rounded-xl" >
                            {{ moment(item.date).add(utc, 'h').format('DD MMM, YYYY') }}
                          </div>
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>

                    <v-divider></v-divider>

                    <div class="d-flex align-center justify-center">
                      <v-icon
                        color="#20929D"
                        small
                        class="mr-1"
                        v-if="item.id_mst_user_type == 2"
                      >
                        mdi-check-decagram
                      </v-icon>
                      <b>{{ item.nama }}</b>
                    </div>

                    <div>{{ item.total_iklan }} Iklan Tayang</div>
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
                        Tidak ada jadwal Tawar Bersama
                      </v-list-item-title>

                      <v-list-item-subtitle>
                        Maaf, saat ini belum ada jadwal Tawar Bersama.
                      </v-list-item-subtitle>

                      <v-list-item-subtitle>
                        Selalu cek jadwal disini untuk mengikuti iklan Tawar
                        Bersama
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
                <a href="https://blog.simotor.id" target="_blank">
                  <b  style="color: #20929D">Semua</b>
                </a>
              </v-list-item-action>
            </v-list-item>

            <v-card
              rounded="lg"
              elevation="6"
              class="mb-2 mx-2"
              v-for="item in artikel"
              :key="item.id"
              :href="'https://blog.simotor.id/blog?id=' + item.id"
            >
              <v-list-item dense>
                <v-list-item-avatar tile>
                  <v-img :src="getThumb(item.cover_image)"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.title }}
                  </v-list-item-title>

                  <v-list-item-subtitle>by SiMotor</v-list-item-subtitle>
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

          <nuxt-link to="/search?q=&category=1&order=posting_terbaru&tb=false">
            <b  style="color: #20929D">Lihat semua</b>
          </nuxt-link>
        </div>

        <br />

        <v-row>
          <v-col
            cols="6"
            sm="3"
            v-for="item in iklanTerbaru"
            :key="item._source.id"
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
    banners: [],
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
    limit: 12,
    offset: 0,
    id_type_banner: [],
    total: 0,
    lengthPage: 0,
    time: '',
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
        .get('/produk/v3/berita/umum', {
          params: {
            limit: 4,
          },
        })
        .then((response) => {
          let { data } = response.data
          this.artikel = data
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
        .get('/search/v4/search_home', {
          params: {
            id_mst_iklan_status: 1,
            sort: 'posting_terbaru',
            limit: 12,
            offset: offset,
          },
        })
        .then((response) => {
          let data = response.data
          let { hits } = data.hits
          this.iklanTerbaru.push(...hits)

          this.total = data.hits.total.value
          this.lengthPage = Math.ceil(this.total / this.limit)
          this.page++
          console.log('tot', data.hits.total.value)
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
    go(id, name, date) {
      this.setSellertId(id)
      this.$router.push(
        '/seller/' + name.toLowerCase().replace(/ /g, '-') +'-'+id+ '?tgl=' + date
      )
    },
  },
  async created() {
    await this.getBanners()
    await this.getJadwalTB()
    await this.getArtikel()
    await this.getIklanTerbaru()
    await this.getTbBerlangsung()
    await this.getIklanPromo()
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
