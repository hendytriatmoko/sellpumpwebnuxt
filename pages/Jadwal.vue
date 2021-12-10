<template>
  <div>
    <app-bar />

    <v-app-bar app color="#22939E" dark v-if="$vuetify.breakpoint.xs">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div style="max-width: 1240px; margin: 0 auto !important">
      <h2 class="mb-2">Jadwal Tawar Bersama</h2>

      <v-tabs
        v-model="tab"
        background-color="#22939E"
        dark
        grow
        @change="getJadwalTB"
      >
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tab>Semua</v-tab>
        <v-tab>Kalendar</v-tab>

        <v-tab-item>
          <br />

          <v-row>
            <v-col
              cols="12"
              sm="6"
              v-for="(item, index) in jadwal"
              :key="index"
            >
              <v-card
                rounded="lg"
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
                    <v-list-item-avatar size="80">
                      <v-icon x-large v-if="item.photo == 'null'">
                        mdi-account-circle
                      </v-icon>
                      <v-img :src="getImage(item.photo)" v-else></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title class="d-flex align-center">
                        <v-icon
                          color="blue"
                          small
                          class="mr-1"
                          v-if="item.id_mst_user_type == 2"
                        >
                          mdi-check-decagram
                        </v-icon>
                        <b>{{ item.nama }}</b>
                      </v-list-item-title>

                      <v-list-item-subtitle>
                        {{ item.total_iklan }} Iklan |
                        {{
                          moment(item.date).add(utc, 'h').format('DD MMM YYYY')
                        }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>

          <br />
        </v-tab-item>

        <v-tab-item>
          <br />

          <v-row>
            <v-col cols="12" sm="6">
              <v-date-picker
                ref="picker"
                v-model="date"
                full-width
                @click:date="getJadwalTB"
                :events="arrayEvents"
                event-color="green lighten-1"
              ></v-date-picker>
            </v-col>

            <v-col cols="12" sm="6">
              <div>
                <v-card
                  class="ma-2"
                  v-for="(item, index) in jadwal"
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
                      <v-list-item-avatar>
                        <v-icon x-large v-if="item.photo == 'null'">
                          mdi-account-circle
                        </v-icon>
                        <v-img :src="getImage(item.photo)" v-else></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title class="d-flex align-center">
                          <v-icon
                            color="blue"
                            small
                            class="mr-1"
                            v-if="item.id_mst_user_type == 2"
                          >
                            mdi-check-decagram
                          </v-icon>
                          <b>{{ item.nama }}</b>
                        </v-list-item-title>

                        <v-list-item-subtitle>
                          {{ item.total_iklan }} Iklan |
                          {{
                            moment(item.date)
                              .add(utc, 'h')
                              .format('DD MMM YYYY')
                          }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs>
    </div>

    <Footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'jadwal',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
       Footer: () =>
      import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
  },
  data: () => ({
    tab: 0,
    jadwal: [],
    date: new Date().toISOString().substr(0, 10),
    event: [],
    arrayEvents: [],
  }),
  computed: {
    ...mapGetters({
      utc: 'timezone/utc',
    }),
  },
  methods: {
    ...mapActions({
      setSellertId: 'product/setSeller',
    }),
    async getJadwalTB() {
      let params = new URLSearchParams()

      params.set('id_mst_iklan_status', 1)
      if (this.tab > 0) {
        params.set('tanggal_mulai', this.date)
      }
      params.set('limit', 20)

      let request = {
        params: params,
      }

      await this.$axios
        .get('/iklan/v3/iklan_jadwal_tb', request)
        .then((response) => {
          let { data } = response.data
          this.jadwal = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async functionEvents() {
      await this.$axios
        .get('/iklan/v3/iklan_cal_event_jadwal_tb')
        .then((response) => {
          let { data } = response.data

          this.event = data
          var length = data.length
          var date = []
          var i = 0

          for (i = 0; i < length; i++) {
            date.push(data[i].tanggal)
          }
          this.arrayEvents = date
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
    await this.getJadwalTB()
    await this.functionEvents()
  },
}
</script>

<style>
</style>