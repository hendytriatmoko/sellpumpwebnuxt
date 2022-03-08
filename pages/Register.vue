<template>
  <div>
    <!-- <v-app-bar app color="#20929D" dark >
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
  </v-app-bar> -->
    <v-row align="center">
      <v-col cols="12" sm="6">
        <v-img src="/img/banner2.PNG" width="1100" height="600"> </v-img>
      </v-col>

      <v-col cols="12" sm="6">
        <h3 class="ml-12">Hi, Pengguna Baru!</h3>
        <div class="ml-12 text--secondary">
          Silahkan masuk untuk melanjutkan
        </div>

        <br />

        <v-row>
          <v-spacer></v-spacer>

          <v-col cols="12" sm="10">
            <v-text-field
              v-model="nama"
              dense
              :rules="nameRules"
              placeholder="Nama akun"
              prepend-inner-icon="mdi-account"
              outlined
              counter="35"
              :maxlength="35"
            ></v-text-field>
            <v-text-field
              v-model="phone"
              dense
              :rules="phoneRules"
              placeholder="No Telpon"
              prepend-inner-icon="mdi-phone"
              outlined
              counter="35"
              :maxlength="35"
            ></v-text-field>
            <v-text-field
              v-model="email"
              dense
              :rules="emailRules"
              placeholder="Email"
              prepend-inner-icon="mdi-gmail"
              outlined
              counter="35"
              :maxlength="40"
            ></v-text-field>
            <v-text-field
              v-model="password"
              dense
              :rules="passwordRules"
              :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
              :type="show ? 'password' : 'text'"
              placeholder="Password"
              prepend-inner-icon="mdi-lock"
              outlined
              counter="35"
              :maxlength="35"
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
              :disabled="nama != '' && phone != '' && email != '' && password != '' ? false : true"
              @click="checkAkun()"
              rounded
            >
              Daftar
            </v-btn>

            <br />
            <center>
              <h5 @click="ubah">
                Sudah memiliki Akun?
                <NuxtLink to="/login" style="color: #20929D">Masuk</NuxtLink>
              </h5>
            </center>
            <br />
            <center>
              <h5>
                Dengan mendaftar, Anda telah menyetujui
                <a
                  href="/tentang?tab=ketentuan"
                  target="_blank"
                 style="color: #20929D"
                >
                  syarat ketentuan
                </a>
                dan
                <a href="/tentang?tab=kebijakan" target="_blank" style="color: #20929D">
                  kebijakan privasi Griya Saller Pump
                </a>
              </h5>
            </center>
          </v-col>

          <v-spacer></v-spacer>
        </v-row>
      </v-col>

      <v-col cols="12" sm="6" align="center" v-if="otpDisplay">
        <h2>Verifikasi OTP</h2>
        <div>
          Masukan kode verifikasi yang kami kiriminkan ke nomor {{ phone }}
        </div>

        <br />

        <v-row>
          <v-spacer></v-spacer>

          <v-col cols="12" sm="8">
            <div style="display: flex; flex-direction: row">
              <v-otp-input
                ref="otpInput"
                input-classes="otp-input"
                separator="-"
                :num-inputs="6"
                :should-auto-focus="true"
                :is-input-num="true"
                @on-complete="handleOnComplete"
              />
            </div>

            <br />

            <p v-if="countdown">
              Belum menerima kode? Tunggu
              <countdown
                ref="countdown"
                :time="60 * 1000"
                @end="countdown = !countdown"
              >
                <template slot-scope="props">
                  {{ props.seconds }} Detik.
                </template>
              </countdown>
            </p>

            <p v-else>
              Belum menerima kode?
              <a @click="resend">Resend</a>
            </p>
          </v-col>

          <v-spacer></v-spacer>
        </v-row>

        <v-row>
          <v-spacer></v-spacer>

          <v-col cols="12" sm="6">
            <v-btn
              block
              color="#20929D"
              dark
              @click="daftar"
              :disabled="!valid"
            >
              Verifikasi
            </v-btn>

            <br />

            <p @click="ubah">
              Bukan nomor Anda?
              <a>Ubah sekarang</a>
            </p>
          </v-col>

          <v-spacer></v-spacer>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mask } from 'vue-the-mask'
import Vue from 'vue'
import OtpInput from '@bachdgvn/vue-otp-input'
import VueCountdown from '@chenfengyuan/vue-countdown'

Vue.component('v-otp-input', OtpInput)
Vue.component(VueCountdown.name, VueCountdown)

export default {
  name: 'register',
  directives: { mask },
  middleware: 'auth',
  data: () => ({
    nama: '',
    phone: '',
    email: '',
    password: '',
    show: 'mdi-eye-off',
    nameRules: [
      (v) => !!v || 'Nama Lengkap wajib diisi',
      (v) => v.length >= 2 || 'Min 2 karakter',
      (v) => v.length <= 35 || 'Max 35 karakter',
    ],
    phoneRules: [
      (v) => !!v || 'Nomor Handphone wajib diisi (Min 10, Max 13)',
      (v) => v && v.length >= 10,
    ],
    emailRules: [
      (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail harus valid'
    ],
    passwordRules: [
      (v) => v && v.length >= 8 || 'Password minimal 8 karakter'
    ],
    valid: true,
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    async handleOnComplete(value) {
      this.otp = value
      await this.daftar()
    },
    async checkAkun(){
      let formData = new FormData()

      formData.append('email', this.email)
      formData.append('password', this.password)

      await this.$axios
        .post('/user/v1/user/check', formData)
        .then((response) => {
          console.log('respon check', response)
          this.setAlert({
            status: true,
            color: 'error',
            text: 'Email sudah terdaftar',
          })
        })
        .catch((error) => {
          let responses = error.response.data
          if (responses.api_message == 'Verification Expired') {
            this.setAlert({
              status: true,
              color: 'error',
              text: 'Email sudah terdaftar',
            })
          } else if (responses.api_message != 'Verification Expired'){
            this.register()
          }
        })
    },
    async register() {
      let formData = new FormData()

      formData.append('nama', this.nama)
      formData.append('no_telp', this.phone)
      formData.append('email', this.email)
      formData.append('password', this.password)

      await this.$axios
        .post('/user/v1/user/create', formData)
        .then((response) => {
          console.log('respon check', response)
          this.setAlert({
            status: true,
            color: 'success',
            text: 'Pendaftaran berhasil',
          })
          this.$router.push('/login')
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
    ubah() {
      this.otpDisplay = false
      this.phoneDisplay = true
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