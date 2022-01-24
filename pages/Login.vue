<template>
  <div>
    <v-app-bar app color="#20929D" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-row align="center">
      <v-col cols="12" sm="6 " align="center">
        <v-img src="/img/belum_login.webp" width="1000" height="600"> </v-img>
      </v-col>

      <v-col cols="12" sm="6" >
        <v-row>
          <v-spacer></v-spacer>

          <v-col cols="12" sm="8">
            <h2>Selamat Datang!</h2>
            <div class="text--secondary">Silahkan masuk untuk melanjutkan</div>

            <br />

            <v-text-field
              v-model="email"
              dense
              :rules="emailRules"
              placeholder="Email"
              prepend-inner-icon="mdi-gmail"
              outlined
              autofocus
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="show ? 'mdi-eye-off': 'mdi-eye'"
              :type="show ? 'password' : 'text'"
              :rules="passwordRules"
              dense
              placeholder="Password"
              prepend-inner-icon="mdi-lock"
              outlined
              @keyup.enter="checkAkun()"
              autofocus
              @click:append="show = !show"
            ></v-text-field>
          </v-col>

          <v-spacer></v-spacer>
        </v-row>

        <v-row>
          <v-spacer></v-spacer>

          <v-col cols="12" sm="8">
            <v-btn
              block
              color="#20929D"
              class="white--text"
              :disabled="email != '' && password.length >= 3 ? false : true"
              rounded
              @click="checkAkun()"
            >
              Masuk
            </v-btn>
          </v-col>

          <v-spacer></v-spacer>
        </v-row>

        <br />

        <v-row dense>
          <v-spacer></v-spacer>

          <v-col cols="11" sm="7">
            <section id="firebaseui-auth-container"></section>
            <center>
              <h5>
                Belum memiliki Akun?
                <NuxtLink to="/register" style="color: #20929D"> Daftar Sekarang </NuxtLink>
              </h5>
              <h5>
                Lupa password?
                <span @click="lupa_password=true" style="color: #20929D;cursor:pointer"> klik disini </span>
              </h5>

              <br />
              <h5>
                Dengan masuk, Anda telah menyetujui
                <NuxtLink to="/tentang?tab=ketentuan" target="_blank" style="color: #20929D">
                  syarat dan ketentuan
                </NuxtLink>
                dan
                <NuxtLink to="/tentang?tab=kebijakan" target="_blank" style="color: #20929D">
                  kebijakan privasi
                </NuxtLink>
              </h5>
            </center>
          </v-col>

          <v-spacer></v-spacer>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog max-width="600px" v-model="expired">
      <v-card>
        <v-toolbar flat dense color="#20929D">
          <v-toolbar-title><b>Verification Expired</b></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="expired = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <br>
        <v-alert border="left" colored-border type="warning" elevation="2">
          <strong>Catatan Penting.</strong>
          <br />
          kode verifikasi email anda expired, harap konfirmasi melalui email setelah mengirim ulang kode verifikasi
        </v-alert>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="ma-1"
            color="#20929D"
            dark
            @click="resendVerification()"
          >
            Resend
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog max-width="600px" v-model="lupa_password">
      <v-card>
        <v-toolbar flat dense color="#20929D">
          <v-toolbar-title><b>Lupa Password ?</b></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="lupa_password = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <br>
        <v-alert border="left" colored-border type="warning" elevation="2">
          <strong>Catatan Penting.</strong>
          <br />
          tautan untuk mengubah kata sandi akan dikirim melalui email, harap konfirmasi dan ubah kata sandi anda melalui tautan yang diterima pada email anda
        </v-alert>
        <v-text-field
          v-model="email"
          class="mx-4"
          dense
          :rules="emailRules"
          placeholder="Email"
          prepend-inner-icon="mdi-gmail"
          outlined
          autofocus
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="ma-1"
            color="#20929D"
            @click="forgotPasswordCheck()"
            :disabled="email == '' ? true : false"
          >
            Kirim
          </v-btn>
          <v-btn>Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
import OtpInput from '@bachdgvn/vue-otp-input'
import VueCountdown from '@chenfengyuan/vue-countdown'

Vue.component('v-otp-input', OtpInput)
Vue.component(VueCountdown.name, VueCountdown)

export default {
  name: 'login',
  data: () => ({
    phone: '',
    email: '',
    password: '',
    expired: false,
    lupa_password: false,
    show: 'false',
    emailRules: [
      (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail harus valid'
    ],
    passwordRules: [
      (v) => v && v.length >= 3 || 'Kata sandi harus valid',
    ],
    valid: true,
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user',
      prevUrl: 'prevUrl',
    }),
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    async checkAkun(){
      let formData = new FormData()

      formData.append('email', this.email)
      formData.append('password', this.password)

      await this.$axios
        .post('/user/v1/user/check', formData)
        .then((response) => {
          console.log('respon check', response)
          this.login()
        })
        .catch((error) => {
          let responses = error.response.data
          if (responses.api_message == 'Verification Expired') {
            this.expired = true
          } else if (responses.api_message != 'Verification Expired'){
            this.setAlert({
              status: true,
              color: 'error',
              text: responses.api_message,
            })
          }
        })
    },
    async resendVerification(){
      let formData = new FormData()

      formData.append('email', this.email)
      formData.append('password', this.password)

      await this.$axios
        .post('/user/v1/user/resend_verification', formData)
        .then((response) => {
          console.log(response)
          this.expired = false
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses)
        })
    },
    async forgotPasswordCheck(){
      let formData = new FormData()

      formData.append('email', this.email)
      formData.append('password', this.password)

      await this.$axios
        .post('/user/v1/user/check', formData)
        .then((response) => {
          console.log('respon check', response)
          this.forgotPassword()
        })
        .catch((error) => {
          let responses = error.response.data
          if (responses.api_message == 'Verification Expired') {
            this.forgotPassword()
          } else if (responses.api_message != 'Verification Expired'){
            this.setAlert({
              status: true,
              color: 'error',
              text: 'Email belum terdaftar',
            })
          }
        })
    },
    async forgotPassword(){
      let formData = new FormData()

      formData.append('email', this.email)

      await this.$axios
        .post('/user/v1/user/forgot_password', formData)
        .then((response) => {
          console.log(response)
          this.lupa_password = false
          this.setAlert({
            status: true,
            color: 'success',
            text: 'Lupa password berhasil, silahkan check email anda',
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
    },
    async login() {
      let formData = new FormData()

      formData.append('email', this.email)
      formData.append('password', this.password)

      await this.$axios
        .post('/user/v1/user/signin', formData)
        .then((response) => {
          if (response.data.token == '') {
            this.setAlert({
              status: true,
              color: 'error',
              text: 'Email atau password salah',
            })
          } else {
            let { data } = response.data
            this.setAuth(data[0])
            this.$cookies.set('user', JSON.stringify(data[0]))
            this.$cookies.set('token', JSON.stringify(response.data.token))
            this.setAlert({
              status: true,
              color: 'success',
              text: 'Selamat Datang ' + this.user.nama,
            })
            if (this.$cookies.get('prevUrl') != null) {
              this.$router.push(this.$cookies.get('prevUrl'))
              this.$cookies.set('prevUrl', null)
            } else {
              this.$router.push('/')
            }
          }
        })
        .catch((error) => {
          let responses = error.response.data
          this.setAlert({
            status: true,
            color: 'error',
            text: responses.api_message,
          })
        })
    },
  },
}
</script>

<style>
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
.error {
  border: 1px solid red !important;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>