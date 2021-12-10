<template>
  <div>
    <app-bar-aksesoris :items="items" :hits="hits" ref="adsComponent" />

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
        append-icon="mdi-filter"
        label="Cari"
        slot="extension"
        @keyup="radioFilter"
        @click:append="sheet = true"
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
      <h2 v-if="$vuetify.breakpoint.smAndUp" class="mb-3 ml-5">
        Aksesoris & Suku Cadang
      </h2>

      <v-row class="ml-2" style="width: 99%">
        <v-col
          cols="12"
          sm="2"
          md="2"
          lg="2"
          xl="2"
          v-if="$vuetify.breakpoint.smAndUp"
        >
          <div>
            <v-card outlined>
              <v-expansion-panels v-model="panel" multiple accordion>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    Kategori
                  </v-expansion-panel-header>

                  <v-expansion-panel-content>
                    <v-radio-group
                      v-model="kategori"
                      column
                      dense
                      class="pa-0 ma-0"
                      @change="radioFilter"
                    >
                      <v-radio :value="0">
                        <template v-slot:label>
                          <div class="text-caption">Semua</div>
                        </template>
                      </v-radio>
                      <v-radio :value="9">
                        <template v-slot:label>
                          <div class="text-caption">Aksesoris</div>
                        </template>
                      </v-radio>

                      <v-radio :value="10">
                        <template v-slot:label>
                          <div class="text-caption">Suku Cadang</div>
                        </template>
                      </v-radio>
                      <v-radio :value="11">
                        <template v-slot:label>
                          <div class="text-caption">Lainnya</div>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header> Kondisi </v-expansion-panel-header>

                  <v-expansion-panel-content>
                    <v-radio-group
                      v-model="kondisi"
                      column
                      dense
                      class="pa-0 ma-0"
                      @change="radioFilter"
                    >
                      <v-radio :value="0">
                        <template v-slot:label>
                          <div class="text-caption">Semua</div>
                        </template>
                      </v-radio>
                      <v-radio :value="1">
                        <template v-slot:label>
                          <div class="text-caption">Baru</div>
                        </template>
                      </v-radio>

                      <v-radio :value="2">
                        <template v-slot:label>
                          <div class="text-caption">Bekas</div>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </div>
        </v-col>

        <v-col cols="12" sm="10" md="10" lg="10" xl="10">
          <center>
            <h2 class="pb-3" v-if="$vuetify.breakpoint.xs">
              Aksesoris & Suku Cadang
            </h2>
          </center>
          <div class="my-1" v-if="keyword != '' && keyword != null">
            <div v-if="iklanAS == null">
              Menampilkan 1 - 0 barang dari total
              {{ total }} untuk "{{ keyword }}"
            </div>
            <div v-else>
              Menampilkan 1 - {{ iklanAS.length }} barang dari total
              {{ iklanAS.length }} untuk "{{ keyword }}"
            </div>
          </div>

          <v-row>
            <v-col
              cols="6"
              sm="3"
              v-for="item in iklanAS"
              :key="item._source.id"
            >
              <list-aksesoris :item="item" />
            </v-col>
          </v-row>

          <br />

          <div align="center" v-if="iklanAS != null">
            <v-btn
              color="#20929D"
              dark
              outlined
              @click="getIklanAS"
              v-if="iklanAS.length < 999 && iklanAS.length < total"
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
 
    <v-bottom-sheet v-model="sheet">
      <v-sheet height="280">
        <v-list dense>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <h3>Filter</h3>
              </v-list-item-title>

              <v-list-item-subtitle>Tipe Iklan</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon @click="sheet = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-list-item>
            <v-radio-group
              v-model="kategori"
              @change="radioFilter"
              row
              dense
              class="pa-0 ma-0"
            >
              <v-radio label="Semua" :value="0"></v-radio>
              <v-radio label="Aksesoris" :value="9"></v-radio>
              <v-radio label="Suku Cadang" :value="10"></v-radio>
              <v-radio label="Lainnya" :value="11"></v-radio>
            </v-radio-group>
          </v-list-item>
          <v-list-item>
            <v-radio-group
              v-model="kondisi"
              @change="radioFilter"
              row
              dense
              class="pa-0 ma-0"
            >
              <v-radio label="Semua" :value="0"></v-radio>
              <v-radio label="Baru" :value="1"></v-radio>
              <v-radio label="Bekas" :value="2"></v-radio>
            </v-radio-group>
          </v-list-item>

          <v-list-item>
            <v-btn block shaped color="success" v-on:click="sheet = false">
              Simpan
            </v-btn>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-bottom-sheet>
<br />
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'aksesoris-sparepart',
  components: {
    AppBarAksesoris: () =>
      import(
        /* webpackChunkName: "app-bar" */ '@/components/AppBarAksesoris.vue'
      ),

     Footer: () =>
      import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
    ListAksesoris: () =>
      import(
        /* webpackChunkName: "list-aksesoris" */ '@/components/ListAksesoris.vue'
      ),
  },
  data: () => ({
    panel: [0, 1],
    category: 0,
    order: '',
    kategori: 0,
     banners: [],
    id_type_banner: [],
    kondisi: 0,
    keyword: '',
    tb: false,
    hits: [],
    iklanAS: [],
    iklanASF: [],
    jadwal: [],
    sheet: false,
    page: 1,
    limit: 12,
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
    async doFilter() {
      this.page = 1

      let offset = (this.page - 1) * this.limit

      let params = new URLSearchParams()

      params.set('id_mst_iklan_status', 1)
      params.set('id_mst_iklan_jenis', 5)

      params.set('offset', offset)
      params.set('limit', this.limit)
      if (this.kategori != 0) {
        params.set('id_mst_iklan_produk', this.kategori)
      }
      if (this.kondisi != 0) {
        params.set('id_mst_kondisi_as', this.kondisi)
      }
      params.set('sort', 'postingan_terbaru')
      params.set('search', this.keyword == null ? '' : this.keyword)

      let request = {
        params: params,
      }

      await this.$axios
        .get('/search/v4/search_home', request)
        .then((response) => {
          let data = response.data
          let { hits } = data.hits
          this.iklanAS = hits

          this.total = data.hits.total.value
          this.lengthPage = Math.ceil(this.total / this.limit)
          this.page++
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async directSearch() {
      let offset = (this.page - 1) * this.limit

      let params = new URLSearchParams()

      params.set('id_mst_iklan_status', 1)
      params.set('search', this.keyword)
      params.set('offset', offset)
      params.set('limit', this.limit)

      let request = {
        params: params,
      }

      await this.$axios
        .get('/search/v4/search', request)
        .then((response) => {
          let data = response.data
          let { hits } = data.hits
          this.hits = hits

          this.total = data.hits.total.value
          this.lengthPage = Math.ceil(this.total / this.limit)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async radioFilter() {
      console.log('kategori', this.kategori)
      console.log('kondisi', this.kondisi)
      await this.doFilter()
    },
    async getIklanAS() {
      let offset = (this.page - 1) * this.limit

      let params = new URLSearchParams()

      params.set('id_mst_iklan_status', 1)
      params.set('id_mst_iklan_jenis', 5)

      params.set('offset', offset)
      params.set('limit', this.limit)
      if (this.kategori != 0) {
        params.set('id_mst_iklan_produk', this.kategori)
      }
      if (this.kondisi != 0) {
        params.set('id_mst_kondisi_as', this.kondisi)
      }
      params.set('sort', 'postingan_terbaru')
      params.set('search', this.keyword == null ? '' : this.keyword)

      let request = {
        params: params,
      }
      await this.$axios
        .get('/search/v4/search_home', request)
        .then((response) => {
          let data = response.data
          let { hits } = data.hits
          this.iklanAS.push(...hits)

          this.total = data.hits.total.value
          this.lengthPage = Math.ceil(this.total / this.limit)
          this.page++
          console.log('hits', hits)
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
            id_type_banner: 4,
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
    async kondisiFilter() {
      for (let i = 0; i < this.iklanAS.length; i++) {
        await this.$axios
          .get('/iklan/v3/iklan_as', {
            params: {
              id: this.iklanAS[i]._id,
            },
          })
          .then((response) => {
            let { data } = response.data
            this.iklanASF.push(...data)
            console.log('ASF', this.iklanASF)
          })
          .catch((error) => {
            let responses = error.response.data
            console.log(responses.api_message)
          })
      }
    },
  },
  async created() {
    // this.category = Number(this.$route.query.category)
    // this.order = this.$route.query.order
    // this.keyword = this.$route.query.q
    // this.tb = this.$route.query.tb

    // await this.doSearch()
    await this.getIklanAS()
    await this.getBanners()
    console.log('iklan as', this.iklanAS.length)
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
</style>