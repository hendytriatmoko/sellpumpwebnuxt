<template>
  <div>
    <v-card rounded="lg" elevation="6" raised>
      <v-tabs v-model="tab" color="teal">
        <v-tab>Daftar Transaksi</v-tab>
        <v-tab>Tiket Saya</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-tabs v-model="tab2" grow color="teal">
            <v-tab>Pembelian</v-tab>
            <v-tab>Refund</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab2">
            <v-tab-item>
              <v-container>
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
                      Oke
                    </v-btn>
                  </v-date-picker>
                </v-menu>

                <v-chip-group
                  v-model="chip"
                  mandatory
                  active-class="primary--text"
                >
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
                  :to="'/detail-transaksi/ticket/' + item.id"
                >
                  <v-container>
                    <div class="d-flex justify-space-between">
                      <div>Tanggal Order</div>
                      <div>
                        {{
                          moment(item.created_at)
                            .add(utc, 'h')
                            .format('DD MMM YYYY')
                        }}
                      </div>
                    </div>

                    <v-divider class="my-2"></v-divider>

                    <v-row no-gutters>
                      <v-col cols="6">
                        <div class="teal--text"><b>Nomor Order</b></div>
                        <div class="text-caption text-sm-body-2">
                          {{ item.no_order }}
                        </div>
                      </v-col>

                      <v-col cols="6" class="d-flex">
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
                          <v-list-item>
                            <v-list-item-avatar tile>
                              <v-img src="/img/icons/ic_tiket.webp"></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content>
                              <v-list-item-title class="teal--text">
                                <b>{{ item.iklan.judul }}</b>
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                <b>{{ item.jumlah }} Tiket</b> x Rp
                                {{
                                  Number(item.iklan.harga_tiket).toLocaleString(
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
                          <div>Total Harga</div>
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
                  </v-container>
                </v-card>

                <br />

                <div align="center">
                  <v-btn
                    color="#20929D"
                    dark
                    outlined
                    @click="orderTicket"
                    v-if="orders.length < 40 && orders.length < total"
                  >
                    Muat Lebih Banyak
                  </v-btn>
                </div>

                <!-- <v-pagination
                  v-model="page"
                  @input="orderTicket"
                  :length="lengthPage"
                  :total-visible="5"
                  v-if="orders.length > 0"
                ></v-pagination> -->
              </v-container>
            </v-tab-item>

            <v-tab-item>
              <v-container>
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
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(dates)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>

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
                  v-for="item in refunds"
                  :key="item.id"
                  :to="'/invoice/ticket/' + item.id"
                >
                  <v-container>
                    <div class="d-flex justify-space-between">
                      <div>Dibayarkan sebelum</div>
                      <div>
                        {{
                          moment(item.last_date_at)
                            .add(utc, 'h')
                            .format('DD MMM YYYY, HH:mm')
                        }}
                        {{ timezone }}
                      </div>
                    </div>

                    <v-divider class="my-2"></v-divider>

                    <v-row no-gutters>
                      <v-col cols="6">
                        <div class="teal--text"><b>Nomor Order</b></div>
                        <div class="text-caption text-sm-body-2">
                          {{ item.no_order }}
                        </div>
                      </v-col>

                      <v-col cols="6" class="d-flex">
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
                          <v-list-item>
                            <v-list-item-avatar tile>
                              <v-img src="/img/icons/ic_tiket.webp"></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content>
                              <v-list-item-title class="teal--text">
                                <b>{{ item.jenis_iklan }}</b>
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                <b>{{ item.jumlah }} Tiket</b> x Rp
                                {{
                                  Number(item.total_pembayaran).toLocaleString(
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
                          <div>Total Harga</div>
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
                  </v-container>
                </v-card>

                <br />

                <div align="center">
                  <v-btn
                    color="teal"
                    dark
                    outlined
                    @click="refundTicket"
                    v-if="refunds.length < 40 && refunds.length < total2"
                  >
                    Muat Lebih Banyak
                  </v-btn>
                </div>

                <!-- <v-pagination
                  v-model="page2"
                  @input="refundTicket"
                  :length="lengthPage2"
                  :total-visible="5"
                  v-if="refunds.length > 0"
                ></v-pagination> -->
              </v-container>
            </v-tab-item>
          </v-tabs-items>
        </v-tab-item>

        <v-tab-item>
          <v-tabs v-model="tab3" grow show-arrows>
            <v-tab>Tersedia</v-tab>
            <v-tab>Refund</v-tab>
            <v-tab>Hangus</v-tab>
            <v-tab>Expired</v-tab>

            <v-tabs-items v-model="tab3">
              <v-tab-item>
                <div v-if="tersedia.length > 0">
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      v-for="item in tersedia"
                      :key="item.id"
                    >
                      <my-ticket :item="item" />
                    </v-col>
                  </v-row>

                  <div align="center" class="my-2">
                    <v-btn
                      color="teal"
                      dark
                      outlined
                      @click="tiketTersedia"
                      v-if="tersedia.length < 40 && tersedia.length < totalTersedia"
                    >
                      Muat Lebih Banyak
                    </v-btn>
                  </div>

                  <!-- <v-pagination
                    v-model="pageTersedia"
                    @input="tiketTersedia"
                    :length="lengthPageTersedia"
                    :total-visible="5"
                  ></v-pagination> -->
                </div>
              </v-tab-item>

              <v-tab-item>
                <div v-if="dicairkan.length > 0">
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      v-for="item in dicairkan"
                      :key="item.id"
                    >
                      <my-ticket :item="item" />
                    </v-col>
                  </v-row>

                  <div align="center" class="my-2">
                    <v-btn
                      color="teal"
                      dark
                      outlined
                      @click="tiketDicairkan"
                      v-if="dicairkan.length < 40 && dicairkan.length < totalDicairkan"
                    >
                      Muat Lebih Banyak
                    </v-btn>
                  </div>

                  <!-- <v-pagination
                    v-model="pageDicairkan"
                    @input="tiketDicairkan"
                    :length="lengthPageDicairkan"
                    :total-visible="5"
                  ></v-pagination> -->
                </div>
              </v-tab-item>

              <v-tab-item>
                <div v-if="hangus.length > 0">
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      v-for="item in hangus"
                      :key="item.id"
                    >
                      <my-ticket :item="item" />
                    </v-col>
                  </v-row>

                  <div align="center" class="my-2">
                    <v-btn
                      color="teal"
                      dark
                      outlined
                      @click="tiketHangus"
                      v-if="hangus.length < 40 && hangus.length < totalHangus"
                    >
                      Muat Lebih Banyak
                    </v-btn>
                  </div>

                  <!-- <v-pagination
                    v-model="pageHangus"
                    @input="tiketHangus"
                    :length="lengthPageHangus"
                    :total-visible="5"
                  ></v-pagination> -->
                </div>
              </v-tab-item>

              <v-tab-item>
                <div v-if="expired.length > 0">
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      v-for="item in expired"
                      :key="item.id"
                    >
                      <my-ticket :item="item" />
                    </v-col>
                  </v-row>

                  <div align="center" class="my-2">
                    <v-btn
                      color="teal"
                      dark
                      outlined
                      @click="tiketExpired"
                      v-if="expired.length < 40 && expired.length < totalExpired"
                    >
                      Muat Lebih Banyak
                    </v-btn>
                  </div>

                  <!-- <v-pagination
                    v-model="pageExpired"
                    @input="tiketExpired"
                    :length="lengthPageExpired"
                    :total-visible="5"
                  ></v-pagination> -->
                </div>
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'main-layout-ticket',
  components: {
    MyTicket: () =>
      import(/* webpackChunkName: "my-tciket" */ '@/components/MyTicket.vue'),
  },
  data: () => ({
    tab: 0,
    tab2: 0,
    tab3: 0,
    dates: [new Date().toISOString().substr(0, 10)],
    menu: false,
    chip: 0,
    chip2: 0,
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
    refunds: [],
    page: 1,
    limit: 3,
    total: 0,
    lengthPage: 0,
    page2: 1,
    total2: 0,
    lengthPage2: 0,
    tersedia: [],
    dicairkan: [],
    hangus: [],
    expired: [],
    limit2: 10,
    pageTersedia: 1,
    lengthPageTersedia: 0,
    totalTersedia: 0,
    pageDicairkan: 1,
    lengthPageDicairkan: 0,
    totalDicairkan: 0,
    pageHangus: 1,
    lengthPageHangus: 0,
    totalHangus: 0,
    pageExpired: 1,
    lengthPageExpired: 0,
    totalExpired: 0,
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user',
      utc: 'timezone/utc',
      timezone: 'timezone/region',
    }),
    dateRangeText() {
      return this.dates.join(' ~ ')
    },
  },
  methods: {
    async orderTicket() {
      let offset = (this.page - 1) * this.limit

      let params = new URLSearchParams()

      params.set('id_pembeli', this.user.id)
      params.set('id_penjual', 1)
      params.set('id_mst_order_jenis_iklan', 1)
      params.set('id_mst_order_type', 1)
      if (this.chip > 0) {
        params.set('id_mst_pembayaran_status', this.chip)
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
          let { data } = response
          this.orders.push(...data.data)

          this.total = data.count
          this.lengthPage = Math.ceil(this.total / this.limit)
          this.page++
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async refundTicket() {
      let offset = (this.page2 - 1) * this.limit

      let params = new URLSearchParams()

      params.set('id_penjual', this.user.id)
      params.set('id_pembeli', 1)
      params.set('id_mst_order_jenis_iklan', 1)
      params.set('id_mst_order_type', 2)
      if (this.chip2 > 0) {
        params.set('id_mst_pembayaran_status', this.chip2)
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
          let { data } = response
          this.refunds.push(...data.data)

          this.total2 = data.count
          this.lengthPage2 = Math.ceil(this.total2 / this.limit)
          this.page2++
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    filterStatus() {
      this.$nextTick(() => {
        this.orderTicket()
      })
    },
    filterStatus2() {
      this.$nextTick(() => {
        this.refundTicket()
      })
    },
    async tiketTersedia() {
      let offset = (this.pageTersedia - 1) * this.limit2

      await this.$axios
        .get('/tiket/v3/tiket', {
          params: {
            id_app_user: this.user.id,
            id_mst_tiket_status: 1,
            offset: offset,
            limit: this.limit2,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.tersedia.push(...data.data)

          this.totalTersedia = data.count
          this.lengthPageTersedia = Math.ceil(this.totalTersedia / this.limit)
          this.pageTersedia++
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async tiketDicairkan() {
      let offset = (this.pageDicairkan - 1) * this.limit2

      await this.$axios
        .get('/tiket/v3/tiket', {
          params: {
            id_app_user: this.user.id,
            id_mst_tiket_status: 3,
            offset: offset,
            limit: this.limit2,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.dicairkan.push(...data.data)

          this.totalDicairkan = data.count
          this.lengthPageDicairkan = Math.ceil(this.totalDicairkan / this.limit)
          this.pageDicairkan++
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async tiketHangus() {
      let offset = (this.pageHangus - 1) * this.limit2

      await this.$axios
        .get('/tiket/v3/tiket', {
          params: {
            id_app_user: this.user.id,
            id_mst_tiket_status: 5,
            offset: offset,
            limit: this.limit2,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.hangus.push(...data.data)

          this.totalHangus = data.count
          this.lengthPageHangus = Math.ceil(this.totalHangus / this.limit)
          this.pageHangus++
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async tiketExpired() {
      let offset = (this.pageExpired - 1) * this.limit2

      await this.$axios
        .get('/tiket/v3/tiket', {
          params: {
            id_app_user: this.user.id,
            id_mst_tiket_status: 2,
            offset: offset,
            limit: this.limit2,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.expired.push(...data.data)

          this.totalExpired = data.count
          this.lengthPageExpired = Math.ceil(this.totalExpired / this.limit)
          this.pageExpired++
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
  },
  async created() {
    await this.orderTicket()
    await this.refundTicket()
    await this.tiketTersedia()
    await this.tiketDicairkan()
    await this.tiketHangus()
    await this.tiketExpired()
  },
}
</script>

<style>
</style>