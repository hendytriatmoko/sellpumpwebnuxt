<template>
  <div>
    <app-bar />

    <v-app-bar app color="teal accent-4" dark v-if="$vuetify.breakpoint.xs">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div style="max-width: 1240px; margin: 0 auto !important">
      <h2 align="center">Detail Transaksi</h2>

      <v-alert type="error" prominent dense>
        Selalu waspada terhadap pihak yang tidak bertanggung jawab. Pastikan
        bukti pembayaran yang diupload sudah benar.
      </v-alert>

      <v-row>
        <v-col cols="12" sm="6">
          <v-card rounded="lg" elevation="6" raised>
            <v-card-title>Informasi Tagihan</v-card-title>

            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td>Nomor Order</td>
                    <td>
                      <b>{{ orders.no_order }}</b>
                    </td>
                  </tr>

                  <tr>
                    <td>Tanggal Order</td>
                    <td>
                      <b>
                        {{
                          moment(orders.created_at)
                            .add(utc, 'h')
                            .format('DD MMM YYYY HH:mm')
                        }}
                        {{ timezone }}
                      </b>
                    </td>
                  </tr>

                  <tr>
                    <td>Nama Penjual</td>
                    <td>
                      <b>{{ orders.nama_penjual }}</b>
                    </td>
                  </tr>

                  <tr>
                    <td>Metode Bayar</td>
                    <td>
                      <b>{{ orders.metode }}</b>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6">
          <v-card rounded="lg" elevation="6" raised>
            <v-card-title>Informasi Produk</v-card-title>
            <v-card-subtitle>Tiket</v-card-subtitle>

            <v-list>
              <v-list-item>
                <v-list-item-avatar tile size="80">
                  <v-img src="/img/icons/ic_tiket.webp"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="teal--text">
                    Status: {{ orders.pembayaran_status }}
                  </v-list-item-title>

                  <v-list-item-title>
                    Jumlah: {{ orders.jumlah }}
                  </v-list-item-title>

                  <v-list-item-title v-if="orders.id_mst_order_type == 1">
                    Harga Satuan:
                    {{ Number(iklan.harga_tiket).toLocaleString('id-ID') }}
                  </v-list-item-title>

                  <v-list-item-title>
                    Total Harga:
                    {{
                      Number(orders.total_pembayaran).toLocaleString('id-ID')
                    }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="space-around" v-if="orders.id_mst_order_type == 2">
        <v-col cols="12" sm="5">
          <v-card rounded="lg" elevation="6" raised>
            <v-card-title>Tujuan Pembayaran</v-card-title>
            <v-card-subtitle>
              Transfer akan dilakukan ke rekening berikut:
            </v-card-subtitle>

            <v-list class="pa-0">
              <v-list-item>
                <v-list-item-avatar tile size="80">
                  <v-img :src="getImage(accounts.foto)" contain></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-subtitle>
                    {{ accounts.bank_name }}
                  </v-list-item-subtitle>
                  <v-list-item-title>
                    {{ accounts.nomor_rekening }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ accounts.nama_rekening }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-card-text>
              Jika mengalami kendala, silahkan kunjungi bantuan
            </v-card-text>

            <v-card-actions>
              <v-btn outlined color="teal" width="49%">Bantuan</v-btn>
              <v-btn color="teal" dark width="49%">Pesan</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'invoice',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
  },
  data: () => ({
    orders: [],
    iklan: [],
    accounts: [],
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user',
      utc: 'timezone/utc',
      timezone: 'timezone/region',
    }),
  },
  methods: {
    async getOrder() {
      await this.$axios
        .get('/transaksi/v3/order', {
          params: {
            id: this.$route.params.id,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.orders = data[0]
          if (this.orders.id_mst_order_type == 1) {
            this.iklan = this.orders.iklan
          }
          if (this.orders.id_mst_order_type == 2) {
            this.getRekening()
          }
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getRekening() {
      await this.$axios
        .get('/user/v3/user/rekening', {
          params: {
            id_app_user: this.orders.id_penjual,
            id: this.orders.id_app_user_rekening,
            limit: 1,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.accounts = data[0]
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
  },
  async created() {
    await this.getOrder()
  },
}
</script>

<style>
</style>