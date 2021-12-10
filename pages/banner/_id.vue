<template>
  <div>
    <app-bar />

    <v-app-bar app color="#22939E" dark v-if="$vuetify.breakpoint.xs">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>

      <v-toolbar-title>Berita SiMotor</v-toolbar-title>
    </v-app-bar>

    <div style="max-width: 1240px; margin: 0 auto !important" class="text--center">
      <v-container>
        <v-card rounded="lg" color="cyan lighten-5">
          <v-card-title class="justify-center">{{ banners.nama }}</v-card-title>

          <v-img :src="getImage(banners.foto)" height="350" contain></v-img>

          <v-card-text class="justify-center">
            {{ banners.deskripsi }}
          </v-card-text>
        </v-card>
      </v-container>
    </div>

    <Footer />
  </div>
</template>

<script>
export default {
  name: 'banner',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),

        Footer: () =>
      import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
  },

  data: () => ({
    banners: [],
    
  }),
  methods: {
    async showBanners() {
      await this.$axios
        .get('/master/v3/mst_banner', {
          params: {
            id: this.$route.params.id,
          
          },
        })
        .then((response) => {
          let { data } = response.data
          this.banners = data[0]
        })
        .catch((error) => {
          let responses = error.response.data
          console.log(responses.api_message)
        })
    },
  },
  async created() {
    await this.showBanners()
  },
}
</script>

<style>
</style>