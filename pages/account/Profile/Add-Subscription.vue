<template>
  <div>
    <a href="/tentang?tab=highlight" target="_blank">
      <v-alert border="left" colored-border color="#20929D" elevation="2">
        Selengkapnya tentang Iklan Highlight dan Iklan Sundul
        <v-icon color="#20929D">mdi-chevron-right</v-icon>
      </v-alert>
    </a>

    <h2 align="center">Beli Paket</h2>

    <v-row>
      <v-col cols="12" v-for="item in bundles" :key="item.id">
        <v-card
          v-for="subItem in item.data"
          :key="subItem.id_iklan_langganan"
          rounded="lg"
          class="my-4"
        >
          <v-card-title class="d-flex align-center justify-space-between">
            <h2>{{ subItem.nama_paket }}</h2>
            <div class="#20929D--text">
              Rp {{ Number(subItem.harga).toLocaleString('id-ID') }}
            </div>
          </v-card-title>

          <hr />

          <v-card-text>
            <div>{{ subItem.kalimat_promo }}</div>
            <div>Berlaku: {{ subItem.hour / 24 }} hari</div>
            <div>Kuota: {{ subItem.quantity }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              :loading="loading"
              block
              color="#20929D"
              dark
              @click="getDetail(subItem)"
            >
              Beli
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'add-subscription',
  props: ['user'],
  data: () => ({
    bundles: [],
    loading: false,
  }),
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
      setSubs: 'subscription/set',
    }),
    async getSubscribe() {
      await this.$axios
        .get('/iklan/v3/iklan_langganan', {
          params: {
            limit: 20,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.bundles = data
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    async getDetail(data) {
      this.setSubs(data)
      this.$router.push('/seller/detail-subs')
    },
  },
  async created() {
    await this.getSubscribe()
  },
}
</script>