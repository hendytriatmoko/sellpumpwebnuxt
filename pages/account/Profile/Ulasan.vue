<template>
  <div>
    <v-card rounded="lg" elevation="6" raised>
      <v-tabs v-model="tab" color="#20929D">
        <v-tab>Belum diulas</v-tab>
        <v-tab>Sudah diulas</v-tab>
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
                    Cancel
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
                label="Cari"
                class="mx-2"
                @keyup.enter="search"
                clearable
              >
              </v-text-field>
            </div>

            <v-card
              outlined
              class="mt-2 mb-4"
              v-for="item in detailReview"
              :key="item.order.id"
            >
              <list-review :item="item" :user="user" />
            </v-card>

            <v-card
              class="d-flex align-center justify-center"
              flat
              height="100"
              tile
              v-if="review.length == 0"
            >
              <h2>Belum ada ulasan</h2>
            </v-card>

            <div align="center">
              <v-btn
                color="teal"
                dark
                outlined
                @click="getReview"
                v-if="detailReview.length < 40 && detailReview.length < total"
              >
                Muat Lebih Banyak
              </v-btn>
            </div>

            <!-- <v-pagination
              v-model="page"
              @input="getReview"
              :length="lengthPage"
              :total-visible="7"
            ></v-pagination> -->
          </v-container>
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
                v-model="keyword"
                dense
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Cari"
                class="mx-2"
                @keyup.enter="search"
                clearable
              >
              </v-text-field>
            </div>

            <v-card
              outlined
              class="mt-2 mb-4"
              v-for="item in detailUlasan"
              :key="item.order.id"
            >
              <my-review :item="item" :user="user" />
            </v-card>

            <v-card
              class="d-flex align-center justify-center"
              flat
              height="100"
              tile
              v-if="detailUlasan.length == 0"
            >
              <h3 class="font-italic">Belum ada ulasan</h3>
            </v-card>

            <div align="center">
              <v-btn
                color="teal"
                dark
                outlined
                @click="myReview"
                v-if="detailUlasan.length < 40 && detailUlasan.length < total2"
              >
                Muat Lebih Banyak
              </v-btn>
            </div>

            <!-- <v-pagination
              v-model="page2"
              @input="myReview"
              :length="lengthPage2"
              :total-visible="7"
            ></v-pagination> -->
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'ulasan',
  props: ['user'],
  components: {
    ListReview: () =>
      import(
        /* webpackChunkName: "list-review" */ '@/components/ListReview.vue'
      ),
    MyReview: () =>
      import(/* webpackChunkName: "my-review" */ '@/components/MyReview.vue'),
  },
  data: () => ({
    tab: 0,
    menu: false,
    menu2: false,
    dates: [new Date().toISOString().substr(0, 10)],
    keyword: null,
    review: [],
    order: [],
    detailReview: [],
    ulasanSaya: [],
    orderSaya: [],
    detailUlasan: [],
    page: 1,
    limit: 3,
    total: 0,
    lengthPage: 0,
    page2: 1,
    total2: 0,
    lengthPage2: 0,
  }),
  computed: {
    dateRangeText() {
      return this.dates.join(' ~ ')
    },
  },
  methods: {
    async getReview() {
      let offset = (this.page - 1) * this.limit

      await this.$axios
        .get('/transaksi/v3/belum_review', {
          params: {
            id_pembeli: this.user.id,
            offset: offset,
            limit: this.limit,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.review.push(...data)
          this.detailReview = []
          this.getOrder()

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
    async getOrder() {
      let params = new URLSearchParams()

      for (let i = 0; i < this.review.length; i++) {
        params.append('id', this.review[i].id_order)
      }

      let request = {
        params: params,
        headers: { Authorization: 'Bearer ' + this.user.token },
      }

      await this.$axios
        .get('/transaksi/v3/order', request)
        .then((response) => {
          let { data } = response.data
          this.order = data

          for (let i = 0; i < this.review.length; i++) {
            let order = this.order.filter(
              (item) => item.id == this.review[i].id_order
            )
            this.detailReview.push({
              review: this.review[i],
              order: order[0],
            })
          }
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async myReview() {
      let offset = (this.page2 - 1) * this.limit

      await this.$axios
        .get('/transaksi/v3/review', {
          params: {
            id_app_user: this.user.id,
            offset: offset,
            limit: this.limit,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.ulasanSaya.push(...data)
          this.detailUlasan = []
          this.getOrderUlasan()

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
    async getOrderUlasan() {
      let params = new URLSearchParams()

      for (let i = 0; i < this.ulasanSaya.length; i++) {
        params.append('id_iklan', this.ulasanSaya[i].id_iklan)
      }

      let request = {
        params: params,
        headers: { Authorization: 'Bearer ' + this.user.token },
      }

      await this.$axios
        .get('/transaksi/v3/order', request)
        .then((response) => {
          let { data } = response.data
          this.orderSaya = data

          for (let i = 0; i < this.ulasanSaya.length; i++) {
            let order = this.orderSaya.filter(
              (item) => item.id_iklan == this.ulasanSaya[i].id_iklan
            )
            this.detailUlasan.push({
              review: this.ulasanSaya[i],
              order: order[0],
            })
          }
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
  },
  async created() {
    await this.getReview()
    await this.myReview()
  },
}
</script>

<style>
</style>