<template>
  <div>
    <v-card rounded="lg" elevation="6" raised>
      <v-tabs v-model="tab" color="#008693">
        <v-tab href="#tab-pembeli">Pembeli</v-tab>
        <v-tab href="#tab-penjual">Penjual</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-pembeli">
          <aktivitas-pembeli :user="user" />
        </v-tab-item>

        <v-tab-item value="tab-penjual">
          <aktivitas-penjual :user="user" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'aktivitas-tb',
  props: ['user'],
  components: {
    AktivitasPembeli: () =>
      import(
        /* webpackChunkName: "aktivitas-pembeli" */ '@/components/AktivitasPembeli.vue'
      ),
    AktivitasPenjual: () =>
      import(
        /* webpackChunkName: "aktivitas-penjual" */ '@/components/AktivitasPenjual.vue'
      ),
  },
  computed: {
    query() {
      return this.$route.query.tab
    },
  },
  watch: {
    query() {
      this.tab = this.$route.query.tab == 0 ? 'tab-pembeli' : 'tab-penjual'
    },
  },
  data: () => ({
    tab: 'tab-pembeli',
  }),
}
</script>

<style>
</style>