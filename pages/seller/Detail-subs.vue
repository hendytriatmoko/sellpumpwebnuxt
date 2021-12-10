<template>
  <div>
    <app-bar />

    <v-app-bar app color="#20929D" dark class="d-flex d-sm-none">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div style="max-width: 1240px; margin: 0 auto !important">
      <v-card class="mx-auto" width="500">
        <v-card-title>
          {{ subscription.nama_paket }}
        </v-card-title>

        <v-card-subtitle class="d-flex align-center justify-space-between">
          <div>
            <v-icon color="black">mdi-calendar-blank-outline</v-icon>
            Berlaku hingga {{ subscription.hour / 24 }} hari
          </div>

          <h2 class="blue--text">
            Rp {{ Number(subscription.harga).toLocaleString('id-ID') }}
          </h2>
        </v-card-subtitle>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Harga</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              Rp {{ Number(subscription.harga).toLocaleString('id-ID') }}
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Total Harga</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              Rp {{ Number(subscription.harga).toLocaleString('id-ID') }}
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            :loading="loading"
            block
            color="#20929D"
            dark
            @click="buy"
          >
            Beli Paket
          </v-btn>
        </v-card-actions>
        <v-dialog v-model="dialog2" width="370" persistent>
          <v-card rounded="lg" align="center">
            <v-card-title class="py-2 d-flex justify-space-between">
              Pembelian Paket Berhasil
              <v-btn icon @click="dialog2 = false">
                <v-icon> mdi-close </v-icon>
              </v-btn>
            </v-card-title>
            <v-img src="/img/icons/successful.webp" width="300"> </v-img>
            <br />
            <v-card-text>
              <div class="black--text"> Selamat!! Pembelian Paket Berhasil!!</div>
               <div class="black--text">Pasang Iklanmu sekarang juga</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="#20929D" dark :loading="loading" @click="buy" block >
                Lihat Paket
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </div>

    <Footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'detail-subs',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
       Footer: () =>
      import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
  },
  data: () => ({
    loading: false,
    dialog2: false,
  }),
  computed: {
    ...mapGetters({
      subscription: 'subscription/subscription',
      user: 'auth/user',
    }),
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    async buy() {
      this.loading = true

      let formData = new FormData()

      formData.set('id_pembeli', this.user.id)
      formData.set('id_iklan', this.subscription.id_iklan)
      formData.set('id_mst_pembayaran_metode', 1)

      await this.$axios
        .post('/transaksi/v3/order_langganan', formData, {
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
          this.$router.push('/info-langganan')
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
    dapatkan() {
      this.dialog2 = true
      this.dialog = false
    },
  },
}
</script>