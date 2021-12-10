<template>
  <div class="d-flex align-center">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon to="/account/profile/notifikasi">
          <v-badge
            :content="countNotif"
            :value="countNotif"
            color="orange"
            overlap
          >
            <v-icon v-bind="attrs" v-on="on" color="#000000">mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <span>Notifikasi</span>
    </v-tooltip>
    <!-- <v-menu
      :open-on-hover="$vuetify.breakpoint.xsOnly ? false : true"
      offset-y
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn large icon v-bind="attrs" v-on="on">
          <v-badge color="orange" overlap v-if="countNotif > 0">
            <template v-slot:badge>
              <span>{{
                    countNotif +
                    buyerOrders.menunggu_persetujuan +
                    buyerOrders.menunggu_pembayaran +
                    buyerOrders.menunggu_verifikasi +
                    ticketOrders.menunggu_pembayaran +
                    ticketOrders.menunggu_verifikasi
                  }}</span>
            </template>
          </v-badge>
          <v-icon color="#000000"> mdi-bell </v-icon>
        </v-btn>
      </template>

      <v-card rounded="lg" raised width="400" to="/account/profile/notifikasi">
        <v-card flat to="/account/profile/umum">
          <v-card-title>
            <div class="d-flex align-center">
              Notifikasi
              <v-chip class="ml-2" color="red" dark small>
                {{ countNotif }}
              </v-chip>
            </div>
            <v-spacer></v-spacer>
            <v-icon>mdi-chevron-right</v-icon>
          </v-card-title>
        </v-card>
        <v-divider></v-divider>
        <v-tabs
          v-model="tab2"
          grow
          slider-color="teal"
          @change="content = false"
        >
          <v-tab class="text-caption">Transaksi</v-tab>
          <v-tab class="text-caption">Update</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab2">
          <v-tab-item>
            <v-card flat>
              <div class="d-flex justify-space-between">
                <v-card-subtitle class="font-weight-bold"
                  >Pembeli</v-card-subtitle
                >
                <v-card-subtitle class="font-weight-bold">
                  <a> Semua</a>
                </v-card-subtitle>
              </div>

              <div class="d-flex justify-space-around text-center text-caption">

                <div>Menunggu Persetujuan</div>
                <div>Menunggu Pembayaran</div>
                <div>Menunggu Verifikasi</div>
              </div>

              <v-divider class="mt-2"></v-divider>
              <div class="d-flex justify-space-between">
                <v-card-subtitle class="font-weight-bold"
                  >Penjual</v-card-subtitle
                >
                <v-card-subtitle class="font-weight-bold">
                  <a> Semua</a>
                </v-card-subtitle>
              </div>
              <div class="d-flex justify-space-around text-center text-caption">
                  
                <div><v-badge
                        color="red"
                        overlap
                      >
                        <template v-slot:badge>
                          <span>aaa</span>
                        </template>

                        <img
                          src="/img/icons/menunggu_persetujuan.webp"
                          width="30"
                          height="30"
                          alt="menunggu persetujuan"
                        />
                      </v-badge> Menunggu Persetujuan </div>
                <div>Menunggu Pembayaran</div>
                <div>Menunggu Verifikasi</div>
              </div>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-menu> -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon to="/message">
          <v-badge
            :content="chats.length"
            :value="chats.length"
            color="orange"
            overlap
          >
            <v-icon v-bind="attrs" v-on="on" color="#000000">mdi-email</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <span>Pesan</span>
    </v-tooltip>

    <v-menu
      :open-on-hover="$vuetify.breakpoint.xsOnly ? false : true"
      offset-y
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn large icon v-bind="attrs" v-on="on">
          <v-avatar size="32" item>
            <v-img
              src="/img/icons/people.webp"
              contain
              v-if="user.photo == null"
            ></v-img>
            <v-img :src="getImage(user.photo)" alt="Avatar" v-else></v-img>
          </v-avatar>
        </v-btn>
      </template>

      <v-card rounded="lg" raised width="400">
        <v-row no-gutters>
          <v-col cols="6">
            <v-card to="/account/profile/umum" color="#ffffff" outlined >
            <v-list dense>
              <v-list-item >
                <v-list-item-avatar>
                  <v-img
                    src="/img/icons/people.webp"
                    contain
                    v-if="user.photo == null"
                  ></v-img>

                  <v-img
                    :src="getImage(user.photo)"
                    alt="Avatar"
                    v-else
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    class="d-flex align-center"
                    v-if="user.nama.length < 10"
                  >
                    <v-icon
                      color="#20929D"
                      small
                      class="mr-1"
                      v-if="user.id_mst_user_type == 2"
                    >
                      mdi-check-decagram
                    </v-icon>
                    {{ user.nama }}
                  </v-list-item-title>
                  
                  <v-list-item-title class="d-flex align-center" v-else>
                    <v-icon
                      color="#20929D"
                      small
                      class="mr-1"
                      v-if="user.id_mst_user_type == 2"
                    >
                      mdi-check-decagram
                    </v-icon>
                    {{ user.nama.substring(0, 10) + '..' }}
                  </v-list-item-title>
                  <!-- <v-list-item-subtitle
                    class="red--text"
                    v-if="user.id_verifikasi_ktp == 4"
                  >
                    Akun kamu belum ter-verifikasi
                  </v-list-item-subtitle> -->
                  <v-list-item-subtitle>
                    {{ user.nomor_hp }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            </v-card>
          </v-col>

          <v-col cols="6">
            <v-card color="#20929D" outlined class="mr-2" to="/ticket">
              <v-list dense>
                <v-list-item>
                  <v-list-item-avatar tile size="30">
                    <v-img src="/img/icons/ic_tiket.webp"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-title>
                    Tiket Saya: {{ ticket.tersedia }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
        <!-- <v-col cols="12">
            <v-card color="#FFFFFF;" outlined class="mr-2">
              <v-list dense>
                <v-list-item to="/account/profile/umum" replace>
                  <v-list-item-avatar tile size="30">
                    <v-img src="/img/verifikasi_akun.png"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-title>
                    <v-list-item-subtitle style="color:#EB5757;">
                      Akun kamu belum ter-verifikasi
                    </v-list-item-subtitle>
                    <v-list-item-subtitle style="font-size:12px">
                      Verifikasi untuk kemudahan mendapatkan tiket
                    </v-list-item-subtitle>                  
                  </v-list-item-title>
                  <v-icon> mdi-chevron-right </v-icon>
                </v-list-item>
              </v-list>
            </v-card>
        </v-col> -->
        <!-- <v-col cols="12"  v-if="user.id_verifikasi_ktp == 4">
            <v-card color="#FFFFFF;" outlined class="mr-2" >
              <v-list dense>
                <v-list-item to="/account/profile/umum" replace>
                  <v-list-item-avatar tile size="30">
                    <v-icon color="red"> mdi-account-alert </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-title>
                    <v-list-item-subtitle style="color:#EB5757;">
                      Akun Anda belum ter-verifikasi
                    </v-list-item-subtitle>
                    <v-list-item-subtitle style="font-size:12px">
                      Verifikasi untuk kemudahan mendapatkan tiket
                    </v-list-item-subtitle>                  
                  </v-list-item-title>
                  <v-icon> mdi-chevron-right </v-icon>
                </v-list-item>
              </v-list>
            </v-card>
        </v-col> -->

         <!-- <v-col cols="12"   v-if="user.id_verifikasi_ktp == 3">
            <v-card color="#FFFFFF;" outlined class="mr-2" >
              <v-list dense>
                <v-list-item to="/account/profile/umum" replace>
                  <v-list-item-avatar tile size="30">
                    <v-icon style="color:#20929D;"> mdi-account-check </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-title>
                    <v-list-item-subtitle style="color:#20929D;">
                      Akun Anda sudah ter-verifikasi
                    </v-list-item-subtitle>
                               
                  </v-list-item-title>
                  <v-icon> mdi-chevron-right </v-icon>
                </v-list-item>
              </v-list>
            </v-card>
        </v-col> -->

        <v-row no-gutters>
          <v-col cols="6">
            <v-list dense>
              <v-list-item to="/account/profile/iklan-garasi" replace>
                <v-list-item-avatar tile size="30">
                  <v-img src="/img/icons/iklangarasi.webp"></v-img>
                </v-list-item-avatar>
                <v-list-item-subtitle>Iklan & Garasi</v-list-item-subtitle>
                <v-icon> mdi-chevron-right </v-icon>
              </v-list-item>

              <v-divider> </v-divider>

              <v-list-item to="/seller/add">
                <v-list-item-avatar tile size="30">
                  <v-img src="/img/icons/ic_tmbhikln.webp"></v-img>
                </v-list-item-avatar>
                <v-list-item-subtitle>Tambah Iklan</v-list-item-subtitle>
                <v-icon> mdi-chevron-right </v-icon>
              </v-list-item>

              <v-divider> </v-divider>

              <v-list-item to="/garage/add-unit">
                <v-list-item-subtitle
                  ><v-list-item-avatar tile size="30">
                    <v-img
                      src="/img/icons/ic_tmbhunit.webp"
                    ></v-img> </v-list-item-avatar
                  >Tambah Unit</v-list-item-subtitle
                >
                <v-icon> mdi-chevron-right </v-icon>
              </v-list-item>

              <v-divider> </v-divider>
              <!-- <v-list-item to="/account/profile/report">
                <v-list-item-subtitle
                  ><v-list-item-avatar tile size="30">
                    <v-img src="/img/icons/iklan diikuti.webp"></v-img>
                  </v-list-item-avatar>
                  Report</v-list-item-subtitle
                >
                <v-icon> mdi-chevron-right </v-icon>
              </v-list-item>
              <v-divider> </v-divider> -->
              <v-list-item to="/account/profile/add-subscription">
                <v-list-item-avatar tile size="30">
                  <v-img src="/img/icons/belilangganan.webp"></v-img>
                </v-list-item-avatar>
                <v-list-item-subtitle>Beli Langganan</v-list-item-subtitle>
                <v-icon> mdi-chevron-right </v-icon>
              </v-list-item>

              <v-divider> </v-divider>

              <v-list-item to="/account/profile/list-subs">
                <v-list-item-avatar tile size="30">
                  <v-img src="/img/icons/langganansaya.webp"></v-img>
                </v-list-item-avatar>
                <v-list-item-subtitle>Langganan Saya</v-list-item-subtitle>
                <v-icon> mdi-chevron-right </v-icon>
              </v-list-item>

              <v-divider> </v-divider>

              <!-- <v-btn
                color="#4AB7C3"
                dark
                class="mt-2 ml-3 mr-3"
                to="/account/profile/aktivitas"
              >
                <v-icon center> mdi-pulse </v-icon> Aktivitas
              </v-btn> -->
            </v-list>
          </v-col>

          <v-col cols="6" class="d-flex">
            <v-list dense class="flex-grow-1">
              <v-list-item to="/account/profile/favorit" replace>
                <v-list-item-avatar tile size="30">
                  <v-img src="/img/icons/fav.webp"></v-img>
                </v-list-item-avatar>
                <v-list-item-subtitle>Favorit</v-list-item-subtitle>
                <v-icon> mdi-chevron-right </v-icon>
              </v-list-item>

              <v-divider> </v-divider>

              <v-list-item to="/account/profile/aktivitas">
                <v-list-item-avatar tile size="30">
                  <v-img src="/img/icons/iklan diikuti.webp"></v-img>
                </v-list-item-avatar>
                <v-list-item-subtitle>Iklan Diikuti</v-list-item-subtitle>
                <v-icon> mdi-chevron-right </v-icon>
              </v-list-item>

              <v-divider> </v-divider>

              <v-list-item to="/account/profile/ulasan">
                <v-list-item-avatar tile size="30">
                  <v-img src="/img/icons/Ulasan.webp"></v-img>
                </v-list-item-avatar>
                <v-list-item-subtitle>Ulasan Saya</v-list-item-subtitle>
                <v-icon> mdi-chevron-right </v-icon>
              </v-list-item>

              <v-divider> </v-divider>

              <v-list-item to="/account/profile/bantuan">
                <v-list-item-avatar tile size="30">
                  <v-img src="/img/icons/bantuan.webp"></v-img>
                </v-list-item-avatar>
                <v-list-item-subtitle>Bantuan</v-list-item-subtitle>
                <v-icon> mdi-chevron-right </v-icon>
              </v-list-item>

              <v-divider> </v-divider>

              <v-list-item to="/account/profile/report">
                <v-list-item-subtitle
                  ><v-list-item-avatar tile size="30">
                    <v-img src="/img/icons/iklan diikuti.webp"></v-img>
                  </v-list-item-avatar>
                  Report</v-list-item-subtitle
                >
                <v-icon> mdi-chevron-right </v-icon>
              </v-list-item>
              <v-divider> </v-divider>
              <!-- <v-btn
                color="#348AC7"
                dark
                class="mt-2 ml-2 mr-3"
                to="/account/profile/transaksitb"
              >
                <v-icon left> mdi-format-list-bulleted </v-icon> Transaksi
              </v-btn> -->
            </v-list>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red" outlined small @click="signOut">
            <v-icon left>mdi-logout</v-icon> Keluar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'account',
  data: () => ({
    countNotif: 0,
    chats: [],
    tab2: 0,
    content: false,
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user',
      ticket: 'ticket/ticket',
      guest: 'auth/guest',
    }),
  },
  methods: {
    ...mapActions({
      setAuth: 'auth/set',
      setTicket: 'ticket/set',
      setAlert: 'alert/set',
    }),
    async getNotif() {
      await this.$axios
        .get('/log/v3/log/notifikasi', {
          params: {
            id_user: this.user.id,
            is_read: false,
            limit: 1,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response
          this.countNotif = data.count
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

    async getChats() {
      await this.$fire.firestore
        .collection('chat')
        .doc(String(this.user.id))
        .collection('user_messages')
        .where('Seen', '==', false)
        .onSnapshot((querySnapshot) => {
          let messages = []
          querySnapshot.forEach((doc) => {
            messages.push(doc.data())
          })
          this.chats = messages
        })
    },
    async statusTiket() {
      await this.$axios
        .get('/tiket/v3/total_tiket', {
          params: {
            id_app_user: this.user.id,
          },
          headers: { Authorization: 'Bearer ' + this.user.token },
        })
        .then((response) => {
          let { data } = response.data
          this.setTicket(data)
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
    signOut() {
      this.setAuth({})
      this.$cookies.set('user', null)
      location.href = '/'
    },
  },
  async created() {
    await this.getNotif()
    await this.getChats()
    await this.statusTiket()
  },
}
</script>

<style>
</style>