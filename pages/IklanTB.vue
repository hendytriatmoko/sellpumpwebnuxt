<template>
  <div>
    <app-bar-landing :items="items" :hits="hits" ref="adsComponent" />
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
        @keyup="doFilter"
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
      <v-row align="start">
        <v-col cols="12">
          <v-card rounded="lg" elevation="6">
            <v-container>
              <div class="d-flex align-center justify-space-between">
                <h2>Jadwal Tawar Bersama</h2>

                <nuxt-link to="/jadwal" style="color: #20929d">
                  Lihat Semua
                </nuxt-link>
              </div>

              <div v-if="jadwal.length > 0">
                <div>
                  Ikuti jadwal Tawar Bersama disini ya, untuk mendapatkan motor
                  incaran kamu...!!!
                </div>

                <div class="scrolling-wrapper-flexbox text-center">
                  <v-card
                    class="ma-2"
                    rounded="xl"
                    v-for="(item, index) in jadwal"
                    contain
                    :key="index"
                    @click="
                      go(
                        item.id_app_user,
                        item.nama,
                        moment(item.date).add(utc, 'h').format('DD MMM, YYYY')
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
                          <div class="teal white--text pa-2 rounded-xl">
                            {{
                              moment(item.date)
                                .add(utc, 'h')
                                .format('DD MMM, YYYY')
                            }}
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
      </v-row>
      <h2 v-if="$vuetify.breakpoint.smAndUp" class="mt-5 mb-5 ml-4">
        Tawar Bersama
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
            <v-card>
              <!-- <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    Tipe Iklan
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-radio-group v-model="idTipeTB" @change="tess">
                      <v-radio
                        label="Semua"
                        :value="0"
                      ></v-radio>
                      <v-radio
                        label="Terbuka"
                        :value="1"
                      ></v-radio>
                      <v-radio
                        label="Tertutup"
                        :value="2"
                      ></v-radio>
                    </v-radio-group>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels> -->

              <v-expansion-panels multiple>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    Tipe Iklan
                  </v-expansion-panel-header>

                  <v-expansion-panel-content>
                    <v-radio-group
                      v-model="tipeTB"
                      column
                      dense
                      class="pa-0 ma-0"
                      @change="doFilter"
                    >
                      <v-radio :value="3">
                        <template v-slot:label>
                          <div class="text-caption">Semua</div>
                        </template>
                      </v-radio>
                      <v-radio :value="1">
                        <template v-slot:label>
                          <div class="text-caption">Tawar Bersama Terbuka</div>
                        </template>
                      </v-radio>
                      <v-radio :value="2">
                        <template v-slot:label>
                          <div class="text-caption">Tawar Bersama Tertutup</div>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>
                    Jenis Iklan
                  </v-expansion-panel-header>

                  <v-expansion-panel-content>
                    <v-radio-group
                      v-model="jenisTB"
                      column
                      dense
                      class="pa-0 ma-0"
                      @change="doFilter"
                    >
                      <v-radio :value="3">
                        <template v-slot:label>
                          <div class="text-caption">Semua</div>
                        </template>
                      </v-radio>
                      <v-radio :value="1">
                        <template v-slot:label>
                          <div class="text-caption">Satuan</div>
                        </template>
                      </v-radio>

                      <v-radio :value="2">
                        <template v-slot:label>
                          <div class="text-caption">Paketan</div>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>Urutkan</v-expansion-panel-header>

                  <v-expansion-panel-content>
                    <v-radio-group
                      v-model="statusTB"
                      row
                      dense
                      class="pa-0 ma-0"
                      @change="doFilter"
                    >
                      <v-radio :value="1">
                        <template v-slot:label>
                          <div class="text-caption">Berlangsung</div>
                        </template>
                      </v-radio>

                      <v-radio :value="2">
                        <template v-slot:label>
                          <div class="text-caption">Segera dimulai</div>
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
            <h2 class="pb-3" v-if="$vuetify.breakpoint.xs">Tawar Bersama</h2>
          </center>
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
            <v-col
              cols="6"
              sm="3"
              v-for="item in iklanTB"
              :key="item._source.id"
            >
              <list-iklan :item="item" />
            </v-col>
          </v-row>

          <br />

          <div align="center" v-if="iklanTB != null">
            <v-btn
              color="#20929D"
              dark
              outlined
              @click="getTB"
              v-if="(iklanTB.length < 999) & (iklanTB.length < total)"
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
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon @click="sheet = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-list-item>
            <v-radio-group
              v-model="tipeTB"
              @change="doFilter"
              row
              dense
              class="pa-0 ma-0"
            >
              <v-radio label="Semua" :value="3"></v-radio>
              <v-radio label="Terbuka" :value="1"></v-radio>
              <v-radio label="Tertutup" :value="2"></v-radio>
            </v-radio-group>
          </v-list-item>
          <v-list-item>
            <v-radio-group
              v-model="jenisTB"
              @change="doFilter"
              row
              dense
              class="pa-0 ma-0"
            >
              <v-radio label="Semua" :value="3"></v-radio>
              <v-radio label="Satuan" :value="1"></v-radio>
              <v-radio label="Paketan" :value="2"></v-radio>
            </v-radio-group>
          </v-list-item>
          <v-list-item>
            <v-radio-group
              v-model="statusTB"
              @change="doFilter"
              row
              dense
              class="pa-0 ma-0"
            >
              <v-radio label="Berlangsung" :value="1"></v-radio>
              <v-radio label="Segera" :value="2"></v-radio>
            </v-radio-group>
          </v-list-item>

          <v-list-item>
            <v-btn block shaped color="success" @click="sheet = false">
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
import ListIklan from '@/components/ListIklan.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'IklanTB',
  components: {
    AppBarLanding: () =>
      import(
        /* webpackChunkName: "app-bar" */ '~/components/AppBarLanding.vue'
      ),
       Footer: () =>
      import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
    ListIklan: () =>
      import(/* webpackChunkName: "list-iklan" */ '@/components/ListIklan.vue')
    
  },
  data: () => ({
    jadwal: [],
    banners: [],
    id_type_banner: [],
    hits: [],
    iklanTB: [],
    tipeTB: '',
    jenisTB: '',
    statusTB: '',
    total: 0,
    limit: 12,
    page: 1,
    lengthPage: 0,
    sheet: false,
    keyword: '',
  }),
  computed: {
    ...mapGetters({
      utc: 'timezone/utc',
    }),
  },
  methods: {
    ...mapActions({
      setSellertId: 'product/setSeller',
      setProductId: 'product/setProduct',
    }),
    async tess() {
      console.log('tipe', this.tipeTB)
      console.log('jenis', this.jenisTB)
      console.log('status', this.statusTB)
      await this.doFilter()
      console.log('hits', this.hits)
      // console.log('tipe', this.jenisTB)
      // console.log('tipe', this.statusTB)
    },
    async getBanners() {
      await this.$axios
        .get('/master/v3/mst_banner', {
          params: {
            limit: 5,
            id_type_banner: 2,
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
          console.log('jadwal', this.jadwal)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getTB() {
      let offset = (this.page - 1) * this.limit

      let params = new URLSearchParams()

      params.set('id_mst_iklan_status', 1)
      params.set('id_mst_iklan_jenis', 2)

      params.set('offset', offset)
      params.set('limit', this.limit)
      if (this.tipeTB == 1) {
        params.set('id_mst_type_tb', this.tipeTB)
      }
      if (this.tipeTB == 2) {
        params.set('id_mst_type_tb', this.tipeTB)
      }
      if (this.jenisTB == 1) {
        params.set('id_mst_iklan_type', this.jenisTB)
      }
      if (this.jenisTB == 2) {
        params.set('id_mst_iklan_type', this.jenisTB)
      }
      params.set('sort', 'posting_terbaru')
      params.set('search', this.keyword == null ? '' : this.keyword)

      let request = {
        params: params,
      }

      if (this.statusTB == 2) {
        await this.$axios
          .get('/search/v4/search_home', request)
          .then((response) => {
            let data = response.data
            let { hits } = data.hits
            this.iklanTB.push(...hits)
            if (this.iklanTB != null) {
              this.iklanTB.reverse()
            }

            this.total = data.hits.total.value
            this.lengthPage = Math.ceil(this.total / this.limit)
            this.page++
          })
          .catch((error) => {
            let responses = error.response.data
            console.log(responses.api_message)
          })
      } else {
        await this.$axios
          .get('/search/v4/search_home', request)
          .then((response) => {
            let data = response.data
            let { hits } = data.hits
            this.iklanTB.push(...hits)

            this.total = data.hits.total.value
            this.lengthPage = Math.ceil(this.total / this.limit)
            this.page++
          })
          .catch((error) => {
            let responses = error.response.data
            console.log(responses.api_message)
          })
      }
    },
    async doFilter() {
      this.page = 1

      let offset = (this.page - 1) * this.limit

      let params = new URLSearchParams()

      params.set('id_mst_iklan_status', 1)
      params.set('id_mst_iklan_jenis', 2)

      params.set('offset', offset)
      params.set('limit', this.limit)
      if (this.tipeTB == 1) {
        params.set('id_mst_type_tb', this.tipeTB)
      }
      if (this.tipeTB == 2) {
        params.set('id_mst_type_tb', this.tipeTB)
      }
      if (this.jenisTB == 1) {
        params.set('id_mst_iklan_type', this.jenisTB)
      }
      if (this.jenisTB == 2) {
        params.set('id_mst_iklan_type', this.jenisTB)
      }
      params.set('sort', 'posting_terbaru')
      params.set('search', this.keyword == null ? '' : this.keyword)

      let request = {
        params: params,
      }

      if (this.statusTB == 2) {
        await this.$axios
          .get('/search/v4/search_home', request)
          .then((response) => {
            let data = response.data
            let { hits } = data.hits
            this.iklanTB = hits
            if (this.iklanTB != null) {
              this.iklanTB.reverse()
            }

            this.total = data.hits.total.value
            this.lengthPage = Math.ceil(this.total / this.limit)
            this.page++
          })
          .catch((error) => {
            let responses = error.response.data
            console.log(responses.api_message)
          })
      } else {
        await this.$axios
          .get('/search/v4/search_home', request)
          .then((response) => {
            let data = response.data
            let { hits } = data.hits
            this.iklanTB = hits

            this.total = data.hits.total.value
            this.lengthPage = Math.ceil(this.total / this.limit)
            this.page++
          })
          .catch((error) => {
            let responses = error.response.data
            console.log(responses.api_message)
          })
      }
    },
    go(id, name, date) {
      this.setSellertId(id)
      this.$router.push(
        '/seller/' + name.toLowerCase().replace(/ /g, '-') +'-'+id+ '?tgl=' + date
      )
    },
  },
  async created() {
    await this.getJadwalTB()
    await this.getTB()
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
</style>