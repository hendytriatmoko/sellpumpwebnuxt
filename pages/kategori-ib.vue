<template>
  <div>
   <app-bar-iklan-baris :items="items" :hits="hits" ref="adsComponent" />

    <v-app-bar app color="#20929D" dark v-if="$vuetify.breakpoint.xs">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>

      <v-text-field
        v-model="keyword"
        dense
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Cari"
        slot="extension"
        @keyup="doFilter"
      >
      </v-text-field>
    </v-app-bar>

    <div style="max-width: 1240px; margin: 0 auto !important">
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
      <br>
      <v-card class="label" style="max-width: 1200px; auto !important">
        <v-card v-if="$vuetify.breakpoint.xs">
            <v-list-item-title class="isi pt-20" cols="12" sm="1">
                <center> <img class="label-img siappakai" style="width:100px" src="/img/siappakai.png" alt=""></center>
            </v-list-item-title>
            <v-col class="isi">
                <center>Untuk unit motor yang mempunyai garansi yang diberikan oleh penjual</center>
            </v-col>
            <v-list-item-title class="isi" cols="12" sm="1">
                <center> <img class="label-img" style="width:100px" src="/img/garansi.png" alt=""> </center>
            </v-list-item-title>
            <v-col class="isi">
                <center>Untuk unit motor yang mempunyai garansi yang diberikan oleh penjual</center>
            </v-col>
            <br>
        </v-card>
        <v-row v-else>
            <v-col class="isi pt-6" cols="12" sm="1">
                <img class="label-img siappakai" src="/img/siappakai.png" alt="">
            </v-col>
            <v-col class="isi pt-6 pl-6" cols="12" sm="5">
                Untuk unit motor yang mempunyai garansi yang diberikan oleh penjual
            </v-col>
            <v-col class="isi pt-3" cols="12" sm="1">
                <img class="label-img" src="/img/garansi.png" alt="">
            </v-col>
            <v-col class="isi pt-6" cols="12" sm="5">
                Untuk unit motor yang mempunyai garansi yang diberikan oleh penjual
            </v-col>
            <br>
        </v-row>
      </v-card>  
      <br>
      <center>
      <v-divider style="width:97%"></v-divider>
      </center>
      <h2 class="ml-5 mb-3">Iklan Baris</h2>
      <v-row class="ml-3" style="width:98%">
        <v-col cols="12" sm="12" md="12" lg="12" xl="12">
          <div class="my-1" v-if="keyword != '' && keyword != null">
            <div v-if="hits == null">
              Menampilkan 1 - 0 barang dari total
              {{ total }} untuk "{{ keyword }}"
            </div>
            <div v-else>
              Menampilkan 1 - {{ hits.length }} barang dari total
              {{ hits.length }} untuk "{{ keyword }}"
            </div>
          </div>

          <v-row>
            <v-col cols="6" sm="3" v-for="item in ikabIB"
              :key="item._source.id">
              <list-iklan :item="item" />
            </v-col>
          </v-row>

          <br />

          <div align="center" v-if="ikabIB != null">
            <v-btn
              color="#20929D"
              dark
              outlined
              @click="doSearch"
              v-if="ikabIB.length < 999 && ikabIB.length < total"
            >
              Muat Lebih Banyak
            </v-btn>
          </div>

          <!-- <v-pagination
            v-model="page"
            @input="doSearch"
            :length="lengthPage"
            :total-visible="7"
          ></v-pagination> -->
        </v-col>
      
      </v-row>
    </div>
<br />
<Footer />
    
  </div>
</template>

<script>

import { mapGetters} from 'vuex'

export default {
  name: 'kategori-ib',
  components: {
  AppBarIklanBaris: () =>
      import(/* webpackChunkName: "app-bar" */ '~/components/AppBarIklanBaris.vue'),
   Footer: () =>
      import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
    ListIklan: () =>
      import(/* webpackChunkName: "list-iklan" */ '@/components/ListIklan.vue')
    
  },
  data: () => ({
    panel: [0, 1],
    category: 0,
    order: '',
    ikabIB: [],
    keyword: null,
    tb: false,
    hits: [],
    jadwal: [],
    sheet: false,
    page: 1,
    banners: [],
    id_type_banner: [],
    limit: 36,
    total: 0,
    lengthPage: 0,
    date: new Date().toISOString().substr(0, 10),
  }),
  computed: {
    ...mapGetters({
      utc: 'timezone/utc',
    }),
  },
  methods: {
    async doSearch() {
      let offset = (this.page - 1) * this.limit

      let params = new URLSearchParams()

      params.set('id_mst_iklan_status', 1)
      params.set('search', this.keyword == null ? '' : this.keyword)
      params.set('id_mst_iklan_jenis', 1)
      params.set('sort', 'posting_terbaru')
      params.set('offset', offset)
      params.set('limit', this.limit)

      let request = {
        params: params,
      }

      await this.$axios
        .get('/search/v4/search_home', request)
        .then((response) => {
          let data = response.data
          let { hits } = data.hits
          this.ikabIB.push(...hits)

          this.total = data.hits.total.value
          this.lengthPage = Math.ceil(this.total / this.limit)
          this.page++
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },    
       async getBanners() {
      await this.$axios
        .get('/master/v3/mst_banner', {
          params: {
            limit: 5,
            id_type_banner: 3,
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
    async doFilter() {
      this.page = 1

      let offset = (this.page - 1) * this.limit

      let params = new URLSearchParams()

      params.set('id_mst_iklan_status', 1)
      params.set('search', this.keyword == null ? '' : this.keyword)
      params.set('id_mst_iklan_jenis', 1)
      params.set('sort', 'posting_terbaru')
      params.set('offset', offset)
      params.set('limit', this.limit)

      let request = {
        params: params,
      }

      await this.$axios
        .get('/search/v4/search_home', request)
        .then((response) => {
          let data = response.data
          let { hits } = data.hits
          this.ikabIB = hits

          this.total = data.hits.total.value
          this.lengthPage = Math.ceil(this.total / this.limit)
          this.page++
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
  },
  async mounted(){
    
  },
  async created() {
    this.category = Number(this.$route.query.category)
    this.order = this.$route.query.order
    this.keyword = this.$route.query.q
    this.tb = this.$route.query.tb

    await this.doSearch()
    await this.getJadwalTB()
    await this.getBanners()
    
  },
}
</script>

<style scoped>
div.fixed {
  position: fixed;
  top: 15%;
  width: 180px;
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
.banner{
    width: 100%;
    margin-left: auto;
    margin-right: auto;
	height: 250px;
    background: radial-gradient(50% 50% at 50% 50%, #66AAB0 0%, #20929D 100%);
    border-radius: 20px;
}
.banner-tulisan{
    color: white;
    padding-top: 70px;
    padding-bottom: 70px;
}
.label{
    border: 3px solid #E5E5E5;
    border-radius: 4px;
    margin-left: auto;
    margin-right: auto;
    width: 97%;
}
.label-img{
    width: 70px;
}
.siappakai{
    margin-top: 10px;
}
.isi img{
    margin-right: auto;
    margin-left: 20px;
}
</style>