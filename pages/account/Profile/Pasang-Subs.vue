<template>
  <div style="max-width: 1240px; margin: 0 auto !important">
    <v-row>
      <v-col cols="12" sm="6" v-for="item in hits" :key="item._source.id">
        <v-card rounded="lg">
          <v-card-title class="d-flex align-center justify-space-between">
            <h6>Status</h6>
            <h6
              v-if="item._source.id_mst_iklan_status == 1"
              class="orange--text"
            >
              Tayang
            </h6>
            <h6
              v-if="item._source.id_mst_iklan_status == 2"
              class="green--text"
            >
              Terjual
            </h6>
            <h6
              v-if="item._source.id_mst_iklan_status == 3"
              class="green--text"
            >
              Serah Terima
            </h6>
            <h6 v-if="item._source.id_mst_iklan_status == 4" class="red--text">
              Expired
            </h6>
            <h6 v-if="item._source.id_mst_iklan_status == 6" class="red--text">
              Belum Terjual
            </h6>
            <h6 v-if="item._source.id_mst_iklan_status == 8" class="blue--text">
              Berlangsung
            </h6>
            <h6 v-if="item._source.id_mst_iklan_status == 9" class="red--text">
              Pembelian Dibatalkan
            </h6>
          </v-card-title>

          <v-divider></v-divider>

          <v-list>
            <v-list-item @click="go(item._source.id, item._source.judul)">
              <v-list-item-avatar tile>
                <v-img :src="getImage(item._source.photo)"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  {{ item._source.judul }}
                </v-list-item-title>

                <v-list-item-subtitle> Harga </v-list-item-subtitle>
                <v-list-item-subtitle>
                  {{ item._source.mst_iklan_jenis }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                {{ item._source.harga_awal }}
              </v-list-item-action>
              <v-list-item-action v-if="item._source.id_mst_iklan_jenis == 1">
                {{ item._source.harga }}
              </v-list-item-action>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-card-actions>
            <v-icon
              color="#20929D"
              small
              class="mr-1"
              v-if="item._source.id_mst_user_type == 2"
            >
              mdi-check-decagram
            </v-icon>

            <h3>
              <b>{{ item._source.app_user }}</b>
            </h3>

            <v-spacer></v-spacer>

            <v-btn
              small
              outlined
              color="#20929D"
              v-if="
                item._source.id_mst_iklan_status == 1 &&
                item._source.highlight == true
              "
              @click="getHighlight(item._source.id)"
            >
              Jual lebih cepat
            </v-btn>
            <v-btn
              small
              outlined
              color="#20929D"
              v-if="
                item._source.id_mst_iklan_status == 8 &&
                item._source.highlight == true
              "
              @click="getHighlight(item._source.id)"
            >
              Jual lebih cepat
            </v-btn>
            <v-btn
              small
              outlined
              color="#20929D"
              v-if="
                item._source.id_mst_iklan_status == 1 &&
                item._source.highlight == false
              "
              @click="getSundul(item._source.id)"
            >
              Sundul sekarang!
            </v-btn>
            <v-btn
              small
              outlined
              color="#20929D"
              v-if="
                item._source.id_mst_iklan_status == 8 &&
                item._source.highlight == false
              "
              @click="getSundul(item._source.id)"
            >
              Sundul sekarang!
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <div v-if="hits.length == 0" align="center">
        <v-alert border="right" colored-border elevation="2">
          <v-list-item-avatar tile size="80">
            <v-img src="/img/icons/Nodata.svg" class="ml-12"> </v-img>
          </v-list-item-avatar>
          Kamu tidak memiliki iklan yang sedang berlangsung / Tayang
        </v-alert>
      </div>
    </v-row>

    <v-dialog v-model="dialog2" persistent width="420">
      <v-card>
        <v-card-title class="headline"> Pasang Langganan </v-card-title>

        <v-card-text>
          Apakah yakin ingin memasang
          <b> {{ langganan.nama_langganan }} </b> pada iklan ini?
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
    <v-dialog v-model="dialog" persistent width="420">
      <v-card>
        <v-card-title class="headline"> Pasang Langgganan</v-card-title>

        <v-card-text>
          Apakah yakin ingin memasang
          <b> {{ langganan.nama_langganan }} </b> pada iklan ini?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="#20929D" outlined @click="dialog = false">
            Tidak
          </v-btn>

          <v-btn color="#20929D" dark @click="addHighlight"> Ya </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'pasang-subs',
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
    dialog: false,
    lengthPage: 0,
    sundul: 0,
    loading: false,
    selected: 0,
  }),
  computed: {
    ...mapGetters({
      utc: 'timezone/utc',
      timezone: 'timezone/region',
      langganan: 'langganan/langganan',
    }),
  },
  methods: {
    ...mapActions({
      setProductId: 'product/setProduct',
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
    getHighlight(id) {
      this.selected = id
      this.dialog = true
    },
    async addHighlight() {
      this.loading = true

      let formData = new FormData()

      formData.set('id_app_user', this.user.id)
      formData.set('id_iklan', this.selected)
      formData.set('id_iklan_langganan', this.langganan.id_iklan_langganan)
      formData.set('id_mst_langganan_tipe', 7)

      await this.$axios
        .post('/iklan/v3/iklan_highlight', formData, {
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
      params.append('id_mst_iklan_status', 1)
      params.append('id_mst_iklan_status', 8)
      params.set('highlight', false)
      // if (this.chip > 0) {
      //   params.set('id_mst_iklan_status', this.chip)
      // }
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

    go(id, name) {
      this.setProductId(id)
      this.$router.push(
        '/detail-iklan/' + name.toLowerCase().replace(/ /g, '-').replace(/[/]/g,'-')+'-'+id
      )
    },
  },
  async created() {
    await this.getListSubs()
    await this.daftarIklan()
    await this.getRiwayatSubs()
  },
}
</script>