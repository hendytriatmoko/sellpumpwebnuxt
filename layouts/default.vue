<template>
  <v-app dark v-if="mounted">
    <alert />

    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>


    <!-- <v-card flat color="grey lighten-2" >
      <v-container>
        <v-row>
          <v-col cols="6" sm="2">
            <h2>SiMotor</h2>
            <a href="/tentang?tab=about" target="_blank"> <div class="black--text">Tentang SiMotor</div></a>
           <a href="https://blog.simotor.id/" target="_blank"> <div class="black--text">Blog</div></a>
        
             <a href="/tentang?tab=faq" target="_blank" > <div class="black--text">FAQ</div></a>
          </v-col>

          <v-col cols="6" sm="4">
            <h2>Bantuan dan Panduan</h2>
            <a href="/tentang?tab=bantuan" target="_blank">
            <div class="black--text">Bantuan SiMotor</div>
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
            <h2>Ikuti Kami</h2>
            <br />
            <v-row justify="space-around">
              <a
                href="https://www.facebook.com/OfficialSiMotor/"
                target="_blank"
              >
                <v-icon large color="blue">mdi-facebook</v-icon>
              </a>
              <a href="https://www.instagram.com/simotor.id/" target="_blank">
                <v-icon large color="purple">mdi-instagram</v-icon>
              </a>
              <a
                href="https://www.youtube.com/channel/UCBExlB0xnMoTDT8LwVKg9oA"
                target="_blank"
              >
                <v-icon large color="red">mdi-youtube</v-icon>
              </a>
            </v-row>
          </v-col>

          <v-spacer></v-spacer>

          <v-col cols="12" sm="2" align="center">
            <v-img src="/img/simotor-logo.webp" width="150"></v-img>
            <a
              href="https://play.google.com/store/apps/details?id=com.digitalnetworkasia.simotorbeta"
              target="_blank"
            >
            <br />
              <v-img src="/img/playstore.png" width="150"></v-img>
            </a>
          </v-col>
        </v-row>
      </v-container>
    </v-card> -->

    <!-- <v-card>
      <v-footer>
        <v-card-text class="text-center">
          &copy; 2019 —
          <strong>Digital Nayaka Abhinaya</strong>
        </v-card-text>
      </v-footer>
    </v-card> -->

  </v-app>
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
