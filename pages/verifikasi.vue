<template>
  <div>
      <app-bar />
      <br>
      <v-container class="mt-2 mb-1" v-if="!verified">
          <v-card>
              <v-toolbar flat dense>
                <v-toolbar-title><b>Verifikasi Akun</b></v-toolbar-title>
              </v-toolbar>
              <v-divider></v-divider>
              <v-container>
                  <v-row class="mx-1">
                    <v-col cols="12" sm="12" >
                        <v-text-field
                            label="ID Pengguna"
                            dense
                            outlined
                            v-model="idPengguna"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" style="margin-top:-20px">
                        <v-text-field
                            label="Token"
                            dense
                            outlined
                            v-model="tokenPengguna"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-card-actions>
                <v-spacer></v-spacer>
                    <v-btn 
                        color="#20929D" dark
                        @click="editDataSubKategori()"
                    >
                        Verifikasi
                    </v-btn>
                </v-card-actions>
              </v-container>
          </v-card>
      </v-container>
      <v-container class="mt-2 mb-1" v-else>
          <v-card>
              <v-toolbar flat dense>
                <v-toolbar-title><b>Verifikasi Akun</b></v-toolbar-title>
              </v-toolbar>
              <v-divider></v-divider>
              <v-container>
                  <div>Selamat akun anda telah terverikasi. klik <nuxt-link to="/login">disini</nuxt-link> untuk melakukan login</div>
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
        idPengguna:'',
        tokenPengguna:'',
        verified:false,
    }),
    methods: {
        async verifikasiUser(){
            let formData = new FormData()
            formData.append('token_register', this.tokenPengguna)
            formData.append('id_user', this.idPengguna)

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
        // await this.verifikasiUser()
    }

}
</script>

<style>

</style>