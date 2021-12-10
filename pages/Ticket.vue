<template>
  <div>
    <app-bar />

    <v-app-bar app color="#20929D" dark v-if="$vuetify.breakpoint.xs">
      <v-btn icon @click.stop="$router.go(-1)">
        <v-icon>mdi-arrow-left-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <div style="max-width: 1240px; margin: 0 auto !important">
      <v-row>
        <v-col cols="12" sm="4">
          <left-layout-ticket />
        </v-col>

        <v-col cols="12" sm="8">
          <main-layout-ticket />
        </v-col>
      </v-row>
    </div>
    <br />
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ticket',
  components: {
    AppBar: () =>
      import(/* webpackChunkName: "app-bar" */ '@/components/AppBar.vue'),

     Footer: () =>
      import(/* webpackChunkName: "footer" */ '@/components/Footer.vue'),
    LeftLayoutTicket: () =>
      import(
        /* webpackChunkName: "left-layout-ticket" */ '@/components/LeftLayoutTicket.vue'
      ),
    MainLayoutTicket: () =>
      import(
        /* webpackChunkName: "main-layout-ticket" */ '@/components/MainLayoutTicket.vue'
      ),
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },
}
</script>

<style>
</style>