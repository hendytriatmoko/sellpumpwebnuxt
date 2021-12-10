<template>
  <div>
    <v-app-bar app color="#20929D" dark>
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-row align="center">
      <v-col cols="12" sm="6 " align="center">
        <v-img src="/img/login1.webp" width="1000" height="600"> </v-img>
      </v-col>

      <v-col cols="12" sm="6" v-if="phoneDisplay">
        <v-row>
          <v-spacer></v-spacer>

          <v-col cols="12" sm="8">
            <h2>Selamat Datang!</h2>
            <div class="text--secondary">Silahkan masuk untuk melanjutkan</div>

            <br />

            <v-text-field
              v-model="phone"
              dense
              :rules="phoneRules"
              placeholder="Nomor Handphone"
              prepend-inner-icon="mdi-phone"
              outlined
              v-mask="mask"
              @keyup.enter="logincheck"
              autofocus
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
              :disabled="!valid"
              @click="logincheck"
              rounded
            >
              Masuk
            </v-btn>
          </v-col>

          <v-spacer></v-spacer>
        </v-row>

        <br />

        <v-row>
          <v-spacer></v-spacer>

          <v-col cols="11" sm="6" class="d-flex align-center">
            <v-divider></v-divider>
            <span class="mx-4 text--secondary">Atau masuk menggunakan</span>
            <v-divider></v-divider>
          </v-col>

          <v-spacer></v-spacer>
        </v-row>

        <v-row dense>
          <v-spacer></v-spacer>

          <v-col cols="11" sm="7">
            <section id="firebaseui-auth-container"></section>
            <center>
              <h5>
                Belum memiliki Akun?
                <NuxtLink to="/register" style="color: #20929D"> Daftar Sekarang </NuxtLink>
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

      <v-col cols="12" sm="6" align="center" v-if="methodDisplay">
        <h2>Pilih metode verifikasi</h2>
        <div>
          Pilih salah satu metode dibawah ini untuk mendapatkankode verifikasi
        </div>

        <br />

        <v-row justify="center">
          <v-col cols="12" sm="5">
            <v-card rounded="lg" @click="waMethod">
              <v-list>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="#20929D" large>mdi-whatsapp</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title class="teal--text">
                      WhatsApp ke
                    </v-list-item-title>

                    <v-list-item-subtitle>
                      {{ phone }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>

          <v-col cols="12" sm="5">
            <v-card rounded="lg" @click="smsMethod">
              <v-list>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="#20929D" large>mdi-android-messages</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title class="teal--text">
                      SMS ke
                    </v-list-item-title>

                    <v-list-item-subtitle>
                      {{ phone }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>

        <br />

        <p @click="ubah">
          Bukan nomor Anda?
          <a>Ubah sekarang</a>
        </p>
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
            <v-btn dark block color="#22939E" @click="login" :disabled="!valid">
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
  name: 'login',
  directives: { mask },
  data: () => ({
    phone: '',
    method: '',
    phoneRules: [
      (v) => !!v || 'Nomor HP wajib diisi (Min 10, Max 13)',
      (v) => v && v.length >= 10,
    ],
    otpRules: [
      (v) => !!v || 'OTP harus dimasukkan',
      (v) => (v && v.length == 6) || 'OTP harus 6 digit',
      (v) => /^\d+$/.test(v) || 'Harus Angka',
    ],
    mask: '#############',
    valid: true,
    phoneDisplay: true,
    methodDisplay: false,
    otpDisplay: false,
    otp: '',
    countdown: true,
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
    handleOnComplete(value) {
      this.otp = value
      this.login()
    },
    async logincheck() {
      let formData = new FormData()

      formData.append('nomor_hp', this.phone)

      await this.$axios
        .post('/user/v3/user/logincheck', formData)
        .then(() => {
          this.phoneDisplay = false
          this.methodDisplay = true
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
    async resend() {
      if (this.method == 'sms') {
        await this.smsMethod()
      } else {
        await this.waMethod()
      }
      this.countdown = !this.countdown
    },
    ubah() {
      this.methodDisplay = false
      this.otpDisplay = false
      this.phoneDisplay = true
      this.otp = ''
    },
    async smsMethod() {
      this.method = 'sms'

      let formData = new FormData()

      formData.set('nomor_hp', this.phone)

      await this.$axios.post('/user/v3/user/otprequest', formData).then(() => {
        this.methodDisplay = false
        this.otpDisplay = true
      })
    },
    async waMethod() {
      this.method = 'wa'

      let formData = new FormData()

      formData.set('nomor_hp', this.phone)

      await this.$axios
        .post('/user/v3/user/otpwarequest', formData)
        .then(() => {
          this.methodDisplay = false
          this.otpDisplay = true
        })
    },
    async login() {
      let formData = new FormData()

      formData.append('nomor_hp', this.phone)
      formData.append('id_token', this.otp)
      formData.append('id_one_signal', this.$root.$children[0].notif)

      await this.$axios
        .post('/user/v3/user/login', formData)
        .then((response) => {
          let { data } = response.data
          this.setAuth(data[0])
          this.$cookies.set('user', JSON.stringify(data[0]))
          this.setAlert({
            status: true,
            color: 'success',
            text: 'Selamat Datang ' + this.user.nama,
          })
          this.phone = ''
          this.otp = ''
          this.otpDisplay = false
          this.phoneDisplay = true
          if (this.$cookies.get('prevUrl') != null) {
            this.$router.push(this.$cookies.get('prevUrl'))
            this.$cookies.set('prevUrl', null)
          } else {
            this.$router.push('/')
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
    async googleLogin(tokenGoogle, email) {
      let formData = new FormData()

      formData.set('id_token', tokenGoogle)
      formData.set('email', email)
      formData.set('id_one_signal', this.$root.$children[0].notif)

      await this.$axios
        .post('/user/v3/user/login', formData)
        .then((response) => {
          let { data } = response.data
          this.setAuth(data[0])
          this.$cookies.set('user', JSON.stringify(data[0]))
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
  async mounted() {
    var uiConfig = {
      signInOptions: [
        {
          provider: this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID,
        },
      ],
      signInFlow: 'popup',
      callbacks: {
        signInSuccessWithAuthResult: (authResult) => {
          if (authResult) {
            var user = authResult.user
            var credential = authResult.credential
            this.googleLogin(credential.idToken, user.email)
          }
          return false
        },
      },
    }
    var ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(this.$fireModule.auth())
    ui.start('#firebaseui-auth-container', uiConfig)
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