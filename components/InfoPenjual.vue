<template>
  <div>
    <v-row v-if="$vuetify.breakpoint.xs">
      <v-col cols="12" sm="6">
        <h2>Info Penjual</h2>

        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-icon x-large v-if="seller.photo == ''">
                mdi-account-circle
              </v-icon>

              <v-img :src="getImage(seller.photo)" v-else></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                <a
                  class="d-flex align-center"
                  @click="go(seller.id, seller.nama)"
                >
                  <v-icon
                    color="blue"
                    small
                    class="mr-1 ml-1"
                    v-if="seller.id_mst_user_type == 2"
                  >
                    mdi-check-decagram
                  </v-icon>
                  <b class="ml-2" style="color: #20929d">{{ seller.nama }}</b>
                </a>
              </v-list-item-title>

              <v-list-item-subtitle>
                <v-avatar size="24" item class="mr-1">
                  <v-img :src="gbrRatting" alt="verified" contain></v-img>
                </v-avatar>
                <span v-if="avg.ratting_user == 0">Belum Ada Ulasan</span>
                <span v-if="avg.ratting_user == 1">Kurang Memuaskan</span>
                <span v-if="avg.ratting_user == 2">Cukup Memuaskan</span>
                <span v-if="avg.ratting_user == 3">Sangat Memuaskan</span>
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action v-if="!guest">
              <v-btn
                small
                color="#20929D"
                dark
                class="my-1"
                :to="'/message?id=' + seller.id"
                v-if="hits.id_app_user != user.id"
              >
                Pesan
              </v-btn>

              <v-btn
                small
                color="#20929D"
                dark
                class="my-1"
                @click="hubungi = true"
                v-if="hits.id_app_user != user.id"
              >
                Hubungi
              </v-btn>
            </v-list-item-action>
            <v-list-item-action v-if="guest">
              <v-btn
                small
                color="light-blue lighten-3"
                class="my-1"
                to="/login"
                v-if="hits.id_app_user != user.id"
              >
                Pesan
              </v-btn>

              <v-btn
                small
                color="light-blue lighten-3"
                class="my-1"
                @click="hubungi = true"
                v-if="hits.id_app_user != user.id"
              >
                Hubungi
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider> </v-divider>
          <v-list-item>
            <v-list-item-content>
              <center>
                <v-list-item-subtitle>
                  <div style="color: #20929d">
                    {{ pembayaranTerverifikasi.total }}
                  </div>
                  <div style="color: #505050">Produk Terjual</div>
                </v-list-item-subtitle>
              </center>
            </v-list-item-content>
            <v-list-item-content>
              <center>
                <v-list-item-subtitle>
                  <div style="color: #eb5757">
                    {{ dibatalkanPenjual.total }}
                  </div>
                  <div style="color: #505050">Dibatalkan Penjual</div>
                </v-list-item-subtitle>
              </center>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" sm="9">
        <h2>Info Penjual</h2>

        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-icon x-large v-if="seller.photo == ''">
                mdi-account-circle
              </v-icon>

              <v-img :src="getImage(seller.photo)" v-else></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                <a
                  class="d-flex align-center"
                  @click="go(seller.id, seller.nama)"
                >
                  <v-icon
                    color="blue"
                    small
                    class="mr-1 ml-1"
                    v-if="seller.id_mst_user_type == 2"
                  >
                    mdi-check-decagram
                  </v-icon>
                  <b class="ml-2" style="color: #20929d">{{ seller.nama }}</b>
                </a>
              </v-list-item-title>

              <v-list-item-subtitle>
                <v-avatar size="24" item class="mr-1">
                  <v-img :src="gbrRatting" alt="verified" contain></v-img>
                </v-avatar>
                <span v-if="avg.ratting_user == 0">Belum Ada Ulasan</span>
                <span v-if="avg.ratting_user == 1">Kurang Memuaskan</span>
                <span v-if="avg.ratting_user == 2">Cukup Memuaskan</span>
                <span v-if="avg.ratting_user == 3">Sangat Memuaskan</span>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content>
              <center>
                <v-list-item-subtitle>
                  <div style="color: #20929d">
                    {{ pembayaranTerverifikasi.total }}
                  </div>
                  <div style="color: #505050">Produk Terjual</div>
                </v-list-item-subtitle>
              </center>
            </v-list-item-content>
            <v-list-item-content>
              <center>
                <v-list-item-subtitle>
                  <div style="color: #eb5757">
                    {{ dibatalkanPenjual.total }}
                  </div>
                  <div style="color: #505050">Dibatalkan Penjual</div>
                </v-list-item-subtitle>
              </center>
            </v-list-item-content>

            <v-list-item-action v-if="!guest">
              <v-btn
                small
                color="#20929D"
                dark
                class="my-1"
                :to="'/message?id=' + seller.id"
                v-if="hits.id_app_user != user.id"
              >
                Pesan
              </v-btn>

              <v-btn
                small
                color="#20929D"
                dark
                class="my-1"
                @click="hubungi = true"
                v-if="hits.id_app_user != user.id"
              >
                Hubungi
              </v-btn>
            </v-list-item-action>
            <v-list-item-action v-if="guest">
              <v-btn
                small
                color="light-blue lighten-3"
                class="my-1"
                to="/login"
                v-if="hits.id_app_user != user.id"
              >
                Pesan
              </v-btn>

              <v-btn
                small
                color="light-blue lighten-3"
                class="my-1"
                @click="hubungi = true"
                v-if="hits.id_app_user != user.id"
              >
                Hubungi
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <v-divider class="mb-2"></v-divider>

    <v-row>
      <v-col cols="12" sm="9">
        <b>Catatan & Kebijakan Penjual</b>

        <v-list v-if="catatan.length > 0 || kebijakan != undefined">
          <v-list-item v-for="item in catatan" :key="item.id">
            <v-list-item-content>
              <v-list-item-title class="d-flex align-center">
                <v-icon color="black" class="mr-1"> mdi-circle-medium </v-icon>
                <b>{{ item.judul }}</b>
              </v-list-item-title>

              <v-list-item-subtitle>
                <div v-html="item.deskripsi"></div>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="kebijakan != undefined">
            <v-list-item-content>
              <v-list-item-title class="d-flex align-center">
                <v-icon color="black" class="mr-1"> mdi-circle-medium </v-icon>
                <b>Kebijakan</b>
              </v-list-item-title>

              <v-list-item-subtitle>
                <div v-html="kebijakan.deskripsi"></div>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <div v-else>belum ada catatan dan kebijakan</div>
      </v-col>
    </v-row>

    <v-dialog v-model="hubungi" persistent width="500">
      <v-card>
        <v-toolbar dark color="#20929D" dense>
          <v-toolbar-title>Hubungi</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon @click="hubungi = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-title>Tanyakan lebih lanjut kepada penjual</v-card-title>

        <div class="d-flex justify-space-around">
          <v-btn
            color="#20929D"
            text
            @click="hubungiRecord(telpon)"
            :href="'tel:' + seller.nomor_hp"
          >
            Telepon
          </v-btn>

          <v-btn
            color="#20929D"
            text
            @click="hubungiRecord(chat)"
            :href="'sms:' + seller.nomor_hp"
          >
            SMS
          </v-btn>

          <v-btn
            color="#20929D"
            text
            @click="hubungiRecord(whatsapp)"
            :href="
              'https://api.whatsapp.com/send?phone=' +
              seller.nomor_hp +
              '&text=Hai, saya dari aplikasi SiMotor'
            "
            target="_blank"
          >
            WhatsApp
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'info-penjual',
  props: [
    'hits',
    'seller',
    'avg',
    'catatan',
    'kebijakan',
    'gbrRatting',
    'pembayaranTerverifikasi',
    'dibatalkanPenjual',
    'menungguPembayaran',
  ],
  data: () => ({
    hubungi: false,
    telpon: 'telpon',
    whatsapp: 'whatsapp',
    chat: 'chat',
    record: '',
    // gbrRatting: '',
    // statistik:[],
    // pembayaranTerverifikasi:[],
    // dibatalkanPenjual:[],
    // menungguPembayaran:[],
  }),
  computed: {
    ...mapGetters({
      guest: 'auth/guest',
      user: 'auth/user',
    }),
  },
  methods: {
    ...mapActions({
      setSellertId: 'product/setSeller',
    }),
    go(id, name) {
      this.setSellertId(id)
      this.$router.push(
        '/seller/' + name.toLowerCase().replace(/ /g, '-') + '-' + id
      )
    },
    async hubungiRecord(item) {
      this.record = item
      // console.log('record', item)

      let formData = new FormData()

      formData.set('id_iklan', this.hits.id)
      formData.set('id_app_user_penjual', this.hits.id_app_user)
      if (this.user.id == null) {
        formData.set('id_app_user_pembeli', 0)
      } else {
        formData.set('id_app_user_pembeli', this.user.id)
      }
      formData.set('jenis', this.record)

      await this.$axios
        .post('/log/v3/log/call/click ', formData, {
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response

          console.log('record ke ' + this.record + ' berhasil')
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)

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
  },
  async created() {
    if (this.userid == null) {
      console.log('anda belum login')
    } else {
      console.log('user', this.userid)
    }

    console.log('ini hits', this.user.id)
    console.log('user', this.user)
    console.log('gbr ratting', this.gbrRatting)
    console.log('sellerid', this.hits.id_app_user)
    console.log('terverifikasi', this.pembayaranTerverifikasi)
  },
}
</script>

<style>
</style>