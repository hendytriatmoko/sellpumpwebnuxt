<template>
  <div>
    <app-bar />

    <v-app-bar app color="#22939E" dark v-if="$vuetify.breakpoint.xs">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div style="max-width: 1240px; margin: 0 auto !important">
      <v-row>
        <v-col cols="12" sm="3">
          <v-card rounded="lg" elevation="6" raised>
            <v-img
              src="/img/icons/people.webp"
              contain
              v-if="user.foto == ''"
              width="300"
              height="200"
            ></v-img>

            <v-img :src="getImageUser(user.foto)" alt="Avatar" v-else width="300"  height="200"></v-img>

            <v-form ref="form" v-model="valid">
              <v-file-input
                id="fileid"
                label="File input"
                v-model="photo"
                accept="image/*"
                outlined
                dense
                class="d-none"
                @change="saveData()"
              ></v-file-input>
            </v-form>

            <v-btn id="buttonid" block small @click="uploadAvatar">
              Pilih Foto
            </v-btn>
          </v-card>

          <v-list dense>
            <v-list-item>
              <v-list-item-title class="d-flex align-center">
                <v-icon color="#20929D" small class="mr-1">
                  mdi-check-decagram
                </v-icon>
                <h3>{{ user.nama }}</h3>
              </v-list-item-title>
            </v-list-item>

            <v-list-item-group v-model="menu" color="primary" class="mt-2">
              <template v-for="(item, index) in menus">
                <v-list-item :key="item.text" :to="item.route">
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item>

                <v-divider :key="index"></v-divider>
              </template>
            </v-list-item-group>
          </v-list>
        </v-col>

        <v-col cols="12" sm="9">
          <NuxtChild :user="user" />
        </v-col>
      </v-row>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'profile',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),
  },
    Footer: () =>
      import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
  data: () => ({
    menu: 0,
    menus: [
      { text: 'Profil', route: '/account/profile/umum' },
      { text: 'Keranjang', route: '/account/profile/cart' },
      { text: 'Pesanan', route: '/account/profile/pesanan' },
      // { text: 'Rekening Bank', route: '/account/profile/rekening' },
      // { text: 'Iklan & Garasi', route: '/account/profile/iklan-garasi' },
      // { text: 'Tambah Unit', route: '/garage/add-unit' },
      // { text: 'Tambah Iklan', route: '/seller/add' },
      // { text: 'Beli Langganan', route: '/account/profile/add-subscription' },
      // { text: 'Langganan Saya', route: '/account/profile/list-subs' },
      // { text: 'Iklan Favorit', route: '/account/profile/favorit' },
      // { text: 'Ulasan', route: '/account/profile/ulasan' },
      // { text: 'Bantuan', route: '/account/profile/bantuan' },
    ],
    valid: true,
    photo: null,
  }),
  computed: {
    ...mapGetters({
      guest: 'auth/guest',
      user: 'auth/user',
    }),
  },
  methods: {
    ...mapActions({
      setAlert: 'alert/set',
      setAuth: 'auth/set',
    }),
    uploadAvatar() {
      document.getElementById('fileid').click()
    },
    async saveData() {
        let formData = new FormData()

        if (this.photo != null) {
          formData.set('foto', this.photo)          
        }
        formData.set('id_user', this.user.id_user)

        await this.$axios
          .put('/user/v1/user/update', formData)
          .then((response) => {
            let { data } = response
            this.setAlert({
              status: true,
              color: 'success',
              text: 'Foto berhasil diupdate',
            })
            this.setAuth(data.data[0])
            this.$cookies.set('user', JSON.stringify(data.data[0]))
          })
          .catch((error) => {
            let responses = error.response.data
            this.setAlert({
              status: true,
              color: 'error',
              text: responses.api_message,
            })

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
    this.DataToken = this.$cookies.get("token");
  },
}
</script>

<style>
</style>