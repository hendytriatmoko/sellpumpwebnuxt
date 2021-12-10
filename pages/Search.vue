<template>
  <div>
    <app-bar />

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
        @keyup.enter="doSearch"
        @keyup="doFilter"
        @click:append="sheet = true"
      >
      </v-text-field>
    </v-app-bar>

    <div style="max-width: 1240px; margin: 0 auto !important">
      <v-row>
        <v-col cols="12" sm="2" v-if="$vuetify.breakpoint.smAndUp">
          <div class="relative
          ">
            <b>Filter</b>

            <v-card outlined>
              <v-expansion-panels v-model="panel" multiple accordion>
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    Tipe Iklan
                  </v-expansion-panel-header>

                  <v-expansion-panel-content>
                    <v-radio-group
                      v-model="category"
                      column
                      dense
                      class="pa-0 ma-0"
                      @change="doFilter"
                    >
                      <v-radio :value="0">
                        <template v-slot:label>
                          <div class="text-caption">Semua</div>
                        </template>
                      </v-radio>

                      <v-radio :value="2">
                        <template v-slot:label>
                          <div class="text-caption">Tawar Bersama</div>
                        </template>
                      </v-radio>

                      <v-radio :value="1">
                        <template v-slot:label>
                          <div class="text-caption">Iklan Baris</div>
                        </template>
                      </v-radio>
                      <v-radio :value="5">
                        <template v-slot:label>
                          <div class="text-caption">Aksesoris dan Suku Cadang</div>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>Urutkan</v-expansion-panel-header>

                  <v-expansion-panel-content>
                    <v-radio-group
                      v-model="order"
                      row
                      dense
                      class="pa-0 ma-0"
                      @change="doFilter"
                    >
                      <v-radio value="posting_terbaru">
                        <template v-slot:label>
                          <div class="text-caption">Berlangsung</div>
                        </template>
                      </v-radio>

                      <v-radio value="tanggal_mulai">
                        <template v-slot:label>
                          <div class="text-caption">Segera Dimulai</div>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </div>
        </v-col>

        <v-col cols="12" sm="10">
          <div class="my-1" v-if="keyword != '' && keyword != null">
            Menampilkan 1 - {{ hits.length }} barang dari total
            {{ total }} untuk "{{ keyword }}"
          </div>

          <v-row>
            <v-col cols="6" sm="3" v-for="item in hits" :key="item._source.id">
              <list-iklan :item="item" />
            </v-col>
          </v-row>

          <br />

          <div align="center">
            <v-btn
              color="#20929D"
              dark
              outlined
              @click="doSearch"
              v-if="hits.length < 40 && hits.length < total"
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
            <v-radio-group v-model="category" @change="doFilter" row dense class="pa-0 ma-0">
              <v-radio label="Semua" value="0"></v-radio>
              <v-radio label="Tawar Bersama" value="2"></v-radio>
              <v-radio label="Iklan Baris" value="1"></v-radio>
              <v-radio label="Aksesoris & Suku Cadang" value="5"></v-radio>
            </v-radio-group>
          </v-list-item>

          <v-list-item>
            <v-list-item-subtitle> Urutkan Berdasarkan </v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-radio-group v-model="order" @change="doFilter" row dense class="pa-0 ma-0">
              <v-radio
                label="Postingan Terbaru"
                value="posting_terbaru"
              ></v-radio>

              <v-radio
                label="Tawar Bersama dimulai"
                value="tanggal_mulai"
              ></v-radio>
            </v-radio-group>
          </v-list-item>

          <v-list-item>
            <v-btn
              block
              shaped
              color="success"
              @click="doSearch"
              v-on:click="sheet = false"
            >
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
export default {
  name: 'search',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
    ListIklan: () =>
      import(/* webpackChunkName: "list-iklan" */ '@/components/ListIklan.vue'),
       Footer: () =>
      import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
  },
  data: () => ({
    panel: [0, 1],
    category: 0,
    order: '',
    keyword: null,
    tb: false,
    hits: [],
    sheet: false,
    page: 1,
    limit: 20,
    total: 0,
    lengthPage: 0,
  }),
  methods: {
    async doSearch() {
      let offset = (this.page - 1) * this.limit

      let params = new URLSearchParams()

      params.set('id_mst_iklan_status', 1)
      params.set('search', this.keyword == null ? '' : this.keyword)
      if (this.category > 0) {
        params.set('id_mst_iklan_jenis', this.category)
      }
      params.set('sort', this.order)
      if (this.category > 1) {
        params.set('tb_berlangsung', this.tb)
      }
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
          this.hits.push(...hits)

          this.total = data.hits.total.value
          this.lengthPage = Math.ceil(this.total / this.limit)
          this.page++
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
      if (this.category > 0) {
        params.set('id_mst_iklan_jenis', this.category)
      }
      params.set('sort', this.order)
      if (this.category > 1) {
        params.set('tb_berlangsung', this.tb)
      }
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
  },
  async created() {
    this.category = Number(this.$route.query.category)
    this.order = this.$route.query.order
    this.keyword = this.$route.query.q
    this.tb = this.$route.query.tb

    await this.doSearch()
    console.log('total', this.total)
    console.log('length', this.lengthPage)
    console.log('tb', this.$route.query.tb)
  },
}
</script>

<style>
div.fixed {
  position: fixed;
  top: 15%;
  width: 180px;
}
</style>