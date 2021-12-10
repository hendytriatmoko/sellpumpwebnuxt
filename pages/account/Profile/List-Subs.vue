<template>
  <div>
    <v-tabs v-model="tab" color="#20929D">
      <v-tab>Berlangganan</v-tab>
      <v-tab>Riwayat</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <!-- <v-chip-group v-model="chip" mandatory active-class="primary--text">
              <div class="d-flex align-center">
                <h4 class="mr-2">Status</h4>

                <v-chip
                  v-for="tag in tags"
                  :key="tag.id"
                  :value="tag.id"
                  @click="filterStatus"
                >
                  {{ tag.status }}
                </v-chip>
              </div>
            </v-chip-group> -->
        <v-row>
          <v-col cols="12" sm="6" v-for="item in listsubs" :key="item.id">
            <h3 class="my-4" v-if="listsubs.length > 0">
              {{ item.nama_langganan }}
            </h3>

            <v-card
              rounded="lg"
              class="my-4"
              v-for="subItem in item.data"
              :key="subItem.id_iklan_langganan"
            >
              <v-list>
                <v-list-item>
                  <v-list-item-avatar tile>
                    <v-img src="/img/icons/langganansaya.webp"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>
                      {{ subItem.nama_langganan }}
                    </v-list-item-title>

                    <v-list-item-subtitle>
                      Berlaku hingga
                      {{ moment.utc(subItem.expired_at).format('DD MMM YYYY') }}
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn
                      small
                      color="#20929D"
                      dark
                      outlined
                      @click="getDetail(subItem)"
                    >
                      Pakai
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card>
            <v-card
              class="d-flex align-center justify-center"
              flat
              height="100"
              tile
              v-if="listsubs.length == 0"
            >
              <h2>Belum ada list langganan</h2>
            </v-card>
          </v-col>
        </v-row>
        <!-- <v-container v-if="listsubs.length < 0">
          <div>Belum ada riwayat pembelian langganan</div>
        </v-container> -->
      </v-tab-item>

      <v-tab-item>
        <v-container v-if="riwayatsubs.length > 0">
          <v-row>
            <v-col cols="12" sm="6" v-for="item in riwayatsubs" :key="item.id">
              <v-card rounded="lg">
                <v-card-title class="d-flex justify-space-between">
                  <h6>Kategori : {{ item.jenis }}</h6>
                  <v-chip v-if="item.id_mst_iklan_produk == 7"
                    >Highlight</v-chip
                  >
                  <v-chip v-if="item.id_mst_iklan_produk == 8">Sundul</v-chip>
                </v-card-title>

                <v-divider class="mx-2" color="black"></v-divider>

                <v-list>
                  <v-list-item>
                    <v-list-item-avatar tile>
                      <v-img :src="getThumb(item.photo)"></v-img>
                    </v-list-item-avatar>

                    <h3>{{ item.judul }}</h3>
                  </v-list-item>
                  <v-list-item class="mx-4">
                    <h4 class="d-flex align-center my-2">
                      <v-icon
                        color="#20929D"
                        class="mr-1"
                        v-if="item.id_mst_user_type == 2"
                      >
                        mdi-check-decagram
                      </v-icon>
                      {{ item.nama }}
                    </h4>
                  </v-list-item>
                  <v-divider class="mx-2" color="black"> </v-divider>
                  <v-list-item>
                    <v-list-item-title
                      class="d-flex align-center my-2"
                      v-if="item.id_mst_iklan_produk == 7"
                    >
                      <v-list-item-subtitle>
                        Berakhir pada:
                      </v-list-item-subtitle>

                      {{
                        moment.utc(item.posting_langganan).format('DD MMM YYYY')
                      }}
                    </v-list-item-title>
                    <v-btn
                      small
                      color="#20929D"
                      outlined
                      align="right"
                      v-if="item.id_mst_iklan_produk == 8"
                      @click="getSundul(item.id)"
                    >
                      Sundul lagi
                    </v-btn>
                  </v-list-item>
                </v-list>
              </v-card>
              <v-dialog v-model="dialog2" persistent width="420">
                <v-card>
                  <v-card-title class="headline"> Pasang paket </v-card-title>

                  <v-card-text>
                    Apakah yakin ingin memasang
                    <b></b> pada iklan ini?
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="#20929D" outlined @click="dialog2 = false">
                      Tidak
                    </v-btn>

                    <v-btn color="#20929D" dark @click="addSundul"> Ya </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
        </v-container>

        <!-- <div align="center">
          <v-btn
            color="#20929D"
            dark
            outlined
            @click="daftarIklan"
            v-if="hits.length < 10 && hits.length < total"
          >
            Muat Lebih Banyak
          </v-btn>
        </div> -->

        <v-container v-else>
          <v-card
            class="d-flex align-center justify-center"
            flat
            height="100"
            tile
          >
            <h2>Belum ada riwayat pembelian langganan</h2>
          </v-card>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'list-subs',
  props: ['user'],
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
  },
  data: () => ({
    tab: 0,
    listsubs: [],
    hits: [],
    page: 1,
    limit: 8,
    total: 0,
    tags: [],
    riwayatsubs: [],
    dialog2: false,
    lengthPage: 0,
  }),
  methods: {
    ...mapGetters({
      utc: 'timezone/utc',
      timezone: 'timezone/region',
      langganan: 'langganan/langganan',
    }),
    ...mapActions({
      setLangganan: 'langganan/set',
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    async getListSubs() {
      await this.$axios
        .get('/produk/v3/langganan_pemilik_group', {
          params: {
            id_app_user: this.user.id,
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

    async getRiwayatSubs() {
      await this.$axios
        .get('/iklan/v3/iklan_langganan_riwayat', {
          params: {
            id_app_user: this.user.id,
            limit: 20,
            offset: 0,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.riwayatsubs = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getStatusSubs() {
      await this.$axios
        .get('/iklan/v3/mst_langganan_tipe')
        .then((response) => {
          let { data } = response.data
          this.tags = data
          this.tags.splice(0, 0, { id: 0, status: 'Semua' })
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    getSundul(id) {
      this.sundul = id
      this.dialog2 = true
    },
    async addSundul() {
      this.loading = true

      let formData = new FormData()

      formData.set('id_app_user', this.user.id)
      formData.set('id_iklan', this.sundul)
      formData.set('id_iklan_langganan', this.langganan.id_iklan_langganan)
      formData.set('id_mst_langganan_tipe', 8)

      await this.$axios
        .post('/iklan/v3/iklan_sundul', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.loading = false
          this.$router.push('/account/profile/list-subs')
        })
        .catch((error) => {
          this.loading = false
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
    },
    async daftarIklan() {
      let offset = (this.page - 1) * this.limit

      let params = new URLSearchParams()

      params.set('id_app_user', this.user.id)
      if (this.chip > 0) {
        params.set('id_mst_iklan_status', this.chip)
      }
      if (this.keyword != null) {
        params.set('search', this.keyword)
      }
      params.set('offset', offset)
      params.set('limit', this.limit)

      var request = {
        params: params,
        headers: { Authorization: 'Bearer ' + this.user.token },
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
    // async doSearch2() {
    //   this.page = 1

    //   let offset = (this.page - 1) * this.limit

    //   let params = new URLSearchParams()

    //   params.set('id_app_user', this.user.id)
    //   if (this.chip > 0) {
    //     params.set('id_mst_langganan_tipe', this.chip)
    //   }
    //   if (this.keyword != null) {
    //     params.set('search', this.keyword)
    //   }
    //   params.set('offset', offset)
    //   params.set('limit', this.limit)

    //   var request = {
    //     params: params,
    //     headers: { Authorization: 'Bearer ' + this.user.token },
    //   }

    //   await this.$axios
    //     .get('/search/v4/search', request)
    //     .then((response) => {
    //       let data = response.data
    //       let { hits } = data.hits
    //       this.hits = hits

    //       this.total = data.hits.total.value
    //       this.lengthPage = Math.ceil(this.total / this.limit)
    //       this.page++
    //     })
    //     .catch((error) => {
    //       let responses = error.response.data
    //       console.log(responses.api_message)
    //     })
    // },
    //    filterStatus() {
    //   this.$nextTick(() => {
    //     this.doSearch2()
    //   })
    // },
    async getDetail(data) {
      this.setLangganan(data)
      this.$router.push('/account/profile/pasang-subs')
    },
  },
  async created() {
    await this.getListSubs()
    await this.daftarIklan()
    await this.getRiwayatSubs()
  },
}
</script>
