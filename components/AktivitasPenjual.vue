<template>
  <div>
    <v-container>
      <div class="d-flex align-center">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="dates"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-card
              outlined
              class="d-inline-flex align-center"
              v-bind="attrs"
              v-on="on"
            >
              <v-card-text class="pa-2">
                Lihat Transaksi: {{ dateRangeText }}
                <v-icon>mdi-calendar</v-icon>
              </v-card-text>
            </v-card>
          </template>

          <v-date-picker v-model="dates" no-title scrollable range>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(dates)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>

        <v-text-field
          v-model="keyword"
          dense
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Cari"
          class="mx-2"
          @keyup.enter="search2"
          clearable
        >
          <template v-slot:append>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">mdi-filter</v-icon>
              </template>

              <v-list dense>
                <v-list-item-group
                  v-model="status2"
                  color="primary"
                  v-if="tab2 == 0"
                >
                  <v-list-item v-for="item in filter3" :key="item.text">
                    <v-list-item-subtitle>
                      {{ item.text }}
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list-item-group>

                <v-list-item-group
                  v-model="status2"
                  color="primary"
                  v-if="tab2 == 1"
                >
                  <v-list-item
                    v-for="item in filter4"
                    :key="item.text"
                    :value="item.value"
                    @click="filterStatus4"
                  >
                    <v-list-item-subtitle>
                      {{ item.text }}
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </template>
        </v-text-field>
      </div>

      <v-tabs v-model="tab2" color="#20929D" grow>
        <v-tab>Berlangsung</v-tab>
        <v-tab>Riwayat</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab2">
        <v-tab-item>
          <v-card
            rounded="lg"
            elevation="6"
            raised
            class="mt-4"
            v-for="item in berlangsung2"
            :key="item.id"
          >
            <v-container>
              <div class="d-flex justify-space-between">
                <div>Selesai pada:</div>
                <div>
                  {{
                    moment
                      .utc(item.tanggal_selesai)
                      .add(utc, 'h')
                      .format('DD MMM YYYY, HH:mm')
                  }}
                  {{ timezone }}
                </div>
              </div>

              <v-divider class="my-2"></v-divider>

              <v-row no-gutters>
                <v-col cols="5">
                  <v-list class="pa-0">
                    <v-list-item @click="go(item.id, item.judul)">
                      <v-list-item-avatar tile>
                        <v-img :src="getImage(item.photo)"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title class="teal--text">
                          <b>{{ item.judul }}</b>
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          <b>Harga Awal</b> Rp
                          {{ Number(item.harga_awal).toLocaleString('id-ID') }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>

                <v-col cols="3" class="d-flex">
                  <v-divider vertical class="mr-4"></v-divider>

                  <div class="flex-column">
                    <div>Penawaran Kamu</div>
                    <div class="text-caption text-sm-body-2">
                      Rp
                      {{ Number(item.bid_anda).toLocaleString('id-ID') }}
                    </div>
                  </div>
                </v-col>

                <v-col cols="4" class="d-flex">
                  <v-divider vertical class="mr-4"></v-divider>

                  <div class="flex-column">
                    <div class="teal--text">Jenis Iklan</div>
                    <div class="text-caption text-sm-body-2">
                      {{ item.jenis }} {{ item.type }}
                    </div>
                  </div>
                </v-col>
              </v-row>
<!-- 
              <v-divider class="my-2"></v-divider> -->

              <v-row no-gutters>
                <!-- <v-col cols="4" v-if="item.id_mst_status_pemenang == 2">
                  <div>Maks Auto Tawar Kamu</div>
                  <div class="text-caption text-sm-body-2 teal--text">
                    Rp
                    {{
                      Number(item.active_bot_max_bid).toLocaleString('id-ID')
                    }}
                  </div>
                </v-col> -->

                <v-col cols="4" class="d-flex">
                  <v-divider vertical class="mr-4"></v-divider>

                  <div class="flex-column">
                    <div>Status</div>
                    <div
                      :class="
                        item.id_mst_status_pemenang == 2
                          ? 'teal--text'
                          : 'red--text'
                      "
                    >
                      {{ item.status_all.status_aktivitas }}
                    </div>
                  </div>
                </v-col>

                <v-col
                  cols="4"
                  class="d-flex align-center"
                  v-if="item.id_mst_status_pemenang == 2"
                >
                  <v-divider vertical class="mr-4"></v-divider>

                  <v-btn outlined color="teal" shaped small>
                    Hubungi Penjual
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <v-card
            class="d-flex align-center justify-center"
            flat
            height="100"
            tile
            v-if="berlangsung2.length == 0"
          >
            <h2>Belum ada aktivitas berlangsung</h2>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card
            rounded="lg"
            elevation="6"
            raised
            class="mt-4"
            v-for="item in selesai2"
            :key="item.id"
          >
            <v-container>
              <div class="d-flex justify-space-between">
                <div>Selesai pada:</div>
                <div>
                  {{
                    moment
                      .utc(item.tanggal_selesai)
                      .add(utc, 'h')
                      .format('DD MMM YYYY, HH:mm')
                  }}
                  {{ timezone }}
                </div>
              </div>

              <v-divider class="my-2"></v-divider>

              <v-row no-gutters>
                <v-col cols="4">
                  <v-list class="pa-0">
                    <v-list-item @click="go(item.id, item.judul)">
                      <v-list-item-avatar tile>
                        <v-img :src="getImage(item.photo)"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title class="teal--text">
                          <b>{{ item.judul }}</b>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-col>

                <v-col cols="4" class="d-flex">
                  <v-divider vertical class="mr-4"></v-divider>

                  <div
                    class="flex-column"
                    v-if="item.id_mst_status_pemenang == 1"
                  >
                    <div>Penawaran Terakhir</div>
                    <div class="text-caption text-sm-body-2">
                      Rp
                      {{ Number(item.bid).toLocaleString('id-ID') }}
                    </div>
                  </div>

                  <div v-else>Tidak ada penawaran</div>
                </v-col>

                <v-col cols="4" class="d-flex">
                  <v-divider vertical class="mr-4"></v-divider>

                  <div class="flex-column">
                    <div class="teal--text">Jenis Iklan</div>
                    <div class="text-caption text-sm-body-2">
                      Tawar Bersama {{ item.type }}
                    </div>
                  </div>
                </v-col>
              </v-row>

              <v-divider class="my-2"></v-divider>

              <v-row no-gutters>
                <v-col cols="6">
                  <div>Status</div>
                  <div
                    :class="
                      item.id_mst_status_pemenang == 1
                        ? 'teal--text'
                        : 'red--text'
                    "
                  >
                    {{ item.status_all.status_aktivitas }}
                  </div>
                </v-col>

                <v-col
                  cols="6"
                  class="d-flex align-center"
                  v-if="item.id_mst_status_pemenang == 1"
                >
                  <v-divider vertical class="mr-4"></v-divider>

                  <v-btn
                    outlined
                    color="teal"
                    shaped
                    small
                    :to="'/message?id=' + item.id_app_pemenang"
                  >
                    Hubungi Pembeli
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
 <v-card
            class="d-flex align-center justify-center"
            flat
            height="100"
            tile
            v-if="selesai2.length == 0"
          >
            <h2>Belum ada riwayat aktivitas</h2>
          </v-card>
          <br />

          <div align="center">
            <v-btn
              color="teal"
              dark
              outlined
              @click="aktivitasPenjualSelesai"
              v-if="selesai2.length < 40 && selesai2.length < total2"
            >
              Muat lebih banyak
            </v-btn>
          </div>

          <!-- <v-pagination
            v-model="page2"
            @input="aktivitasPenjualSelesai"
            :length="lengthPage2"
            :total-visible="7"
            v-if="selesai2.length > 0"
          ></v-pagination> -->
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'aktivitas-penjual',
  props: ['user'],
  data: () => ({
    menu: false,
    dates: [new Date().toISOString().substr(0, 10)],
    keyword: null,
    status2: null,
    filter3: [
      { text: 'Ada pemenang', value: true },
      { text: 'Tidak ada pemenang', value: false },
    ],
    filter4: [
      { text: 'Ada pemenang', value: true },
      { text: 'Tidak ada pemenang', value: false },
    ],
    tab2: 0,
    berlangsung2: [],
    occur: [],
    selesai2: [],
    page2: 1,
    limit: 3,
    total2: 0,
    lengthPage2: 0,
  }),
  computed: {
    ...mapGetters({
      utc: 'timezone/utc',
      timezone: 'timezone/region',
    }),
    dateRangeText() {
      return this.dates.join(' ~ ')
    },
  },
  methods: {
    ...mapActions({
      setProductId: 'product/setProduct',
    }),
    async search2() {
      if (this.tab2 == 0) {
        await this.aktivitasPenjualBerlangsung()
      } else {
        await this.doSearch()
      }
    },
    async aktivitasPenjualBerlangsung() {
      await this.$axios
        .get('/iklan/v3/aktivitas_penjual_berlangsung', {
          params: {
            id_app_user: this.user.id,
            limit: 20,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.berlangsung2 = data

          if (this.berlangsung2.length > 0) {
            for (let i = 0; i < this.berlangsung2.length; i++) {
              let now = new Date(this.berlangsung2[i].server_time)
              now.setDate(now.getDate() - 1)
              let d = new Date(this.berlangsung2[i].tanggal_selesai)
              d.setDate(d.getDate() - 1)
              let countdown = d - now

              this.occur.push({ ...this.berlangsung2[i], countdown: countdown })
            }
          }
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async aktivitasPenjualSelesai() {
      let offset = (this.page2 - 1) * this.limit

      let params = new URLSearchParams()

      params.set('id_app_user', this.user.id)
      if (this.keyword != null) {
        params.set('search', this.keyword)
      }
      if (this.status2 != null) {
        params.set('pemenang', this.status2)
      }
      params.set('offset', offset)
      params.set('limit', this.limit)

      var request = {
        params: params,
        headers: { Authorization: 'Bearer ' + this.user.token },
      }

      await this.$axios
        .get('/iklan/v3/aktivitas_penjual_riwayat', request)
        .then((response) => {
          let { data } = response.data
          this.selesai2.push(...data)

          this.total2 = response.data.count
          this.lengthPage2 =
            this.total2 == 0 ? 1 : Math.ceil(this.total2 / this.limit)
          this.page2++
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async doSearch() {
      this.page2 = 1

      let offset = (this.page2 - 1) * this.limit

      let params = new URLSearchParams()

      params.set('id_app_user', this.user.id)
      if (this.keyword != null) {
        params.set('search', this.keyword)
      }
      if (this.status2 != null) {
        params.set('pemenang', this.status2)
      }
      params.set('offset', offset)
      params.set('limit', this.limit)

      var request = {
        params: params,
        headers: { Authorization: 'Bearer ' + this.user.token },
      }

      await this.$axios
        .get('/iklan/v3/aktivitas_penjual_riwayat', request)
        .then((response) => {
          let { data } = response.data
          this.selesai2 = data

          this.total2 = response.data.count
          this.lengthPage2 =
            this.total2 == 0 ? 1 : Math.ceil(this.total2 / this.limit)
          this.page2++
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    filterStatus4() {
      this.$nextTick(() => {
        this.doSearch()
      })
    },
    go(id, name) {
      this.setProductId(id)
      this.$router.push(
        '/detail-iklan/' + name.toLowerCase().replace(/ /g, '-')+'-'+id
      )
    },
  },
  async created() {
    await this.aktivitasPenjualBerlangsung()
    await this.aktivitasPenjualSelesai()
  },
}
</script>

<style>
</style>