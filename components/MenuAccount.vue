<template>
  <div class="d-flex align-center">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon to="/account/profile/cart">
            <v-icon v-bind="attrs" v-on="on" color="#000000">mdi-cart-variant</v-icon>
        </v-btn>
      </template>
      <span>Notifikasi</span>
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
              v-if="user.photo == ''"
            ></v-img>
            <v-img :src="getImageUser(user.foto)" alt="Avatar" v-else></v-img>
          </v-avatar>
        </v-btn>
      </template>

      <v-card rounded="lg" raised width="200">
        <v-row no-gutters>
          <v-col cols="12">
            <v-card to="/account/profile/umum" color="#ffffff" outlined >
            <v-list dense>
              <v-list-item >
                <v-list-item-avatar>
                  <v-img
                    src="/img/icons/people.webp"
                    contain
                    v-if="user.photo == ''"
                  ></v-img>

                  <v-img
                    :src="getImageUser(user.foto)"
                    alt="Avatar"
                    v-else
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    class="d-flex align-center"
                  >
                    {{ user.nama }}
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
    signOut() {
      this.setAuth({})
      this.$cookies.set('user', null)
      location.href = '/'
    },
  },
  async created() {
    console.log('user bar', this.user)
  },
}
</script>

<style>
</style>