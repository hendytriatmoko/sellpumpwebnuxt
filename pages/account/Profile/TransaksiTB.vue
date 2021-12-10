<template>
  <div>
    <v-card rounded="lg" elevation="6" raised>
      <v-tabs v-model="tab" color="#008693">
        <v-tab>Pembelian</v-tab>
        <v-tab>Penjualan</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
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
                  <v-btn text color="primary" @click="menu = false">
                    Batalkan
                  </v-btn>
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
                label="Cari Transaksi"
                class="mx-2"
                @keyup.enter="doSearch"
                clearable
              ></v-text-field>
            </div>

            <v-chip-group v-model="chip" mandatory active-class="primary--text">
              <div class="d-flex align-center">
                <h4 class="mr-2">Status</h4>

                <v-chip
                  v-for="tag in tags"
                  :key="tag.id"
                  :value="tag.id"
                  @click="filterStatus"
                >
                  <v-avatar left>
                    <v-img :src="tag.img" contain></v-img>
                  </v-avatar>
                  {{ tag.text }}
                </v-chip>
              </div>
            </v-chip-group>

            <v-card
              rounded="lg"
              elevation="6"
              raised
              class="mt-4"
              v-for="item in orders"
              :key="item.id"
            >
              <v-container >
                <div class="d-flex justify-space-between">
                  <div>Tanggal Order</div>
                  <div>
                    {{
                      moment
                        .utc(item.created_at)
                        .add(utc, 'h')
                        .format('DD MMM YYYY')
                    }}
                  </div>
                </div>

                <v-divider class="my-2"></v-divider>

                <v-row no-gutters>
                  <v-col cols="4">
                    <div class="primary--text"><b>Jenis Iklan</b></div>
                    <div class="text-caption text-sm-body-2">Tawar Bersama</div>
                  </v-col>

                  <v-col cols="4" class="d-flex">
                    <v-divider vertical class="mr-4"></v-divider>

                    <div class="flex-column">
                      <div>Jumlah Unit</div>
                      <div class="text-caption text-sm-body-2">
                        {{ item.jumlah }} Unit
                      </div>
                    </div>
                  </v-col>

                  <v-col cols="4" class="d-flex">
                    <v-divider vertical class="mr-4"></v-divider>

                    <div class="flex-column">
                      <div>Status</div>
                      <div class="text-caption text-sm-body-2">
                        {{ item.pembayaran_status }}
                      </div>
                    </div>
                  </v-col>
                </v-row>

                <v-divider class="my-2"></v-divider>

                <v-row no-gutters>
                  <v-col cols="12" sm="4">
                    <v-list class="pa-0">
                      <v-list-item @click="go(item.id_iklan, item.iklan.judul)">
                        <v-list-item-avatar tile>
                          <v-img :src="getThumb(item.iklan.photo)"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title class="primary--text">
                            <b>{{ item.iklan.judul }}</b>
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            <b>Harga Awal</b> Rp
                            {{
                              Number(item.iklan.harga_awal).toLocaleString(
                                'id-ID'
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>

                  <v-col cols="12" sm="4" class="d-flex">
                    <v-divider
                      :vertical="$vuetify.breakpoint.xs ? false : true"
                      class="mr-4"
                    ></v-divider>

                    <div class="flex-column">
                      <div>Tawaran Akhir</div>
                      <div class="orange--text">
                        <b>
                          Rp
                          {{
                            Number(item.total_pembayaran).toLocaleString(
                              'id-ID'
                            )
                          }}
                        </b>
                      </div>
                    </div>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="4"
                    class="d-flex"
                    v-if="item.id_mst_pembayaran_status == 2"
                  >
                    <v-divider
                      :vertical="$vuetify.breakpoint.xs ? false : true"
                      class="mr-4"
                    ></v-divider>

                    <div class="flex-column">
                      <v-btn
                        color="#E65100"
                        dark
                        small
                        to="/account/profile/ulasan"
                      >
                        Beri Penilaian
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>

                <v-divider class="my-2"></v-divider>

                <div class="d-flex flex-wrap align-center">
                <v-btn
                    text
                    style="text-transform: none"
                    :to="'/detail-transaksi/unit/' + item.id"
                  >
                    <v-icon left class="mr-1">mdi-eye</v-icon>
                    Lihat detail transaksi
                  </v-btn>
                  <v-divider vertical class="mx-2"></v-divider>

                  <v-btn
                    text
                    style="text-transform: none"
                    :to="'/message?id=' + item.id_penjual"
                  >
                    <v-icon left class="mr-1">
                      mdi-chat-processing mdi-flip-h
                    </v-icon>
                    Tanya Penjual
                  </v-btn>
                </div>
              </v-container>
            </v-card>

            <br />

            <div align="center">
              <v-btn
                color="teal"
                dark
                outlined
                @click="getTransaksi"
                v-if="orders.length < 40 && orders.length < total"
              >
                Muat Lebih Banyak
              </v-btn>
            </div>

            <!-- <v-pagination
              v-model="page"
              @input="getTransaksi"
              :length="lengthPage"
              :total-visible="7"
              v-if="orders.length > 0"
            ></v-pagination> -->
          </v-container>
           <v-card
            class="d-flex align-center justify-center"
            flat
            height="100"
            tile
            v-if="orders.length == 0"
          >
            <h2>Belum ada transaksi pembelian</h2>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-container>
            <div class="d-flex align-center">
              <v-menu
                ref="menu"
                v-model="menu2"
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
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(dates)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>

              <v-text-field
                v-model="keyword2"
                dense
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Cari"
                class="mx-2"
                @keyup.enter="doSearch2"
                clearable
              ></v-text-field>
            </div>

            <v-chip-group
              v-model="chip2"
              mandatory
              active-class="primary--text"
            >
              <div class="d-flex align-center">
                <h4 class="mr-2">Status</h4>

                <v-chip
                  v-for="tag in tags"
                  :key="tag.id"
                  :value="tag.id"
                  @click="filterStatus2"
                >
                  <v-avatar left>
                    <v-img :src="tag.img" contain></v-img>
                  </v-avatar>
                  {{ tag.text }}
                </v-chip>
              </div>
            </v-chip-group>

            <v-card
              rounded="lg"
              elevation="6"
              raised
              class="mt-4"
              v-for="item in penjualan"
              :key="item.id"
            >
              <v-container>
                <div class="d-flex justify-space-between">
                  <div>Tanggal Penjualan</div>
                  <div>
                    {{
                      moment
                        .utc(item.created_at)
                        .add(utc, 'h')
                        .format('DD MMM YYYY')
                    }}
                  </div>
                </div>

                <v-divider class="my-2"></v-divider>

                <v-row no-gutters>
                  <v-col cols="4">
                    <div class="teal--text"><b>Jenis Iklan</b></div>
                    <div class="text-caption text-sm-body-2">Tawar Bersama</div>
                  </v-col>

                  <v-col cols="4" class="d-flex">
                    <v-divider vertical class="mr-4"></v-divider>

                    <div class="flex-column">
                      <div>Jumlah Unit</div>
                      <div class="text-caption text-sm-body-2">
                        {{ item.jumlah }} Unit
                      </div>
                    </div>
                  </v-col>

                  <v-col cols="4" class="d-flex">
                    <v-divider vertical class="mr-4"></v-divider>

                    <div class="flex-column">
                      <div>Status</div>
                      <div class="text-caption text-sm-body-2">
                        {{ item.pembayaran_status }}
                      </div>
                    </div>
                  </v-col>
                </v-row>

                <v-divider class="my-2"></v-divider>

                <v-row no-gutters>
                  <v-col cols="12" sm="6">
                    <v-list class="pa-0">
                      <v-list-item @click="go(item.id_iklan, item.iklan.judul)">
                        <v-list-item-avatar tile>
                          <v-img :src="getThumb(item.iklan.photo)"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title class="teal--text">
                            <b>{{ item.iklan.judul }}</b>
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            <b>Harga Awal</b> Rp
                            {{
                              Number(item.iklan.harga_awal).toLocaleString(
                                'id-ID'
                              )
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>

                  <v-col cols="12" sm="6" class="d-flex">
                    <v-divider
                      :vertical="$vuetify.breakpoint.xs ? false : true"
                      class="mr-4"
                    ></v-divider>

                    <div class="flex-column">
                      <div>Tawaran Akhir</div>
                      <div class="orange--text">
                        <b>
                          Rp
                          {{
                            Number(item.total_pembayaran).toLocaleString(
                              'id-ID'
                            )
                          }}
                        </b>
                      </div>
                    </div>
                  </v-col>
                </v-row>

                <v-divider class="my-2"></v-divider>

                <div class="d-flex flex-wrap align-center">
                  <v-btn
                    text
                    style="text-transform: none"
                    :to="'/detail-transaksi/unit/' + item.id"
                  >
                    <v-icon left class="mr-1">mdi-eye</v-icon>
                    Lihat detail transaksi
                  </v-btn>

                  <v-divider vertical class="mx-2"></v-divider>

                  <v-btn
                    text
                    style="text-transform: none"
                    :to="'/message?id=' + item.id_pembeli"
                  >
                    <v-icon left class="mr-1">
                      mdi-chat-processing mdi-flip-h
                    </v-icon>
                    Tanya Pembeli
                  </v-btn>
                </div>
              </v-container>
            </v-card>

            <br />

            <div align="center">
              <v-btn
                color="teal"
                dark
                outlined
                @click="getPenjualan"
                v-if="penjualan.length < 40 && penjualan.length < total2"
              >
                Muat Lebih Banyak
              </v-btn>
            </div>

          </v-container>
           <v-card
            class="d-flex align-center justify-center"
            flat
            height="100"
            tile
            v-if="penjualan.length == 0"
          >
            <h2>Belum ada transaksi penjualan</h2>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'transaksi-tb',
  props: ['user'],
  data: () => ({
    tab: 0,
    menu: false,
    menu2: false,
    dates: [new Date().toISOString().substr(0, 10)],
    keyword: null,
    chip: 0,
    tags: [
      { id: 0, img: '/img/icons/semua.webp', text: 'Semua' },
      {
        id: 10,
        img: '/img/icons/menunggu_persetujuan.webp',
        text: 'Menunggu Persetujuan',
      },
      {
        id: 1,
        img: '/img/icons/menunggu_pembayaran.webp',
        text: 'Menunggu Pembayaran',
      },
      {
        id: 4,
        img: '/img/icons/menunggu_verifikasi.webp',
        text: 'Menunggu Verifikasi',
      },
      { id: 6, img: '/img/icons/ditolak.webp', text: 'Ditolak' },
      {
        id: 2,
        img: '/img/icons/pembayaran_diverifikasi.webp',
        text: 'Pembayaran Diverifikasi',
      },
      { id: 5, img: '/img/icons/dibatalkan.webp', text: 'Dibatalkan' },
      { id: 3, img: '/img/icons/expired.webp', text: 'Expired' },
    ],
    orders: [],
    keyword2: null,
    chip2: 0,
    penjualan: [],
    page: 1,
    limit: 3,
    total: 0,
    lengthPage: 0,
    page2: 1,
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
    async getTransaksi() {
      let offset = (this.page - 1) * this.limit

      let params = new URLSearchParams()

      params.set('id_pembeli', this.user.id)
      params.set('id_mst_order_jenis_iklan', 2)
      if (this.chip > 0) {
        params.set('id_mst_pembayaran_status', this.chip)
      }
      if (this.keyword != null) {
        params.set('search', this.keyword)
      }
      params.set('offset', offset)
      params.set('limit', this.limit)

      let request = {
        params: params,
        headers: { Authorization: 'Bearer ' + this.user.token },
      }

      await this.$axios
        .get('/transaksi/v3/order', request)
        .then((response) => {
          let { data } = response.data
          this.orders.push(...data)

          this.total = response.data.count
          this.lengthPage =
            this.total == 0 ? 1 : Math.ceil(this.total / this.limit)
          this.page++
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async doSearch() {
      this.page = 1

      let offset = (this.page - 1) * this.limit

      let params = new URLSearchParams()

      params.set('id_pembeli', this.user.id)
      params.set('id_mst_order_jenis_iklan', 2)
      if (this.chip > 0) {
        params.set('id_mst_pembayaran_status', this.chip)
      }
      if (this.keyword != null) {
        params.set('search', this.keyword)
      }
      params.set('offset', offset)
      params.set('limit', this.limit)

      let request = {
        params: params,
        headers: { Authorization: 'Bearer ' + this.user.token },
      }

      await this.$axios
        .get('/transaksi/v3/order', request)
        .then((response) => {
          let { data } = response.data
          this.orders = data

          this.total = response.data.count
          this.lengthPage =
            this.total == 0 ? 1 : Math.ceil(this.total / this.limit)
          this.page++
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    filterStatus() {
      this.$nextTick(() => {
        this.doSearch()
      })
    },
    go(id, name) {
      this.setProductId(id)
      this.$router.push(
        '/detail-iklan/' + name.toLowerCase().replace(/ /g, '-').replace(/[/]/g,'-')+'-'+id
      )
    },
    async getPenjualan() {
      let offset = (this.page2 - 1) * this.limit

      let params = new URLSearchParams()

      params.set('id_penjual', this.user.id)
      params.set('id_mst_order_jenis_iklan', 2)
      if (this.chip2 > 0) {
        params.set('id_mst_pembayaran_status', this.chip2)
      }
      if (this.keyword2 != null) {
        params.set('search', this.keyword2)
      }
      params.set('offset', offset)
      params.set('limit', this.limit)

      let request = {
        params: params,
        headers: { Authorization: 'Bearer ' + this.user.token },
      }

      await this.$axios
        .get('/transaksi/v3/order', request)
        .then((response) => {
          let { data } = response.data
          this.penjualan.push(...data)

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
    async doSearch2() {
      this.page2 = 1

      let offset = (this.page2 - 1) * this.limit

      let params = new URLSearchParams()

      params.set('id_penjual', this.user.id)
      params.set('id_mst_order_jenis_iklan', 2)
      if (this.chip2 > 0) {
        params.set('id_mst_pembayaran_status', this.chip2)
      }
      if (this.keyword2 != null) {
        params.set('search', this.keyword2)
      }
      params.set('offset', offset)
      params.set('limit', this.limit)

      let request = {
        params: params,
        headers: { Authorization: 'Bearer ' + this.user.token },
      }

      await this.$axios
        .get('/transaksi/v3/order', request)
        .then((response) => {
          let { data } = response.data
          this.penjualan = data

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
    filterStatus2() {
      this.$nextTick(() => {
        this.doSearch2()
      })
    },
  },
  async created() {
    await this.getTransaksi()
    await this.getPenjualan()
  },
}
</script>

<style>
</style>