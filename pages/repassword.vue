<template>
  <div>
      <app-bar />
      <br>
      <v-container class="mt-2 mb-1">
          <v-card>
              <v-toolbar flat dense>
                <v-toolbar-title><b>Lupa Password</b></v-toolbar-title>
              </v-toolbar>
              <v-divider></v-divider>
              <br>
              <center>
                  <v-card width="400px">
                      <br>
                      <div class="text-left ml-3">Masukkan Password Baru</div>
                      <v-text-field
                        class="mx-3 mt-2"
                        v-model="password"
                        :append-icon="show ? 'mdi-eye-off': 'mdi-eye'"
                        :type="show ? 'password' : 'text'"
                        :rules="passwordRules"
                        @click:append="show = !show"
                        solo
                        dense
                      ></v-text-field>
                      <div class="text-left ml-3">Masukkan Ulang Password</div>
                      <v-text-field
                        class="mx-3 mt-2"
                        :rules="passwordRules"
                        v-model="repassword"
                        :append-icon="showre ? 'mdi-eye-off': 'mdi-eye'"
                        :type="showre ? 'password' : 'text'"
                        @click:append="showre = !showre"
                        solo
                        dense
                      ></v-text-field>
                      <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn @click="kirim()" :disabled="password.length > 7 && repassword.length > 7 ? false : true" color="#20929D" class="white--text">Kirim</v-btn>
                      </v-card-actions>
                  </v-card>
              </center>
              <br>
          </v-card>
      </v-container>
      <br>
      <Footer/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'Home',
    components: {
        AppBar: () =>
        import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
        Footer: () =>
        import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
    },
    data: () => ({
        passwordRules: [
            (v) => v && v.length >= 8 || 'Password minimal 8 karakter'
        ],
        nama:'hendy',
        show: 'false',
        showre: 'false',
        password:'',
        repassword:'',
    }),
    methods: {
        ...mapActions({
            setAlert: 'alert/set',
        }),
        async kirim(){
            if (this.password != this.repassword) {
                this.setAlert({
                    status: true,
                    color: 'error',
                    text: 'reType Password tidak sama',
                })
            }else{
                let formData = new FormData()
                formData.append('token_repassword', this.$route.query.token)
                formData.append('id_user', this.$route.query.id)
                formData.append('password', this.password)

                await this.$axios
                    .post('/user/v1/user/verifikasi_repassword',formData)
                    .then((response) => {
                        console.log(response)
                        this.$router.push('/login')
                        this.setAlert({
                            status: true,
                            color: 'success',
                            text: 'Password berhasil di update',
                        })
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
        }
    },
    async created(){
        console.log('route', this.$route.query)
    }

}
</script>

<style>

</style>