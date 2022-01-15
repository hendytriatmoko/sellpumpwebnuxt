<template>
  <div>
      <app-bar />
      <br>
      <v-container class="mt-2 mb-1">
          <v-card>
              <v-toolbar flat dense>
                <v-toolbar-title><b>Verifikasi Akun</b></v-toolbar-title>
              </v-toolbar>
              <v-divider></v-divider>
              <v-container>
                  <div>Selamat akun anda <b>{{ dataVerifikasi.nama }}</b> telah terverikasi. klik <nuxt-link to="/login">disini</nuxt-link> untuk melakukan login</div>
              </v-container>
          </v-card>
      </v-container>
      <br>
      <Footer/>
  </div>
</template>

<script>
export default {
    name: 'Home',
    components: {
        AppBar: () =>
        import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
        Footer: () =>
        import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
    },
    data: () => ({
        nama:'hendy',
        dataVerifikasi:[],
    }),
    methods: {
        async verifikasiUser(){
            let formData = new FormData()
            formData.append('token_register', this.$route.query.token)
            formData.append('id_user', this.$route.query.id)

            await this.$axios
                .post('/user/v1/user/verifikasi_register',formData)
                .then((response) => {
                    this.dataVerifikasi = response.data.data[0]
                    console.log('data', this.dataVerifikasi)
                })
                .catch((error) => {
                    let responses = error.response.data
                    this.setAlert({
                        status: true,
                        color: 'error',
                        text: responses.api_message,
                    })
                })
        }
    },
    async created(){
        console.log('route', this.$route.query)
        await this.verifikasiUser()
    }

}
</script>

<style>

</style>