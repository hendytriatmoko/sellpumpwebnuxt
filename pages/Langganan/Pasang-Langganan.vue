<template>
  <div>
    <app-bar />

    <v-app-bar app color="#22939E" dark v-if="$vuetify.breakpoint.xs">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div style="max-width: 1240px; margin: 0 auto !important">
      <h2>Daftar Iklan</h2>

      <br />

      <v-row>
        <v-col cols="12" sm="6">
          <v-card rounded="lg">
            <br />
            <div class="mr-4 ml-4 d-flex align-center justify-space-between">
              <h3>Status</h3>
              <h3>dfsfds</h3>
            </div>
            <br />
            <v-divider class="ml-4 mr-4"> </v-divider>
            <br />

            <v-row>
              <v-col cols="12" sm="4">
                <div class="d-flex justify-space-between mt-2">
                  <v-img width="150" height="150" class="ml-4"></v-img>
                </div>
              </v-col>
              <v-row>
                <v-col cols="6" sm="6">
                  <h2 class="mt-8">judul</h2>
                </v-col>

                <v-col cols="12" sm="6">
                  <!-- <h3>Harga Awal</h3> -->
                </v-col>
                <v-col cols="6" sm="6">
                  <div>
                    <div class="orange--text">Rp</div>
                  </div>
                </v-col>
              </v-row>
            </v-row>
            <v-divider class="ml-4 mr-4 mt-6"> </v-divider>
            <v-container>
              <div class="ml-2 d-flex align-center">
                <v-icon color="blue" small class="mr-1">
                  mdi-check-decagram
                </v-icon>
                <v-col cols="12" sm="6">
                  <h2><b>sfdss</b></h2>
                </v-col>

                <v-dialog v-model="dialog" persistent max-width="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="#20929D"
                      outlined
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      Jual Lebih Cepat
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="headline">
                      <v-img
                        max-height="200"
                        max-width="150"
                        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                      ></v-img>
                      Judul iklan
                    </v-card-title>
                    <v-divider class="mx-4"> </v-divider>
                    <v-card-text class="my-4 black--text"
                      >Anda yakin ingin memasang paket (judul) di iklan
                      ini?</v-card-text
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="#20929D" outlined @click="dialog = false">
                        Tidak
                      </v-btn>
                      <v-btn color="#20929D" dark @click="dialog = false">
                        Ya
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </div>
  <Footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'pasang-langganan',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),

      Footer: () =>
      import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
  },
  data: () => ({
    dates: [new Date().toISOString().substr(0, 10)],
    keyword: null,
    tags: [],
    hits: [],
    limit: 8,
    dialog: false,
    iklan: [],
  }),
  computed: {
    ...mapGetters({
      utc: 'timezone/utc',
      timezone: 'timezone/region',
    }),
  },
  methods: {
    ...mapActions({
      setProductId: 'product/setProduct',
    }),
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
  },
}
</script>