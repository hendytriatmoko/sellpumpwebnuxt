<template>

  
<div>
    <v-card flat color="grey lighten-2" >
      <v-container>
        <v-row>
          <v-col cols="6" sm="3">
            <h2>Griya Seller Pump</h2>
            <a href="/tentang?tab=about" target="_blank"> <div class="black--text">Tentang Griya Seller Pump</div></a>
           <a href="https://blog.simotor.id/" target="_blank"> <div class="black--text">Blog</div></a>
        
             <a href="/tentang?tab=faq" target="_blank" > <div class="black--text">FAQ</div></a>
          </v-col>

          <v-col cols="6" sm="4">
            <h2>Bantuan dan Panduan</h2>
            <a href="/tentang?tab=bantuan" target="_blank">
            <div class="black--text">Bantuan Griya Seller Pump</div>
            </a>
            <a href="/tentang?tab=ketentuan" target="_blank">
              <div class="black--text">Ketentuan Penggunaan</div>
            </a>
            <a href="/tentang?tab=kebijakan" target="_blank">
              <div class="black--text">Kebijakan Privasi</div>
            </a>
            <a href="/tentang?tab=panduanpembeli" target="_blank">
              <div class="black--text">Panduan Penggunaan</div>
            </a>
            <a href="/tentang?tab=kodeetik" target="_blank">
              <div class="black--text">Kode Etik Pengguna</div>
            </a>
          </v-col>

          <v-col cols="12" sm="2">
            <div>
              <h2>Marketplace</h2>
              <br />
              <v-row justify="space-around">
                <a
                  href="https://www.facebook.com/OfficialSiMotor/"
                  target="_blank"
                >
                  <v-img src="/img/tokped.png" style="margin-top:-10px" width="70" ></v-img>
                </a>
                <a href="https://www.instagram.com/simotor.id/" target="_blank">
                  <v-img src="/img/bukalapak.png" width="50" ></v-img>
                </a>
              </v-row>
            </div>
          </v-col>

          <v-spacer></v-spacer>

          <v-col cols="12" sm="2">
            <div>
              <h2>Shipping</h2>
              <br />
              <v-row justify="space-around">
                <a
                  href="https://www.facebook.com/OfficialSiMotor/" target="_blank"
                >
                  <v-img src="/img/tiki.png" style="margin-top:-10px" width="70" ></v-img>
                </a>
                <a href="https://www.instagram.com/simotor.id/" target="_blank">
                  <v-img src="/img/posindo.png" width="50" ></v-img>
                </a>
                <a href="https://www.instagram.com/simotor.id/" target="_blank">
                  <v-img src="/img/jne.png" width="50" ></v-img>
                </a>
              </v-row>
            </div>
            <br>
            <div>
              <h2>Transfer Bank</h2>
              <br />
              <v-row justify="space-around">
                <a
                  href="https://www.facebook.com/OfficialSiMotor/" target="_blank"
                >
                  <v-img src="/img/bca.jpg" style="margin-top:-10px" width="70" ></v-img>
                </a>
                <a
                  href="https://www.facebook.com/OfficialSiMotor/" target="_blank"
                >
                  <v-img src="/img/mandiri.jpg" style="margin-top:-10px" width="70" ></v-img>
                </a>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <v-card>
      <v-footer>
        <v-card-text class="text-center">
          &copy; 2021 —
          <strong>Zyrax Digital Service</strong>
        </v-card-text>
      </v-footer>
    </v-card>

</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Vue from 'vue'
import VueGeolocation from 'vue-browser-geolocation'

Vue.use(VueGeolocation)

export default {
  name: 'App',
  components: {
    Alert: () =>
      import(/* webpackChunkName: "alert" */ '@/components/Alert.vue'),
  },
  data: () => ({
    mounted: false,
    notif: '',
  }),
  computed: {
    ...mapGetters({
      guest: 'auth/guest',
      user: 'auth/user',
      timezone: 'timezone/region',
      utc: 'timezone/utc',
    }),
  },
  methods: {
    ...mapActions({
      setAuth: 'auth/set',
      setAlert: 'alert/set',
      setTimezone: 'timezone/set',
    }),
    async oneSignal() {
      await this.$OneSignal.push(() => {
        this.$OneSignal.isPushNotificationsEnabled((isEnabled) => {
          if (isEnabled) {
            console.log('Push notifications are enabled!')

            this.$OneSignal.getUserId().then((userId) => {
              console.log('OneSignal User ID:', userId)
              this.notif = userId + '[web]'
            })
          } else {
            console.log('Push notifications are not enabled yet.')
          }
        })
      })
    },
    async geolocation() {
      await this.$getLocation({
        enableHighAccuracy: true,
      })
    },
  },
  created() {
    let utc = this.moment().utcOffset() / 60 - 7

    if (utc == 0) {
      this.setTimezone({
        utc: utc,
        region: 'WIB',
      })
    }
    if (utc == 1) {
      this.setTimezone({
        utc: utc,
        region: 'WITA',
      })
    }
    if (utc == 2) {
      this.setTimezone({
        utc: utc,
        region: 'WIT',
      })
    }
  },
  async mounted() {
    this.mounted = true
    await this.oneSignal()
    // await this.geolocation()
  },
}
</script>

<style>
a:link {
  text-decoration: none;
}
</style>
