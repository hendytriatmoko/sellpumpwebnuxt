<template>
  <div>
    <v-card rounded="lg" raised elevation="6">
      <div class="d-flex ">
        <v-alert border="top" colored-border type="info">
          Selalu waspada terhadap pihak yang tidak bertanggung jawab.
        </v-alert>
      </div>
<v-divider> </v-divider>
      <v-list class="pa-0 ma-0">
        <v-list-item>
          <v-list-item-avatar tile size="60">
            <v-img src="/img/icons/ic_tiket.webp"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ ticket.total }}</v-list-item-title>
            <v-list-item-subtitle>Total Tiket</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <div class="d-flex justify-space-around">
        <div class="text-center">
          <div>{{ ticket.tersedia }}</div>
          <div><b>Tersedia</b></div>
        </div>

        <v-divider vertical></v-divider>

        <div class="text-center">
          <div>{{ ticket.terpakai }}</div>
          <div><b>Terpakai</b></div>
        </div>

        <v-divider vertical></v-divider>

        <div class="text-center">
          <div>{{ ticket.return }}</div>
          <div><b>Refund</b></div>
        </div>

        <v-divider vertical></v-divider>

        <div class="text-center red--text">
          <div>{{ ticket.hangus }}</div>
          <div><b>Hangus</b></div>
        </div>

        <v-divider vertical></v-divider>

        <div class="text-center red--text">
          <div>{{ ticket.kadaluarsa }}</div>
          <div><b>Expired</b></div>
        </div>
      </div>

      <v-divider class="mt-2"> </v-divider>

      <v-card-actions>
        <p>
          Pelajari lebih lanjut tentang
          <a href="/tentang?tab=tiket"> tiket tawar bersama </a>
        </p>
      </v-card-actions>
    </v-card>

    <br />

    <v-card rounded="lg" raised elevation="6">
      <v-card-title
        class="teal white--text py-2 d-flex justify-space-between"
        @click="show = !show"
      >
        Dapatkan Tiket

        <v-btn icon>
          <v-icon color="white">
            {{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-expand-transition>
        <v-list subheader v-show="show">
          <v-subheader>Silahkan pilih paket yang tersedia</v-subheader>

          <v-list-item-group v-model="paket">
            <v-list-item
              v-for="item in bundles"
              :key="item.id"
              :value="item"
              @click="dialog = true"
            >
              <v-list-item-avatar tile size="60">
                <v-img src="/img/icons/ic_tiket.webp"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  {{ item.judul }} ({{ item.quantity }}
                  Tiket)
                </v-list-item-title>
                <v-list-item-subtitle>
                  Rp
                  {{ Number(item.harga).toLocaleString('id-ID') }} /Tiket
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action> </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-expand-transition>
    </v-card>

    <br />

    <v-card rounded="lg" raised elevation="6" to="/refund">
      <v-card-title class="red white--text py-2"> Refund Tiket </v-card-title>
    </v-card>

    <v-dialog v-model="dialog" width="400" persistent>
      <v-card rounded="lg">
        <v-card-title class="py-2 d-flex justify-space-between">
          Detail Pembelian Tiket

          <v-btn icon @click="dialog = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>

        <v-list>
          <v-list-item>
            <v-list-item-avatar tile size="60">
              <v-img src="/img/icons/ic_tiket.webp"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ paket.judul }}</v-list-item-title>
              <v-list-item-subtitle>
                Jumlah: {{ paket.quantity }} Tiket
              </v-list-item-subtitle>
              <div class="text-right">
                Harga: Rp {{ Number(paket.harga).toLocaleString('id-ID') }}
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-btn block color="#20929D" dark @click="dapatkan">
            <v-icon left>mdi-cart-arrow-right</v-icon> Dapatkan
          </v-btn>
        </v-card-actions>

        <v-card-text>
          Setelah Anda klik tombol dapatkan, kamu akan mendapatkan tiket dalam
          waktu 2x24 jam.
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog2" width="370" persistent>
      <v-card rounded="lg">
        <v-card-title class="py-2 d-flex justify-space-between">
          Dapatkan Tiket Tawar Bersama

          <v-btn icon @click="dialog2 = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <div class="red--text">
            Masa berlaku tiket adalah 3 bulan dari tanggal pembelian Tiket
          </div>

          <div>Lanjutkan untuk mendapatkan Tiket</div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn outlined color="red" @click="dialog2 = false">Batalkan</v-btn>

          <v-btn color="#20929D" dark :loading="loading" @click="buy">
            Lanjutkan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'left-layout-ticket',
  data: () => ({
    show: true,
    paket: {},
    bundles: [],
    dialog: false,
    dialog2: false,
    loading: false,
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user',
      ticket: 'ticket/ticket',
    }),
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    async bundleTiket() {
      await this.$axios
        .get('/iklan/v3/iklan_tiket', {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.bundles = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
          
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
    dapatkan() {
      this.dialog2 = true
      this.dialog = false
    },
    async buy() {
      this.loading = true
      let formData = new FormData() 
      formData.append('jumlah', this.paket.quantity)
      formData.append('id_mst_pembayaran_metode', 1)
      formData.append('id_pembeli', this.user.id)
      formData.append('id_iklan', this.paket.id)

      await this.$axios
        .post('/transaksi/v3/order_tiket', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.setAlert({
            status: true,
            color: 'success',
            text: data.api_message,
          })
          this.$router.push('/detail-transaksi/ticket/' + data.data.id)
        })
        .catch((error) => {
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
  },
  async created() {
    await this.bundleTiket()

    this.show = this.$vuetify.breakpoint.xs ? false : true
  },
}
</script>

<style>
</style>